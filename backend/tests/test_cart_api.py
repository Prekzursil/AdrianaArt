import asyncio
from typing import Dict
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.main import app
from app.db.base import Base
from app.db.session import get_session
from app.models.catalog import Category, Product
from app.models.user import UserRole
from app.services.auth import create_user
from app.schemas.user import UserCreate


@pytest.fixture
def test_app() -> Dict[str, object]:
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    async def init_models() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    asyncio.get_event_loop().run_until_complete(init_models())

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


def create_user_token(session_factory, email="cart@example.com"):
    async def create_and_token():
        async with session_factory() as session:
            user = await create_user(session, UserCreate(email=email, password="cartpass", name="Cart User"))
            from app.services.auth import issue_tokens_for_user

            return issue_tokens_for_user(user)["access_token"], user.id

    return asyncio.get_event_loop().run_until_complete(create_and_token())


def seed_product(session_factory) -> UUID:
    async def seed():
        async with session_factory() as session:
            category = Category(slug="cups", name="Cups")
            product = Product(
                category=category,
                slug="cup",
                name="Cup",
                base_price=10,
                currency="USD",
                stock_quantity=5,
            )
            session.add_all([category, product])
            await session.commit()
            await session.refresh(product)
            return product.id

    return asyncio.get_event_loop().run_until_complete(seed())


def test_cart_crud_flow(test_app: Dict[str, object]) -> None:
    client: TestClient = test_app["client"]  # type: ignore[assignment]
    SessionLocal = test_app["session_factory"]  # type: ignore[assignment]

    token, user_id = create_user_token(SessionLocal)
    product_id = seed_product(SessionLocal)

    # Create/add item
    res = client.post(
        "/api/v1/cart/items",
        json={"product_id": str(product_id), "quantity": 2},
        headers=auth_headers(token),
    )
    assert res.status_code == 201, res.text
    item_id = res.json()["id"]

    # Fetch cart
    res = client.get("/api/v1/cart", headers=auth_headers(token))
    assert res.status_code == 200
    assert res.json()["items"][0]["quantity"] == 2

    # Update quantity
    res = client.patch(
        f"/api/v1/cart/items/{item_id}",
        json={"quantity": 3},
        headers=auth_headers(token),
    )
    assert res.status_code == 200
    assert res.json()["quantity"] == 3

    # Delete item
    res = client.delete(f"/api/v1/cart/items/{item_id}", headers=auth_headers(token))
    assert res.status_code == 204
    res = client.get("/api/v1/cart", headers=auth_headers(token))
    assert res.status_code == 200
    assert res.json()["items"] == []
