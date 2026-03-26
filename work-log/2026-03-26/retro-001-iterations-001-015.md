# Retrospective 001 -- Iterations 001-015 -- 2026-03-26

## Content authoring does not belong in code iterations

Iteration 15 asked the agent to write 160 behavioral descriptions grounded in PM frameworks (Cagan, Torres, Gupta, Huryn). This is content authoring, not programming. An LLM generating framework-attributed descriptions will produce plausible text that may not reflect what those authors actually wrote. The result is hallucinated authority -- sentences that sound like Cagan but aren't.

Content that requires domain accuracy and source fidelity should be authored by the human (or researched with verifiable retrieval like Lenny MCP, then human-reviewed). The code iteration should only wire in content that already exists as a reviewed artifact.

**Rule going forward:** separate content authoring from code implementation. If an iteration requires domain-accurate text (rubric descriptions, framework references, curated examples), the human authors or reviews the content outside the iteration flow. The iteration receives the content as input and wires it into the system. The agent's job is structure and plumbing, not domain prose.

## Iteration sizing

Iterations 01-14 held to the "small and focused" rule. Each touched one module, one concern, one commit. Iteration 15 broke the pattern: 160 level descriptions, 16 reference answers, LLM validation, dual-stack writes, and a single commit checkpoint. It was a content project disguised as an iteration.

**Rule going forward:** if an iteration has more than one axis of work (research, writing, validation), split along the axes. If a task says "repeat for N items", each item is its own iteration unless N fits in a single sub-agent prompt without context pressure.

## Incremental data migration

Iteration 08 added a `skeleton` boolean to calibration anchors specifically to support incremental rollout. Iteration 15 ignored this and planned an atomic flip of all 32 anchors. The test suite reinforced the problem: it asserted `skeleton=True` on all entries, making partial progress a test failure.

**Rule going forward:** when introducing a migration flag (skeleton, deprecated, draft), write the test to allow mixed states from day one. Add a ratchet test ("at least N entries are non-skeleton") that increments with each iteration.

## Research tasks need artifacts

Tasks 1-8 in iteration 15 said "search Lenny MCP for behavioral descriptions." No output format, no definition of done, no written artifact. If context resets mid-research, everything is lost.

**Rule going forward:** every research task produces a written file in `work-log/YYYY-MM-DD/research-{topic}.md` with sourced quotes and framework references. That file becomes the input for the implementation task. Research and implementation are separate iterations.

## Validation loops are not tasks

Task 12 said "run reference answers through the evaluator; if scores don't land, adjust anchors until they do." That's an open-ended loop with three variables (anchor text, reference answer, evaluator prompt) and no exit condition.

**Rule going forward:** validation tasks must define an exit condition. "If scores miss after 2 adjustment rounds, document the gap and move on" is acceptable. "Adjust until they do" is not.

## Dual-stack duplication

Backend Python and frontend TypeScript contain identical calibration content. Writing 160 descriptions twice doubles token cost and error surface.

**Rule going forward:** for shared data, write the canonical version once (backend), then delegate a sub-agent to transpose it mechanically. Or generate both from a single JSON/YAML source. Never hand-write the same content in two languages.

## Sub-agent delegation gaps

CLAUDE.md says "use Sonnet sub-agents extensively to prevent context rot." Iteration 15 planned no delegation despite being the most context-heavy iteration to date. 160 descriptions plus 16 reference answers plus Lenny MCP research output would burn 15-20k tokens of context before any code.

**Rule going forward:** any iteration that produces more than ~2k tokens of content must delegate the writing to sub-agents. The main context holds the plan and reviews results; sub-agents do the bulk writing.

## Review batch size

Task 14 asked the user to review all 32 anchors at once. Reviewing 160 descriptions in one pass produces rubber-stamp approvals, not real feedback.

**Rule going forward:** review batches of 4 dimensions (one skill) at a time. Smaller batches surface real objections.
