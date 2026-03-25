-- users
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- case_studies (mirrors frontend seed data, seeded from Python)
CREATE TABLE IF NOT EXISTS case_studies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    case_type TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('staff', 'principal')),
    context TEXT NOT NULL CHECK (context IN ('B2C', 'B2B', 'Mixed')),
    time_limit INTEGER NOT NULL CHECK (time_limit IN (45, 60)),
    primary_skill_id INTEGER NOT NULL,
    secondary_skill_ids TEXT NOT NULL DEFAULT '[]',
    rubric_dimension_ids TEXT NOT NULL DEFAULT '[]',
    hints TEXT NOT NULL DEFAULT '[]'
);

-- attempts (a user's answer to a case)
CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    case_study_id TEXT NOT NULL REFERENCES case_studies(id),
    answer_text TEXT NOT NULL DEFAULT '',
    started_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    submitted_at TEXT,
    time_spent_seconds INTEGER
);

-- eval_scores (one row per dimension per source per attempt)
-- A single attempt+dimension can have BOTH an 'llm' and a 'self' row
CREATE TABLE IF NOT EXISTS eval_scores (
    id TEXT PRIMARY KEY,
    attempt_id TEXT NOT NULL REFERENCES attempts(id),
    dimension_id TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
    source TEXT NOT NULL CHECK (source IN ('llm', 'self')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE(attempt_id, dimension_id, source)
);

-- evaluations (full LLM evaluation response for an attempt)
CREATE TABLE IF NOT EXISTS evaluations (
    id TEXT PRIMARY KEY,
    attempt_id TEXT NOT NULL REFERENCES attempts(id) UNIQUE,
    raw_response TEXT NOT NULL,
    model TEXT NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- user_progress (computed/cached skill progress snapshot)
CREATE TABLE IF NOT EXISTS user_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    skill_id INTEGER NOT NULL,
    average_score REAL NOT NULL DEFAULT 0.0,
    total_attempts INTEGER NOT NULL DEFAULT 0,
    trend TEXT NOT NULL DEFAULT 'stable' CHECK (trend IN ('improving', 'stable', 'declining')),
    last_practiced_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE(user_id, skill_id)
);
