from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.dependencies import get_current_user
from app.db.session import get_session
from app.models.cart import Cart
from app.services import payments

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/intent", status_code=status.HTTP_200_OK)
async def create_payment_intent(
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    result = await session.execute(
        select(Cart).options(selectinload(Cart.items)).where(Cart.user_id == current_user.id)
    )
    cart = result.scalar_one_or_none()
    if not cart:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart not found")
    client_secret = await payments.create_payment_intent(session, cart)
    return {"client_secret": client_secret}


@router.post("/webhook", status_code=status.HTTP_200_OK)
async def stripe_webhook(request: Request, stripe_signature: str | None = Header(default=None)) -> dict:
    payload = await request.body()
    event = await payments.handle_webhook_event(payload, stripe_signature)
    # Order status updates would occur here based on event["type"]
    return {"received": True, "type": event.get("type")}
