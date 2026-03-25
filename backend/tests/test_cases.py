import pytest
from httpx import ASGITransport, AsyncClient

from backend.src.main import app


@pytest.fixture
async def client(tmp_path):
    db_path = str(tmp_path / "test.db")

    from backend.src.db import init_schema
    from backend.src.seed import seed_cases

    await init_schema(db_path)
    await seed_cases(db_path)

    import backend.src.db as db_module

    original_path = db_module.DEFAULT_DB_PATH
    db_module.DEFAULT_DB_PATH = db_path

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

    db_module.DEFAULT_DB_PATH = original_path


@pytest.mark.asyncio
async def test_list_cases(client):
    response = await client.get("/api/v1/cases")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 51
    assert len(body["cases"]) == 51


@pytest.mark.asyncio
async def test_list_cases_filter_by_skill(client):
    response = await client.get("/api/v1/cases?skill_id=1")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 5
    assert len(body["cases"]) == 5
    for case in body["cases"]:
        assert case["primary_skill_id"] == 1


@pytest.mark.asyncio
async def test_list_cases_filter_by_difficulty(client):
    response = await client.get("/api/v1/cases?difficulty=staff")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 34
    assert len(body["cases"]) == 34
    for case in body["cases"]:
        assert case["difficulty"] == "staff"


@pytest.mark.asyncio
async def test_list_cases_filter_by_case_type(client):
    response = await client.get("/api/v1/cases?case_type=mock_interview")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 8
    assert len(body["cases"]) == 8
    for case in body["cases"]:
        assert case["case_type"] == "mock_interview"


@pytest.mark.asyncio
async def test_get_case_by_id(client):
    response = await client.get("/api/v1/cases/cs_1_1")
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == "cs_1_1"
    assert body["title"] == "Spotify Podcast Commuters"


@pytest.mark.asyncio
async def test_get_case_not_found(client):
    response = await client.get("/api/v1/cases/nonexistent")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_case_response_has_parsed_lists(client):
    response = await client.get("/api/v1/cases/cs_1_1")
    assert response.status_code == 200
    body = response.json()

    secondary = body["secondary_skill_ids"]
    assert isinstance(secondary, list)
    assert all(isinstance(x, int) for x in secondary)

    rubric = body["rubric_dimension_ids"]
    assert isinstance(rubric, list)
    assert all(isinstance(x, str) for x in rubric)

    hints = body["hints"]
    assert isinstance(hints, list)
    assert all(isinstance(x, str) for x in hints)
