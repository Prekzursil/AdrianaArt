"""Full-branch tests for the themed-render smoke sub-gate.

Covers the real default-theme render happy path AND every FAIL-LOUD branch:
incomplete map, empty value, injection-unsafe value, malformed style tag, and
a tag not injected inside ``<head>`` (all three inject fallbacks included).
"""

from __future__ import annotations

import pytest

from scripts.deploy import theme_render_smoke as mod


# --- run() / main(): the real end-to-end happy path -------------------------


def test_run_returns_token_count():
    count = mod.run()
    # 13 editable defaults + 14 derived = 27 effective tokens.
    assert count == len(mod.required_token_names())
    assert count > 0


def test_main_success_returns_zero(capsys):
    assert mod.main() == 0
    assert "SUCCESS: themed-render-smoke" in capsys.readouterr().out


def test_main_failure_returns_one(monkeypatch, capsys):
    def _boom() -> int:
        raise mod.GateFailure("boom render")

    monkeypatch.setattr(mod, "run", _boom)
    assert mod.main() == 1
    err = capsys.readouterr().err
    assert "FAILED: themed-render-smoke" in err
    assert "boom render" in err


# --- real seams resolve --------------------------------------------------------


def test_effective_default_tokens_covers_required():
    tokens = mod.effective_default_tokens()
    assert mod.required_token_names() <= set(tokens)


# --- _ensure_backend_on_path: both branches ---------------------------------


def test_ensure_backend_on_path_inserts_then_idempotent():
    import sys

    backend = str(mod.BACKEND_DIR)
    original = list(sys.path)
    try:
        sys.path[:] = [p for p in sys.path if p != backend]
        mod._ensure_backend_on_path()  # not-present branch: inserts
        assert backend in sys.path
        snapshot = list(sys.path)
        mod._ensure_backend_on_path()  # already-present branch: no change
        assert list(sys.path) == snapshot
    finally:
        sys.path[:] = original


# --- check_render_complete: happy + missing + empty -------------------------


def test_check_render_complete_happy():
    mod.check_render_complete({"--a": "1", "--b": "2"}, {"--a", "--b"})


def test_check_render_complete_missing():
    with pytest.raises(mod.GateFailure, match="complete token map"):
        mod.check_render_complete({"--a": "1"}, {"--a", "--b"})


def test_check_render_complete_empty_value():
    with pytest.raises(mod.GateFailure, match="empty value"):
        mod.check_render_complete({"--a": "  "}, {"--a"})


# --- check_values_injection_safe: happy + unsafe ----------------------------


def test_check_values_injection_safe_happy():
    mod.check_values_injection_safe({"--background": "255 255 255"})


def test_check_values_injection_safe_rejects_breakout():
    with pytest.raises(mod.GateFailure, match="CSS-unsafe"):
        mod.check_values_injection_safe({"--evil": "red;} body{display:none"})


# --- build_theme_css / build_style_tag --------------------------------------


def test_build_theme_css_sorted_deterministic():
    css = mod.build_theme_css({"--b": "2", "--a": "1"})
    assert css == ":root{--a: 1;--b: 2;}"


def test_build_style_tag():
    tag = mod.build_style_tag(":root{--a: 1;}")
    assert tag == '<style id="ms-theme">:root{--a: 1;}</style>'


# --- inject_theme_head: all three branches ----------------------------------


def test_inject_theme_head_after_head_open():
    out = mod.inject_theme_head("<html><head><base></head></html>", "<TAG>")
    assert out == "<html><head><TAG><base></head></html>"


def test_inject_theme_head_before_head_close_when_no_open():
    out = mod.inject_theme_head("prefix</head>suffix", "<TAG>")
    assert out == "prefix<TAG></head>suffix"


def test_inject_theme_head_prepend_when_no_head():
    out = mod.inject_theme_head("plain document", "<TAG>")
    assert out == "<TAG>plain document"


# --- check_style_tag_wellformed: happy + malformed + not-single-block -------


def test_check_style_tag_wellformed_happy():
    mod.check_style_tag_wellformed('<style id="ms-theme">:root{--a: 1;}</style>')


def test_check_style_tag_wellformed_bad_wrapper():
    with pytest.raises(mod.GateFailure, match="malformed"):
        mod.check_style_tag_wellformed('<style id="other">:root{}</style>')


def test_check_style_tag_wellformed_not_single_root_block():
    with pytest.raises(mod.GateFailure, match="single ':root"):
        mod.check_style_tag_wellformed('<style id="ms-theme">no-root-here</style>')


# --- check_injected_into_head: happy + no-head + not-inside -----------------


def test_check_injected_into_head_happy():
    mod.check_injected_into_head("<html><head></head></html>", "<TAG>")


def test_check_injected_into_head_no_head():
    with pytest.raises(mod.GateFailure, match="no <head>"):
        mod.check_injected_into_head("<html><body></body></html>", "<TAG>")


def test_check_injected_into_head_tag_outside_head():
    # A regressed injector that puts the tag AFTER </head> must be caught.
    def _broken_inject(html: str, style_tag: str) -> str:
        return html + style_tag

    with pytest.raises(mod.GateFailure, match="not injected inside <head>"):
        mod.check_injected_into_head(
            "<html><head></head></html>", "<TAG>", inject=_broken_inject
        )
