# Iteration 13 -- Backend Prerequisites for Frontend -- 2026-03-26

## Context

Frontend will call the backend API from a different port (5173 -> 8000). The `attempts` table has a FK to `users(id)` but no user row exists.

## JTBD

1. When the frontend makes API calls to the backend, the browser needs CORS headers to allow cross-origin requests.
2. When creating an attempt with `user_id = 'default-user'`, the database needs a matching user row to satisfy the FK constraint.

## Tasks

1. [x] Add CORS middleware to `backend/src/main.py`: allow origin `http://localhost:5173`, all methods, all headers
2. [x] Seed a default user in `backend/src/seed.py`: insert `('default-user', 'Default User')` into `users` table if not exists
3. [x] Run `make test-backend`

## Tests (permanent)

1. Default user row exists after DB init
2. CORS headers present on API responses (test with `OPTIONS` preflight)

## Notes
