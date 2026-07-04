"""Theme resolve/read API (WU4a).

The server-authoritative read surface for the storefront theme: the published
document (public/SSR consumer) plus the admin-only draft and version history.
Mirrors ``content.py`` conventions (``APIRouter`` + ``Depends(get_session)`` +
``require_admin_section``). The mutate surface (draft-save / publish / rollback)
lands in WU4b.
"""

from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_session, require_admin_section
from app.core.rate_limit import limiter
from app.models.user import User
from app.schemas.theme import (
    ThemeDraftSaveRequest,
    ThemePublishRequest,
    ThemeTokensRead,
    ThemeVersionListItem,
    ThemeVersionListResponse,
)
from app.services import theme_service

router = APIRouter(prefix="/theme", tags=["theme"])

# Per-process rate limit on the mutating theme routes (draft-save / publish /
# rollback / reset), reusing the in-repo limiter (core/rate_limit.py) rather than
# hand-rolling one. A theme mutation is an infrequent admin action, so a modest
# per-minute cap is ample and blunts a scripted-abuse / DoS lever.
THEME_MUTATION_RATE_LIMIT = 30
theme_mutation_rate_limit = limiter("theme:mutate", THEME_MUTATION_RATE_LIMIT, 60)


def _to_read(resolved: theme_service.ResolvedTheme) -> ThemeTokensRead:
    return ThemeTokensRead(
        tokens=resolved.tokens,
        version=resolved.version,
        schema_version=resolved.schema_version,
        status=resolved.status,
        published_at=resolved.published_at,
        updated_at=resolved.updated_at,
    )


@router.get("", response_model=ThemeTokensRead)
async def get_published_theme(
    session: AsyncSession = Depends(get_session),
) -> ThemeTokensRead:
    """Current published tokens — public/SSR consumer (no auth)."""
    resolved = await theme_service.resolve_published_tokens(session)
    if resolved is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    return _to_read(resolved)


@router.get("/draft", response_model=ThemeTokensRead)
async def get_theme_draft(
    session: AsyncSession = Depends(get_session),
    _: User = Depends(require_admin_section("theme")),
) -> ThemeTokensRead:
    """Current editable draft (admin only)."""
    resolved = await theme_service.get_draft(session)
    if resolved is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    return _to_read(resolved)


@router.get("/versions", response_model=ThemeVersionListResponse)
async def list_theme_versions(
    session: AsyncSession = Depends(get_session),
    _: User = Depends(require_admin_section("theme")),
) -> ThemeVersionListResponse:
    """Browsable version history, newest first (admin only)."""
    versions = await theme_service.list_versions(session)
    return ThemeVersionListResponse(
        items=[ThemeVersionListItem.model_validate(v) for v in versions]
    )


# --------------------------------------------------------------------------- #
# WU4b — mutate surface (admin only; rate-limited; server-revalidated)
# --------------------------------------------------------------------------- #
@router.put("/draft", response_model=ThemeTokensRead)
async def save_theme_draft(
    payload: ThemeDraftSaveRequest,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(require_admin_section("theme")),
    _rate: None = Depends(theme_mutation_rate_limit),
) -> ThemeTokensRead:
    """Save the draft — server-revalidated (WU2) + size-capped, then audited."""
    resolved = await theme_service.save_draft(session, payload.tokens, user_id=user.id)
    return _to_read(resolved)


@router.post("/publish", response_model=ThemeTokensRead)
async def publish_theme(
    payload: ThemePublishRequest,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(require_admin_section("theme")),
    _rate: None = Depends(theme_mutation_rate_limit),
) -> ThemeTokensRead:
    """Atomically publish the draft (staleness 409 + server contrast 422)."""
    resolved = await theme_service.publish(
        session, user_id=user.id, expected_version=payload.expected_version
    )
    return _to_read(resolved)


@router.post("/rollback/{version}", response_model=ThemeTokensRead)
async def rollback_theme(
    version: int = Path(..., ge=1),
    session: AsyncSession = Depends(get_session),
    user: User = Depends(require_admin_section("theme")),
    _rate: None = Depends(theme_mutation_rate_limit),
) -> ThemeTokensRead:
    """Wholesale-restore a prior PUBLISHED version (404 on a draft / forged id)."""
    resolved = await theme_service.rollback(session, version, user_id=user.id)
    return _to_read(resolved)


@router.post("/reset-to-default", response_model=ThemeTokensRead)
async def reset_theme_to_default(
    session: AsyncSession = Depends(get_session),
    user: User = Depends(require_admin_section("theme")),
    _rate: None = Depends(theme_mutation_rate_limit),
) -> ThemeTokensRead:
    """Panic reset to the seeded compiled defaults (audited; bypasses 409)."""
    resolved = await theme_service.reset_to_default(session, user_id=user.id)
    return _to_read(resolved)
