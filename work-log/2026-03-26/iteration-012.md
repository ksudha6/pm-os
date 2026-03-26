# Iteration 12 -- Frontend Integration -- 2026-03-26

## Context

Practice page uses self-assessment. I want it to use the backend LLM evaluation instead.

## JTBD

1. When the user starts a case, create an attempt on the backend so the answer can be persisted.
2. When the user submits their answer, send it to the backend and show a loading state while the LLM evaluates.
3. When evaluation completes, display each dimension's score (1-5) and reasoning text.
4. When evaluation fails, show an error with a retry option.
5. When the user clicks "Complete", persist LLM scores to the local scoring engine and return to dashboard. LLM scores are final -- no user override.

## Tasks

### Remove from `frontend/src/routes/practice/[caseId]/+page.svelte`
1. [ ] Remove `dimensionScores` state map (manual score tracking)
2. [ ] Remove `allScored` derived state
3. [ ] Remove score selector buttons (1-5 per dimension)
4. [ ] Remove the entire `'assess'` phase block (self-assessment UI)

### Add to `frontend/src/routes/practice/[caseId]/+page.svelte`
5. [ ] Change phase type to `'prompt' | 'answer' | 'evaluating' | 'results'`
6. [ ] Add `attemptId: string | null` state variable
7. [ ] Add `evaluationResult: EvaluationResponse | null` state variable
8. [ ] Add `evaluationError: string | null` state variable
9. [ ] On "Start Timer" click: call `createAttempt(userId, caseId)`, store returned `id` in `attemptId`
10. [ ] On "Submit Answer" click:
    - Call `submitAttempt(attemptId, answerText, timeSpentSeconds)`
    - Set phase to `'evaluating'`
    - Call `evaluateAttempt(attemptId)`
    - On success: store result in `evaluationResult`, set phase to `'results'`
    - On failure: store error message in `evaluationError`, stay in `'evaluating'` phase
11. [ ] Build `'evaluating'` phase UI: loading indicator, show error message + "Retry" button if `evaluationError` is set
12. [ ] Build `'results'` phase UI: for each score in `evaluationResult.scores`, display dimension name, score badge (1-5), and reasoning text
13. [ ] "Complete" button: convert `evaluationResult.scores` to `DimensionScore[]` (using weight from primary/secondary skill), call `addScores()`, navigate to `/`

### Verify
14. [ ] Run `make test` and `make test-backend`
15. [ ] Manual verification: `make up`, navigate to a case, start timer, submit answer, observe loading state, see LLM scores with reasoning, click Complete, verify dashboard shows updated progress

## Tests (permanent)

1. Phase transitions: prompt -> answer -> evaluating -> results
2. `createAttempt` called when timer starts
3. `submitAttempt` and `evaluateAttempt` called when answer is submitted
4. Results phase renders one score and reasoning per dimension
5. Error state renders error message and retry button
6. "Complete" calls `addScores` with scores sourced from `evaluationResult`

## Notes
