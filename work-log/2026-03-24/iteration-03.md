# Iteration 03 — 2026-03-24

## Context

Data layer done (8 skills, 32 dimensions, 51 cases). No scoring logic yet. This iteration adds the scoring engine: pure functions, no UI.

## JTBD

1. When a user self-scores on rubric dimensions after a case study, the system needs to record those scores with proper weighting (1.0 primary, 0.6 secondary) so that multi-skill credit is tracked correctly.
2. When displaying skill-level progress, the system needs to compute weighted averages and trends (improving/stable/declining) so that the user sees meaningful feedback per skill.
3. When displaying overall readiness, the system needs a single 0-100 score derived from all skill weights and averages so that the user understands their interview preparation level.

## Tasks

### Types
- [x] Add `DimensionScore`, `SkillProgress`, `Trend`, `UserState` types to `frontend/src/lib/types/scoring.ts`
- [x] Export from barrel `index.ts`
- [x] `svelte-check` passes

### Scoring engine
- [x] Create `frontend/src/lib/scoring/engine.ts` with 5 pure functions: `recordScores`, `computeSkillProgress`, `computeAllProgress`, `computeReadiness`, `getCaseBreakdown`
- [x] Primary weight 1.0, secondary weight 0.6
- [x] Trend: last 5 vs previous 5, threshold 0.3, minimum 3 scores to compute
- [x] Reject out-of-range scores (not 1-5)

### Tests
- [x] Permanent tests in `frontend/tests/scoring/engine.test.ts`
- [x] Cover: primary weighting, secondary weighting, trend computation, readiness score, no-scores edge case, out-of-range rejection, getCaseBreakdown grouping

### DDD vocab
- [x] Update build status in `docs/ddd-vocab.md`

## Notes

5 pure functions, 6 constants, 23 tests. No new domain terms beyond what was already in the vocab.
