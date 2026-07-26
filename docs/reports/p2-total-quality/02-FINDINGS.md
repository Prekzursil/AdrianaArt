# momentstudio P2 — Findings Register

Append-only. Every finding needs: severity, evidence, repro, and a confidence band from
`almost-certain (90-99%) · likely (55-80%) · even (~50%) · unlikely (20-45%) · remote (1-10%)`.
`UNVERIFIED` tags sit **inline, adjacent to the claim** — never only in a trailing section.

Severity: **P0** data-loss/security/revenue-blocking · **P1** broken function · **P2** degraded UX/a11y ·
**P3** polish.

---

## F-001 — Alembic migration chain is Postgres-only; fails hard on SQLite

- **Severity:** P1 (blocks any non-Postgres environment; migrations are unverified outside PG)
- **Confidence:** almost-certain (90-99%) — observed executing.
- **Evidence:** `alembic upgrade head` against `sqlite+aiosqlite` aborts:
  `sqlalchemy.exc.OperationalError: (sqlite3.OperationalError) near "ALTER": syntax error`
  `[SQL: ALTER TABLE products ALTER COLUMN is_deleted DROP DEFAULT]`
  Same command against Postgres 16 in compose: **exit 0**.
- **Why it hid:** the entire backend test suite builds schema with `Base.metadata.create_all`,
  never by running migrations. So migration correctness has **no automated coverage at all** —
  a migration could be broken for Postgres too and CI would stay green.
- **Impact:** local/dev/test environments cannot use SQLite; more importantly the *migration chain
  itself is untested*, which is how production migrations break.
- **Proposed fix:** (a) make the offending ops dialect-aware (skip `DROP DEFAULT` on SQLite via
  `op.get_bind().dialect.name`), AND (b) add a CI job that runs `alembic upgrade head` +
  `downgrade` against a real Postgres service — testing the chain, not just the models.

## F-002 — Dev compose cannot exercise SSR, but production runs SSR

- **Severity:** P1 (an entire production rendering path had zero local or CI coverage)
- **Confidence:** almost-certain (90-99%) — read from both compose files.
- **Evidence:** `infra/docker-compose.yml` frontend → `frontend/Dockerfile` (nginx serving
  `dist/app/browser`, static SPA). `infra/prod/docker-compose.yml:155` frontend-ssr →
  `frontend/Dockerfile.ssr` (`node dist/app/server/main.js`). Confirmed at runtime: every route on
  `:4201` returned a byte-identical 10,525-byte shell (`<title>momentstudio</title>`), i.e. the SPA
  fallback, not server-rendered content.
- **Impact:** SEO (crawlers receive an empty shell), no-FOUC behavior, and the **P1a WU6 SSR
  head-inline theme sink** were all unverifiable locally and unexercised by `compose-smoke` CI.
- **Fix (applied this program):** added `infra/docker-compose.ssr.yml` + `infra/ssr-edge.conf` —
  a prod-faithful SSR stack on `:4202` (edge proxy mirrors prod Caddy routing: `/api/v1/*`→backend,
  `/*`→SSR node). Follow-up: extend `compose-smoke` CI to smoke the SSR variant too.

## F-003 — `/api/v1/openapi.json` times out (>10s, twice; also >3min via app import)

- **Severity:** P2 — **UNVERIFIED root cause**; the schema endpoint did not respond within 10s on two
  separate attempts, and importing `app.main` in a fresh process exceeded 3 minutes.
- **Confidence:** likely (55-80%) that something is genuinely slow (schema generation over a large
  route set, or import-time work); **UNVERIFIED** whether this affects normal request paths —
  `/api/v1/health` and `/docs` both returned 200 promptly, so the running server is healthy.
- **Settling experiment:** time `GET /openapi.json` inside the container with a 120s budget, and
  profile `python -X importtime -c "import app.main"` to separate import cost from schema cost.
- **Why it matters if real:** slow import-time work delays cold starts and worker restarts.

---

## Environment established (Phase 0) — verified facts for all agents

| Fact | Value |
|---|---|
| Static SPA (base compose) | `http://localhost:4201` — nginx, proxies `/api/v1/*` → backend |
| **SSR app (prod-faithful)** | `http://localhost:4202` — audit PRIMARY target |
| Backend | not host-published; reached via the proxies above. Internal `/api/v1/health` = 200 |
| DB | Postgres 16 (compose), migrated + seeded with `adrianaart` profile |
| Admin owner | `owner@local.test` / username `owner` (LOCAL throwaway, container-only DB) |
| Payments | `PAYMENTS_PROVIDER=mock` → checkout is safe to drive end-to-end |
| Login endpoint | `POST /api/v1/auth/login` → 200 verified |
