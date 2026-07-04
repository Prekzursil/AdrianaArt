"""WCAG 2.x pairwise contrast maths + server-side enforcement (WU4b, B9).

A FAITHFUL Python port of the WU8-core client algorithm
(``frontend/src/app/core/theme/contrast.ts``) plus the curated global pairing
matrix (``frontend/src/app/core/theme/pairing-matrix.ts``). The client contrast
check is a guardrail; THIS module is the authoritative enforcement boundary — a
forged ``POST /theme/publish`` carrying an individually-valid-but-together-failing
pairing is rejected here, not merely blocked in the UI.

Keep this byte-for-byte equivalent in behaviour to ``contrast.ts``: both sides
must compute identical ratios so the client preview and the server gate never
disagree. Channels are integers 0-255 (the frozen ``R G B`` triplet wire format,
WU0 §4); values are assumed pre-validated by the token validator (WU2), so the
maths performs no range/format validation.

The pairing endpoints are colour tokens (``--text``/-heading/-muted, ``--accent``
on ``--background``/``--surface``); the caller (``theme_service``) always hands
this the EFFECTIVE rendered set — ``compiled_defaults()`` merged-under the
submitted draft — so no pairing is skipped for an absent endpoint at the gate.
The absent/unparseable skips below are the pure function's own defence for a
partial map handed to it directly (they never fire on the effective set).
"""

from __future__ import annotations

from dataclasses import dataclass

# WCAG AA minimum contrast ratios, selected by text size (mirrors AA_THRESHOLDS
# in contrast.ts): 4.5:1 normal body text, 3:1 large text (>=18pt / >=14pt bold).
AA_THRESHOLDS: dict[str, float] = {"body": 4.5, "large": 3.0}

RgbTriplet = tuple[int, int, int]


def _linearize(channel: int) -> float:
    """Linearise one sRGB channel (0-255) to its 0-1 light-intensity value."""
    c = channel / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(rgb: RgbTriplet) -> float:
    """WCAG relative luminance in 0-1 (0 = black, 1 = white), green-weighted."""
    r, g, b = rgb
    return 0.2126 * _linearize(r) + 0.7152 * _linearize(g) + 0.0722 * _linearize(b)


def contrast_ratio(a: RgbTriplet, b: RgbTriplet) -> float:
    """WCAG contrast ratio (1:1 .. 21:1). Symmetric in its two colours."""
    la = relative_luminance(a)
    lb = relative_luminance(b)
    lighter = max(la, lb)
    darker = min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def meets_aa(ratio: float, size: str) -> bool:
    """Whether a raw ratio meets the AA threshold for ``size`` (inclusive)."""
    return ratio >= AA_THRESHOLDS[size]


def passes_aa(foreground: RgbTriplet, background: RgbTriplet, size: str) -> bool:
    """Whether a fg/bg pair meets WCAG AA for ``size`` (order-independent)."""
    return meets_aa(contrast_ratio(foreground, background), size)


def parse_triplet(value: str) -> RgbTriplet:
    """Parse a frozen ``R G B`` triplet string into an sRGB tuple.

    Raises ``ValueError`` for anything that is not exactly three integers — the
    contrast validator treats an unparseable endpoint as a skip (the token falls
    back to its compiled default elsewhere), never a crash.
    """
    parts = value.split(" ")
    if len(parts) != 3:
        raise ValueError(f'expected an "R G B" triplet, got: {value}')
    return (int(parts[0]), int(parts[1]), int(parts[2]))


@dataclass(frozen=True)
class Pairing:
    """A curated, pre-validated foreground-on-background pairing (mirror of PAIRINGS)."""

    id: str
    foreground: str
    background: str
    size: str
    role: str


# The curated pairing matrix — a faithful mirror of ``pairing-matrix.ts``
# ``PAIRINGS``. It gates EVERY admin-editable background surface WU5 shipped
# (``--background``/-surface/-surface-muted/-surface-inverse/-field/-accent-subtle)
# against every foreground token that co-renders on it in the storefront —
# INCLUDING the FIXED (non-admin-editable) foregrounds ``--text-inverse`` (on the
# dark inverse chips/CTAs/cart badge) and ``--text-heading`` (in the field inputs),
# whose surface an admin CAN recolour. Without these an admin could set an editable
# surface (e.g. ``--surface-inverse`` white) through the shipped control and publish
# an illegible ~1:1 render past the 'authoritative' gate. ``--surface-raised`` is
# intentionally absent: it paints only skeleton/divider bars (no text). Each pairing
# is tagged with its AA size (4.5 body / 3 large) — the small UI chips/labels/inputs
# render at body, so their pairings are body even for heading-role foregrounds; the
# hero ``heading-on-{background,surface}`` (large) pairings model the display type.
# Kept in EXACT parity with ``pairing-matrix.ts`` PAIRINGS (same ids, same sizes).
PAIRINGS: tuple[Pairing, ...] = (
    Pairing(
        "text-on-background",
        "--text",
        "--background",
        "body",
        "body copy on the page canvas",
    ),
    Pairing(
        "heading-on-background",
        "--text-heading",
        "--background",
        "large",
        "hero / display headings on the page canvas",
    ),
    Pairing(
        "heading-sm-on-background",
        "--text-heading",
        "--background",
        "body",
        "body-size heading text (buttons / option labels) on the page canvas",
    ),
    Pairing(
        "strong-on-background",
        "--text-strong",
        "--background",
        "body",
        "emphasised chip / badge labels on the page canvas",
    ),
    Pairing(
        "secondary-on-background",
        "--text-secondary",
        "--background",
        "body",
        "secondary descriptions on the page canvas",
    ),
    Pairing(
        "muted-on-background",
        "--text-muted",
        "--background",
        "body",
        "captions / meta on the page canvas",
    ),
    Pairing(
        "text-on-surface", "--text", "--surface", "body", "body copy on raised surfaces"
    ),
    Pairing(
        "heading-on-surface",
        "--text-heading",
        "--surface",
        "large",
        "hero / display headings on raised surfaces",
    ),
    Pairing(
        "heading-sm-on-surface",
        "--text-heading",
        "--surface",
        "body",
        "body-size heading text (menu hover / icon buttons) on raised surfaces",
    ),
    Pairing(
        "strong-on-surface",
        "--text-strong",
        "--surface",
        "body",
        "emphasised icon-button labels on raised surfaces",
    ),
    Pairing(
        "secondary-on-surface",
        "--text-secondary",
        "--surface",
        "body",
        "secondary chip labels on raised surfaces",
    ),
    Pairing(
        "text-on-surface-muted",
        "--text",
        "--surface-muted",
        "body",
        "body copy / labels on the sunken / hover fill",
    ),
    Pairing(
        "strong-on-surface-muted",
        "--text-strong",
        "--surface-muted",
        "body",
        "emphasised pill labels on the hover fill",
    ),
    Pairing(
        "heading-on-surface-muted",
        "--text-heading",
        "--surface-muted",
        "body",
        "heading text on the hover fill (menu hover / active buttons)",
    ),
    Pairing(
        "inverse-on-surface-inverse",
        "--text-inverse",
        "--surface-inverse",
        "body",
        "FIXED white glyphs on the inverse chips / CTAs / cart badge",
    ),
    Pairing(
        "heading-on-field",
        "--text-heading",
        "--field",
        "body",
        "FIXED input text glyphs on the text-field fill",
    ),
    Pairing(
        "accent-on-background",
        "--accent",
        "--background",
        "body",
        "link text on the page canvas",
    ),
    Pairing(
        "accent-on-surface",
        "--accent",
        "--surface",
        "body",
        "link text on raised surfaces",
    ),
    Pairing(
        "accent-strong-on-accent-subtle",
        "--accent-strong",
        "--accent-subtle",
        "body",
        "category-chip labels on the accent-tinted surface",
    ),
)


@dataclass(frozen=True)
class ContrastFailure:
    """One pairing that fails its tagged AA target for a given token set."""

    pairing: str
    foreground: str
    background: str
    ratio: float
    target: float
    size: str


def validate_contrast(tokens: dict[str, str]) -> list[ContrastFailure]:
    """Return the pairings in ``tokens`` that fail their tagged AA target.

    A pairing whose endpoint token is absent, or whose value does not parse as a
    triplet, is SKIPPED — such a token renders from its compiled default (a
    known-safe value), so it is not a publish-blocking contrast failure here. The
    service passes the EFFECTIVE default-merged set, so absent-skips never fire on
    the gate path; they are the pure function's defence for a partial input.
    """
    failures: list[ContrastFailure] = []
    for pair in PAIRINGS:
        fg_value = tokens.get(pair.foreground)
        bg_value = tokens.get(pair.background)
        if fg_value is None or bg_value is None:
            continue
        try:
            fg = parse_triplet(fg_value)
            bg = parse_triplet(bg_value)
        except ValueError:
            continue
        ratio = contrast_ratio(fg, bg)
        if not meets_aa(ratio, pair.size):
            failures.append(
                ContrastFailure(
                    pairing=pair.id,
                    foreground=pair.foreground,
                    background=pair.background,
                    ratio=ratio,
                    target=AA_THRESHOLDS[pair.size],
                    size=pair.size,
                )
            )
    return failures
