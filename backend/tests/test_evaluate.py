import json

import pytest
from httpx import ASGITransport, AsyncClient

from backend.src.evaluator import DimensionScoreResult, EvaluationResult
from backend.src.main import app

TEST_USER_ID = "test-user-eval"
TEST_CASE_ID = "cs_1_1"
# cs_1_1 rubric_dimension_ids: ["r1d1", "r1d2", "r1d3"]
TEST_DIMENSION_IDS = ("r1d1", "r1d2", "r1d3")

MOCK_MODEL = "claude-sonnet-4-20250514"

MOCK_EVALUATION_RESULT = EvaluationResult(
    scores=[
        DimensionScoreResult(dimension_id="r1d1", score=4, reasoning="Strong direct customer contact."),
        DimensionScoreResult(dimension_id="r1d2", score=3, reasoning="Uses story-based prompts reasonably well."),
        DimensionScoreResult(dimension_id="r1d3", score=2, reasoning="Synthesis stays at the surface."),
    ],
    raw_response=json.dumps({"mock": True}),
    model=MOCK_MODEL,
    prompt_tokens=100,
    completion_tokens=50,
)


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
            (TEST_USER_ID, "Eval Test User"),
        )
        await conn.commit()

    import backend.src.db as db_module

    original_path = db_module.DEFAULT_DB_PATH
    db_module.DEFAULT_DB_PATH = db_path

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

    db_module.DEFAULT_DB_PATH = original_path


async def _create_and_submit_attempt(client) -> str:
    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    assert create_resp.status_code == 201
    attempt_id = create_resp.json()["id"]

    submit_resp = await client.put(
        f"/api/v1/attempts/{attempt_id}/submit",
        json={"answer_text": "Here is my thorough PM answer.", "time_spent_seconds": 600},
    )
    assert submit_resp.status_code == 200
    return attempt_id


@pytest.mark.asyncio
async def test_evaluate_happy_path(client, monkeypatch):
    call_count = 0

    async def mock_evaluate_answer(case_prompt, answer_text, anchors, client=None):
        nonlocal call_count
        call_count += 1
        return MOCK_EVALUATION_RESULT

    monkeypatch.setattr("backend.src.routes.evaluate.evaluate_answer", mock_evaluate_answer)

    attempt_id = await _create_and_submit_attempt(client)
    response = await client.post(f"/api/v1/attempts/{attempt_id}/evaluate")
    assert response.status_code == 200
    body = response.json()

    assert body["attempt_id"] == attempt_id
    assert body["model"] == MOCK_MODEL
    assert body["created_at"] is not None and body["created_at"] != ""

    assert len(body["scores"]) == len(TEST_DIMENSION_IDS)
    returned_dim_ids = {s["dimension_id"] for s in body["scores"]}
    assert returned_dim_ids == set(TEST_DIMENSION_IDS)

    for score_obj in body["scores"]:
        assert 1 <= score_obj["score"] <= 5
        assert isinstance(score_obj["reasoning"], str)
        assert len(score_obj["reasoning"]) > 0

    assert call_count == 1


@pytest.mark.asyncio
async def test_evaluate_not_found(client, monkeypatch):
    async def mock_evaluate_answer(case_prompt, answer_text, anchors, client=None):
        return MOCK_EVALUATION_RESULT

    monkeypatch.setattr("backend.src.routes.evaluate.evaluate_answer", mock_evaluate_answer)

    response = await client.post("/api/v1/attempts/nonexistent-id/evaluate")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_evaluate_not_submitted(client, monkeypatch):
    async def mock_evaluate_answer(case_prompt, answer_text, anchors, client=None):
        return MOCK_EVALUATION_RESULT

    monkeypatch.setattr("backend.src.routes.evaluate.evaluate_answer", mock_evaluate_answer)

    create_resp = await client.post(
        "/api/v1/attempts",
        json={"user_id": TEST_USER_ID, "case_study_id": TEST_CASE_ID},
    )
    assert create_resp.status_code == 201
    attempt_id = create_resp.json()["id"]

    # Do not submit; evaluate should fail with 400.
    response = await client.post(f"/api/v1/attempts/{attempt_id}/evaluate")
    assert response.status_code == 400
    assert "not submitted" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_evaluate_idempotency(client, monkeypatch):
    call_count = 0

    async def mock_evaluate_answer(case_prompt, answer_text, anchors, client=None):
        nonlocal call_count
        call_count += 1
        return MOCK_EVALUATION_RESULT

    monkeypatch.setattr("backend.src.routes.evaluate.evaluate_answer", mock_evaluate_answer)

    attempt_id = await _create_and_submit_attempt(client)

    resp1 = await client.post(f"/api/v1/attempts/{attempt_id}/evaluate")
    assert resp1.status_code == 200
    body1 = resp1.json()

    resp2 = await client.post(f"/api/v1/attempts/{attempt_id}/evaluate")
    assert resp2.status_code == 200
    body2 = resp2.json()

    # evaluate_answer must be called exactly once; second call is served from cache.
    assert call_count == 1

    # Both calls return identical scores.
    scores1 = sorted(body1["scores"], key=lambda s: s["dimension_id"])
    scores2 = sorted(body2["scores"], key=lambda s: s["dimension_id"])
    assert scores1 == scores2


@pytest.mark.asyncio
async def test_evaluate_model_and_created_at(client, monkeypatch):
    async def mock_evaluate_answer(case_prompt, answer_text, anchors, client=None):
        return MOCK_EVALUATION_RESULT

    monkeypatch.setattr("backend.src.routes.evaluate.evaluate_answer", mock_evaluate_answer)

    attempt_id = await _create_and_submit_attempt(client)
    response = await client.post(f"/api/v1/attempts/{attempt_id}/evaluate")
    assert response.status_code == 200
    body = response.json()

    assert body["model"] == MOCK_MODEL
    created_at = body["created_at"]
    # created_at must be a non-empty ISO-like string.
    assert isinstance(created_at, str)
    assert len(created_at) > 10
