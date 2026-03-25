import json

from fastapi import APIRouter, HTTPException, Query

from backend.src.db import get_db
from backend.src.models import CaseStudyListResponse, CaseStudyResponse

router = APIRouter(prefix="/api/v1/cases", tags=["cases"])


def _parse_row(row) -> CaseStudyResponse:
    # row_factory=aiosqlite.Row gives dict-like access by column name.
    return CaseStudyResponse(
        id=row["id"],
        title=row["title"],
        prompt=row["prompt"],
        case_type=row["case_type"],
        difficulty=row["difficulty"],
        context=row["context"],
        time_limit=row["time_limit"],
        primary_skill_id=row["primary_skill_id"],
        secondary_skill_ids=json.loads(row["secondary_skill_ids"]),
        rubric_dimension_ids=json.loads(row["rubric_dimension_ids"]),
        hints=json.loads(row["hints"]),
    )


@router.get("", response_model=CaseStudyListResponse)
async def list_cases(
    skill_id: int | None = Query(default=None),
    case_type: str | None = Query(default=None),
    difficulty: str | None = Query(default=None),
    time_limit: int | None = Query(default=None),
) -> CaseStudyListResponse:
    # Build WHERE clauses from whichever filters are provided.
    conditions: list[str] = []
    params: list = []

    if skill_id is not None:
        conditions.append("primary_skill_id = ?")
        params.append(skill_id)
    if case_type is not None:
        conditions.append("case_type = ?")
        params.append(case_type)
    if difficulty is not None:
        conditions.append("difficulty = ?")
        params.append(difficulty)
    if time_limit is not None:
        conditions.append("time_limit = ?")
        params.append(time_limit)

    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
    query = f"SELECT * FROM case_studies {where}"  # noqa: S608 — params are bound, not interpolated

    async with get_db() as conn:
        cursor = await conn.execute(query, params)
        rows = await cursor.fetchall()

    cases = [_parse_row(r) for r in rows]
    return CaseStudyListResponse(cases=cases, total=len(cases))


@router.get("/{case_id}", response_model=CaseStudyResponse)
async def get_case(case_id: str) -> CaseStudyResponse:
    async with get_db() as conn:
        cursor = await conn.execute(
            "SELECT * FROM case_studies WHERE id = ?", (case_id,)
        )
        row = await cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Case not found")

    return _parse_row(row)
