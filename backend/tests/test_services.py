import asyncio
from decimal import Decimal
from typing import Dict

import pytest
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.db.base import Base
from app.models.cart import Cart, CartItem
from app.models.catalog import Category, Product
from app.services import auth as auth_service
from app.services import cart as cart_service
from app.services import order as order_service
from app.schemas.user import UserCreate
from app.models.user import UserRole
from app.schemas.order import ShippingMethodCreate
from app.services import email as email_service


@pytest.fixture
def session_factory() -> async_sessionmaker:
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    async def init_models() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    asyncio.run(init_models())
    return SessionLocal


def test_auth_reset_token_service(session_factory: async_sessionmaker):
    async def _run():
        async with session_factory() as session:
            user = await auth_service.create_user(session, UserCreate(email="svc@example.com", password="svcpass1", name="Svc"))
            reset = await auth_service.create_reset_token(session, user.email, expires_minutes=30)
            assert reset.token
            await auth_service.confirm_reset_token(session, reset.token, "newpasssvc")
            refreshed = await auth_service.authenticate_user(session, "svc@example.com", "newpasssvc")
            assert refreshed.email == "svc@example.com"

    asyncio.run(_run())


def test_order_build_from_cart_and_email_stubs(session_factory: async_sessionmaker, monkeypatch: pytest.MonkeyPatch):
    async def _run():
        async with session_factory() as session:
            category = Category(slug="svc-cat", name="Svc")
            product = Product(
                category=category,
                slug="svc-prod",
                sku="SVC-001",
                name="Svc Product",
                base_price=Decimal("10.00"),
                currency="USD",
                stock_quantity=5,
            )
            cart = Cart(user_id=None)
            cart.items = [CartItem(product=product, quantity=2, unit_price_at_add=Decimal("10.00"))]
            session.add(cart)
            await session.commit()
            await session.refresh(cart)

            sent = {"count": 0}

            async def fake_send(to_email, order, items=None):
                sent["count"] += 1
                return True

            monkeypatch.setattr(email_service, "send_order_confirmation", fake_send)

            order = await order_service.build_order_from_cart(session, user_id=product.id, cart=cart, shipping_address_id=None, billing_address_id=None, shipping_method=None)  # type: ignore[arg-type]
            assert order.total_amount == Decimal("22.00")
            await email_service.send_order_confirmation("svc@example.com", order, order.items)
            assert sent["count"] == 1

    asyncio.run(_run())
