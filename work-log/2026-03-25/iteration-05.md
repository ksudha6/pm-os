# Iteration 05 — 2026-03-25

## Context

Backend is a stub (one `/health` endpoint). This iteration creates the SQLite schema and database layer.

Scoring model: 5 eval-skills dimensions scored per attempt. LLM scores are final and not overwritten. User can also self-assess; both scores are recorded with source (llm/self) for comparison. A single attempt+dimension can have both an LLM row and a self row.

## JTBD

1. When the backend starts, it needs a database with the correct schema so that subsequent iterations can persist case studies, attempts, scores, and evaluations.

## Tasks

- [x] `backend/src/schema.sql` — 6 tables: users, case_studies, attempts, eval_scores, evaluations, user_progress
- [x] `eval_scores` includes `source` column (llm/self) with UNIQUE(attempt_id, dimension_id, source) allowing both sources per dimension
- [x] Update `backend/src/db.py` — schema init on startup, row_factory, FK enforcement, DB path renamed to `data/pm-os.db`
- [x] Update `backend/src/main.py` — lifespan context manager calls `init_schema()` on startup
- [x] Permanent tests (8): schema creates, WAL mode, FK enforcement, unique constraints, both eval sources coexist, CHECK constraints on difficulty/score range

## Notes

6 tables with CHECK constraints, FK references, and UNIQUE constraints. `eval_scores` allows both LLM and self rows for the same attempt+dimension via `UNIQUE(attempt_id, dimension_id, source)`. DB path renamed from vendor_portal to pm-os. pytest-asyncio configured with `asyncio_mode = "auto"`. New domain terms: Attempt, Evaluation, Eval Score source (llm/self).
