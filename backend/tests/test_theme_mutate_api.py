"""WU4b — theme draft-save / atomic publish / rollback / reset API + service tests.

Extends the WU4a read-surface tests with the MUTATE surface:

* ``PUT /theme/draft``   — server-revalidated draft save (WU2) + size cap.
* ``POST /theme/publish`` — atomic publish (promote draft → live) with the
  ``expected_version`` staleness 409 guard and server-side contrast 422 gate (B9).
* ``POST /theme/rollback/{version}`` — wholesale snapshot restore (404 on a
  forged / out-of-range version).
* ``POST /theme/reset-to-default`` — force-publish the seeded compiled defaults,
  audited, bypassing the staleness 409 (CB2).

Mirrors the ``test_theme_api.py`` per-test in-memory-SQLite app pattern
(``dependency_overrides[get_session]`` + ``TestClient`` + admin auth via
``role=admin`` + ``UserPasskey`` + ``X-Admin-Step-Up``) and seeds the WU1 default
theme through ``ensure_default_theme``.
"""

import asyncio
from typing import Dict

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.api.v1 import theme as theme_api
from app.core import security
from app.db.base import Base
from app.db.session import get_session
from app.main import app
from app.models.passkeys import UserPasskey
from app.models.theme import ThemeAuditLog, ThemeStatus, ThemeVersion
from app.models.user import UserRole
from app.schemas.user import UserCreate
from app.services import theme_contrast
from app.services.auth import create_user, issue_tokens_for_user
from app.services.theme_service import (
    MAX_TOKEN_COUNT,
    MAX_TOKEN_VALUE_LENGTH,
    default_theme_tokens,
    ensure_default_theme,
    get_draft,
    next_version,
    save_draft,
)


# --------------------------------------------------------------------------- #
# Harness (mirrors test_theme_api.py)
# --------------------------------------------------------------------------- #
def _make_session_factory(*, seed: bool) -> async_sessionmaker:
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    session_factory = async_sessionmaker(engine, expire_on_commit=False)

    async def _init() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        if seed:
            async with session_factory() as session:
                await ensure_default_theme(session)
                await session.commit()

    asyncio.run(_init())
    return session_factory


def _client_for(session_factory: async_sessionmaker) -> TestClient:
    async def override_get_session():
        async with session_factory() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session
    return TestClient(app)


@pytest.fixture(autouse=True)
def _clear_theme_rate_limit():
    # The in-memory rate-limit bucket is process-global; clear it around every
    # test so an earlier mutation test cannot exhaust the window for the next.
    theme_api.theme_mutation_rate_limit.buckets.clear()
    yield
    theme_api.theme_mutation_rate_limit.buckets.clear()


@pytest.fixture
def seeded_app() -> Dict[str, object]:
    session_factory = _make_session_factory(seed=True)
    client = _client_for(session_factory)
    yield {"client": client, "session_factory": session_factory}
    client.close()
    app.dependency_overrides.clear()


@pytest.fixture
def empty_app() -> Dict[str, object]:
    session_factory = _make_session_factory(seed=False)
    client = _client_for(session_factory)
    yield {"client": client, "session_factory": session_factory}
    client.close()
    app.dependency_overrides.clear()


def _auth_headers(token: str) -> dict[str, str]:
    headers = {"Authorization": f"Bearer {token}"}
    payload = security.decode_token(token)
    if payload and payload.get("sub"):
        headers["X-Admin-Step-Up"] = security.create_step_up_token(str(payload["sub"]))
    return headers


def _create_admin_token(session_factory: async_sessionmaker) -> str:
    async def _run() -> str:
        async with session_factory() as session:
            user = await create_user(
                session,
                UserCreate(
                    email="theme-admin@example.com",
                    password="themepassword",
                    name="Theme Admin",
                ),
            )
            user.role = UserRole.admin
            session.add(
                UserPasskey(
                    user_id=user.id,
                    name="Test Passkey",
                    credential_id=f"cred-{user.id}",
                    public_key=b"test",
                    sign_count=0,
                    backed_up=False,
                )
            )
            await session.commit()
            tokens = await issue_tokens_for_user(session, user)
            return tokens["access_token"]

    return asyncio.run(_run())


def _create_customer_token(session_factory: async_sessionmaker) -> str:
    async def _run() -> str:
        async with session_factory() as session:
            user = await create_user(
                session,
                UserCreate(
                    email="shopper@example.com",
                    password="shopperpass",
                    name="Shopper",
                ),
            )
            await session.commit()
            tokens = await issue_tokens_for_user(session, user)
            return tokens["access_token"]

    return asyncio.run(_run())


# A minimal draft that passes the WU2 validator AND WCAG-AA contrast.
VALID_DRAFT = {
    "--background": "255 255 255",
    "--text": "51 65 85",
    "--accent": "79 70 229",
}
# Individually-valid triplets whose text-on-background pairing FAILS AA (B9).
CONTRAST_BYPASS_DRAFT = {
    "--background": "255 255 255",
    "--text": "200 200 200",
}


def _published(client: TestClient) -> dict:
    resp = client.get("/api/v1/theme")
    assert resp.status_code == 200, resp.text
    return resp.json()


def _count(session_factory: async_sessionmaker, model, **filters) -> int:
    async def _run() -> int:
        async with session_factory() as session:
            stmt = select(func.count()).select_from(model)
            for key, value in filters.items():
                stmt = stmt.where(getattr(model, key) == value)
            return int(await session.scalar(stmt))

    return asyncio.run(_run())


# --------------------------------------------------------------------------- #
# PUT /theme/draft — authz + save + revalidation + size cap
# --------------------------------------------------------------------------- #
def test_put_draft_requires_auth(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    resp = client.put("/api/v1/theme/draft", json={"tokens": VALID_DRAFT})
    assert resp.status_code == 401, resp.text


def test_put_draft_rejects_customer(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_customer_token(factory)
    resp = client.put(
        "/api/v1/theme/draft",
        json={"tokens": VALID_DRAFT},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 403, resp.text


def test_put_draft_saves_and_is_readable(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)

    resp = client.put(
        "/api/v1/theme/draft",
        json={"tokens": VALID_DRAFT},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["status"] == "draft"
    assert body["tokens"]["--accent"] == "79 70 229"

    # The draft is now the current draft; a second read returns it.
    draft = client.get("/api/v1/theme/draft", headers=_auth_headers(token)).json()
    assert draft["status"] == "draft"
    assert draft["tokens"]["--text"] == "51 65 85"
    # A draft-save writes an append-only audit entry.
    assert _count(factory, ThemeAuditLog, action="draft-save") == 1


def test_put_draft_is_upserted_in_place(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)

    client.put(
        "/api/v1/theme/draft",
        json={"tokens": VALID_DRAFT},
        headers=_auth_headers(token),
    )
    second = {**VALID_DRAFT, "--accent": "12 34 56"}
    resp = client.put(
        "/api/v1/theme/draft", json={"tokens": second}, headers=_auth_headers(token)
    )
    assert resp.status_code == 200, resp.text
    # Singleton draft: still exactly one draft snapshot, updated in place.
    assert _count(factory, ThemeVersion, status=ThemeStatus.draft) == 1
    draft = client.get("/api/v1/theme/draft", headers=_auth_headers(token)).json()
    assert draft["tokens"]["--accent"] == "12 34 56"


def test_put_draft_rejects_invalid_token(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    # A CSS breakout value the WU2 validator hard-rejects.
    resp = client.put(
        "/api/v1/theme/draft",
        json={"tokens": {"--text": "15 23 42) } html{color:red}"}},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 422, resp.text
    assert "--text" in resp.json()["detail"]["invalid"]


def test_put_draft_rejects_unknown_key(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.put(
        "/api/v1/theme/draft",
        json={"tokens": {"--not-a-real-token": "1 2 3"}},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 422, resp.text


def test_put_draft_rejects_too_many_tokens(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    too_many = {f"--background-{i}": "1 2 3" for i in range(MAX_TOKEN_COUNT + 1)}
    resp = client.put(
        "/api/v1/theme/draft", json={"tokens": too_many}, headers=_auth_headers(token)
    )
    assert resp.status_code == 413, resp.text


def test_put_draft_rejects_oversized_value(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    huge = {"--text": "1" * (MAX_TOKEN_VALUE_LENGTH + 1)}
    resp = client.put(
        "/api/v1/theme/draft", json={"tokens": huge}, headers=_auth_headers(token)
    )
    assert resp.status_code == 413, resp.text


def test_put_draft_missing_theme_returns_404(empty_app: Dict[str, object]) -> None:
    client: TestClient = empty_app["client"]  # type: ignore[assignment]
    factory = empty_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.put(
        "/api/v1/theme/draft",
        json={"tokens": VALID_DRAFT},
        headers=_auth_headers(token),
    )
    assert resp.status_code == 404, resp.text


# --------------------------------------------------------------------------- #
# POST /theme/publish — atomic publish + staleness 409 + contrast 422
# --------------------------------------------------------------------------- #
def test_publish_requires_auth(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    resp = client.post("/api/v1/theme/publish", json={})
    assert resp.status_code == 401, resp.text


def test_publish_rejects_customer(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_customer_token(factory)
    resp = client.post("/api/v1/theme/publish", json={}, headers=_auth_headers(token))
    assert resp.status_code == 403, resp.text


def test_publish_promotes_draft_atomically(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    client.put("/api/v1/theme/draft", json={"tokens": VALID_DRAFT}, headers=headers)
    resp = client.post("/api/v1/theme/publish", json={}, headers=headers)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["status"] == "published"
    assert body["version"] == 2

    published = _published(client)
    assert published["version"] == 2
    assert published["tokens"]["--accent"] == "79 70 229"
    # No draft remains after publish (the draft was promoted in place).
    assert client.get("/api/v1/theme/draft", headers=headers).json()["status"] == (
        "published"
    )
    assert _count(factory, ThemeAuditLog, action="publish") == 1


def test_publish_no_draft_is_rejected(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.post("/api/v1/theme/publish", json={}, headers=_auth_headers(token))
    assert resp.status_code == 400, resp.text


def test_publish_missing_theme_returns_404(empty_app: Dict[str, object]) -> None:
    client: TestClient = empty_app["client"]  # type: ignore[assignment]
    factory = empty_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.post("/api/v1/theme/publish", json={}, headers=_auth_headers(token))
    assert resp.status_code == 404, resp.text


def test_publish_staleness_guard(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    client.put("/api/v1/theme/draft", json={"tokens": VALID_DRAFT}, headers=headers)
    stale = client.post(
        "/api/v1/theme/publish", json={"expected_version": 99}, headers=headers
    )
    assert stale.status_code == 409, stale.text

    fresh = client.post(
        "/api/v1/theme/publish", json={"expected_version": 1}, headers=headers
    )
    assert fresh.status_code == 200, fresh.text


def test_publish_server_contrast_rejects_bypass(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    # The draft-save accepts the individually-valid triplets (WU2 passes)...
    saved = client.put(
        "/api/v1/theme/draft",
        json={"tokens": CONTRAST_BYPASS_DRAFT},
        headers=headers,
    )
    assert saved.status_code == 200, saved.text
    # ...but the server-side contrast gate rejects the failing pairing on publish.
    resp = client.post("/api/v1/theme/publish", json={}, headers=headers)
    assert resp.status_code == 422, resp.text
    detail = resp.json()["detail"]
    failing_ids = {f["pairing"] for f in detail["failures"]}
    assert "text-on-background" in failing_ids
    first = detail["failures"][0]
    assert first["target"] == 4.5
    assert first["ratio"] < 4.5


# --------------------------------------------------------------------------- #
# POST /theme/rollback/{version}
# --------------------------------------------------------------------------- #
def test_rollback_restores_snapshot(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    # Publish a v2 that differs from the seeded v1 default.
    client.put("/api/v1/theme/draft", json={"tokens": VALID_DRAFT}, headers=headers)
    client.post("/api/v1/theme/publish", json={}, headers=headers)
    assert _published(client)["tokens"]["--accent"] == "79 70 229"

    # Roll back to v1 (the seeded default).
    resp = client.post("/api/v1/theme/rollback/1", json={}, headers=headers)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["status"] == "published"
    # A new published version is created carrying v1's tokens.
    assert body["version"] == 3
    assert body["tokens"] == default_theme_tokens()
    assert _published(client)["tokens"] == default_theme_tokens()
    assert _count(factory, ThemeAuditLog, action="rollback:1") == 1


def test_rollback_missing_theme_404(empty_app: Dict[str, object]) -> None:
    client: TestClient = empty_app["client"]  # type: ignore[assignment]
    factory = empty_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.post(
        "/api/v1/theme/rollback/1", json={}, headers=_auth_headers(token)
    )
    assert resp.status_code == 404, resp.text


def test_rollback_unknown_version_404(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.post(
        "/api/v1/theme/rollback/999", json={}, headers=_auth_headers(token)
    )
    assert resp.status_code == 404, resp.text


def test_rollback_requires_auth(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    resp = client.post("/api/v1/theme/rollback/1", json={})
    assert resp.status_code == 401, resp.text


def test_rollback_rejects_customer(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_customer_token(factory)
    resp = client.post(
        "/api/v1/theme/rollback/1", json={}, headers=_auth_headers(token)
    )
    assert resp.status_code == 403, resp.text


# --------------------------------------------------------------------------- #
# POST /theme/reset-to-default (CB2)
# --------------------------------------------------------------------------- #
def test_reset_to_default_force_publishes_defaults(
    seeded_app: Dict[str, object],
) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    # Move the store away from defaults first.
    client.put("/api/v1/theme/draft", json={"tokens": VALID_DRAFT}, headers=headers)
    client.post("/api/v1/theme/publish", json={}, headers=headers)
    assert _published(client)["tokens"] != default_theme_tokens()

    resp = client.post("/api/v1/theme/reset-to-default", json={}, headers=headers)
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["status"] == "published"
    assert body["tokens"] == default_theme_tokens()
    assert _published(client)["tokens"] == default_theme_tokens()
    assert _count(factory, ThemeAuditLog, action="reset-to-default") == 1


def test_reset_to_default_missing_theme_404(empty_app: Dict[str, object]) -> None:
    client: TestClient = empty_app["client"]  # type: ignore[assignment]
    factory = empty_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    resp = client.post(
        "/api/v1/theme/reset-to-default", json={}, headers=_auth_headers(token)
    )
    assert resp.status_code == 404, resp.text


def test_reset_requires_auth(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    resp = client.post("/api/v1/theme/reset-to-default", json={})
    assert resp.status_code == 401, resp.text


# --------------------------------------------------------------------------- #
# Rate limiting (reuses core/rate_limit.py)
# --------------------------------------------------------------------------- #
def test_mutation_rate_limit_trips(seeded_app: Dict[str, object]) -> None:
    client: TestClient = seeded_app["client"]  # type: ignore[assignment]
    factory = seeded_app["session_factory"]  # type: ignore[assignment]
    token = _create_admin_token(factory)
    headers = _auth_headers(token)

    limit = theme_api.THEME_MUTATION_RATE_LIMIT
    last = None
    for _ in range(limit + 1):
        last = client.put(
            "/api/v1/theme/draft", json={"tokens": VALID_DRAFT}, headers=headers
        )
    assert last is not None
    assert last.status_code == 429, last.text


# --------------------------------------------------------------------------- #
# Service-layer + theme_contrast.py branch coverage
# --------------------------------------------------------------------------- #
def test_next_version_on_empty_db() -> None:
    factory = _make_session_factory(seed=False)

    async def _run() -> None:
        async with factory() as session:
            assert await next_version(session) == 1

    asyncio.run(_run())


def test_save_draft_create_then_update_versions() -> None:
    factory = _make_session_factory(seed=True)

    async def _run() -> None:
        async with factory() as session:
            first = await save_draft(session, VALID_DRAFT, user_id=None)
            await session.commit()
            assert first.version == 2
            # Second save updates the SAME draft in place (singleton draft).
            second = await save_draft(
                session, {**VALID_DRAFT, "--accent": "12 34 56"}, user_id=None
            )
            await session.commit()
            assert second.version == 2
            draft = await get_draft(session)
            assert draft is not None
            assert draft.tokens["--accent"] == "12 34 56"

    asyncio.run(_run())


# ---- theme_contrast.py (faithful port of contrast.ts) --------------------- #
def test_contrast_relative_luminance_endpoints() -> None:
    assert theme_contrast.relative_luminance((0, 0, 0)) == 0.0
    assert theme_contrast.relative_luminance((255, 255, 255)) == pytest.approx(
        1.0, abs=1e-9
    )
    assert theme_contrast.relative_luminance((128, 128, 128)) == pytest.approx(
        0.2158, abs=1e-3
    )


def test_contrast_ratio_reference_values() -> None:
    assert theme_contrast.contrast_ratio((0, 0, 0), (255, 255, 255)) == pytest.approx(
        21.0, abs=1e-9
    )
    # Symmetric.
    assert theme_contrast.contrast_ratio((255, 255, 255), (0, 0, 0)) == pytest.approx(
        theme_contrast.contrast_ratio((0, 0, 0), (255, 255, 255)), abs=1e-9
    )
    # Identical colours → 1:1.
    assert theme_contrast.contrast_ratio((128, 128, 128), (128, 128, 128)) == (
        pytest.approx(1.0, abs=1e-9)
    )


def test_contrast_meets_and_passes_aa() -> None:
    assert theme_contrast.meets_aa(4.5, "body") is True
    assert theme_contrast.meets_aa(4.4999, "body") is False
    assert theme_contrast.meets_aa(3.0, "large") is True
    assert theme_contrast.meets_aa(2.9999, "large") is False
    # Mid-grey on white passes large (3:1) but fails body (4.5:1).
    assert theme_contrast.passes_aa((128, 128, 128), (255, 255, 255), "large") is True
    assert theme_contrast.passes_aa((128, 128, 128), (255, 255, 255), "body") is False


def test_parse_triplet_valid_and_invalid() -> None:
    assert theme_contrast.parse_triplet("15 23 42") == (15, 23, 42)
    with pytest.raises(ValueError):
        theme_contrast.parse_triplet("15 23")
    with pytest.raises(ValueError):
        theme_contrast.parse_triplet("a b c")


def test_validate_contrast_pass_fail_and_skips() -> None:
    # The seeded defaults pass every pairing.
    assert theme_contrast.validate_contrast(default_theme_tokens()) == []
    # A failing text-on-background pairing is reported.
    failures = theme_contrast.validate_contrast(CONTRAST_BYPASS_DRAFT)
    ids = {f.pairing for f in failures}
    assert "text-on-background" in ids
    # A missing endpoint token skips the pairing (no crash, no failure).
    assert theme_contrast.validate_contrast({"--text": "51 65 85"}) == []
    # A non-triplet (unparseable) endpoint value skips the pairing.
    assert (
        theme_contrast.validate_contrast(
            {"--text": "not a triplet", "--background": "255 255 255"}
        )
        == []
    )
