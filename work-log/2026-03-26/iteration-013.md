# Iteration 13 -- Wire LLM Evaluation into Practice Page -- 2026-03-26

## Context

Self-assessment is removed (iteration 12). Practice page has a `'submitted'` stub. I want to wire the API client and display real LLM evaluation results.

## JTBD

1. When the user starts a case, create an attempt on the backend so the answer can be persisted.
2. When the user submits their answer, send it to the backend and show a loading state while the LLM evaluates.
3. When evaluation completes, display each dimension's score (1-5) and reasoning text.
4. When evaluation fails, show an error with a retry option.
5. When the user clicks "Complete", persist LLM scores to the local scoring engine and return to dashboard. LLM scores are final -- no user override.

## Tasks

1. [ ] Change phase type to `'prompt' | 'answer' | 'evaluating' | 'results'` (replace `'submitted'`)
2. [ ] Add state variables:
   - `attemptId: string | null`
   - `evaluationResult: EvaluationResponse | null`
   - `evaluationError: string | null`
3. [ ] On "Start Timer" click: call `createAttempt(userId, caseId)`, store returned `id` in `attemptId`
4. [ ] On "Submit Answer" click:
   - Call `submitAttempt(attemptId, answerText, timeSpentSeconds)`
   - Set phase to `'evaluating'`
   - Call `evaluateAttempt(attemptId)`
   - On success: store result in `evaluationResult`, set phase to `'results'`
   - On failure: store error message in `evaluationError`, stay in `'evaluating'` phase
5. [ ] Build `'evaluating'` phase UI: loading indicator, show error message + "Retry" button if `evaluationError` is set
6. [ ] Build `'results'` phase UI: for each score in `evaluationResult.scores`, display dimension name, score badge (1-5), and reasoning text
7. [ ] "Complete" button: convert `evaluationResult.scores` to `DimensionScore[]` (using weight from primary/secondary skill), call `addScores()`, navigate to `/`
8. [ ] Run `make test` and `make test-backend`
9. [ ] Manual verification: `make up`, navigate to a case, start timer, submit answer, observe loading state, see LLM scores with reasoning, click Complete, verify dashboard shows updated progress

## Tests (permanent)

1. Phase transitions: prompt -> answer -> evaluating -> results
2. `createAttempt` called when timer starts
3. `submitAttempt` and `evaluateAttempt` called when answer is submitted
4. Results phase renders one score and reasoning per dimension
5. Error state renders error message and retry button
6. "Complete" calls `addScores` with scores sourced from `evaluationResult`

## Notes
