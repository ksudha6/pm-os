# Iteration 07 — 2026-03-25

## Context

Schema and case study API exist (iterations 05-06). This iteration adds the attempts and progress endpoints.

## JTBD

1. When a user submits a case study answer, the system needs to persist it so evaluations and history are durable across sessions.
2. When a user checks progress, the system needs to return their eval scores and skill coverage so the frontend can compute the three views (overall, by skill, diagnostic).

## Tasks

- [ ] `backend/src/routes/attempts.py` — POST create, GET list, GET by id
- [ ] `backend/src/routes/progress.py` — GET eval-scores, GET coverage, GET progress
- [ ] Wire routers into main.py
- [ ] Permanent tests: CRUD, pagination, coverage grouping
