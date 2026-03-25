from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncIterator

import aiosqlite

DEFAULT_DB_PATH = "data/pm-os.db"

_SCHEMA_PATH = Path(__file__).parent / "schema.sql"


async def init_schema(path: str = DEFAULT_DB_PATH) -> None:
    # Reads and executes schema.sql, enabling WAL mode before table creation.
    schema_sql = _SCHEMA_PATH.read_text()
    async with aiosqlite.connect(path) as conn:
        await conn.execute("PRAGMA journal_mode=WAL")
        await conn.executescript(schema_sql)
        await conn.commit()


@asynccontextmanager
async def get_db(path: str | None = None) -> AsyncIterator[aiosqlite.Connection]:
    # WAL mode allows concurrent readers alongside a single writer.
    # row_factory enables dict-like access on query results.
    # foreign_keys is per-connection in SQLite and must be set each time.
    # path defaults to None so callers resolve the current DEFAULT_DB_PATH at call time.
    resolved = path if path is not None else DEFAULT_DB_PATH
    async with aiosqlite.connect(resolved) as conn:
        await conn.execute("PRAGMA journal_mode=WAL")
        await conn.execute("PRAGMA foreign_keys = ON")
        conn.row_factory = aiosqlite.Row
        yield conn
