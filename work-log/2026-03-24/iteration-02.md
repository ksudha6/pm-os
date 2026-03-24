# Iteration 02 — 2026-03-24

## Context

48 case studies with prompts, rubric mappings, hints, difficulty, and time limits are defined in `PM-OS_Iteration_0_Spec.md` (lines 343+). 4 additional estimation cases are defined in `spec/outputs/iterations/iteration-002.md`. Each case maps to a primary skill, 1-4 secondary skills, and rubric dimensions across those skills. 11 case types cover standard PM interview categories.

## JTBD

1. When the system needs typed case data, I need `CaseType` and `CaseStudy` types so that case studies have compile-time contracts.
2. When the system needs cases to present, I need all 52 cases seeded with prompts, hints, multi-skill mappings, rubric dimension references, difficulty, and time limits.

## Tasks

### Type definitions
- [x] Add `CaseType` (11 values) and `CaseStudy` type to `frontend/src/lib/types/case-study.ts`
- [x] Export from barrel `index.ts`
- [x] `svelte-check` passes

### Seed data
- [x] Create `frontend/src/lib/data/case-studies.ts`
- [x] Seed 39 skill cases from `PM-OS_Iteration_0_Spec.md` (skill 8 has 4, not 5 — spec gap)
- [x] Seed 8 mock interview cases from `PM-OS_Iteration_0_Spec.md`
- [x] Seed 4 estimation cases from iteration-002 spec
- [x] Add `secondarySkillIds` and `caseType` fields to all cases (best-effort from mapping rules; revisit accuracy once UI is live)

### Verification
- [x] Permanent tests in `frontend/tests/data/case-studies.test.ts`
- [x] 10 validation rules (adjusted for spec gaps):
  1. Every skill (1-7) has 5 primary cases; skill 8 has 4
  2. Every rubric dimension (32) referenced by at least 2 cases
  3. Every case maps to 2+ skills
  4. All 11 case types represented
  5. Mock interviews (cs_mock_1-6) reference dimensions from 5+ skills; cs_mock_7/8 excluded (self-assessment)
  6. No orphan dimension IDs
  7. Case study IDs are unique
  8. 51 total cases (not 52 — spec gap on skill 8)
  9. Difficulty: 34 staff, 17 principal
  10. Time limits are 45 or 60 only
- [x] All 20 tests green (10 skills + 10 case studies)

## Carried forward

- Add cs_8_5 (5th Domain & Market Depth case)
- Review `secondarySkillIds` and `caseType` accuracy once UI renders them
- cs_mock_7/8 span fewer skills than other mocks — revisit breadth

## Notes

51 cases seeded from spec. Skill 8 has 4 cases, not 5 (spec gap). `secondarySkillIds` and `caseType` derived best-effort from mapping rules. No new domain terms introduced.
