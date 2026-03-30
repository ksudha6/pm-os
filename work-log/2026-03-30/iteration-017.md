# Iteration 017 -- RAG Ingestion: Lenny MCP to SQLite FTS5 -- 2026-03-30

## Context

The evaluator scores answers against calibration anchor descriptions with no external domain knowledge. Lenny MCP holds PM framework content across skills, frameworks, and behaviors. Before anchors can reference real PM discourse and before the evaluator can ground scores in published frameworks, there needs to be a retrieval layer that can serve relevant content by topic at eval time.

## JTBD

1. When a case topic is queried, the system returns ranked Lenny MCP chunks relevant to that topic.
2. When the ingestion pipeline runs, Lenny MCP content is stored in SQLite FTS5 so it can be retrieved without calling the MCP at eval time.
