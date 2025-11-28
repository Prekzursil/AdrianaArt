from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.cart import Cart, CartItem
from app.models.catalog import Product, ProductVariant
from app.schemas.cart import CartItemCreate, CartItemUpdate


async def _get_or_create_cart(session: AsyncSession, user_id: UUID | None, session_id: str | None) -> Cart:
    if user_id:
        result = await session.execute(select(Cart).where(Cart.user_id == user_id))
        cart = result.scalar_one_or_none()
        if cart:
            return cart
    if session_id:
        result = await session.execute(select(Cart).where(Cart.session_id == session_id))
        cart = result.scalar_one_or_none()
        if cart:
            return cart
    cart = Cart(user_id=user_id, session_id=session_id)
    session.add(cart)
    await session.commit()
    await session.refresh(cart)
    return cart


async def get_cart(session: AsyncSession, user_id: UUID | None, session_id: str | None) -> Cart:
    return await _get_or_create_cart(session, user_id, session_id)


async def _validate_stock(product: Product, variant: ProductVariant | None, quantity: int) -> None:
    stock = variant.stock_quantity if variant else product.stock_quantity
    if quantity > stock:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient stock")


async def add_item(
    session: AsyncSession,
    cart: Cart,
    payload: CartItemCreate,
) -> CartItem:
    product = await session.get(Product, payload.product_id)
    if not product or product.is_deleted or not product.is_active:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    variant = None
    if payload.variant_id:
        variant = await session.get(ProductVariant, payload.variant_id)
        if not variant or variant.product_id != product.id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid variant")

    await _validate_stock(product, variant, payload.quantity)

    unit_price = Decimal(product.base_price)
    if variant:
        unit_price += Decimal(variant.additional_price_delta)

    item = CartItem(
        cart=cart,
        product_id=product.id,
        variant_id=variant.id if variant else None,
        quantity=payload.quantity,
        unit_price_at_add=unit_price,
    )
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


async def update_item(session: AsyncSession, cart: Cart, item_id: UUID, payload: CartItemUpdate) -> CartItem:
    result = await session.execute(select(CartItem).where(CartItem.id == item_id, CartItem.cart_id == cart.id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")

    product = await session.get(Product, item.product_id)
    variant = await session.get(ProductVariant, item.variant_id) if item.variant_id else None
    await _validate_stock(product, variant, payload.quantity)

    item.quantity = payload.quantity
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


async def delete_item(session: AsyncSession, cart: Cart, item_id: UUID) -> None:
    result = await session.execute(select(CartItem).where(CartItem.id == item_id, CartItem.cart_id == cart.id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    await session.delete(item)
    await session.commit()
