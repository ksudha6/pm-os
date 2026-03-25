# Iteration 06 — 2026-03-25

## Context

Schema exists (iteration 05). This iteration adds the case study API and seeds the 51 cases into SQLite.

## JTBD

1. When a user wants to browse cases, the system needs to serve them from the backend with filters so the frontend can query by skill, type, difficulty, and time.

## Tasks

- [x] `backend/src/models.py` — Pydantic request/response models (CaseStudyResponse, CaseStudyListResponse)
- [x] `backend/src/routes/cases.py` — GET list (with skill_id, case_type, difficulty, time_limit filters), GET by id
- [x] `backend/src/seed.py` — populate case_studies from Python copy of all 51 frontend cases
- [x] Wire router into main.py, call seed_cases() in lifespan after init_schema()
- [x] Permanent tests (7): list, filter by skill/difficulty/case_type, single fetch, 404, parsed list fields

## Notes

51 cases seeded from Python dict mirroring frontend TypeScript data. JSON array columns (secondary_skill_ids, rubric_dimension_ids, hints) stored as JSON strings, parsed back to lists in API responses. get_db changed to resolve DEFAULT_DB_PATH at call time so test fixtures can monkey-patch it. No new domain terms.
