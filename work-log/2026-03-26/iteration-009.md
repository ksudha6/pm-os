# Iteration 09 -- Evaluator Module -- 2026-03-26

## Context

Each case study attempt needs an LLM-generated score per rubric dimension. I want to be able to call the CLaude API that adds a single Python function that takes a case prompt, a user's answer, and the relevant anchors, sends them to Claude Sonnet via tool_use, and returns a typed result with one score (1-5) and one reasoning string per dimension.

## JTBD

1. Given a case prompt, a user answer, and a set of calibration anchors, produce a score (1-5) and a reasoning string for each dimension by calling Claude Sonnet.
2. Return token usage (prompt_tokens, completion_tokens) and the raw API response so they can be persisted for debugging and cost tracking.
3. Reject malformed or out-of-range responses from the API with a clear error rather than silently returning bad data.

## Tasks

1. [x] Add `anthropic` to `pyproject.toml` dependencies
2. [x] Create `backend/src/evaluator.py` with three frozen dataclasses:
   - `DimensionScoreResult`: dimension_id (str), score (int, 1-5), reasoning (str)
   - `EvaluationResult`: scores (list[DimensionScoreResult]), raw_response (str), model (str), prompt_tokens (int), completion_tokens (int)
   - `EvaluationError(Exception)`: raised on any failure
3. [x] Implement `evaluate_answer(case_prompt: str, answer_text: str, anchors: tuple[CalibrationAnchor, ...], client: AsyncAnthropic | None = None) -> EvaluationResult`:
   - Step 1: Build system prompt containing: the case prompt, the user's answer, the instruction "Evaluate the quality of PM thinking, not writing style. A messy answer with strong insight scores higher than a polished answer with shallow thinking.", and a description of the 8-skill PM framework with 4 dimensions each
   - Step 2: For each anchor, append its dimension name, principle, and all 5 level descriptions to the prompt
   - Step 3: Define a tool schema `record_scores` that accepts `{"scores": [{dimension_id: str, score: int, reasoning: str}]}`
   - Step 4: Call `client.messages.create()` with model `claude-sonnet-4-20250514`, `temperature=0`, the system prompt, and the tool definition
   - Step 5: Extract the `tool_use` content block from the response; raise `EvaluationError` if missing
   - Step 6: Validate each score is 1-5; raise `EvaluationError` if any is out of range
   - Step 7: Build and return `EvaluationResult` from parsed scores, `response.model`, and `response.usage`
   - Step 8: Wrap any `anthropic.APIError` in `EvaluationError` with `from` chaining
4. [x] Create `backend/tests/test_evaluator.py` with mocked `AsyncAnthropic` client
5. [x] Run `make test-backend`

## Tests

1. Happy path: mocked client returns valid tool_use, verify correct `EvaluationResult`
2. Prompt contains case prompt text
3. Prompt contains answer text
4. Prompt contains anchor level descriptions
5. Prompt contains "Evaluate the quality of PM thinking, not writing style" instruction
6. API call uses `temperature=0`
7. Scores outside 1-5 raise `EvaluationError`
8. Missing tool_use block raises `EvaluationError`
9. Malformed JSON in tool_use raises `EvaluationError`
10. API error raises `EvaluationError` with chained cause

## Notes
