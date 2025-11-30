from typing import Any, cast

import stripe
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.cart import Cart

stripe = cast(Any, stripe)


def init_stripe() -> None:
    stripe.api_key = settings.stripe_secret_key


async def create_payment_intent(session: AsyncSession, cart: Cart) -> str:
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Stripe not configured")
    if not cart.items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty")

    init_stripe()
    amount_cents = int(sum(float(item.unit_price_at_add) * item.quantity for item in cart.items) * 100)
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount_cents,
            currency="usd",
            metadata={"cart_id": str(cart.id), "user_id": str(cart.user_id) if cart.user_id else ""},
        )
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc

    client_secret = getattr(intent, "client_secret", None)
    if not client_secret:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Stripe client secret missing")
    return str(client_secret)


async def handle_webhook_event(payload: bytes, sig_header: str | None) -> dict:
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Webhook secret not set")
    init_stripe()
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, settings.stripe_webhook_secret)
    except Exception as exc:  # broad for Stripe signature errors
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payload") from exc
    return event


async def capture_payment_intent(intent_id: str) -> dict:
    """Capture an authorized PaymentIntent."""
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Stripe not configured")
    init_stripe()
    try:
        return stripe.PaymentIntent.capture(intent_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc


async def void_payment_intent(intent_id: str) -> dict:
    """Cancel/void a PaymentIntent that has not been captured."""
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Stripe not configured")
    init_stripe()
    try:
        return stripe.PaymentIntent.cancel(intent_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
