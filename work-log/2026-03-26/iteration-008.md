# Iteration 08 -- Skeleton Calibration Data -- 2026-03-26

## Context

I want to introduce calibration anchors for the 32 rubric dimensions. Each rubric has a name and description.

## JTBD

1. When scoring a user's answer on a dimension, the system needs behavioral descriptions for each score level (1-5) so scores are consistent and explainable.
2. When a user sees their score, they need to understand what that number means in concrete terms.
3. When reviewing an evaluation, the user needs a reflection prompt per dimension to focus their thinking on the right behavior.

## Tasks

- [ ] `backend/src/calibration.py` -- frozen dataclass `CalibrationAnchor` (dimension_id, principle, levels dict[int, str], reflection_prompt) + `CALIBRATION_ANCHORS` tuple of 32 entries
- [ ] `backend/tests/test_calibration.py` -- validation tests
- [ ] `frontend/src/lib/types/calibration.ts` -- `CalibrationAnchor` type
- [ ] `frontend/src/lib/data/calibration.ts` -- 32 exported entries
- [ ] `frontend/src/lib/types/index.ts` -- re-export CalibrationAnchor
- [ ] `frontend/tests/data/calibration.test.ts` -- validation tests
- [ ] Run `make test-backend` and `make test`

## Tests (permanent)

### Backend (`test_calibration.py`)
1. Exactly 32 anchors exist
2. No duplicate dimension_ids
3. Every dimension_id matches pattern `r{1-8}d{1-4}`
4. Full set r1d1 through r8d4 present
5. Each anchor has exactly 5 levels (keys 1-5), all non-empty strings
6. `principle` is non-empty string
7. `reflection_prompt` is non-empty string

### Frontend (`calibration.test.ts`)
1. Exactly 32 anchors exist
2. No duplicate dimensionIds
3. Every dimensionId matches pattern `r{1-8}d{1-4}`
4. Full set r1d1 through r8d4 present
5. Each anchor has exactly 5 levels (keys 1-5), all non-empty strings
6. `principle` is non-empty string
7. `reflectionPrompt` is non-empty string

## Notes
