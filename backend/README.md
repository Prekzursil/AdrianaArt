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

## Tests

```bash
pytest
```
