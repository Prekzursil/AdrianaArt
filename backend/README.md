# Backend

FastAPI + PostgreSQL service with versioned API routing under `/api/v1`.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env  # update DATABASE_URL, SECRET_KEY, STRIPE_SECRET_KEY, SMTP_*, FRONTEND_ORIGIN as needed
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Key env vars:
- `SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXP_MINUTES`, `REFRESH_TOKEN_EXP_DAYS`
- `DATABASE_URL` (async driver, e.g., `postgresql+asyncpg://...`)
- `SMTP_*`, `FRONTEND_ORIGIN`
- `STRIPE_SECRET_KEY` (required for live payment flows), `STRIPE_WEBHOOK_SECRET` (if processing webhooks)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_ALLOWED_DOMAINS` (optional list) for Google OAuth

### Google OAuth quick notes
- Configure a Google OAuth client (Web) with authorized redirect URI matching `GOOGLE_REDIRECT_URI`.
- Set env vars above; allowed domains is optional for restricting enterprise domains.
- Flows: `/auth/google/start` for login, `/auth/google/callback` to exchange code; `/auth/google/link` and `/auth/google/unlink` for authenticated users (link requires password confirmation).

## Database and migrations

- Default `DATABASE_URL` uses async Postgres via `postgresql+asyncpg://...`.
- Alembic is configured for async migrations:

```bash
alembic upgrade head
alembic revision --autogenerate -m "describe change"  # after models exist
```

## Tests

```bash
pytest
```
