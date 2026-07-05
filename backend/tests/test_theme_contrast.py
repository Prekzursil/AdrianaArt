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
from app.services.theme_derive import PRIMARY_COLOR_NAMES, derive_tokens, parse_triplet
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


def test_render_pairings_cover_every_rendered_derived_surface() -> None:
    # Render-completeness backstop (prevents bypass #8): every DERIVED surface the
    # storefront renders TEXT on MUST appear as a gated background, so a future
    # ungated state shade cannot silently reappear. Provenance: the audited
    # frontend/src render map (see RENDER_PAIRINGS docstring).
    gated_bg = {p.background for p in RENDER_PAIRINGS}
    rendered_text_surfaces = {
        "--background",
        "--surface",
        "--surface-muted",
        "--field",
        "--background-subtle",
        "--surface-inverse",
        "--surface-inverse-hover",
        "--accent",
        "--accent-subtle",
    }
    missing = rendered_text_surfaces - gated_bg
    assert not missing, f"ungated rendered surfaces (bypass #8 risk): {missing}"


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


# --------------------------------------------------------------------------- #
# PROPERTY-BASED BACKSTOP (replaces a hand-list that could share the gate's
# blind spot): the gate MUST be a SUPERSET of the real render obligations.
#
# RENDER_OBLIGATIONS is the ground-truth render map, hardcoded HERE independently
# of RENDER_PAIRINGS so a removed gate row is caught: the SIX bare-canvas
# foregrounds on BOTH canvas gradient endpoints (--background AND
# --background-subtle, per app.component.ts:40's `from-background-subtle
# to-background`), PLUS every explicit-surface pair the storefront paints. The
# property: for ANY admin-primary vector, if some obligation renders below body AA
# then evaluate_contrast MUST reject (non-empty). This proves the gate covers the
# real obligations WITHOUT a hand-list that can inherit the gate's omissions.
# --------------------------------------------------------------------------- #

# The six bare-canvas (no explicit bg-* ancestor) foregrounds and the two gradient
# endpoints they can render on. The on-colours (--text-inverse / --text-onmedia /
# --border-inverse) are EXCLUDED: they only render on --surface-inverse / --accent,
# never the canvas.
_CANVAS_FOREGROUNDS: tuple[str, ...] = (
    "--text",
    "--text-heading",
    "--text-muted",
    "--text-secondary",
    "--text-strong",
    "--accent",
)
_CANVAS_ENDPOINTS: tuple[str, ...] = ("--background", "--background-subtle")

# Every explicit-surface (fg, bg) the storefront actually paints text on — the
# non-canvas obligations, hardcoded from the audited render map.
_EXPLICIT_SURFACE_PAIRS: tuple[tuple[str, str], ...] = (
    ("--text", "--surface"),
    ("--text", "--surface-muted"),
    ("--text-secondary", "--surface"),
    ("--text-secondary", "--surface-muted"),
    ("--text-strong", "--surface"),
    ("--text-strong", "--surface-muted"),
    ("--text-heading", "--surface"),
    ("--text-heading", "--field"),
    ("--text-heading", "--surface-muted"),
    ("--accent", "--surface"),
    ("--accent-strong", "--background"),
    ("--accent-strong", "--accent-subtle"),
    ("--text-inverse", "--surface-inverse"),
    ("--text-inverse", "--surface-inverse-hover"),
    ("--text-onmedia", "--accent"),
)

# The full ground-truth obligation set (canvas endpoints + explicit surfaces).
_RENDER_OBLIGATIONS: tuple[tuple[str, str], ...] = (
    *((fg, ep) for fg in _CANVAS_FOREGROUNDS for ep in _CANVAS_ENDPOINTS),
    *_EXPLICIT_SURFACE_PAIRS,
)


def _obligation_failures(effective: dict[str, str]) -> list[tuple[str, str]]:
    """The obligations that render below body AA under an effective token set."""
    return [
        (fg, bg)
        for fg, bg in _RENDER_OBLIGATIONS
        if contrast_ratio(parse_triplet(effective[fg]), parse_triplet(effective[bg]))
        < AA_BODY
    ]


def test_every_bare_canvas_foreground_gated_on_both_endpoints() -> None:
    # STRUCTURAL: each of the six bare-canvas foregrounds is gated on BOTH the
    # --background and --background-subtle gradient endpoints (monotonicity: the
    # worst contrast on the gradient is at one endpoint, so both must be gated).
    gated = {(p.foreground, p.background) for p in RENDER_PAIRINGS}
    for fg in _CANVAS_FOREGROUNDS:
        for endpoint in _CANVAS_ENDPOINTS:
            assert (fg, endpoint) in gated, f"{fg} not gated on {endpoint}"


def test_gate_is_superset_of_render_obligations_over_fuzzed_primaries() -> None:
    # PROPERTY: for a deterministic pseudo-random sweep of admin-primary vectors,
    # if ANY rendered obligation (bare-canvas fg on either endpoint, or an
    # explicit-surface pair) falls below body AA, evaluate_contrast MUST reject.
    # A seeded LCG (no Math.random / Date) gives a fixed, reproducible sequence.
    seed = 0x1A2B3C4D
    def _next() -> int:
        nonlocal seed
        seed = (seed * 1103515245 + 12345) & 0x7FFFFFFF
        return seed % 256

    def _triplet() -> str:
        return f"{_next()} {_next()} {_next()}"

    rejected_vectors = 0
    for _ in range(2000):
        # Only the nine editable colour primaries vary; fonts / spacing pass through.
        primaries = {name: _triplet() for name in PRIMARY_COLOR_NAMES}
        effective = derive_tokens({**default_theme_tokens(), **primaries})
        obligation_fails = _obligation_failures(effective)
        gate_fails = evaluate_contrast(effective)
        if obligation_fails:
            # The gate is a SUPERSET: any failing obligation forces a rejection.
            assert gate_fails, (
                "gate returned EMPTY while a render obligation failed: "
                f"{obligation_fails[:3]}"
            )
            rejected_vectors += 1
    # Guard against a vacuously-true property: the sweep must exercise the reject
    # branch (many hostile vectors fail at least one obligation).
    assert rejected_vectors > 100, rejected_vectors


def test_ninth_bypass_exploit_vector_is_rejected() -> None:
    # The review's exact 9th-bypass exploit: --accent = 165 3 182 "scrapes" AA on
    # the lighter --background yet fails on the darker canvas endpoint
    # --background-subtle. It MUST be rejected, with accent-on-background-subtle
    # among the failures. (On this derivation it is also caught on --surface, since
    # --background-subtle is byte-identical to --surface-muted and --surface is
    # darker — the explicit canvas row is defence-in-depth.)
    exploit = {
        "--accent": "165 3 182",
        "--background": "217 217 217",
        "--surface": "200 200 200",
    }
    effective = derive_tokens({**default_theme_tokens(), **exploit})
    failures = evaluate_contrast(effective)
    ids = {f.id for f in failures}
    assert failures, "9th-bypass exploit must be rejected"
    assert "accent-on-background-subtle" in ids
    subtle = next(f for f in failures if f.id == "accent-on-background-subtle")
    assert subtle.ratio < subtle.target == AA_BODY
    # The accent DOES clear AA on the lighter --background endpoint (the "scrape").
    assert "accent-on-background" not in ids


def test_eighth_bypass_exploit_vector_is_rejected_and_isolated() -> None:
    # The 8th bypass: --text-muted on the darker canvas endpoint. --surface = 219
    # publishes pre-fix (muted clears the WHITE --background at 4.76 and muted was
    # gated ONLY on --background) but renders at 4.06 on --background-subtle. It is
    # the one bare-canvas foreground with no --surface-muted pairing to shadow it,
    # so the failure is ISOLATED to muted-on-background-subtle.
    effective = derive_tokens({**default_theme_tokens(), "--surface": "219 219 219"})
    ids = sorted(f.id for f in evaluate_contrast(effective))
    assert ids == ["muted-on-background-subtle"]
