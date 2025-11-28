from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PromoCodeCreate(BaseModel):
    code: str = Field(min_length=3, max_length=40)
    percentage_off: float | None = Field(default=None, ge=0, le=100)
    amount_off: float | None = Field(default=None, ge=0)
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    expires_at: datetime | None = None
    max_uses: int | None = Field(default=None, ge=1)


class PromoCodeRead(PromoCodeCreate):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    times_used: int
    active: bool
    created_at: datetime
