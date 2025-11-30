import logging
import time

from sqlalchemy import event
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

engine = create_async_engine(settings.database_url, future=True, echo=False, connect_args=connect_args)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, autoflush=False, class_=AsyncSession)

logger = logging.getLogger("app.db.slowquery")


@event.listens_for(engine.sync_engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    conn.info.setdefault("query_start_time", []).append(time.time())


@event.listens_for(engine.sync_engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
    start_time = conn.info.get("query_start_time", []).pop(-1) if conn.info.get("query_start_time") else None
    if start_time is None:
        return
    duration_ms = (time.time() - start_time) * 1000
    if duration_ms >= settings.slow_query_threshold_ms:
        logger.warning(
            "slow_query",
            extra={"duration_ms": int(duration_ms), "statement": statement, "params": str(parameters)[:500]},
        )


async def get_session() -> AsyncSession:
    """FastAPI dependency to provide a database session."""
    async with SessionLocal() as session:
        yield session
