"""
Permanent tests for calibration anchors.
These guard the structural contract of CALIBRATION_ANCHORS across all 32 rubric dimensions.
"""

import re

import pytest

from backend.src.calibration import CALIBRATION_ANCHORS

EXPECTED_COUNT = 32
EXPECTED_DIMENSION_IDS = frozenset(
    f"r{skill}d{dim}" for skill in range(1, 9) for dim in range(1, 5)
)
DIMENSION_ID_PATTERN = re.compile(r"^r[1-8]d[1-4]$")


def test_exactly_32_anchors() -> None:
    assert len(CALIBRATION_ANCHORS) == EXPECTED_COUNT


def test_no_duplicate_dimension_ids() -> None:
    ids = [a.dimension_id for a in CALIBRATION_ANCHORS]
    assert len(ids) == len(set(ids)), "Duplicate dimension_ids found"


def test_all_dimension_ids_match_pattern() -> None:
    invalid = [
        a.dimension_id
        for a in CALIBRATION_ANCHORS
        if not DIMENSION_ID_PATTERN.match(a.dimension_id)
    ]
    assert invalid == [], f"Invalid dimension_id format: {invalid}"


def test_full_set_r1d1_through_r8d4_present() -> None:
    actual_ids = frozenset(a.dimension_id for a in CALIBRATION_ANCHORS)
    missing = EXPECTED_DIMENSION_IDS - actual_ids
    assert missing == frozenset(), f"Missing dimension_ids: {missing}"


def test_each_anchor_has_exactly_five_levels() -> None:
    for anchor in CALIBRATION_ANCHORS:
        assert set(anchor.levels.keys()) == {1, 2, 3, 4, 5}, (
            f"{anchor.dimension_id}: expected keys {{1,2,3,4,5}}, got {set(anchor.levels.keys())}"
        )


def test_all_level_values_are_non_empty_strings() -> None:
    for anchor in CALIBRATION_ANCHORS:
        for level, text in anchor.levels.items():
            assert isinstance(text, str) and text.strip(), (
                f"{anchor.dimension_id} level {level}: empty or non-string value"
            )


def test_principle_is_non_empty_string() -> None:
    for anchor in CALIBRATION_ANCHORS:
        assert isinstance(anchor.principle, str) and anchor.principle.strip(), (
            f"{anchor.dimension_id}: principle is empty"
        )


def test_reflection_prompt_is_non_empty_string() -> None:
    for anchor in CALIBRATION_ANCHORS:
        assert isinstance(anchor.reflection_prompt, str) and anchor.reflection_prompt.strip(), (
            f"{anchor.dimension_id}: reflection_prompt is empty"
        )


def test_all_entries_have_skeleton_true() -> None:
    non_skeleton = [a.dimension_id for a in CALIBRATION_ANCHORS if not a.skeleton]
    assert non_skeleton == [], f"Anchors with skeleton=False: {non_skeleton}"
