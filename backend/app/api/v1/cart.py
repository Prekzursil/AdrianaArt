from uuid import UUID

import uuid
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user_optional
from app.db.session import get_session
from app.schemas.cart import CartItemCreate, CartItemRead, CartItemUpdate, CartRead
from app.services import cart as cart_service

router = APIRouter(prefix="/cart", tags=["cart"])


def session_header(x_session_id: str | None = Header(default=None)) -> str | None:
    return x_session_id


@router.get("", response_model=CartRead)
async def get_cart(
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user_optional),
    session_id: str | None = Depends(session_header),
):
    if not current_user and not session_id:
        session_id = f"guest-{uuid.uuid4()}"
    cart = await cart_service.get_cart(session, getattr(current_user, "id", None) if current_user else None, session_id)
    await session.refresh(cart)
    if session_id and not cart.session_id:
        cart.session_id = session_id
        session.add(cart)
        await session.commit()
        await session.refresh(cart)
    return cart


@router.post("/items", response_model=CartItemRead, status_code=status.HTTP_201_CREATED)
async def add_item(
    payload: CartItemCreate,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user_optional),
    session_id: str | None = Depends(session_header),
):
    if not current_user and not session_id:
        session_id = f"guest-{uuid.uuid4()}"
    cart = await cart_service.get_cart(session, getattr(current_user, "id", None) if current_user else None, session_id)
    return await cart_service.add_item(session, cart, payload)


@router.patch("/items/{item_id}", response_model=CartItemRead)
async def update_item(
    item_id: UUID,
    payload: CartItemUpdate,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user_optional),
    session_id: str | None = Depends(session_header),
):
    cart = await cart_service.get_cart(session, getattr(current_user, "id", None) if current_user else None, session_id)
    return await cart_service.update_item(session, cart, item_id, payload)


@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    item_id: UUID,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user_optional),
    session_id: str | None = Depends(session_header),
):
    cart = await cart_service.get_cart(session, getattr(current_user, "id", None) if current_user else None, session_id)
    await cart_service.delete_item(session, cart, item_id)
    return None


@router.post("/merge", response_model=CartRead)
async def merge_guest_cart(
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user_optional),
    session_id: str | None = Depends(session_header),
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Auth required to merge guest cart")
    user_cart = await cart_service.get_cart(session, current_user.id, None)
    merged_cart = await cart_service.merge_guest_cart(session, user_cart, session_id)
    return merged_cart
