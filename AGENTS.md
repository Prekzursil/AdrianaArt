# AGENTS.md

## Operating Model
This repository follows an evidence-first, zero-external-API-cost workflow.
Use GitHub Copilot coding agent and Codex app/IDE/CLI for implementation and review.

## Existing Audit Pipeline
This repository already has advanced audit/evidence workflows.
Do not duplicate them. Extend and reuse existing audit contracts instead.

## Risk Policy
- Default merge policy: human-reviewed only.
- Use explicit risk labels: `risk:low`, `risk:medium`, `risk:high`.
- Payments/auth/security-sensitive changes require explicit rollback notes and human sign-off.

## Canonical Verification Command
Run this command before completion claims:

```bash
make verify
```

## Scope Guardrails
- Keep changes minimal and task-focused.
- Preserve storefront/account/admin shell boundaries.
- Avoid broad refactors unless explicitly requested.

## Agent Queue Contract
- Intake issues via `.github/ISSUE_TEMPLATE/agent_task.yml`.
- Queue work by adding `agent:ready`.
- Queue workflow posts execution packet and notifies `@copilot`.

## Queue Trigger Warning
Applying label `agent:ready` triggers the queue workflow immediately.

## Local Dev (truth as of 2026-08-19)
- **Node 24** is required (`/.nvmrc`). Node 22 breaks `npm ci` against `frontend/package-lock.json`. Put Node 24 ahead of any `/exec-daemon/node` shim.
- **Postgres is required** for the app and Alembic. Migrations use Postgres-only SQL (`ALTER COLUMN ... DROP DEFAULT`). SQLite is a pytest engine only (`sqlite+aiosqlite:///:memory:`), not a supported app/migrate path.
- `./start.sh` / `make dev` / `start.bat` start FastAPI (`127.0.0.1:8000`) and `ng serve` with `frontend/proxy.conf.cjs`. `/api` and `/media` proxy to `DEV_API_TARGET` (default `http://127.0.0.1:8000`). Do not skip the proxy or point the browser at the API origin.
- Open the app as **http://localhost:4200** (not `http://127.0.0.1:4200`) so CORS/`FRONTEND_ORIGIN` match.
- `http-proxy-middleware` is not pinned to v3 in `overrides`. webpack-dev-server 5 ships HPM 2; forcing HPM 3 produced `Missing target` on `ng serve --proxy-config`.
