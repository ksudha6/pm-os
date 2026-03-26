# PM-OS Iteration Plan v2: LLM-Evaluated Coaching System

## Context

PM-OS was designed as a self-assessed practice tracker. The strategic direction has changed: the system must objectively evaluate PM case study answers using an LLM, grounded in calibration rubrics and a growing PM knowledge base (RAG). Self-assessment is replaced entirely. LLM scores are final.

Iterations 1-3 (skills, case studies, scoring engine) and the UI shell (iteration 04) are built and reusable. The backend is a stub. This plan restructures the remaining iterations with the backend and LLM evaluation as the spine.

## Decisions

- **LLM scores are final** -- no user override
- **LLM provider** -- Claude API (Anthropic SDK), Sonnet for evaluations
- **RAG sources** -- Lenny MCP archive + manual uploads
- **RAG timing** -- deferred past core evaluation loop; iteration 07 evaluates using calibration anchors only, RAG layers in later
- **Skills/case studies stay as frontend static data** -- read-only seed data, no benefit to moving to backend
- **Scoring engine stays on frontend** -- pure functions computing progress from score arrays fetched from backend
- **Auth deferred** -- single-user local tool
- **Adaptive engine** -- can stay client-side since scores are fetched from backend

## Iteration Map

### Completed
| # | Name | Status |
|---|------|--------|
| 01-04 | Skills, case studies, scoring engine, UI shell | Done |
| 05-07 | Backend core: SQLite schema, attempts CRUD, progress API | Done |

### Active (pipeline to working LLM evaluation)
| # | Name | Depends On | What it delivers |
|---|------|------------|-----------------|
| 08 | Skeleton Calibration Data | -- | 32 anchors with generic level descriptions (both stacks), enough to unblock evaluator |
| 09 | Evaluator Module | 08 | `evaluate_answer()` async function, Claude API + tool_use, structured scores |
| 10 | Evaluate Endpoint | 09 | `POST /api/v1/attempts/{id}/evaluate`, persists to eval_scores + evaluations |
| 11 | Frontend API Client | -- | Typed fetch wrapper, attempts/evaluate functions, mocked tests |
| 12 | Frontend Integration | 10, 11 | Replace self-assessment with LLM evaluation display, new phase model |

### Backlog
| # | Name | Depends On | What it delivers |
|---|------|------------|-----------------|
| 13 | Calibration Quality Pass | 12 | Rewrite anchors using Lenny MCP + PM frameworks, user review |
| 14 | Score Display + Reasoning | 12 | `/history/[attemptId]` route, expandable skill rows with evaluation excerpts |
| 15 | Adaptive Engine | 12 | Case recommendation algorithm (client-side) |
| 16 | RAG Pipeline | 10 | Resource ingestion (Lenny MCP + manual), retrieval at eval time |
| 17 | Curriculum Engine | 14, 16 | 60-day plan with RAG-driven resource pairing |
| 18 | Progress + Polish | 14 | Streaks, heatmap, export, responsive polish |

**Critical path: 08 -> 09 -> 10 -> 12 (with 11 independent, done before 12).**

---

## Iteration 05: Calibration Data

**Deliverable:** Authored calibration anchors for all 32 rubric dimensions.

**New type:**
```typescript
// frontend/src/lib/types/calibration.ts
type CalibrationAnchor = {
  dimensionId: string;              // matches RubricDimension.id
  principle: string;                // framework that separates levels
  levels: Record<1 | 2 | 3 | 4 | 5, string>;  // behavioral description per score
  reflectionPrompt: string;         // question to guide honest evaluation
};
```

**Files:**
- `frontend/src/lib/types/calibration.ts`
- `frontend/src/lib/data/calibration.ts` -- 32 authored entries
- `frontend/src/lib/types/index.ts` -- export new type
- `frontend/tests/data/calibration.test.ts` -- validation tests

**Tests:** Every dimension has a matching anchor; every anchor has all 5 levels, non-empty principle and reflection prompt, no duplicate dimensionIds.

---

## Iteration 06: Backend Core

**Deliverable:** SQLite schema and FastAPI endpoints for storing/retrieving attempts and scores.

**Schema (3 tables):** `attempts`, `dimension_scores`, `evaluations`

**Endpoints:**
- `POST /api/v1/attempts` -- create attempt
- `GET /api/v1/attempts` -- list attempts (paginated)
- `GET /api/v1/attempts/{id}` -- get attempt with scores + evaluation
- `GET /api/v1/scores` -- all dimension scores (for frontend progress computation)

---

## Iteration 07: LLM Evaluation Endpoint

**Deliverable:** `POST /api/v1/attempts/{id}/evaluate` -- evaluates a submitted answer using Claude API and stores scores.

**Flow:** Look up attempt -> build prompt with calibration anchors -> call Claude (Sonnet) with tool_use for structured output -> parse per-dimension scores -> insert dimension_scores + evaluation rows -> return full response.

**New files:** `backend/src/evaluator.py`, `backend/src/routes/evaluate.py`

---

## Iteration 08: Frontend Integration

**Deliverable:** Case flow submits to backend, displays LLM evaluation. Self-assessment removed.

**Phase model:** `'prompt' | 'answer' | 'evaluating' | 'results'`

**New frontend files:**
- `frontend/src/lib/api/client.ts` -- fetch wrapper
- `frontend/src/lib/api/attempts.ts` -- createAttempt(), evaluateAttempt(), getScores()

**Store changes:** `user-state.svelte.ts` gains `fetchScores()` from `GET /api/v1/scores`; localStorage becomes cache/fallback.

---

## Iterations 09-13 (later)

- **09:** Score Display + Reasoning -- `/history/[attemptId]` route, expandable skill rows with evaluation excerpts
- **10:** Adaptive Engine -- client-side recommendation algorithm using backend-fetched scores
- **11:** RAG Pipeline -- Lenny MCP + manual uploads, BM25/vector search, injected at eval time
- **12:** Curriculum Engine -- 60-day plan with RAG-driven resource pairing
- **13:** Progress + Polish -- streaks, heatmap, export, responsive polish
