"""Pydantic response schemas for the theme resolve/read API (WU4a)."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.theme import ThemeStatus


class ThemeTokensRead(BaseModel):
    """A resolved theme document (published or draft) exposed to consumers."""

    model_config = ConfigDict(from_attributes=True)

    tokens: dict[str, str]
    version: int
    schema_version: int
    status: ThemeStatus
    published_at: datetime | None = None
    updated_at: datetime | None = None


class ThemeVersionListItem(BaseModel):
    """One entry in the browsable theme version history."""

    model_config = ConfigDict(from_attributes=True)

    version: int
    schema_version: int
    status: ThemeStatus
    created_by_user_id: UUID | None = None
    published_at: datetime | None = None
    created_at: datetime


class ThemeVersionListResponse(BaseModel):
    """Wrapper for the version-history list (newest first)."""

    items: list[ThemeVersionListItem] = Field(default_factory=list)


class ThemeDraftSaveRequest(BaseModel):
    """Admin draft-save body: the full token map to revalidate + snapshot (WU4b)."""

    tokens: dict[str, str]


class ThemePublishRequest(BaseModel):
    """Atomic-publish body carrying the optimistic-concurrency guard (WU4b).

    ``expected_version`` mirrors ``content.py``'s staleness guard: when supplied
    and it no longer matches the live version, the publish is rejected 409 so a
    stale editor cannot silently clobber a concurrent change.
    """

    expected_version: int | None = None


class ContrastFailureItem(BaseModel):
    """One pairing that failed the server-side WCAG-AA gate on publish (B9)."""

    pairing: str
    foreground: str
    background: str
    ratio: float
    target: float
    size: str
