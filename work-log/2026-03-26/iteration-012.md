# Iteration 12 -- Remove Self-Assessment -- 2026-03-26

## Context

Practice page has a self-assessment phase where the user manually scores each dimension. I want to remove it and replace with a stub that says evaluation is coming.

## JTBD

1. When a user submits their answer, the self-assessment flow is gone. The page shows a placeholder indicating LLM evaluation will appear here.
2. The phase model is updated so the next iteration can wire in the real evaluation without further removals.

## Tasks

1. [x] In `frontend/src/routes/practice/[caseId]/+page.svelte`, remove these specific pieces:
   - The `dimensionScores` state variable (object mapping dimension IDs to manual scores)
   - The `allScored` derived state (checks if all dimensions have been scored)
   - The score selector buttons (1-5 buttons per rubric dimension)
   - The entire `{:else if phase === 'assess'}` conditional block (self-assessment UI)
   - The `recordScores()` call and its import from `$lib/scoring/engine.ts`
   - The `addScores()` call that persists manual scores to localStorage
2. [x] Change the phase type union from `'prompt' | 'answer' | 'assess'` to `'prompt' | 'answer' | 'submitted'`
3. [x] Change the "Submit Answer" button handler: after disabling the textarea and storing the answer, set `phase = 'submitted'` (was `phase = 'assess'`)
4. [x] Add a new `{:else if phase === 'submitted'}` block that renders:
   - A heading: "Answer submitted"
   - A paragraph: "LLM evaluation coming soon."
   - A link to `/` labeled "Back to Dashboard"
5. [x] Keep the `recordScores` and `addScores` imports commented out (not deleted) so iteration 13 can re-enable them for LLM score persistence
6. [x] Run `make test`

## Tests (permanent)

1. Phase transitions: prompt -> answer -> submitted (no `assess` phase)
2. Submitted phase renders "Answer submitted" and "Back to Dashboard" link
3. No score selector buttons exist in any phase
4. No `dimensionScores` or `allScored` state references in the component

## Notes
