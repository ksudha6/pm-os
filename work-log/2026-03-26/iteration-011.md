# Iteration 11 -- Frontend API Client -- 2026-03-26

## Context

Frontend talks to localStorage only. I want typed functions that call the backend REST API.

## JTBD

1. Create an attempt record on the backend when the user starts a case.
2. Submit the user's answer text and time spent to the backend.
3. Trigger LLM evaluation for a submitted attempt and get back scores with reasoning.
4. Fetch all eval scores for a user to compute progress locally.

## Tasks

1. [x] Create `frontend/src/lib/types/api.ts` with response types:
   - `AttemptResponse`: id, user_id, case_study_id, answer_text, started_at, submitted_at, time_spent_seconds
   - `DimensionScoreResult`: dimension_id, score, reasoning
   - `EvaluationResponse`: attempt_id, scores (DimensionScoreResult[]), model, created_at
   - `EvalScoreResponse`: id, attempt_id, dimension_id, score, source, created_at
   - `ApiError`: status (number), message (string)
2. [x] Export new types from `frontend/src/lib/types/index.ts`
3. [x] Create `frontend/src/lib/api/client.ts`:
   - `BASE_URL` constant, default `'http://localhost:8000'`
   - `async function apiFetch<T>(method: string, path: string, body?: unknown): Promise<T>`
   - On non-2xx response: throw `ApiError` with status code and response body message
   - On network failure: throw `ApiError` with status 0 and error message
4. [x] Create `frontend/src/lib/api/attempts.ts` with four functions:
   - `createAttempt(userId: string, caseStudyId: string): Promise<AttemptResponse>` -- `POST /api/v1/attempts` with `{user_id, case_study_id}`
   - `submitAttempt(attemptId: string, answerText: string, timeSpentSeconds: number): Promise<AttemptResponse>` -- `PUT /api/v1/attempts/{attemptId}/submit` with `{answer_text, time_spent_seconds}`
   - `evaluateAttempt(attemptId: string): Promise<EvaluationResponse>` -- `POST /api/v1/attempts/{attemptId}/evaluate`
   - `getScores(userId: string): Promise<EvalScoreResponse[]>` -- `GET /api/v1/progress/{userId}/scores`
5. [x] Create `frontend/tests/api/client.test.ts` with mocked `globalThis.fetch`
6. [x] Run `make test`

## Tests (permanent)

1. `createAttempt` sends POST to `/api/v1/attempts` with `{user_id, case_study_id}`, returns `AttemptResponse`
2. `submitAttempt` sends PUT to `/api/v1/attempts/{id}/submit` with `{answer_text, time_spent_seconds}`
3. `evaluateAttempt` sends POST to `/api/v1/attempts/{id}/evaluate`, returns `EvaluationResponse` with scores array
4. `getScores` sends GET to `/api/v1/progress/{userId}/scores`, returns `EvalScoreResponse[]`
5. Non-200 response throws `ApiError` with correct status code
6. Network failure throws `ApiError` with status 0

## Notes
