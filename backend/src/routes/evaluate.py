import json
import uuid

from fastapi import APIRouter, HTTPException

from backend.src.calibration import CALIBRATION_ANCHORS
from backend.src.db import get_db
from backend.src.evaluator import evaluate_answer
from backend.src.models import DimensionScoreResultResponse, EvaluationResponse

router = APIRouter(prefix="/api/v1/attempts", tags=["evaluate"])


@router.post("/{attempt_id}/evaluate", response_model=EvaluationResponse)
async def evaluate_attempt(attempt_id: str) -> EvaluationResponse:
    async with get_db() as conn:
        # Step 1: Fetch attempt.
        cursor = await conn.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,))
        attempt = await cursor.fetchone()
        if attempt is None:
            raise HTTPException(status_code=404, detail="Attempt not found")

        # Step 2: Require submitted_at.
        if attempt["submitted_at"] is None:
            raise HTTPException(status_code=400, detail="Attempt not submitted")

        # Step 3: Return cached evaluation if it exists.
        cursor = await conn.execute(
            "SELECT * FROM evaluations WHERE attempt_id = ?", (attempt_id,)
        )
        existing_eval = await cursor.fetchone()
        if existing_eval is not None:
            raw = json.loads(existing_eval["raw_response"])
            # raw_response stores {"scores": [{dimension_id, score, reasoning}, ...], ...}
            scores = [
                DimensionScoreResultResponse(
                    dimension_id=s["dimension_id"],
                    score=s["score"],
                    reasoning=s["reasoning"],
                )
                for s in raw.get("scores", [])
            ]
            return EvaluationResponse(
                attempt_id=attempt_id,
                scores=scores,
                model=existing_eval["model"],
                created_at=existing_eval["created_at"],
            )

        # Step 4: Fetch case study and parse rubric_dimension_ids.
        cursor = await conn.execute(
            "SELECT * FROM case_studies WHERE id = ?", (attempt["case_study_id"],)
        )
        case = await cursor.fetchone()
        rubric_dimension_ids: list[str] = json.loads(case["rubric_dimension_ids"])

        # Step 5: Filter calibration anchors to those in rubric_dimension_ids.
        dim_set = set(rubric_dimension_ids)
        filtered_anchors = tuple(
            a for a in CALIBRATION_ANCHORS if a.dimension_id in dim_set
        )

        # Step 6: Call the evaluator.
        result = await evaluate_answer(
            case_prompt=case["prompt"],
            answer_text=attempt["answer_text"],
            anchors=filtered_anchors,
        )

        # Step 7: Insert one eval_score row per dimension.
        for dim_score in result.scores:
            score_id = str(uuid.uuid4())
            await conn.execute(
                "INSERT OR REPLACE INTO eval_scores (id, attempt_id, dimension_id, score, source) VALUES (?, ?, ?, ?, ?)",
                (score_id, attempt_id, dim_score.dimension_id, dim_score.score, "llm"),
            )

        # Step 8: Insert the evaluation row. raw_response stores scores with reasoning
        # so the cache in step 3 can recover reasoning without a separate column.
        scores_with_reasoning = [
            {
                "dimension_id": s.dimension_id,
                "score": s.score,
                "reasoning": s.reasoning,
            }
            for s in result.scores
        ]
        raw_response_to_store = json.dumps(
            {
                "scores": scores_with_reasoning,
                "anthropic_raw": json.loads(result.raw_response),
            }
        )
        eval_id = str(uuid.uuid4())
        await conn.execute(
            "INSERT INTO evaluations (id, attempt_id, raw_response, model, prompt_tokens, completion_tokens) VALUES (?, ?, ?, ?, ?, ?)",
            (
                eval_id,
                attempt_id,
                raw_response_to_store,
                result.model,
                result.prompt_tokens,
                result.completion_tokens,
            ),
        )
        await conn.commit()

        # Step 9: Fetch the created_at from the evaluations row.
        cursor = await conn.execute(
            "SELECT created_at FROM evaluations WHERE id = ?", (eval_id,)
        )
        eval_row = await cursor.fetchone()
        created_at = eval_row["created_at"]

    scores_response = [
        DimensionScoreResultResponse(
            dimension_id=s.dimension_id,
            score=s.score,
            reasoning=s.reasoning,
        )
        for s in result.scores
    ]
    return EvaluationResponse(
        attempt_id=attempt_id,
        scores=scores_response,
        model=result.model,
        created_at=created_at,
    )
