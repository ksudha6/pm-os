import pytest
from httpx import ASGITransport, AsyncClient

from backend.src.main import app

TEST_USER_ID = "test-user"
TEST_CASE_ID = "cs_1_1"


@pytest.fixture
async def client(tmp_path):
    db_path = str(tmp_path / "test.db")

    from backend.src.db import get_db, init_schema
    from backend.src.seed import seed_cases

    await init_schema(db_path)
    await seed_cases(db_path)

    async with get_db(db_path) as conn:
        await conn.execute(
            "INSERT INTO users (id, display_name) VALUES (?, ?)",
            (TEST_USER_ID, "Test User"),
        )
        await conn.commit()

    import backend.src.db as db_module

    original_path = db_module.DEFAULT_DB_PATH
    db_module.DEFAULT_DB_PATH = db_path

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

    db_module.DEFAULT_DB_PATH = original_path


@pytest.mark.asyncio
async def test_create_attempt(client):
    response = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    assert response.status_code == 201
    body = response.json()
    assert "id" in body
    assert body["user_id"] == TEST_USER_ID
    assert body["case_study_id"] == TEST_CASE_ID


@pytest.mark.asyncio
async def test_list_attempts(client):
    await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    response = await client.get(f"/api/v1/attempts?user_id={TEST_USER_ID}")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 2


@pytest.mark.asyncio
async def test_list_attempts_pagination(client):
    for _ in range(3):
        await client.post(
            "/api/v1/attempts",
            json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
        )

    resp1 = await client.get(f"/api/v1/attempts?user_id={TEST_USER_ID}&limit=2&offset=0")
    assert resp1.status_code == 200
    body1 = resp1.json()
    assert len(body1["attempts"]) == 2
    assert body1["total"] == 3

    resp2 = await client.get(f"/api/v1/attempts?user_id={TEST_USER_ID}&limit=50&offset=2")
    assert resp2.status_code == 200
    body2 = resp2.json()
    assert len(body2["attempts"]) == 1


@pytest.mark.asyncio
async def test_get_attempt_by_id(client):
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    attempt_id = create_resp.json()["id"]

    response = await client.get(f"/api/v1/attempts/{attempt_id}")
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == attempt_id
    assert body["user_id"] == TEST_USER_ID
    assert body["case_study_id"] == TEST_CASE_ID


@pytest.mark.asyncio
async def test_get_attempt_not_found(client):
    response = await client.get("/api/v1/attempts/nonexistent")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_submit_attempt(client):
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    attempt_id = create_resp.json()["id"]

    submit_resp = await client.put(
        f"/api/v1/attempts/{attempt_id}/submit",
        json={"answer_text": "My answer here", "time_spent_seconds": 300},
    )
    assert submit_resp.status_code == 200
    body = submit_resp.json()
    assert body["submitted_at"] is not None
    assert body["answer_text"] == "My answer here"
    assert body["time_spent_seconds"] == 300


@pytest.mark.asyncio
async def test_add_scores_to_attempt(client):
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    attempt_id = create_resp.json()["id"]

    scores_payload = [
        {"dimension_id": "dim_1", "score": 4, "source": "llm"},
        {"dimension_id": "dim_2", "score": 3, "source": "self"},
    ]
    scores_resp = await client.post(
        f"/api/v1/attempts/{attempt_id}/scores",
        json=scores_payload,
    )
    assert scores_resp.status_code == 200
    body = scores_resp.json()
    assert len(body) == 2
    dimension_ids = {s["dimension_id"] for s in body}
    assert dimension_ids == {"dim_1", "dim_2"}
    scores = {s["dimension_id"]: s["score"] for s in body}
    assert scores == {"dim_1": 4, "dim_2": 3}


@pytest.mark.asyncio
async def test_add_scores_attempt_not_found(client):
    response = await client.post(
        "/api/v1/attempts/nonexistent/scores",
        json=[{"dimension_id": "dim_1", "score": 4, "source": "llm"}],
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_progress_scores(client):
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    attempt_id = create_resp.json()["id"]

    await client.post(
        f"/api/v1/attempts/{attempt_id}/scores",
        json=[{"dimension_id": "dim_1", "score": 4, "source": "llm"}],
    )

    response = await client.get(f"/api/v1/progress/{TEST_USER_ID}/scores")
    assert response.status_code == 200
    body = response.json()
    assert len(body) >= 1
    assert any(s["dimension_id"] == "dim_1" for s in body)


@pytest.mark.asyncio
async def test_progress_coverage(client):
    await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )

    response = await client.get(f"/api/v1/progress/{TEST_USER_ID}/coverage")
    assert response.status_code == 200
    body = response.json()
    skill_1 = next(c for c in body if c["skill_id"] == 1)
    assert skill_1["attempts_count"] == 1


@pytest.mark.asyncio
async def test_progress_combined(client):
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    attempt_id = create_resp.json()["id"]

    await client.post(
        f"/api/v1/attempts/{attempt_id}/scores",
        json=[{"dimension_id": "dim_1", "score": 4, "source": "llm"}],
    )

    response = await client.get(f"/api/v1/progress/{TEST_USER_ID}")
    assert response.status_code == 200
    body = response.json()
    assert "eval_scores" in body
    assert "coverage" in body
    assert len(body["eval_scores"]) >= 1
    assert len(body["coverage"]) >= 1
