from fastapi import APIRouter, Query

from backend.src.db import get_db
from backend.src.models import EvalScoreResponse, ProgressResponse, SkillCoverageResponse

router = APIRouter(prefix="/api/v1/progress", tags=["progress"])

_ALL_SKILL_IDS = tuple(range(1, 9))


def _row_to_score(row) -> EvalScoreResponse:
    return EvalScoreResponse(
        id=row["id"],
        attempt_id=row["attempt_id"],
        dimension_id=row["dimension_id"],
        score=row["score"],
        source=row["source"],
        created_at=row["created_at"],
    )


@router.get("/{user_id}/scores", response_model=list[EvalScoreResponse])
async def get_user_scores(user_id: str) -> list[EvalScoreResponse]:
    async with get_db() as conn:
        cursor = await conn.execute(
            """
            SELECT es.*
            FROM eval_scores es
            JOIN attempts a ON es.attempt_id = a.id
            WHERE a.user_id = ?
            """,
            (user_id,),
        )
        rows = await cursor.fetchall()
    return [_row_to_score(r) for r in rows]


@router.get("/{user_id}/coverage", response_model=list[SkillCoverageResponse])
async def get_user_coverage(user_id: str) -> list[SkillCoverageResponse]:
    async with get_db() as conn:
        cursor = await conn.execute(
            """
            SELECT cs.primary_skill_id AS skill_id,
                   COUNT(DISTINCT a.id) AS attempts_count,
                   MAX(a.started_at) AS last_practiced_at
            FROM attempts a
            JOIN case_studies cs ON a.case_study_id = cs.id
            WHERE a.user_id = ?
            GROUP BY cs.primary_skill_id
            """,
            (user_id,),
        )
        rows = await cursor.fetchall()

    practiced: dict[int, SkillCoverageResponse] = {
        row["skill_id"]: SkillCoverageResponse(
            skill_id=row["skill_id"],
            attempts_count=row["attempts_count"],
            last_practiced_at=row["last_practiced_at"],
        )
        for row in rows
    }

    # Return all 8 skills, with zero counts for unpracticed ones.
    return [
        practiced.get(
            skill_id,
            SkillCoverageResponse(skill_id=skill_id, attempts_count=0, last_practiced_at=None),
        )
        for skill_id in _ALL_SKILL_IDS
    ]


@router.get("/{user_id}", response_model=ProgressResponse)
async def get_user_progress(user_id: str) -> ProgressResponse:
    scores = await get_user_scores(user_id)
    coverage = await get_user_coverage(user_id)
    return ProgressResponse(eval_scores=scores, coverage=coverage)
