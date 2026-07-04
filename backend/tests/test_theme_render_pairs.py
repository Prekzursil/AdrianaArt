"""Tests for the storefront render-pair EXTRACTION parser (P1a residual #3).

Exercises every classification / nesting / emit branch, plus the RED probes that
PROVE the render-completeness backstop is non-tautological: a template that paints
themed text on an ungated surface (or a rendered ramp key, residual #4) yields an
ungated ``(fg, bg)`` pair, so the backstop in ``test_theme_contrast.py`` would fire.
"""

from __future__ import annotations

import pytest

from app.services.theme_contrast import RENDER_PAIRINGS
from app.services.theme_render_pairs import (
    classify_bg,
    classify_fg,
    extract_render_pairs,
    extract_template,
)

_GATED = {(p.foreground, p.background) for p in RENDER_PAIRINGS}


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("transparent", ("inherit", None)),
        ("gradient-to-b", ("block", None)),
        ("overlay", ("block", None)),
        ("surface", ("concrete", "--surface")),
        ("surface-inverse-hover", ("concrete", "--surface-inverse-hover")),
        ("surface-200", ("concrete", "--surface-200")),
        ("text-500", ("concrete", "--text-500")),
        ("red-600", ("block", None)),
        ("white", ("block", None)),
    ],
)
def test_classify_bg(name: str, expected: tuple[str, str | None]) -> None:
    assert classify_bg(name) == expected


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("text", "--text"),
        ("text-heading", "--text-heading"),
        ("inverse", "--text-inverse"),
        ("onmedia", "--text-onmedia"),
        ("accent-strong", "--accent-strong"),
        ("text-500", "--text-500"),
        ("border-950", "--border-950"),
        ("white", None),
        ("sm", None),
        ("rose-600", None),
    ],
)
def test_classify_fg(name: str, expected: str | None) -> None:
    assert classify_fg(name) == expected


@pytest.mark.parametrize(
    ("source", "expected"),
    [
        ("no template here", ""),
        ("template: 'no backtick'", ""),
        ("template: `unterminated", ""),
        ("template: `hello world`,", "hello world"),
    ],
)
def test_extract_template(source: str, expected: str) -> None:
    assert extract_template(source) == expected


def _pairs(template: str) -> set[tuple[str, str]]:
    return extract_render_pairs(template)


def test_concrete_bg_inherited_by_nested_text() -> None:
    assert _pairs('<div class="bg-surface"><p class="text-text">x</p></div>') == {
        ("--text", "--surface"),
    }


def test_co_located_bg_and_text() -> None:
    assert _pairs('<div class="bg-background text-text-heading"></div>') == {
        ("--text-heading", "--background"),
    }


def test_transparent_inherits_ancestor() -> None:
    assert _pairs(
        '<div class="bg-surface"><span class="bg-transparent text-text">x</span></div>',
    ) == {("--text", "--surface")}


def test_gradient_shell_blocks_attribution() -> None:
    assert (
        _pairs(
            '<div class="bg-gradient-to-b from-background-subtle to-background">'
            '<p class="text-text-heading">x</p></div>',
        )
        == set()
    )


def test_overlay_scrim_blocks_attribution() -> None:
    assert _pairs('<div class="bg-overlay"><p class="text-onmedia">x</p></div>') == set()


def test_opaque_state_colour_blocks_attribution() -> None:
    assert _pairs('<div class="bg-red-600"><p class="text-onmedia">x</p></div>') == set()


def test_hover_fill_pairs_base_and_hover_text() -> None:
    assert _pairs(
        '<a class="bg-background text-text hover:bg-surface-muted hover:text-text-heading">x</a>',
    ) == {
        ("--text", "--background"),
        ("--text", "--surface-muted"),
        ("--text-heading", "--surface-muted"),
    }


def test_hover_text_without_hover_bg_uses_base() -> None:
    assert _pairs('<a class="bg-surface text-text hover:text-text-heading">x</a>') == {
        ("--text", "--surface"),
        ("--text-heading", "--surface"),
    }


def test_from_via_to_hover_variant_does_not_block() -> None:
    # A hovered gradient part must not block the element's base fill.
    assert _pairs('<div class="hover:from-surface bg-surface text-text">x</div>') == {
        ("--text", "--surface"),
    }


def test_hover_bg_non_concrete_is_ignored() -> None:
    assert _pairs('<div class="bg-surface text-text hover:bg-red-600">x</div>') == {
        ("--text", "--surface"),
    }


def test_dynamic_ngclass_ternary_is_not_conflated() -> None:
    # The TRUE branch's bg-surface-inverse must NOT pair with the FALSE branch's
    # text-text: a dynamic binding with no static bg blocks attribution entirely.
    template = (
        '<button class="px-3 text-xs" '
        "[ngClass]=\"c ? 'bg-surface-inverse text-inverse' : 'text-text'\">x</button>"
    )
    assert _pairs(template) == set()


def test_dynamic_binding_keeps_static_concrete_bg() -> None:
    template = (
        "<div class=\"bg-surface\" [ngClass]=\"c ? 'opacity-50' : ''\">"
        '<p class="text-text">x</p></div>'
    )
    assert _pairs(template) == {("--text", "--surface")}


def test_pseudo_element_variant_is_skipped_but_base_kept() -> None:
    # file:bg-surface-inverse styles the ::file-selector-button, not the input's
    # own text-text — it must not become the base fill for text-text.
    template = (
        '<div class="bg-surface">'
        '<input class="text-text file:bg-surface-inverse file:text-inverse" /></div>'
    )
    assert _pairs(template) == {("--text", "--surface")}


def test_non_class_attributes_are_ignored() -> None:
    # Attributes before/around `class` that are neither class nor a class-binding
    # must not affect the derived pairs.
    template = '<div id="root" data-x="y" class="bg-surface"><p class="text-text">x</p></div>'
    assert _pairs(template) == {("--text", "--surface")}


def test_valueless_class_attribute_is_safe() -> None:
    assert _pairs('<div class><p class="bg-surface text-text">x</p></div>') == {
        ("--text", "--surface"),
    }


def test_void_element_does_not_open_a_scope() -> None:
    # <img> (void, no closing tag) must not swallow its bg as the <p>'s context.
    template = (
        '<div class="bg-field"><img class="bg-surface-inverse">'
        '<p class="text-text-heading">x</p></div>'
    )
    assert _pairs(template) == {("--text-heading", "--field")}


def test_stray_void_end_tag_is_ignored() -> None:
    assert _pairs('<div class="bg-surface"><p class="text-text">x</p></br></div>') == {
        ("--text", "--surface"),
    }


def test_unbalanced_end_tag_does_not_crash() -> None:
    # A trailing </div> with an empty stack must be a no-op, not an error.
    assert _pairs('<span class="bg-surface"><i class="text-text">x</i></span></div>') == {
        ("--text", "--surface"),
    }


def test_self_closing_element_emits_against_inherited_bg() -> None:
    assert _pairs('<div class="bg-surface"><input class="text-text" /></div>') == {
        ("--text", "--surface"),
    }


def test_empty_template_yields_no_pairs() -> None:
    assert _pairs("") == set()


# --- The non-tautology RED probes -------------------------------------------


def test_probe_muted_on_surface_is_ungated() -> None:
    # residual #3: text-text-muted on bg-surface renders ~4.35 (below AA) and is
    # NOT a gated RENDER_PAIRINGS row — so the real-template backstop would fire.
    pairs = _pairs('<div class="bg-surface"><p class="text-text-muted">x</p></div>')
    assert ("--text-muted", "--surface") in pairs
    assert ("--text-muted", "--surface") not in _GATED


def test_probe_rendered_ramp_key_is_ungated() -> None:
    # residual #4: a RENDERED ramp key (bg-surface-200 / text-text-500) is themed
    # but never a gated surface — the backstop flags it if one ever ships.
    pairs = _pairs('<div class="bg-surface-200"><p class="text-text-500">x</p></div>')
    assert ("--text-500", "--surface-200") in pairs
    assert ("--text-500", "--surface-200") not in _GATED
