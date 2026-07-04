#!/usr/bin/env bash
# P1a theme deploy gate — the pre-deploy quality gate for the theme foundation.
#
# Runs the three P1a theme sub-gates in sequence. EACH sub-gate FAILS LOUD (its
# own non-zero exit + a `FAILED:<id>` marker on stderr); this orchestrator runs
# ALL of them (does not short-circuit) so a single run surfaces every breach,
# then exits non-zero if ANY failed. A green run prints one `SUCCESS:` marker per
# sub-gate plus a final `SUCCESS: p1a-theme-gate`.
#
#   1. theme-migration-consistency  — 0159 is the single head, applies cleanly on
#      a fresh DB, and models produce NO autogenerate diff (model/migration drift
#      guard).                       [scripts/deploy/theme_migration_consistency.py]
#   2. theme-security-lane          — WU13's adversarial theme suite (sink +
#      authz regression net) actually RUNS; any regression fails the gate.
#                                      [scripts/quality/theme_security_lane.sh]
#   3. themed-render-smoke          — the default theme renders a complete,
#      injection-safe token map and the SSR <style> is built + injected into
#      <head>.                        [scripts/deploy/theme_render_smoke.py]
#
# Slots into the repo quality pipeline ALONGSIDE the required `quality / quality`
# check as its own required status context (see scripts/deploy/README.md); it does
# NOT modify the shared reusable workflow on the quality-zero-platform repo.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Prefer the project backend venv, then an explicit PYTHON override, then python3.
if [[ -n "${PYTHON:-}" ]]; then
  PY="${PYTHON}"
elif [[ -x "${HOME}/ms-be-venv/Scripts/python.exe" ]]; then
  PY="${HOME}/ms-be-venv/Scripts/python.exe"
elif [[ -x "${HOME}/ms-be-venv/bin/python" ]]; then
  PY="${HOME}/ms-be-venv/bin/python"
else
  PY="python3"
fi

# WU13's theme_security_lane.sh invokes a bare `python`; make it resolve to the
# same interpreter this gate selected by prepending that interpreter's dir to PATH
# (the security lane is INVOKED unchanged — not edited — per the WU15 file scope).
if [[ "${PY}" == */* ]]; then
  PY_DIR="$(cd "$(dirname "${PY}")" 2>/dev/null && pwd || true)"
  if [[ -n "${PY_DIR}" ]]; then
    export PATH="${PY_DIR}:${PATH}"
  fi
fi

failures=0

run_gate() {
  local id="$1"
  shift
  echo "== ${id} =="
  if "$@"; then
    return 0
  fi
  echo "FAILED:${id}" >&2
  failures=$((failures + 1))
}

run_gate "theme-migration-consistency" \
  "${PY}" "${SCRIPT_DIR}/theme_migration_consistency.py"

run_gate "theme-security-lane" \
  bash "${REPO_ROOT}/scripts/quality/theme_security_lane.sh"

run_gate "themed-render-smoke" \
  "${PY}" "${SCRIPT_DIR}/theme_render_smoke.py"

if [[ "${failures}" -ne 0 ]]; then
  echo "FAILED:p1a-theme-gate (${failures} sub-gate(s) failed)" >&2
  exit 1
fi

echo "SUCCESS: p1a-theme-gate (all sub-gates passed)"
