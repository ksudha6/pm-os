# Iteration 016 -- Fix Ratchet Test for Skeleton Migration -- 2026-03-30

## Context

Iteration 08 added a `skeleton` boolean to `CalibrationAnchor`. The current permanent test asserts `skeleton=True` on all 32 entries. Calibration anchor replacement will be incremental -- one skill per iteration -- so the test will fail as soon as the first skill is replaced. Mixed states must be valid from this point forward.

## JTBD

1. When a calibration anchor is replaced in any iteration, the test suite accepts partial migration without failing.
2. When all 32 anchors are eventually replaced, the test confirms full migration.
