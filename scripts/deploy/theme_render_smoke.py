"""Sub-gate 3 — themed-render smoke (P1a WU15).

A lightweight, browser-free proof that the DEFAULT theme renders and that the
SSR ``<style>`` sink it feeds is well-formed and injection-safe. It exercises the
REAL backend render seam (``theme_service.default_theme_tokens`` +
``theme_derive.derive_tokens`` — the exact pipeline ``GET /theme`` /
``resolve_published_tokens`` returns to the SSR consumer) and the REAL WU2 CSS
safety validator (``theme_validation.encode_css_safe``), then mirrors the WU6 SSR
head sink (``frontend/src/server/theme-head.ts``: build ``:root{…}`` inside
``<style id="ms-theme">`` and inject it as the first child of ``<head>``).

FAILS LOUD on any breach:

* the default theme fails to render a COMPLETE effective token map (every editable
  primary + every derived shade/on-colour present and non-empty);
* any rendered value is NOT injection-safe (would break out of the ``<style>``);
* the assembled ``<style id="ms-theme">`` tag is malformed;
* injecting the tag into a document does not place it inside ``<head>``.

This is the backend-side deploy guardrail on the seed both the migration and the
``create_all`` test path produce. It is deliberately NOT a re-test of the frontend
``theme-head.spec.ts`` unit seam (the frontend lane owns that); it guards that the
DATA the SSR sink renders is complete and safe so a fresh deploy is never unstyled
and never ships a tainted ``:root`` block.
"""

from __future__ import annotations

import re
import sys
from collections.abc import Callable
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
BACKEND_DIR = REPO_ROOT / "backend"

STYLE_ELEMENT_ID = "ms-theme"
_HEAD_OPEN = re.compile(r"<head[^>]*>", re.IGNORECASE)
_HEAD_CLOSE = "</head>"


class GateFailure(RuntimeError):
    """A deploy-gate invariant was violated; the message is the loud reason."""


def _ensure_backend_on_path() -> None:
    """Put ``backend/`` on ``sys.path`` so ``import app...`` resolves (idempotent)."""
    backend = str(BACKEND_DIR)
    if backend not in sys.path:
        sys.path.insert(0, backend)


def effective_default_tokens() -> dict[str, str]:
    """Render the default theme's full effective token map (primaries + derived).

    Mirrors what ``resolve_published_tokens`` returns for the seeded default:
    ``derive_tokens(default_theme_tokens())``.
    """
    _ensure_backend_on_path()
    from app.services.theme_derive import derive_tokens  # noqa: PLC0415
    from app.services.theme_service import default_theme_tokens  # noqa: PLC0415

    return derive_tokens(default_theme_tokens())


def required_token_names() -> set[str]:
    """The names the default render MUST contain: editable primaries + derived."""
    _ensure_backend_on_path()
    from app.services.theme_derive import DERIVED_COLOR_NAMES  # noqa: PLC0415
    from app.services.theme_service import default_theme_tokens  # noqa: PLC0415

    return set(default_theme_tokens()) | set(DERIVED_COLOR_NAMES)


def check_render_complete(tokens: dict[str, str], required: set[str]) -> None:
    """Fail loud if any required token is missing or renders an empty value."""
    missing = sorted(required - set(tokens))
    if missing:
        raise GateFailure(
            f"default theme did not render a complete token map; missing: {missing}"
        )
    empty = sorted(name for name in required if not tokens[name].strip())
    if empty:
        raise GateFailure(
            f"default theme rendered empty value(s) for: {empty} — a fresh deploy "
            "would render partially unstyled"
        )


def check_values_injection_safe(tokens: dict[str, str]) -> None:
    """Fail loud if any rendered value could break out of the ``<style>`` block."""
    _ensure_backend_on_path()
    from app.services.theme_validation import encode_css_safe  # noqa: PLC0415

    unsafe = sorted(
        name for name, value in tokens.items() if not encode_css_safe(value).ok
    )
    if unsafe:
        raise GateFailure(
            f"default theme rendered CSS-unsafe value(s) for: {unsafe} — the SSR "
            "<style> sink would reject or be broken out of"
        )


def build_theme_css(tokens: dict[str, str]) -> str:
    """Assemble the ``:root{…}`` block with deterministically sorted declarations.

    Mirrors ``theme-head.ts:buildThemeCss`` (sorted keys → stable output/hash).
    """
    declarations = "".join(f"{name}: {tokens[name]};" for name in sorted(tokens))
    return f":root{{{declarations}}}"


def build_style_tag(css: str) -> str:
    """Wrap the CSS body in the single permitted ``<style id="ms-theme">`` tag."""
    return f'<style id="{STYLE_ELEMENT_ID}">{css}</style>'


def inject_theme_head(html: str, style_tag: str) -> str:
    """Inject ``style_tag`` as the first child of ``<head>`` (mirrors WU6 sink).

    Falls back to before ``</head>``, then to a prepend, if no head is present.
    """
    open_match = _HEAD_OPEN.search(html)
    if open_match is not None:
        at = open_match.end()
        return f"{html[:at]}{style_tag}{html[at:]}"
    close_index = html.find(_HEAD_CLOSE)
    if close_index != -1:
        return f"{html[:close_index]}{style_tag}{html[close_index:]}"
    return f"{style_tag}{html}"


def check_style_tag_wellformed(style_tag: str) -> None:
    """Fail loud if the assembled tag is not a single well-formed theme style tag."""
    expected_open = f'<style id="{STYLE_ELEMENT_ID}">'
    if not style_tag.startswith(expected_open) or not style_tag.endswith("</style>"):
        raise GateFailure(f"assembled style tag is malformed: {style_tag[:60]!r}…")
    if style_tag.count("<style") != 1 or ":root{" not in style_tag:
        raise GateFailure(
            "assembled style tag is not a single ':root{…}' block: "
            f"{style_tag[:60]!r}…"
        )


def check_injected_into_head(
    html: str,
    style_tag: str,
    inject: Callable[[str, str], str] = inject_theme_head,
) -> None:
    """Fail loud if injecting the tag does not land it inside ``<head>``.

    ``inject`` is parameterised so a regression in the injector (tag landing
    outside ``<head>``) is caught here rather than silently shipping un-themed SSR.
    """
    injected = inject(html, style_tag)
    head_open = _HEAD_OPEN.search(injected)
    head_close = injected.find(_HEAD_CLOSE)
    tag_at = injected.find(style_tag)
    if head_open is None or head_close == -1:
        raise GateFailure("SSR document has no <head> to inject the theme style into")
    if not (head_open.end() <= tag_at < head_close):
        raise GateFailure(
            "theme <style> was not injected inside <head> — SSR would render "
            "un-themed (FOUC / unstyled default)"
        )


def run() -> int:
    """Render the default theme + prove the SSR style contract; return token count."""
    tokens = effective_default_tokens()
    required = required_token_names()
    check_render_complete(tokens, required)
    check_values_injection_safe(tokens)

    css = build_theme_css(tokens)
    style_tag = build_style_tag(css)
    check_style_tag_wellformed(style_tag)
    check_injected_into_head('<html><head><base href="/"></head></html>', style_tag)
    return len(tokens)


def main() -> int:
    """CLI entrypoint: 0 on success, 1 (loud stderr) on any invariant breach."""
    try:
        count = run()
    except GateFailure as exc:
        print(f"FAILED: themed-render-smoke\n{exc}", file=sys.stderr)
        return 1
    print(
        "SUCCESS: themed-render-smoke "
        f"(default theme rendered {count} injection-safe tokens into <head>)"
    )
    return 0


if __name__ == "__main__":  # pragma: no cover - exercised via subprocess/CI
    raise SystemExit(main())
