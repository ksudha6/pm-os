# Iteration 14 -- Calibration Quality Pass -- 2026-03-26

## Context

Skeleton calibration anchors have generic level descriptions. I want to replace them with PM-framework-grounded content using Lenny MCP archive and established PM frameworks (Cagan, Torres, Gupta, Huryn).

## JTBD

1. When the LLM evaluates an answer, the calibration anchors should reflect real PM frameworks so scores are meaningful and defensible.
2. When a user reads their level description, it should reference concrete PM behaviors they can recognize from their work.

## Tasks

1. [ ] For each of the 8 skills, search Lenny MCP archive for relevant frameworks, examples, and behavioral descriptions
2. [ ] Rewrite `backend/src/calibration.py` -- replace skeleton level descriptions with researched content for all 32 anchors
3. [ ] Rewrite `frontend/src/lib/data/calibration.ts` -- match backend content
4. [ ] Run `make test-backend` and `make test` (structure tests still pass)
5. [ ] User review of all 32 anchors

## Tests (permanent)

Existing structural tests from iteration 08 still pass (no new tests needed -- this is a content change).

## Notes
