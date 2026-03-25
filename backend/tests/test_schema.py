import pytest
import aiosqlite
from pathlib import Path

SCHEMA_PATH = Path(__file__).parent.parent / "src" / "schema.sql"

EXPECTED_TABLES = {
    "users",
    "case_studies",
    "attempts",
    "eval_scores",
    "evaluations",
    "user_progress",
}


async def init_test_db(db_path: str) -> None:
    schema_sql = SCHEMA_PATH.read_text()
    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA journal_mode=WAL")
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.executescript(schema_sql)
        await conn.commit()


@pytest.mark.asyncio
async def test_schema_creates_all_tables(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    async with aiosqlite.connect(db_path) as conn:
        cursor = await conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
        rows = await cursor.fetchall()
        table_names = {row[0] for row in rows}

    assert EXPECTED_TABLES == table_names, (
        f"Expected tables {EXPECTED_TABLES}, got {table_names}"
    )


@pytest.mark.asyncio
async def test_wal_mode(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    async with aiosqlite.connect(db_path) as conn:
        cursor = await conn.execute("PRAGMA journal_mode")
        row = await cursor.fetchone()

    assert row[0] == "wal"


@pytest.mark.asyncio
async def test_foreign_key_enforcement(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO attempts (id, user_id, case_study_id) VALUES (?, ?, ?)",
                ("attempt-1", "nonexistent-user", "nonexistent-case"),
            )
            await conn.commit()


@pytest.mark.asyncio
async def test_eval_scores_unique_constraint(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    user_id = "user-1"
    case_id = "case-1"
    attempt_id = "attempt-1"

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.execute(
            "INSERT INTO users (id, display_name) VALUES (?, ?)",
            (user_id, "Test User"),
        )
        await conn.execute(
            "INSERT INTO case_studies (id, title, prompt, case_type, difficulty, context, time_limit, primary_skill_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (case_id, "Test Case", "Test prompt", "product_strategy", "staff", "B2B", 45, 1),
        )
        await conn.execute(
            "INSERT INTO attempts (id, user_id, case_study_id) VALUES (?, ?, ?)",
            (attempt_id, user_id, case_id),
        )
        await conn.execute(
            "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
            ("es-1", attempt_id, "dim-1", 3, "llm"),
        )
        await conn.commit()

        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
                ("es-2", attempt_id, "dim-1", 4, "llm"),
            )
            await conn.commit()


@pytest.mark.asyncio
async def test_eval_scores_both_sources_allowed(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    user_id = "user-1"
    case_id = "case-1"
    attempt_id = "attempt-1"

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.execute(
            "INSERT INTO users (id, display_name) VALUES (?, ?)",
            (user_id, "Test User"),
        )
        await conn.execute(
            "INSERT INTO case_studies (id, title, prompt, case_type, difficulty, context, time_limit, primary_skill_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (case_id, "Test Case", "Test prompt", "product_strategy", "staff", "B2B", 45, 1),
        )
        await conn.execute(
            "INSERT INTO attempts (id, user_id, case_study_id) VALUES (?, ?, ?)",
            (attempt_id, user_id, case_id),
        )
        await conn.execute(
            "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
            ("es-1", attempt_id, "dim-1", 3, "llm"),
        )
        await conn.execute(
            "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
            ("es-2", attempt_id, "dim-1", 4, "self"),
        )
        await conn.commit()

        cursor = await conn.execute(
            "SELECT id, source FROM eval_scores WHERE attempt_id = ? AND dimension_id = ? ORDER BY source",
            (attempt_id, "dim-1"),
        )
        rows = await cursor.fetchall()

    assert len(rows) == 2, "Both 'llm' and 'self' rows must coexist for the same attempt+dimension"
    sources = {row[1] for row in rows}
    assert sources == {"llm", "self"}


@pytest.mark.asyncio
async def test_difficulty_check_constraint(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    async with aiosqlite.connect(db_path) as conn:
        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO case_studies (id, title, prompt, case_type, difficulty, context, time_limit, primary_skill_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                ("case-1", "Test", "Prompt", "product_strategy", "invalid", "B2B", 45, 1),
            )
            await conn.commit()


@pytest.mark.asyncio
async def test_score_range_constraint(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    user_id = "user-1"
    case_id = "case-1"
    attempt_id = "attempt-1"

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.execute(
            "INSERT INTO users (id, display_name) VALUES (?, ?)",
            (user_id, "Test User"),
        )
        await conn.execute(
            "INSERT INTO case_studies (id, title, prompt, case_type, difficulty, context, time_limit, primary_skill_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (case_id, "Test Case", "Test prompt", "product_strategy", "staff", "B2B", 45, 1),
        )
        await conn.execute(
            "INSERT INTO attempts (id, user_id, case_study_id) VALUES (?, ?, ?)",
            (attempt_id, user_id, case_id),
        )
        await conn.commit()

        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
                ("es-1", attempt_id, "dim-1", 0, "llm"),
            )
            await conn.commit()

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
                ("es-2", attempt_id, "dim-1", 6, "llm"),
            )
            await conn.commit()


@pytest.mark.asyncio
async def test_user_progress_unique_constraint(tmp_path):
    db_path = str(tmp_path / "test.db")
    await init_test_db(db_path)

    user_id = "user-1"
    skill_id = 1

    async with aiosqlite.connect(db_path) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        await conn.execute(
            "INSERT INTO users (id, display_name) VALUES (?, ?)",
            (user_id, "Test User"),
        )
        await conn.execute(
            "INSERT INTO user_progress (id, user_id, skill_id) VALUES (?, ?, ?)",
            ("up-1", user_id, skill_id),
        )
        await conn.commit()

        with pytest.raises(aiosqlite.IntegrityError):
            await conn.execute(
                "INSERT INTO user_progress (id, user_id, skill_id) VALUES (?, ?, ?)",
                ("up-2", user_id, skill_id),
            )
            await conn.commit()
