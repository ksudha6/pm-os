# Iteration 07 — 2026-03-25

## Context

Schema and case study API exist (iterations 05-06). This iteration adds the attempts and progress endpoints.

## JTBD

1. When a user submits a case study answer, the system needs to persist it so evaluations and history are durable across sessions.
2. When a user checks progress, the system needs to return their eval scores and skill coverage so the frontend can compute the three views (overall, by skill, diagnostic).

## Tasks

- [x] `backend/src/routes/attempts.py` — POST create, GET list (paginated), GET by id, PUT submit, POST scores
- [x] `backend/src/routes/progress.py` — GET eval-scores, GET coverage (all 8 skills zero-filled), GET combined
- [x] Wire routers into main.py
- [x] Pydantic models: CreateAttemptRequest, SubmitAttemptRequest, EvalScoreCreate, AttemptResponse, AttemptListResponse, EvalScoreResponse, SkillCoverageResponse, ProgressResponse
- [x] Permanent tests (11): create, list, pagination, get by id, 404, submit, add scores, scores 404, progress scores, coverage, combined

## Notes

Attempts support full lifecycle: create, list with pagination, submit answer, add scores. Scores endpoint uses INSERT OR REPLACE so re-scoring overwrites. Progress coverage returns all 8 skills zero-filled for unpracticed ones. No new domain terms.
