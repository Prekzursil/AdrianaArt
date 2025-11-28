from decimal import Decimal
from typing import Sequence
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.address import Address
from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem


async def build_order_from_cart(
    session: AsyncSession,
    user_id: UUID,
    cart: Cart,
    shipping_address_id: UUID | None,
    billing_address_id: UUID | None,
) -> Order:
    if not cart.items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty")

    total = Decimal("0.00")
    items: list[OrderItem] = []
    for item in cart.items:
        subtotal = Decimal(item.unit_price_at_add) * item.quantity
        total += subtotal
        items.append(
            OrderItem(
                product_id=item.product_id,
                variant_id=item.variant_id,
                quantity=item.quantity,
                unit_price=item.unit_price_at_add,
                subtotal=subtotal,
            )
        )

    order = Order(
        user_id=user_id,
        total_amount=total,
        currency="USD",
        shipping_address_id=shipping_address_id,
        billing_address_id=billing_address_id,
        items=items,
    )
    session.add(order)
    await session.commit()
    await session.refresh(order)
    return order


async def get_orders_for_user(session: AsyncSession, user_id: UUID) -> Sequence[Order]:
    result = await session.execute(
        select(Order)
        .where(Order.user_id == user_id)
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc())
    )
    return result.scalars().all()


async def get_order(session: AsyncSession, user_id: UUID, order_id: UUID) -> Order | None:
    result = await session.execute(
        select(Order)
            .where(Order.user_id == user_id, Order.id == order_id)
            .options(selectinload(Order.items))
    )
    return result.scalar_one_or_none()
