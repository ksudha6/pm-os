# Iteration 10 -- Evaluate Endpoint -- 2026-03-26

## Context

I want to expose the evaluator as an HTTP endpoint that persists scores to the database.

## JTBD

1. Given a submitted attempt ID, evaluate it and return per-dimension scores with reasoning in a single HTTP call.
2. Persist scores to `eval_scores` and the raw LLM response to `evaluations` so results survive restarts.
3. If an attempt was already evaluated, return the existing result without calling the LLM again.
4. Reject attempts that don't exist (404) or haven't been submitted yet (400).

## Tasks

1. [x] Add Pydantic models to `backend/src/models.py`:
   - `DimensionScoreResult`: dimension_id (str), score (int), reasoning (str)
   - `EvaluationResponse`: attempt_id (str), scores (list[DimensionScoreResult]), model (str), created_at (str)
2. [x] Create `backend/src/routes/evaluate.py` with `POST /api/v1/attempts/{attempt_id}/evaluate`:
   - Step 1: Query `attempts` table by attempt_id; return 404 if not found
   - Step 2: Check `submitted_at` is not null; return 400 if null
   - Step 3: Query `evaluations` table by attempt_id; if row exists, query `eval_scores` for that attempt and return existing `EvaluationResponse`
   - Step 4: Query `case_studies` table to get `rubric_dimension_ids` for this attempt's case
   - Step 5: Filter `CALIBRATION_ANCHORS` to only dimensions in `rubric_dimension_ids`
   - Step 6: Call `evaluate_answer(case_prompt, answer_text, filtered_anchors)`
   - Step 7: Insert one row per dimension into `eval_scores` (source='llm')
   - Step 8: Insert one row into `evaluations` with raw_response, model, prompt_tokens, completion_tokens
   - Step 9: Return `EvaluationResponse`
3. [x] Wire evaluate router in `backend/src/main.py`: import and `app.include_router(evaluate_router)`
4. [x] Create `backend/tests/test_evaluate.py` -- all tests monkeypatch `evaluate_answer` to avoid real API calls
5. [x] Run `make test-backend`

## Tests (permanent)

1. Happy path: create attempt, submit it, evaluate it, verify response contains one score per rubric dimension with reasoning
2. 404 for nonexistent attempt_id
3. 400 for attempt where `submitted_at` is null
4. Idempotency: call evaluate twice, verify second call returns same scores and `evaluate_answer` was called only once
5. Response `model` and `created_at` fields are populated

## Notes
