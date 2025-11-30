import os
import pytest
from sqlalchemy.ext.asyncio import create_async_engine


@pytest.mark.skipif(not os.getenv("POSTGRES_TEST_URL"), reason="POSTGRES_TEST_URL not set")
def test_connect_temp_postgres():
    url = os.environ["POSTGRES_TEST_URL"]
    engine = create_async_engine(url, future=True)

    async def _run():
        async with engine.connect() as conn:
            result = await conn.execute("SELECT 1")
            assert result.scalar_one() == 1
        await engine.dispose()

    import asyncio

    asyncio.run(_run())
