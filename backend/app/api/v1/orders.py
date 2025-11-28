from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.dependencies import get_current_user
from app.db.session import get_session
from app.models.address import Address
from app.models.cart import Cart
from app.schemas.order import OrderRead
from app.services import order as order_service

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
async def create_order(
    shipping_address_id: UUID | None,
    billing_address_id: UUID | None,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    cart_result = await session.execute(
        select(Cart).options(selectinload(Cart.items)).where(Cart.user_id == current_user.id)
    )
    cart = cart_result.scalar_one_or_none()
    if not cart or not cart.items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty")

    for address_id in [shipping_address_id, billing_address_id]:
        if address_id:
            addr = await session.get(Address, address_id)
            if not addr or addr.user_id != current_user.id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid address")

    order = await order_service.build_order_from_cart(
        session,
        current_user.id,
        cart,
        shipping_address_id,
        billing_address_id,
    )
    return order


@router.get("", response_model=list[OrderRead])
async def list_orders(current_user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    orders = await order_service.get_orders_for_user(session, current_user.id)
    return list(orders)


@router.get("/{order_id}", response_model=OrderRead)
async def get_order(order_id: UUID, current_user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    order = await order_service.get_order(session, current_user.id, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order
