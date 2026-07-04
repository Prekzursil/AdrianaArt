"""Tests for the server-side contrast maths + publish gate (P1a WU4b).

The maths mirrors ``frontend/src/app/core/theme/contrast.ts``; the gate
(:func:`evaluate_contrast`) runs over the DERIVED effective token set and catches
a hostile PRIMARY edit that collapses a gated pairing — the 422 path.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.services.theme_contrast import (
    AA_BODY,
    AA_LARGE,
    PRIMARY_PAIRINGS,
    RENDER_PAIRINGS,
    contrast_ratio,
    evaluate_contrast,
    meets_aa,
    passes_aa,
    relative_luminance,
)
from app.services.theme_derive import derive_tokens
from app.services.theme_service import default_theme_tokens


def test_known_contrast_ratios() -> None:
    assert contrast_ratio((0, 0, 0), (255, 255, 255)) == pytest.approx(21.0, abs=1e-6)
    assert contrast_ratio((255, 255, 255), (255, 255, 255)) == pytest.approx(1.0, abs=1e-9)


def test_relative_luminance_extremes_cover_both_linearize_branches() -> None:
    # channel 0 hits the `<= 0.03928` branch; channel 255 hits the power branch.
    assert relative_luminance((0, 0, 0)) == pytest.approx(0.0, abs=1e-9)
    assert relative_luminance((255, 255, 255)) == pytest.approx(1.0, abs=1e-9)


def test_meets_and_passes_aa_thresholds() -> None:
    assert meets_aa(AA_BODY, "body") is True
    assert meets_aa(AA_BODY - 0.01, "body") is False
    assert meets_aa(AA_LARGE, "large") is True
    assert passes_aa((0, 0, 0), (255, 255, 255), "body") is True
    assert passes_aa((250, 250, 250), (255, 255, 255), "body") is False


def test_gate_passes_on_compiled_defaults() -> None:
    tokens = derive_tokens(default_theme_tokens())
    assert evaluate_contrast(tokens) == []


def test_gate_catches_hostile_primary_edit() -> None:
    # A hostile --text near-white on the white --background collapses body copy.
    tokens = derive_tokens({**default_theme_tokens(), "--text": "250 250 250"})
    failures = evaluate_contrast(tokens)
    ids = {f.id for f in failures}
    assert "text-on-background" in ids
    failure = next(f for f in failures if f.id == "text-on-background")
    assert failure.ratio < failure.target
    assert failure.target == AA_BODY


def test_gate_catches_low_contrast_accent() -> None:
    # Accent link colour too pale against the surfaces it links on.
    tokens = derive_tokens({**default_theme_tokens(), "--accent": "230 230 230"})
    ids = {f.id for f in evaluate_contrast(tokens)}
    assert "accent-on-background" in ids


def test_every_gated_pairing_references_present_tokens() -> None:
    tokens = derive_tokens(default_theme_tokens())
    for pair in PRIMARY_PAIRINGS:
        assert pair.foreground in tokens
        assert pair.background in tokens
        assert pair.size in {"body", "large"}


def test_gate_catches_on_color_state_shade_bypass() -> None:
    # Contrast bypass #6: --surface-inverse=117 passes the BASE on-colour pairing
    # (white on 117 = 4.61) but its derived hover shade (127) renders white at
    # 4.00. The render-complete gate must catch the STATE-SHADE pair.
    tokens = derive_tokens({**default_theme_tokens(), "--surface-inverse": "117 117 117"})
    failures = evaluate_contrast(tokens)
    ids = {f.id for f in failures}
    assert "text-inverse-on-surface-inverse-hover" in ids
    # ...but the BASE on-colour pairing still passes (safe by construction).
    assert "text-inverse-on-surface-inverse" not in ids
    hover = next(f for f in failures if f.id == "text-inverse-on-surface-inverse-hover")
    assert hover.ratio < hover.target == AA_BODY


def test_gate_targets_heading_at_body_on_every_neutral_surface() -> None:
    # Contrast bypass #7: --text-heading=137 clears large (3.0) but colours BODY
    # text on --background/--surface/--field/--surface-muted. Every heading pairing
    # in the render-complete gate targets body (4.5) and fires.
    tokens = derive_tokens({**default_theme_tokens(), "--text-heading": "137 137 137"})
    failures = evaluate_contrast(tokens)
    heading = {f.id: f for f in failures if f.id.startswith("heading-on-")}
    assert "heading-on-background" in heading
    assert "heading-on-field" in heading
    assert "heading-on-surface" in heading
    for f in heading.values():
        assert f.size == "body"
        assert f.target == AA_BODY
        assert f.ratio < AA_BODY


def test_gate_catches_muted_on_background_subtle_canvas() -> None:
    # Contrast bypass #8: --surface=222 darkens the DERIVED --background-subtle
    # (mix(--background,--surface,0.5)=239) — the upper stop of the app-shell canvas
    # gradient that --text-muted body captions render on. muted-on-background (solid
    # white) still passes; the render-complete gate catches muted-on-background-subtle.
    tokens = derive_tokens({**default_theme_tokens(), "--surface": "222 222 222"})
    failures = evaluate_contrast(tokens)
    ids = {f.id for f in failures}
    assert "muted-on-background-subtle" in ids
    assert "muted-on-background" not in ids
    subtle = next(f for f in failures if f.id == "muted-on-background-subtle")
    assert subtle.foreground == "--text-muted"
    assert subtle.background == "--background-subtle"
    assert subtle.ratio < subtle.target == AA_BODY


# The RENDER-COMPLETE (foreground, background) pairs the 7 storefront components
# actually paint TEXT for — a REVIEWED constant derived from the WU0 §1A surface
# map + a grep audit of every `text-<token>` co-occurring with a `bg-<token>` OR an
# app-shell gradient stop (`from-/via-/to-<token>`) across the storefront core.
# This is the render-completeness ground truth the gate must cover; every tuple is
# annotated with a representative site so a reviewer can re-verify it.
#
# The app-shell canvas is `bg-gradient-to-b from-background-subtle to-background`
# (app.component.ts:40): text with NO local `bg-*` inherits that gradient, so its
# worst-case (lowest-contrast) stop is --background-subtle. The shell's default text
# colour is --text-heading (already gated there); bare BODY captions are coloured
# --text-muted (shop:700/823/859, product:143/157, banner-block:18) — the pair that
# slipped as bypass #8. Every element WITH a local `bg-*` (the bg-background filter
# sidebar shop:66, bg-surface cards) renders on that SOLID surface, gated separately.
# --surface-raised is deliberately ABSENT: it backs only dividers (header:358) and
# skeleton shimmers (footer:59..) — it bears no text, so it carries no AA obligation.
_RENDERED_TEXT_PAIRS: frozenset[tuple[str, str]] = frozenset(
    {
        ("--text", "--background"),  # header:157 body copy on the canvas
        ("--text", "--surface"),  # product:278 body on a card
        ("--text", "--surface-muted"),  # product-card:138
        ("--text-muted", "--background"),  # product-card:111 caption on solid canvas
        ("--text-muted", "--background-subtle"),  # bypass #8 — bare canvas gradient
        ("--text-secondary", "--background"),  # footer:53
        ("--text-secondary", "--surface"),  # shop:212
        ("--text-secondary", "--surface-muted"),  # shop:280
        ("--text-strong", "--background"),  # shop:93 (bg-background sidebar)
        ("--text-strong", "--surface"),  # header:133
        ("--text-strong", "--surface-muted"),  # shop:706 hover chip
        ("--text-heading", "--background"),  # header:252
        ("--text-heading", "--surface"),  # header:180 hover
        ("--text-heading", "--field"),  # header:97 select
        ("--text-heading", "--surface-muted"),  # shop:1026 hover
        ("--text-heading", "--background-subtle"),  # app:40 shell default text
        ("--accent", "--background"),  # shop:75 link
        ("--accent", "--surface"),  # link on a card
        ("--accent-strong", "--background"),  # shop:715 hover
        ("--accent-strong", "--accent-subtle"),  # header:696 maintenance banner
        ("--text-inverse", "--surface-inverse"),  # header:140 chip (safe by construction)
        ("--text-inverse", "--surface-inverse-hover"),  # shop:1019 hover (bypass #6)
        ("--text-onmedia", "--accent"),  # accent surface (safe by construction)
    }
)


def test_render_pairings_gate_every_rendered_fg_bg_pair() -> None:
    # Render-completeness backstop (closes the bypass CLASS, not just #8): every
    # (foreground, background) PAIR the storefront actually renders text for MUST be
    # gated. The earlier form asserted only that each rendered BACKGROUND appeared as
    # SOME gated background — too weak: --background-subtle "counted" via
    # heading-on-background-subtle, so the ungated muted-on-background-subtle pair
    # slipped through (bypass #8). Asserting the PAIR is gated fails if ANY rendered
    # fg/bg pair is missing (remove a RENDER_PAIRINGS row and this test fails).
    gated_pairs = {(p.foreground, p.background) for p in RENDER_PAIRINGS}
    missing = _RENDERED_TEXT_PAIRS - gated_pairs
    assert not missing, f"ungated rendered fg/bg pairs (bypass-class risk): {missing}"


def test_render_pairings_reference_present_tokens_and_pass_defaults() -> None:
    tokens = derive_tokens(default_theme_tokens())
    for pair in RENDER_PAIRINGS:
        assert pair.foreground in tokens, pair.id
        assert pair.background in tokens, pair.id
        assert pair.size in {"body", "large"}
    # The known-safe compiled defaults clear every render pairing.
    assert evaluate_contrast(tokens) == []


_CONTRAST_FIXTURE = json.loads(
    (
        Path(__file__).parent.parent.parent / "test-fixtures" / "theme-contrast-fixture.json"
    ).read_text()
)


def test_render_pairings_match_shared_parity_fixture() -> None:
    # TS<->Python parity: the Python gate list MUST equal the shared fixture (which
    # pairing-matrix.spec.ts asserts the TS list against), in order — a divergence
    # means the server gates one thing and the browser renders another.
    got = [
        {"id": p.id, "foreground": p.foreground, "background": p.background, "size": p.size}
        for p in RENDER_PAIRINGS
    ]
    assert got == _CONTRAST_FIXTURE["pairings"]


def test_gate_matches_shared_parity_fixture_cases() -> None:
    for case in _CONTRAST_FIXTURE["cases"]:
        effective = derive_tokens({**default_theme_tokens(), **case["primaries"]})
        got = sorted(f.id for f in evaluate_contrast(effective))
        assert got == case["failures"], case["name"]
