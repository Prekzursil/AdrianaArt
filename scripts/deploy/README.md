# P1a theme deploy gate

The pre-deploy quality gate for the P1a theme foundation. Three **fail-loud**
sub-gates prove the theme system is safe to ship; a single run surfaces every
breach and exits non-zero if any sub-gate fails.

| # | Sub-gate | Entrypoint | Invariant |
|---|----------|-----------|-----------|
| 1 | migration consistency | `theme_migration_consistency.py` | `0159` is the single head, applies cleanly on a fresh DB, and models produce **no autogenerate diff** |
| 2 | security lane | `../quality/theme_security_lane.sh` (WU13) | the adversarial sink/authz regression suite (`backend/tests/security`) actually runs and passes |
| 3 | themed-render smoke | `theme_render_smoke.py` | the default theme renders a **complete, injection-safe** `<style>` block injected into `<head>` |

Orchestrator: **`p1a_theme_gate.sh`** runs all three (does not short-circuit) and
prints one `SUCCESS:` marker per sub-gate plus a final `SUCCESS: p1a-theme-gate`.

## Run locally

```bash
# whole gate (uses ~/ms-be-venv, or set PYTHON=/path/to/python)
bash scripts/deploy/p1a_theme_gate.sh

# individual sub-gates
python scripts/deploy/theme_migration_consistency.py
bash   scripts/quality/theme_security_lane.sh
python scripts/deploy/theme_render_smoke.py

# gate self-tests — STRICT 100% line+branch on the gate modules
coverage run --rcfile=scripts/deploy/.coveragerc -m pytest scripts/deploy/tests
coverage report --rcfile=scripts/deploy/.coveragerc --fail-under=100
```

## How each sub-gate FAILS LOUD

Each check raises a `GateFailure` with a diagnostic message, the CLI prints
`FAILED:<id>` to **stderr** and exits **1**, and the orchestrator/CI job goes red.

**1. Migration consistency** (`theme_migration_consistency.py`)
- **Two heads / wrong head** → `check_single_head` fails: un-merged migration
  branches shipped, or `0159` is no longer the tip.
- **Migration does not apply** → `verify_tables_present` fails: a theme table is
  missing after `upgrade()`.
- **Seed missing / wrong** → `verify_default_seed` fails: no singleton *published*
  v1 default row (a fresh deploy would render unstyled).
- **Model changed without a migration** → `check_models_match_migration` fails:
  `compare_metadata` (scoped to the theme tables) returns a non-empty diff. Add a
  `Theme.new_col` to the model without touching `0159` and this gate goes red with
  the exact `add_column` op printed.

  *Dialect note.* The check runs on in-memory SQLite (the repo's DB-test
  convention) and compares the migrated schema against `Base.metadata` on the
  **same dialect**, so it is free of cross-dialect (UUID-vs-VARCHAR) false
  positives. `compare_type=False` is deliberate — the migration intentionally
  renders `postgresql.UUID` as `sa.String` on non-Postgres backends, so a type
  comparison would false-positive; the **structural** diff (tables, columns,
  nullability, FKs, indexes) is the drift signal. See the *Postgres complement*
  below for the full-schema autogenerate check.

**2. Security lane** (`theme_security_lane.sh`)
- Any regression in the WU13 sink revalidator or theme authz (the 6-bypass saga)
  makes `pytest backend/tests/security` fail → the sub-gate fails. Delete a sink
  guard and this lane goes red.

**3. Themed-render smoke** (`theme_render_smoke.py`)
- **Incomplete render** → `check_render_complete` fails: a primary or derived
  token is missing/empty (a fresh deploy would render partially unstyled).
- **Unsafe value** → `check_values_injection_safe` fails: a rendered value would
  break out of the `<style>` block (checked with the real WU2 `encode_css_safe`).
- **Malformed / mis-injected `<style>`** → `check_style_tag_wellformed` /
  `check_injected_into_head` fail: the tag is not a single `:root{…}` block or is
  not placed inside `<head>` (SSR would FOUC / render un-themed).

## How it slots into the quality pipeline

The repo's required check is **`quality / quality`** (`.github/workflows/quality.yml`),
a thin caller of the shared reusable workflow on the `quality-zero-platform`
template branch (`Prekzursil/quality-zero-platform/.github/workflows/reusable-quality.yml@v1`).
**That reusable workflow is owned by another repo and is NOT edited here.**

This gate is **additive**: a NEW in-repo workflow,
[`.github/workflows/theme-deploy-gate.yml`](../../.github/workflows/theme-deploy-gate.yml),
runs on every PR/push to `main` alongside `quality / quality`. Wire it in by:

1. **Add `theme-deploy-gate / theme-deploy-gate` as a required status context** in
   branch protection for `main`, next to `quality / quality`. Both must be green to
   merge.
2. **Gate deploys on it.** The workflow exposes `workflow_call`, so
   `deploy-production-manual.yml` can add it as a `needs:`/called job so a manual
   production deploy cannot proceed unless all three theme sub-gates pass.

Coverage boundary: the gate modules live under `scripts/deploy/` — **outside**
`backend/app`, which is the lean gate's coverage scope — so they do not dilute the
`quality / quality` 100% number. Their own strict 100% line+branch coverage is
enforced by the gate's self-test step (`scripts/deploy/.coveragerc`).

## Postgres complement (full-schema autogenerate, advisory)

Sub-gate 1 is scoped to the theme tables and dialect-safe by construction. The
natural full-schema complement is a real Alembic autogenerate check on Postgres —
the repo already runs `alembic upgrade head` against a Postgres service in the
`backend-postgres` job (`.github/workflows/backend.yml`). Appending `alembic check`
there (after `upgrade head`) gives a whole-tree "no model is un-migrated" gate on
the real dialect. It is left advisory here because it asserts over **all** models,
not just P1a's theme tables; validate it against the current tree before promoting
it to a required check.
