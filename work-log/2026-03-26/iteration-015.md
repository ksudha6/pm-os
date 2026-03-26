# Iteration 15 -- Calibration Quality Pass -- 2026-03-26

## Context

Skeleton calibration anchors have generic level descriptions. I want to replace them with PM-framework-grounded content using Lenny MCP archive and established PM frameworks (Cagan, Torres, Gupta, Huryn).

## JTBD

1. When the LLM evaluates an answer, the calibration anchors should reflect real PM frameworks so scores are meaningful and defensible.
2. When a user reads their level description, it should reference concrete PM behaviors they can recognize from their work.
3. When validating the evaluator, reference answers at known quality levels should score in expected ranges, confirming the anchors produce correct evaluations.

## Tasks

1. [ ] Research skill 1 (User Empathy & Customer Knowledge): search Lenny MCP for behavioral descriptions of what good/bad PM customer engagement looks like. Extract concrete behaviors for levels 1-5 across all 4 dimensions (r1d1-r1d4). Each level description should be 2-3 sentences referencing specific PM behaviors, not generic adjectives.
2. [ ] Repeat for skill 2 (Product Sense & Judgment): r2d1-r2d4
3. [ ] Repeat for skill 3 (Strategic Thinking & Vision): r3d1-r3d4
4. [ ] Repeat for skill 4 (Business Acumen & Viability): r4d1-r4d4
5. [ ] Repeat for skill 5 (Discovery Practice & Methods): r5d1-r5d4
6. [ ] Repeat for skill 6 (Data Fluency & Experimentation): r6d1-r6d4
7. [ ] Repeat for skill 7 (Leadership, Influence & Execution): r7d1-r7d4
8. [ ] Repeat for skill 8 (Domain & Market Depth): r8d1-r8d4
9. [ ] Rewrite `backend/src/calibration.py` -- replace all 32 skeleton entries with researched content. Set `skeleton=False` on all rewritten entries. Keep the `principle` and `reflection_prompt` fields updated too. Level descriptions: 2-3 sentences each, reference specific PM frameworks (Cagan, Torres, Gupta, Huryn) where applicable.
10. [ ] Rewrite `frontend/src/lib/data/calibration.ts` -- identical content to backend, adapted to TypeScript types. Set `skeleton: false` on all entries.
11. [ ] Author 2 reference answers per skill (one weak answer expected to score 1-2, one strong answer expected to score 4-5). Store in `backend/tests/fixtures/reference_answers/` as plain text files.
12. [ ] Run each reference answer through the evaluator (using `force=true` endpoint). Verify weak answers score 1-2 and strong answers score 4-5 on the primary skill dimensions. If scores don't land in range, adjust anchors or prompt until they do.
13. [ ] Run `make test-backend` and `make test` (structural tests from iteration 08 must still pass)
14. [ ] Present all 32 anchors for user review before committing

## Tests (permanent)

- Existing structural tests from iteration 08 still pass (32 anchors, correct IDs, 5 non-empty levels each, non-empty principle and reflection prompt)
- All entries have `skeleton=False` (new test, replaces the `skeleton=True` assertion from iteration 08)
- Reference answer validation: 16 reference answers (2 per skill) with expected score ranges stored as test fixtures

## Notes
