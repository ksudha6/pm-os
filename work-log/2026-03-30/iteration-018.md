# Iteration 018 -- Wire RAG Retrieval into Evaluator -- 2026-03-30

## Context

Iteration 017 built a retrieval layer over Lenny MCP content stored in SQLite FTS5. The evaluator system prompt currently contains only the case prompt, user answer, and calibration anchors. Retrieved PM framework content needs to be injected at eval time so the model can reference real frameworks when reasoning about scores.

## JTBD

1. When the evaluator runs for a case, relevant Lenny MCP chunks are retrieved by case topic and included in the system prompt alongside calibration anchors.
2. When no relevant chunks exist for a topic, the evaluator runs without RAG context and the absence is logged.
