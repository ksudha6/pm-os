# Iteration 12 -- Remove Self-Assessment -- 2026-03-26

## Context

Practice page has a self-assessment phase where the user manually scores each dimension. I want to remove it and replace with a stub that says evaluation is coming.

## JTBD

1. When a user submits their answer, the self-assessment flow is gone. The page shows a placeholder indicating LLM evaluation will appear here.
2. The phase model is updated so the next iteration can wire in the real evaluation without further removals.

## Tasks

1. [ ] In `frontend/src/routes/practice/[caseId]/+page.svelte`:
   - Remove `dimensionScores` state map (manual score tracking)
   - Remove `allScored` derived state
   - Remove score selector buttons (1-5 per dimension)
   - Remove the entire `'assess'` phase block (self-assessment UI)
2. [ ] Change phase type to `'prompt' | 'answer' | 'submitted'`
3. [ ] Build `'submitted'` phase UI: display "Answer submitted. LLM evaluation coming soon." and a "Back to Dashboard" link that navigates to `/`
4. [ ] Run `make test`

## Tests (permanent)

1. Phase transitions: prompt -> answer -> submitted
2. Submitted phase renders placeholder message
3. No self-assessment UI elements remain (no score buttons, no dimensionScores references)

## Notes
