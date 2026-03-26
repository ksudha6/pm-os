import pytest
import aiosqlite
from pathlib import Path
from httpx import ASGITransport, AsyncClient

from backend.src.main import app

SCHEMA_PATH = Path(__file__).parent.parent / "src" / "schema.sql"

DEFAULT_USER_ID = "default-user"
DEFAULT_USER_DISPLAY_NAME = "Default User"


async def _init_db(db_path: str) -> None:
    schema_sql = SCHEMA_PATH.read_text()
    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA journal_mode=WAL")
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.executescript(schema_sql)
        await conn.commit()


@pytest.fixture
async def seeded_client(tmp_path):
    db_path = str(tmp_path / "test.db")

    from backend.src.db import init_schema
    from backend.src.seed import seed_cases, seed_default_user

    await init_schema(db_path)
    await seed_cases(db_path)
    await seed_default_user(db_path)

    import backend.src.db as db_module

    original_path = db_module.DEFAULT_DB_PATH
    db_module.DEFAULT_DB_PATH = db_path

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c, db_path

    db_module.DEFAULT_DB_PATH = original_path


@pytest.mark.asyncio
async def test_default_user_exists_after_seed(tmp_path):
    db_path = str(tmp_path / "test.db")
    await _init_db(db_path)

    from backend.src.seed import seed_default_user

    await seed_default_user(db_path)

    async with aiosqlite.connect(db_path) as conn:
        cursor = await conn.execute(
            "SELECT id, display_name FROM users WHERE id = ?",
            (DEFAULT_USER_ID,),
        )
        row = await cursor.fetchone()

    assert row is not None, "default-user row must exist after seed_default_user"
    assert row[0] == DEFAULT_USER_ID
    assert row[1] == DEFAULT_USER_DISPLAY_NAME


@pytest.mark.asyncio
async def test_default_user_seed_is_idempotent(tmp_path):
    db_path = str(tmp_path / "test.db")
    await _init_db(db_path)

    from backend.src.seed import seed_default_user

    # Running twice must not raise and must result in exactly one row
    await seed_default_user(db_path)
    await seed_default_user(db_path)

    async with aiosqlite.connect(db_path) as conn:
        cursor = await conn.execute(
            "SELECT COUNT(*) FROM users WHERE id = ?",
            (DEFAULT_USER_ID,),
        )
        row = await cursor.fetchone()

    assert row[0] == 1, "Exactly one default-user row must exist after two seed calls"


@pytest.mark.asyncio
async def test_cors_preflight_returns_allow_origin_header(seeded_client):
    client, _ = seeded_client
    response = await client.options(
        "/api/v1/cases",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert "access-control-allow-origin" in response.headers, (
        "CORS preflight response must include access-control-allow-origin header"
    )
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
