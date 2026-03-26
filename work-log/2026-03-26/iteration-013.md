# Iteration 13 -- Wire LLM Evaluation into Practice Page -- 2026-03-26

## Context

Self-assessment is removed (iteration 12). After submitting an answer, the practice page shows a placeholder block with "Answer submitted. LLM evaluation coming soon." and a "Back to Dashboard" link. This iteration replaces that placeholder with real API calls and LLM evaluation results.

## JTBD

1. When the user starts a case, create an attempt on the backend so the answer can be persisted.
2. When the user submits their answer, send it to the backend and show a loading state while the LLM evaluates.
3. When evaluation completes, display each dimension's score (1-5) and reasoning text.
4. When evaluation fails, show an error with a retry option.
5. When the user clicks "Complete", persist LLM scores to the local scoring engine and return to dashboard. LLM scores are final -- no user override.

## Tasks

1. [ ] In `frontend/src/routes/practice/[caseId]/+page.svelte`, change phase type from `'prompt' | 'answer' | 'submitted'` to `'prompt' | 'answer' | 'evaluating' | 'results'`
2. [ ] Add imports at top of file:
   - `import { createAttempt, submitAttempt, evaluateAttempt } from '$lib/api/attempts'`
   - `import type { EvaluationResponse } from '$lib/types/index'`
   - Re-enable `recordScores` import from `$lib/scoring/engine` (commented out in iteration 12)
   - Re-enable `addScores` import from `$lib/stores/user-state.svelte`
3. [ ] Add state variables:
   - `attemptId: string | null = null`
   - `evaluationResult: EvaluationResponse | null = null`
   - `evaluationError: string | null = null`
4. [ ] Modify "Start Timer" click handler:
   - Call `createAttempt('default-user', caseStudy.id)` (single-user app, no auth)
   - Store returned `id` in `attemptId`
   - Wrap in try/catch: on failure, show error inline (don't block timer start)
5. [ ] Modify "Submit Answer" click handler:
   - Call `submitAttempt(attemptId, answerText, timeSpentSeconds)`
   - Set `phase = 'evaluating'`
   - Call `evaluateAttempt(attemptId)`
   - On success: store result in `evaluationResult`, set `phase = 'results'`
   - On failure: store error message in `evaluationError`, stay in `'evaluating'` phase
6. [ ] Replace the `{:else if phase === 'submitted'}` block with two new blocks:
   - `{:else if phase === 'evaluating'}`: loading spinner, text "Evaluating your answer...". If `evaluationError` is set, show error message and a "Retry" button that calls `evaluateAttempt(attemptId)` again
   - `{:else if phase === 'results'}`: for each score in `evaluationResult.scores`, display:
     - Dimension name (look up from `skills` data using `dimension_id` -- parse skill ID from `r{skillId}d{dimNumber}` format, find skill, find matching rubricDimension by ID). If `dimension_id` doesn't match any skill, show "Unknown dimension" with the score instead of crashing.
     - Score badge (1-5)
     - Reasoning text
     - If fewer scores returned than dimensions on the case, show missing dimensions as "Not evaluated"
7. [ ] Add "Complete" button in results phase:
   - Convert `evaluationResult.scores` to `{dimensionId, score}[]` format
   - Call `recordScores(caseStudy.id, convertedScores, userState, caseStudies)` -- this handles primary/secondary weight assignment
   - Call `addScores()` with the returned new scores
   - Navigate to `/`
8. [ ] Run `make test` and `make test-backend`
9. [ ] Manual verification: `make up`, navigate to a case, start timer, submit answer, observe loading state, see LLM scores with reasoning, click Complete, verify dashboard shows updated progress

## Tests (permanent)

1. Phase transitions: prompt -> answer -> evaluating -> results
2. `createAttempt` called with `'default-user'` and case ID when timer starts
3. `submitAttempt` and `evaluateAttempt` called when answer is submitted
4. Results phase renders one dimension name, score, and reasoning per entry in `evaluationResult.scores`
5. Unknown dimension_id renders "Unknown dimension" instead of crashing
6. Missing dimensions render "Not evaluated"
7. Error state in evaluating phase renders error message and retry button
8. "Complete" calls `recordScores` then `addScores` with LLM-sourced scores

## Notes
