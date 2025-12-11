# Local Dev with Docker

This repo ships with a docker-compose stack for the API, Postgres, and the Angular frontend.

## Prerequisites
- Docker and docker-compose installed.
- Copy `.env.example` to `.env` in both `backend/` and `frontend/` and adjust values as needed.
  - For Docker, set `API_BASE_URL=http://backend:8000/api/v1` in `frontend/.env`.

## Run the stack
```bash
cd infra
docker-compose up --build
```

Services:
- `backend`: FastAPI on http://localhost:8000 (proxied by frontend).
- `frontend`: Built Angular app served on http://localhost:4200.
- `db`: Postgres on localhost:5432 (username/password/db: postgres).

## Frontend config
- Angular reads env via `scripts/generate-config.mjs` before start/build/test.
- Dev server proxy (`proxy.conf.json`) forwards `/api` to `http://localhost:8000`.
- The Docker image serves the built app with `http-server` and proxies API calls to `http://backend:8000/api/v1`.

## Stripe webhooks (optional)
If you need webhooks in Docker, run a tunnel (e.g., `stripe listen --forward-to localhost:8000/api/v1/payments/webhook`) and update backend env vars accordingly.

## Useful commands
- Stop stack: `docker-compose down`
- Rebuild frontend after env change: `docker-compose build frontend`
