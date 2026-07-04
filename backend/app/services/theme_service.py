"""Theme document service — default-seed + (later WUs) resolve/save.

WU1 lands only the idempotent default-seed helper. ``ensure_default_theme`` is
the single reusable seed path invoked BOTH at FastAPI startup (so every
environment — including the ``create_all`` test app that never runs migrations —
has the row) AND inside the Alembic migration (which imports the same compiled
defaults for its ``sa.text`` INSERT). This guarantees a published default theme
under both the real-migration path and the test ``create_all`` path.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from app.db.session import SessionLocal
from app.models.theme import Theme, ThemeStatus, ThemeVersion
from app.services import audit_chain as audit_chain_service
from app.services import theme_contrast
from app.services.theme_validation import validate_token

logger = logging.getLogger("app.services.theme")

# The theme-doc schema version stamped on every theme/snapshot from the first
# write. The runtime upcaster is deferred to P2; P1a only needs the FIELD.
DEFAULT_SCHEMA_VERSION = 1

# Size caps for a mutating save (defence-in-depth alongside the WU2 validator):
# a theme doc is a small, curated token map — reject an oversized payload before
# it reaches storage. MAX_TOKEN_COUNT comfortably clears the base vocabulary plus
# the server-emitted colour ramp + spacing scale; MAX_TOKEN_VALUE_LENGTH bounds a
# single token value (a clamp() expression is the longest legitimate value).
MAX_TOKEN_COUNT = 128
MAX_TOKEN_VALUE_LENGTH = 256


def default_theme_tokens() -> dict[str, str]:
    """Complete canonical compiled-default token set (== ``styles.css`` :root light).

    The single ``compiled_defaults`` source: EVERY renderable storefront token, in
    the frozen WU0 §4 wire format (Tailwind-consumed colors as bare ``R G B``
    triplets, curated-enum font-family stacks, numeric+unit sizes/spacing). It is
    exactly the light ``:root`` block of ``frontend/src/styles.css`` and the WU2
    token registry (``theme_validation._BASE_TOKENS`` + the ``--space-*`` ramp), so
    a fresh deploy renders identically to today AND every default value passes the
    WU2 validator.

    Three reconciliations vs the incomplete WU1 seed — all REQUIRED by WU4b's
    effective-set contrast gate (which merges an absent token from HERE, so this
    must be the full renderable set and every value must be registry-valid):

    * The WU5 role/state tokens (``--surface-muted``/-raised,
      ``--surface-inverse-hover``, ``--field``, ``--background-subtle``,
      ``--text-secondary``/-strong/-inverse/-onmedia, ``--border-muted``/-strong/
      -inverse, ``--accent-strong``/-subtle) + the ``--space-*`` scale are now
      present — they are live in ``:root`` and the registry; an absent one would
      have contrast-fallen-back to the wrong value at the gate.
    * ``--font-body`` / ``--font-heading`` carry their full curated-enum stack (the
      only form the WU2 ``FONT_FAMILY_ALLOWLIST`` accepts); the bare
      ``Inter`` / ``Cinzel`` WU1 seed was not a registry member and could never
      have round-tripped a save.
    * ``--shadow-color`` is DROPPED as spurious — it is absent from the WU2
      registry, ``token-taxonomy.ts``, and ``:root``. ``styles.css``
      ``.shadow-soft`` derives elevation from ``rgb(var(--text-heading) / 8%)``
      (slate-900 — faithful to the original ``rgb(15 23 42 / 8%)`` because
      ``--text-heading`` defaults to ``15 23 42``), so there is no
      ``--shadow-color`` consumer to seed and nothing to reconcile in ``styles.css``.
    """

    return {
        # Tailwind-consumed colors — bare R G B triplets (light :root; WU0 §1A/§4).
        "--background": "255 255 255",
        "--background-subtle": "248 250 252",
        "--surface": "241 245 249",
        "--surface-muted": "248 250 252",
        "--surface-raised": "226 232 240",
        "--surface-inverse": "15 23 42",
        "--surface-inverse-hover": "30 41 59",
        "--field": "255 255 255",
        "--overlay": "0 0 0",
        "--text": "51 65 85",
        "--text-secondary": "71 85 105",
        "--text-muted": "100 116 139",
        "--text-strong": "30 41 59",
        "--text-heading": "15 23 42",
        "--text-inverse": "255 255 255",
        "--text-onmedia": "255 255 255",
        "--border": "226 232 240",
        "--border-muted": "226 232 240",
        "--border-strong": "203 213 225",
        "--border-inverse": "15 23 42",
        "--accent": "79 70 229",
        "--accent-strong": "55 48 163",
        "--accent-subtle": "238 242 255",
        # Fonts — curated-enum family stacks (WU2 FONT_FAMILY_ALLOWLIST members).
        "--font-body": "Inter, system-ui, -apple-system, sans-serif",
        "--font-heading": "Cinzel, ui-serif, Georgia, serif",
        # Type scale — numeric clamp driving the :root font-size.
        "--font-size-base": "clamp(15px, 1.2vw + 12px, 18px)",
        # Spacing scale — numeric+unit (storefront-scoped --space-* aliases).
        "--space-xs": "0.5rem",
        "--space-sm": "0.75rem",
        "--space-md": "1rem",
        "--space-lg": "1.5rem",
        "--space-xl": "2rem",
    }


def compiled_defaults() -> dict[str, str]:
    """The canonical compiled-default set the SSR sink renders absent tokens from.

    A thin alias of :func:`default_theme_tokens` under the name the WU4b publish /
    rollback contrast gate reads: the gate merges the submitted (possibly partial)
    tokens OVER this set so no pairing is ever skipped for an absent endpoint.
    """

    return default_theme_tokens()


async def ensure_default_theme(session: AsyncSession) -> Theme:
    """Idempotently seed the singleton default theme + its v1 snapshot.

    Existence-checked (mirrors the idempotent seeds in ``0039``/``0045``/
    ``0077``/``0135`` — NOT the non-idempotent ``0017`` INSERT): if any theme
    row exists, return it unchanged; otherwise create the published default
    plus its version-1 snapshot. Callers own the surrounding transaction/commit.
    """

    existing = (await session.execute(select(Theme).limit(1))).scalar_one_or_none()
    if existing is not None:
        return existing

    now = datetime.now(timezone.utc)
    theme = Theme(
        schema_version=DEFAULT_SCHEMA_VERSION,
        tokens=default_theme_tokens(),
        status=ThemeStatus.published,
        version=1,
        published_at=now,
    )
    session.add(theme)
    await session.flush()

    snapshot = ThemeVersion(
        theme_id=theme.id,
        version=1,
        schema_version=DEFAULT_SCHEMA_VERSION,
        tokens=default_theme_tokens(),
        status=ThemeStatus.published,
        created_by_user_id=None,
        published_at=now,
    )
    session.add(snapshot)
    await session.flush()
    return theme


async def seed_default_theme_on_startup(
    session_factory: async_sessionmaker[AsyncSession] = SessionLocal,
) -> bool:
    """Seed the default theme at FastAPI startup, tolerant of an unmigrated DB.

    Production runs Alembic migrations before the app boots, so the ``themes``
    table exists and the idempotent :func:`ensure_default_theme` lands the
    default row. In an environment where the theme schema is not yet present
    (e.g. a bare app harness that never ran migrations), the seed is SKIPPED —
    migrations own schema creation — rather than crashing startup. Returns
    ``True`` when the row was ensured, ``False`` when the seed was skipped.
    """

    async with session_factory() as session:
        try:
            await ensure_default_theme(session)
            await session.commit()
        except SQLAlchemyError:
            await session.rollback()
            logger.warning(
                "skipping default-theme seed: theme schema not available "
                "(migrations own schema creation)"
            )
            return False
    return True


@dataclass(frozen=True)
class ResolvedTheme:
    """Read-only projection of a theme document for the resolve/read API.

    Uniform shape for a resolved theme regardless of whether it originated from
    the singleton :class:`Theme` row (published/live) or a :class:`ThemeVersion`
    snapshot (draft), so the WU4a read endpoints serialize one consistent
    schema.
    """

    tokens: dict[str, str]
    version: int
    schema_version: int
    status: ThemeStatus
    published_at: datetime | None
    updated_at: datetime | None


def _resolved_from_theme(theme: Theme) -> ResolvedTheme:
    return ResolvedTheme(
        tokens=dict(theme.tokens),
        version=theme.version,
        schema_version=theme.schema_version,
        status=theme.status,
        published_at=theme.published_at,
        updated_at=theme.updated_at,
    )


def _resolved_from_version(snapshot: ThemeVersion) -> ResolvedTheme:
    return ResolvedTheme(
        tokens=dict(snapshot.tokens),
        version=snapshot.version,
        schema_version=snapshot.schema_version,
        status=snapshot.status,
        published_at=snapshot.published_at,
        updated_at=snapshot.created_at,
    )


async def resolve_published_tokens(session: AsyncSession) -> ResolvedTheme | None:
    """Return the current published (live/SSR) theme, or ``None`` if none exists.

    The storefront is a single global theme (singleton :class:`Theme` row); the
    published document is what ``server.ts`` reads at request time (WU6). Returns
    ``None`` when no published theme is present so the SSR consumer can fall back
    to compiled defaults (WU6) rather than fail.
    """

    theme = (
        await session.execute(
            select(Theme)
            .where(Theme.status == ThemeStatus.published)
            .order_by(Theme.version.desc())
            .limit(1)
        )
    ).scalar_one_or_none()
    if theme is None:
        return None
    return _resolved_from_theme(theme)


async def get_draft(session: AsyncSession) -> ResolvedTheme | None:
    """Return the current editable draft for the admin theme editor.

    The theme is a single global draft per store (plan §WU1/B7). Returns the
    latest ``draft`` snapshot when one has been saved (WU4b ``PUT /theme/draft``);
    before any draft exists, falls back to the published baseline so the editor
    always opens on the live document. ``None`` only when neither exists.
    """

    draft = (
        await session.execute(
            select(ThemeVersion)
            .where(ThemeVersion.status == ThemeStatus.draft)
            .order_by(ThemeVersion.version.desc())
            .limit(1)
        )
    ).scalar_one_or_none()
    if draft is not None:
        return _resolved_from_version(draft)
    return await resolve_published_tokens(session)


async def list_versions(session: AsyncSession) -> list[ThemeVersion]:
    """Return the theme version history, newest first.

    The browsable list the WU12 preview-before-restore flow and the WU4b
    rollback endpoint consume.
    """

    result = await session.execute(
        select(ThemeVersion).order_by(ThemeVersion.version.desc())
    )
    return list(result.scalars().all())


# --------------------------------------------------------------------------- #
# WU4b — mutate surface: draft-save / atomic publish / rollback / reset
# --------------------------------------------------------------------------- #
async def next_version(session: AsyncSession) -> int:
    """Return the next monotonic version number across all theme snapshots."""
    current = await session.scalar(select(func.max(ThemeVersion.version)))
    return (current or 0) + 1


async def _get_singleton_theme(session: AsyncSession) -> Theme | None:
    return (await session.execute(select(Theme).limit(1))).scalar_one_or_none()


async def _latest_draft_version(session: AsyncSession) -> ThemeVersion | None:
    return (
        await session.execute(
            select(ThemeVersion)
            .where(ThemeVersion.status == ThemeStatus.draft)
            .order_by(ThemeVersion.version.desc())
            .limit(1)
        )
    ).scalar_one_or_none()


def _revalidate_tokens(tokens: dict[str, str]) -> dict[str, str]:
    """Server-side WU2 revalidation — never trust the client.

    Returns the accepted token map, or raises 413 (oversized) / 422 (any token
    failing the closed name registry / per-type value allowlist / CSS-safe
    encoder). A theme mutation never persists a value the shared validator
    rejects.
    """
    if len(tokens) > MAX_TOKEN_COUNT:
        raise HTTPException(
            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
            detail=f"Too many tokens (max {MAX_TOKEN_COUNT})",
        )
    invalid: list[str] = []
    accepted: dict[str, str] = {}
    for name, value in tokens.items():
        if len(value) > MAX_TOKEN_VALUE_LENGTH:
            raise HTTPException(
                status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                detail=f"Token value too long (max {MAX_TOKEN_VALUE_LENGTH})",
            )
        result = validate_token(name, value)
        if not result.ok:
            invalid.append(name)
        else:
            accepted[name] = result.value
    if invalid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail={"error": "invalid-tokens", "invalid": invalid},
        )
    return accepted


async def save_draft(
    session: AsyncSession, tokens: dict[str, str], *, user_id: UUID | None
) -> ResolvedTheme:
    """Save the singleton draft: revalidate (WU2) → upsert snapshot → audit.

    The theme is a single global draft (B7), so a save UPDATES the one existing
    draft snapshot in place when present, else creates it. Either way it stamps
    ``created_by_user_id`` and writes an append-only ``draft-save`` audit entry
    on the same hash-chain (brief §8: every theme-change recorded), in one commit.
    """
    theme = await _get_singleton_theme(session)
    if theme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    accepted = _revalidate_tokens(tokens)

    draft = await _latest_draft_version(session)
    if draft is None:
        draft = ThemeVersion(
            theme_id=theme.id,
            version=await next_version(session),
            schema_version=theme.schema_version,
            tokens=accepted,
            status=ThemeStatus.draft,
            created_by_user_id=user_id,
            published_at=None,
        )
        session.add(draft)
    else:
        draft.tokens = accepted
        draft.created_by_user_id = user_id
    await session.flush()

    await audit_chain_service.add_theme_audit_log(
        session,
        theme_version_id=draft.id,
        action="draft-save",
        version=draft.version,
        user_id=user_id,
    )
    await session.commit()
    return _resolved_from_version(draft)


def _apply_published(
    theme: Theme, snapshot: ThemeVersion, tokens: dict[str, str], now: datetime
) -> None:
    """Point the singleton at a published snapshot's tokens (in-txn pointer flip)."""
    theme.tokens = dict(tokens)
    theme.version = snapshot.version
    theme.status = ThemeStatus.published
    theme.published_at = now


def _reject_failing_contrast(tokens: dict[str, str]) -> None:
    """Raise 422 if any pairing fails WCAG AA over the EFFECTIVE rendered set (B9).

    The gate runs over :func:`compiled_defaults` MERGED-UNDER the submitted tokens
    (submitted overrides default) — the exact set the SSR sink renders, where an
    absent token falls back to its compiled default. Validating only the submitted
    subset would SKIP every pairing whose other endpoint was omitted, letting a
    partial draft publish e.g. grey-on-white that fails AA at render. So the gate
    is authoritative over the effective set, never the raw subset.
    """
    effective = {**compiled_defaults(), **tokens}
    failures = theme_contrast.validate_contrast(effective)
    if not failures:
        return
    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        detail={
            "error": "contrast",
            "failures": [
                {
                    "pairing": f.pairing,
                    "foreground": f.foreground,
                    "background": f.background,
                    "ratio": round(f.ratio, 4),
                    "target": f.target,
                    "size": f.size,
                }
                for f in failures
            ],
        },
    )


async def publish(
    session: AsyncSession, *, user_id: UUID | None, expected_version: int | None
) -> ResolvedTheme:
    """Atomically publish the current draft (mirrors ``content.upsert_block``).

    Promotes the singleton draft to published in one transaction: the
    ``expected_version`` staleness guard (409, reusing content.py's mechanism),
    the server-side contrast gate over the EFFECTIVE default-merged set (422, B9),
    the pointer flip, and the append-only audit write all commit together —
    all-or-nothing.
    """
    theme = await _get_singleton_theme(session)
    if theme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    if expected_version is not None and theme.version != expected_version:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                f"Theme has changed (expected version {expected_version}, "
                f"found {theme.version})"
            ),
        )
    draft = await _latest_draft_version(session)
    if draft is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No draft changes to publish",
        )
    _reject_failing_contrast(dict(draft.tokens))

    now = datetime.now(timezone.utc)
    draft.status = ThemeStatus.published
    draft.published_at = now
    _apply_published(theme, draft, draft.tokens, now)
    await session.flush()
    await audit_chain_service.add_theme_audit_log(
        session,
        theme_version_id=draft.id,
        action="publish",
        version=draft.version,
        user_id=user_id,
    )
    await session.commit()
    return _resolved_from_version(draft)


async def _publish_snapshot(
    session: AsyncSession,
    theme: Theme,
    tokens: dict[str, str],
    *,
    action: str,
    user_id: UUID | None,
) -> ResolvedTheme:
    """Force-publish ``tokens`` as a NEW published snapshot (rollback / reset)."""
    now = datetime.now(timezone.utc)
    snapshot = ThemeVersion(
        theme_id=theme.id,
        version=await next_version(session),
        schema_version=theme.schema_version,
        tokens=dict(tokens),
        status=ThemeStatus.published,
        created_by_user_id=user_id,
        published_at=now,
    )
    session.add(snapshot)
    _apply_published(theme, snapshot, tokens, now)
    await session.flush()
    await audit_chain_service.add_theme_audit_log(
        session,
        theme_version_id=snapshot.id,
        action=action,
        version=snapshot.version,
        user_id=user_id,
    )
    await session.commit()
    return _resolved_from_version(snapshot)


async def rollback(
    session: AsyncSession, version: int, *, user_id: UUID | None
) -> ResolvedTheme:
    """Wholesale-restore a prior PUBLISHED snapshot as a new published one (R4-B9).

    Two hard guards close the rollback-bypass hole:

    * The target must be a ``status == published`` snapshot. A draft or unknown
      ``version`` is a hard 404 — you can only restore something that was itself
      gated and shipped, never promote an ungated draft by rolling "back" to it.
    * The restored tokens are re-run through the contrast gate over the effective
      default-merged set before force-publishing (defence-in-depth: a snapshot
      that predates the gate, or was tampered with at rest, cannot go live failing
      WCAG AA). ``reset_to_default`` legitimately skips this — its defaults are the
      known-safe set — but an arbitrary snapshot must not.
    """
    theme = await _get_singleton_theme(session)
    if theme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    target = (
        await session.execute(
            select(ThemeVersion)
            .where(ThemeVersion.version == version)
            .where(ThemeVersion.status == ThemeStatus.published)
            .limit(1)
        )
    ).scalar_one_or_none()
    if target is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme version not found"
        )
    _reject_failing_contrast(dict(target.tokens))
    return await _publish_snapshot(
        session, theme, target.tokens, action=f"rollback:{version}", user_id=user_id
    )


async def reset_to_default(
    session: AsyncSession, *, user_id: UUID | None
) -> ResolvedTheme:
    """Panic reset (CB2): force-publish the seeded compiled defaults, audited.

    Runs the full audited publish path (snapshot → pointer flip → append-only
    ``reset-to-default`` audit → single commit) but BYPASSES the staleness 409 —
    a reset from a broken/stale view must never fail on a stale-version check. The
    compiled defaults are the known-safe set, so the contrast gate is a no-op and
    is not re-run here.
    """
    theme = await _get_singleton_theme(session)
    if theme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found"
        )
    return await _publish_snapshot(
        session,
        theme,
        default_theme_tokens(),
        action="reset-to-default",
        user_id=user_id,
    )
