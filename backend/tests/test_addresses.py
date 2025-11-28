import asyncio
from typing import Dict

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.main import app
from app.db.base import Base
from app.db.session import get_session
from app.services.auth import create_user, issue_tokens_for_user
from app.schemas.user import UserCreate


@pytest.fixture
def test_app() -> Dict[str, object]:
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    async def init_models() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    asyncio.run(init_models())

    async def override_get_session():
        async with SessionLocal() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session
    client = TestClient(app)
    yield {"client": client, "session_factory": SessionLocal}
    client.close()
    app.dependency_overrides.clear()


def auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def create_user_token(session_factory) -> str:
    async def create_and_token():
        async with session_factory() as session:
            user = await create_user(session, UserCreate(email="addr@example.com", password="addrpass", name="Addr"))
            return issue_tokens_for_user(user)["access_token"]

    return asyncio.run(create_and_token())


def test_address_validation(test_app: Dict[str, object]) -> None:
    client: TestClient = test_app["client"]  # type: ignore[assignment]
    SessionLocal = test_app["session_factory"]  # type: ignore[assignment]

    token = create_user_token(SessionLocal)

    valid_payload = {
        "label": "Home",
        "line1": "123 Main",
        "city": "Bucharest",
        "region": "IF",
        "postal_code": "010203",
        "country": "ro",
    }
    ok = client.post("/api/v1/me/addresses", json=valid_payload, headers=auth_headers(token))
    assert ok.status_code == 201, ok.text
    assert ok.json()["country"] == "RO"

    bad = client.post(
        "/api/v1/me/addresses",
        json={**valid_payload, "postal_code": "12", "country": "US"},
        headers=auth_headers(token),
    )
    assert bad.status_code == 400
