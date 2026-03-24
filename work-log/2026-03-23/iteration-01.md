# Iteration 01 — 2026-03-23

## Context

PM-OS is an interactive learning system for Staff/Principal PM interview preparation. It covers 8 core skills derived from Cagan, Torres, Huryn, and Gupta frameworks.

This iteration builds the data foundation: TypeScript types for skills, seed data for all 8 skills, and a vitest suite to prove data integrity. Nothing renders in the browser yet.

Tech stack: SvelteKit 2 + Svelte 5, adapter-static, TypeScript. No backend. Full spec in `spec/outputs/PM-OS_Iteration_0_Spec.md`.

## JTBD

1. When the project needs typed data modules, I need TypeScript type definitions for Skill, RubricDimension, ThoughtLeaderMapping so that skill data has compile-time contracts.
2. When the system needs skill data, I need all 8 skills seeded with their definitions, acid tests, staff/principal focus, 32 rubric dimensions, and thought leader mappings so that case studies and scoring can reference them.
3. When I want confidence in the skill data, I need a test suite that validates: weights sum to 100%, rubric dimension IDs are unique and correctly formatted, each skill has exactly 4 dimensions and 4 thought leader mappings, and the dependency graph matches the spec so that data integrity is guaranteed before building on top of it.

## Tasks

### JTBD 1 — Type definitions
- [x] Create `frontend/src/lib/types/skill.ts`: Skill, RubricDimension, ThoughtLeaderMapping types
- [x] Create `frontend/src/lib/types/index.ts`: barrel export
- [x] `svelte-check` passes with no errors

### JTBD 2 — Skill seed data
- [x] Create `frontend/src/lib/data/skills.ts`
- [x] Seed skills 1-4 (User Empathy, Product Sense, Strategy, Business Acumen)
- [x] Seed skills 5-8 (Discovery, Data Fluency, Leadership, Domain Depth)

### JTBD 3 — Test suite

**Permanent tests** (`frontend/tests/data/skills.test.ts`):
- [x] Install vitest, configure for SvelteKit
- [x] Write and run 10 tests:
  1. Contains exactly 8 skills
  2. Skill IDs are 1 through 8
  3. Weights sum to 100
  4. Each skill has exactly 4 rubric dimensions
  5. All 32 rubric dimension IDs are unique
  6. Rubric dimension IDs match format `r{skillId}d{1-4}`
  7. Each skill has exactly 4 thought leader mappings
  8. Thought leader mappings cover all 4 leaders (Cagan, Torres, Gupta, Huryn)
  9. Every skill has non-empty definition, acidTest, staffFocus, principalFocus
  10. Dependency graph matches spec (1:[], 2:[1], 3:[2], 4:[3], 5:[2], 6:[5], 7:[4,6], 8:[4,6])
- [x] All tests green (10/10 passed)

**Scratch tests**: None. No UI or behavior to verify in this iteration.

## Notes

Types, skill data, and tests built. 8 skills with 32 rubric dimensions and 32 thought leader mappings seeded from spec. Vitest configured with SvelteKit $lib alias. 10 data integrity tests validate weights, IDs, formats, leader coverage, non-empty fields, and dependency graph. svelte-check and vitest both pass clean.
