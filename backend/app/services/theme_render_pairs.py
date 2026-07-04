"""Render-pair EXTRACTION from the storefront templates (P1a residual #3) — Python mirror.

The render-completeness backstop needs to know the set of ``(foreground-token,
background-token)`` pairs the storefront *actually paints themed text for*, so it
can assert every such pair is a gated :data:`~app.services.theme_contrast.RENDER_PAIRINGS`
row. Enumerating that set by hand is the TAUTOLOGY the earlier test fell into (a
hand-typed background-only set asserted against itself). This module instead
DERIVES the pair set by parsing the real Angular templates: it walks element
nesting and resolves each themed ``text-*`` token's effective *single-token*
background (the token on the element itself or its nearest concrete-surface
ancestor), emitting the ``(fg, bg)`` pairs that render.

Design notes (mirror of ``frontend/src/app/core/theme/theme-render-pairs.ts``):

* Only CONCRETE single-token surfaces establish a background context
  (``bg-background`` / ``bg-surface`` / ``bg-field`` / …). The app-shell GRADIENT
  (``bg-gradient-to-b from-background-subtle to-background``) and image/overlay
  scrims are *media* — not a single gate-able surface — so text on them is not
  attributed (its ``--text-onmedia`` obligation is the derivation's job, not this
  gate's). Non-themed solid colours (``bg-red-600``, ``bg-amber-50``) are opaque
  and likewise block attribution.
* Angular components (``<app-card>`` …) are treated as OPAQUE: their projected
  text is skipped here because each wrapper's OWN template supplies its concrete
  pairs directly (e.g. ``card.component.ts`` renders ``text-text`` on
  ``bg-background`` itself), so no pair is lost.
* Server-emitted colour-RAMP steps (``surface-200`` / ``text-500`` …) are
  recognised as themed but are NOT gated surfaces — so a template that ever
  RENDERS a ramp key yields an ungated pair and the backstop fires (residual #4).

Pure and dependency-free (stdlib ``html.parser`` only); the assertion that every
derived pair is gated lives in the tests.
"""

from __future__ import annotations

import re
from html.parser import HTMLParser

# --- Themed token classification (mirror of theme-render-pairs.ts) ----------

#: Themed FOREGROUND ``text-<name>`` class -> its CSS custom property.
FG_TOKENS: dict[str, str] = {
    "text": "--text",
    "text-secondary": "--text-secondary",
    "text-muted": "--text-muted",
    "text-strong": "--text-strong",
    "text-heading": "--text-heading",
    "inverse": "--text-inverse",
    "onmedia": "--text-onmedia",
    "accent": "--accent",
    "accent-strong": "--accent-strong",
}

#: Themed BACKGROUND ``bg-<name>`` class -> its CSS custom property.
BG_TOKENS: dict[str, str] = {
    "background": "--background",
    "background-subtle": "--background-subtle",
    "surface": "--surface",
    "surface-muted": "--surface-muted",
    "surface-raised": "--surface-raised",
    "surface-inverse": "--surface-inverse",
    "surface-inverse-hover": "--surface-inverse-hover",
    "field": "--field",
    "accent": "--accent",
    "accent-subtle": "--accent-subtle",
}

#: A server-emitted colour-ramp step (``surface-200`` / ``text-500`` …). Recognised
#: so a RENDERED ramp key becomes an (ungated) pair the backstop flags (residual #4).
_RAMP = re.compile(
    r"^(?:background|surface|text|border)-(?:50|100|200|300|400|500|600|700|800|900|950)$",
)

#: A Tailwind utility class: optional variant prefixes, a colour util, a name,
#: an optional ``/opacity``. Scanned across every attribute so static ``class``,
#: ``[ngClass]`` string literals and ``[class.x]`` names are all covered.
_CLASS = re.compile(
    r"((?:[a-z][a-z0-9-]*:)*)(bg|text|from|via|to)-([a-z0-9][a-z0-9-]*)(?:/\d+)?",
)

#: Tailwind PSEUDO-ELEMENT variants — these style a SEPARATE box (the file button,
#: ::before/::after, the placeholder, …), NOT the element's own text, so a
#: ``file:bg-surface-inverse`` must never be read as the base fill for a sibling
#: ``text-text`` on the same element. Any such class is skipped for pairing.
_PSEUDO_ELEMENT_VARIANTS = frozenset(
    {
        "before",
        "after",
        "placeholder",
        "file",
        "marker",
        "selection",
        "first-line",
        "first-letter",
        "backdrop",
    },
)

#: HTML void elements — no end tag, so they never open a nesting scope.
_VOID_TAGS = frozenset(
    {
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    },
)


def classify_bg(name: str) -> tuple[str, str | None]:
    """Classify a ``bg-<name>`` colour name into a context effect.

    Returns ``("concrete", token)`` for a gate-able single-token surface (incl. a
    ramp step), ``("inherit", None)`` for ``transparent`` (see-through), or
    ``("block", None)`` for a gradient / overlay / opaque non-themed colour that
    is not a single gate-able surface.
    """
    if name == "transparent":
        return ("inherit", None)
    if name.startswith("gradient") or name.startswith("overlay"):
        return ("block", None)
    token = BG_TOKENS.get(name)
    if token is not None:
        return ("concrete", token)
    if _RAMP.match(name):
        return ("concrete", "--" + name)
    return ("block", None)


def classify_fg(name: str) -> str | None:
    """Resolve a ``text-<name>`` colour name to its themed token, else ``None``."""
    token = FG_TOKENS.get(name)
    if token is not None:
        return token
    if _RAMP.match(name):
        return "--" + name
    return None


def extract_template(source: str) -> str:
    """Extract an Angular component's inline ``template: \\`...\\``` block.

    The storefront templates contain no backtick characters, so the first
    backtick after ``template:`` opens the literal and the next one closes it.
    Returns ``""`` if no inline template is present.
    """
    idx = source.find("template:")
    if idx == -1:
        return ""
    start = source.find("`", idx)
    if start == -1:
        return ""
    end = source.find("`", start + 1)
    if end == -1:
        return ""
    return source[start + 1 : end]


class _ScanResult:
    """The themed tokens found on one element's attributes."""

    __slots__ = ("base_bg", "base_bg_block", "hover_bg", "base_fg", "hover_fg")

    def __init__(self) -> None:
        self.base_bg: str | None = None
        self.base_bg_block: bool = False
        self.hover_bg: str | None = None
        self.base_fg: list[str] = []
        self.hover_fg: list[str] = []


def _is_dynamic_class_attr(name: str) -> bool:
    """True for an Angular class BINDING (``[ngClass]`` / ``[class]`` / ``[class.x]``)."""
    return (
        name in ("[ngclass]", "[class]")
        or name.startswith("[class.")
        or name.startswith("[attr.class")
    )


def _scan_attrs(attrs: list[tuple[str, str | None]]) -> _ScanResult:
    """Scan an element for themed bg / text tokens from its STATIC ``class`` only.

    Dynamic class BINDINGS (``[ngClass]`` ternaries, ``page.avatarClass`` …) are
    NOT parsed for tokens — merging a ternary's two branches conflates a TRUE-branch
    ``bg-surface-inverse`` with a FALSE-branch ``text-text`` into a phantom pair.
    Instead, a dynamic binding on an element with no static concrete background is
    treated as a possible unknown/gradient fill: it BLOCKS attribution (so the
    element's own text and its subtree are not pinned to an inherited surface).
    Every real gated pair is still reached through some element's STATIC classes.
    """
    class_value = ""
    has_dynamic = False
    for name, value in attrs:
        lname = name.lower()
        if lname == "class":
            class_value = value or ""
        elif _is_dynamic_class_attr(lname):
            has_dynamic = True

    result = _ScanResult()
    for match in _CLASS.finditer(class_value):
        variants, util, name = match.group(1), match.group(2), match.group(3)
        if any(part in _PSEUDO_ELEMENT_VARIANTS for part in variants.split(":") if part):
            continue
        is_hover = "hover:" in variants
        if util in ("from", "via", "to"):
            if not is_hover:
                result.base_bg_block = True
            continue
        if util == "bg":
            kind, token = classify_bg(name)
            if is_hover:
                if kind == "concrete":
                    result.hover_bg = token
            elif kind == "concrete":
                result.base_bg = token
            elif kind == "block":
                result.base_bg_block = True
            # kind == "inherit" (transparent): leave the inherited context intact.
            continue
        fg = classify_fg(name)
        if fg is not None:
            (result.hover_fg if is_hover else result.base_fg).append(fg)

    if has_dynamic and result.base_bg is None:
        result.base_bg_block = True
    return result


class _RenderPairParser(HTMLParser):
    """Walk an Angular template, emitting every rendered ``(fg, bg)`` themed pair."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.pairs: set[tuple[str, str]] = set()
        self._stack: list[str | None] = []

    def _current_base(self) -> str | None:
        return self._stack[-1] if self._stack else None

    def _resolve(self, scan: _ScanResult) -> str | None:
        if scan.base_bg is not None:
            return scan.base_bg
        if scan.base_bg_block:
            return None
        return self._current_base()

    def _emit(self, scan: _ScanResult, effective: str | None) -> None:
        if effective is not None:
            for fg in scan.base_fg:
                self.pairs.add((fg, effective))
        if scan.hover_bg is not None:
            for fg in scan.base_fg:
                self.pairs.add((fg, scan.hover_bg))
        hover_context = scan.hover_bg if scan.hover_bg is not None else effective
        if hover_context is not None:
            for fg in scan.hover_fg:
                self.pairs.add((fg, hover_context))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        scan = _scan_attrs(attrs)
        effective = self._resolve(scan)
        self._emit(scan, effective)
        if tag not in _VOID_TAGS:
            self._stack.append(effective)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        scan = _scan_attrs(attrs)
        self._emit(scan, self._resolve(scan))

    def handle_endtag(self, tag: str) -> None:
        if tag in _VOID_TAGS:
            return
        if self._stack:
            self._stack.pop()


def extract_render_pairs(template: str) -> set[tuple[str, str]]:
    """The set of ``(fg-token, bg-token)`` themed pairs the ``template`` renders."""
    parser = _RenderPairParser()
    parser.feed(template)
    parser.close()
    return parser.pairs
