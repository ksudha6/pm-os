import datetime
import uuid

from fastapi import APIRouter, HTTPException, Query

from backend.src.db import get_db
from backend.src.models import (
    AttemptListResponse,
    AttemptResponse,
    CreateAttemptRequest,
    EvalScoreCreate,
    EvalScoreResponse,
    SubmitAttemptRequest,
)

router = APIRouter(prefix="/api/v1/attempts", tags=["attempts"])


def _row_to_attempt(row) -> AttemptResponse:
    return AttemptResponse(
        id=row["id"],
        user_id=row["user_id"],
        case_study_id=row["case_study_id"],
        answer_text=row["answer_text"],
        started_at=row["started_at"],
        submitted_at=row["submitted_at"],
        time_spent_seconds=row["time_spent_seconds"],
    )


def _row_to_score(row) -> EvalScoreResponse:
    return EvalScoreResponse(
        id=row["id"],
        attempt_id=row["attempt_id"],
        dimension_id=row["dimension_id"],
        score=row["score"],
        source=row["source"],
        created_at=row["created_at"],
    )


@router.post("", response_model=AttemptResponse, status_code=201)
async def create_attempt(body: CreateAttemptRequest) -> AttemptResponse:
    attempt_id = str(uuid.uuid4())
    async with get_db() as conn:
        await conn.execute(
            "INSERT INTO attempts (id, user_id, case_study_id, answer_text) VALUES (?, ?, ?, ?)",
            (attempt_id, body.user_id, body.case_study_id, body.answer_text),
        )
        await conn.commit()
        cursor = await conn.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,))
        row = await cursor.fetchone()
    return _row_to_attempt(row)


@router.get("", response_model=AttemptListResponse)
async def list_attempts(
    user_id: str | None = Query(default=None),
    case_study_id: str | None = Query(default=None),
    limit: int = Query(default=50),
    offset: int = Query(default=0),
) -> AttemptListResponse:
    conditions: list[str] = []
    params: list = []

    if user_id is not None:
        conditions.append("user_id = ?")
        params.append(user_id)
    if case_study_id is not None:
        conditions.append("case_study_id = ?")
        params.append(case_study_id)

    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    async with get_db() as conn:
        count_cursor = await conn.execute(
            f"SELECT COUNT(*) FROM attempts {where}",  # noqa: S608
            params,
        )
        total = (await count_cursor.fetchone())[0]

        cursor = await conn.execute(
            f"SELECT * FROM attempts {where} LIMIT ? OFFSET ?",  # noqa: S608
            params + [limit, offset],
        )
        rows = await cursor.fetchall()

    return AttemptListResponse(attempts=[_row_to_attempt(r) for r in rows], total=total)


@router.get("/{attempt_id}", response_model=AttemptResponse)
async def get_attempt(attempt_id: str) -> AttemptResponse:
    async with get_db() as conn:
        cursor = await conn.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,))
        row = await cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Attempt not found")

    return _row_to_attempt(row)


@router.put("/{attempt_id}/submit", response_model=AttemptResponse)
async def submit_attempt(attempt_id: str, body: SubmitAttemptRequest) -> AttemptResponse:
    submitted_at = datetime.datetime.now(datetime.UTC).isoformat()
    async with get_db() as conn:
        cursor = await conn.execute("SELECT id FROM attempts WHERE id = ?", (attempt_id,))
        if await cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Attempt not found")

        await conn.execute(
            "UPDATE attempts SET answer_text = ?, submitted_at = ?, time_spent_seconds = ? WHERE id = ?",
            (body.answer_text, submitted_at, body.time_spent_seconds, attempt_id),
        )
        await conn.commit()
        cursor = await conn.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,))
        row = await cursor.fetchone()

    return _row_to_attempt(row)


@router.post("/{attempt_id}/scores", response_model=list[EvalScoreResponse])
async def add_scores(attempt_id: str, body: list[EvalScoreCreate]) -> list[EvalScoreResponse]:
    async with get_db() as conn:
        cursor = await conn.execute("SELECT id FROM attempts WHERE id = ?", (attempt_id,))
        if await cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Attempt not found")

        score_ids: list[str] = []
        for score in body:
            score_id = str(uuid.uuid4())
            score_ids.append(score_id)
            await conn.execute(
                "INSERT OR REPLACE INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
                (score_id, attempt_id, score.dimension_id, score.score, score.source),
            )
        await conn.commit()

        placeholders = ", ".join("?" * len(score_ids))
        cursor = await conn.execute(
            f"SELECT * FROM eval_scores WHERE id IN ({placeholders})",  # noqa: S608
            score_ids,
        )
        rows = await cursor.fetchall()

    return [_row_to_score(r) for r in rows]
