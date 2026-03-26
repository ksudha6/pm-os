"""
Permanent tests for the evaluator module.
All tests mock AsyncAnthropic so no live API calls are made.
"""

import json
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import anthropic
import pytest

from backend.src.calibration import CalibrationAnchor
from backend.src.evaluator import (
    DimensionScoreResult,
    EvaluationError,
    EvaluationResult,
    evaluate_answer,
)

# ---------------------------------------------------------------------------
# Test data
# ---------------------------------------------------------------------------

CASE_PROMPT = "You are the PM for a B2B payments product. Describe how you would prioritise the roadmap."
ANSWER_TEXT = "I would start by interviewing customers to understand their top pain points, then map those to business impact."

ANCHOR_R1D1 = CalibrationAnchor(
    dimension_id="r1d1",
    principle="Frequency and depth of direct, unproxied customer contact builds genuine understanding.",
    levels={
        1: "Rarely speaks with customers.",
        2: "Occasionally joins calls.",
        3: "Regularly conducts weekly conversations.",
        4: "Maintains sustained deep relationships.",
        5: "Makes customer contact a non-negotiable personal practice.",
    },
    reflection_prompt="How often do you speak with customers?",
    skeleton=True,
)

ANCHOR_R2D1 = CalibrationAnchor(
    dimension_id="r2d1",
    principle="Rapid accurate assessment of user need and business viability is the core of product sense.",
    levels={
        1: "Takes days or weeks to form a view.",
        2: "Can evaluate with time and prompting.",
        3: "Evaluates ideas in real-time within minutes.",
        4: "Rapid evaluation is consistently accurate.",
        5: "Sets the speed-and-accuracy benchmark.",
    },
    reflection_prompt="How do you evaluate a new feature idea in the moment?",
    skeleton=True,
)

ANCHORS: tuple[CalibrationAnchor, ...] = (ANCHOR_R1D1, ANCHOR_R2D1)

MODEL_NAME = "claude-sonnet-4-20250514"
INPUT_TOKENS = 512
OUTPUT_TOKENS = 128

SCORE_ENTRIES = [
    {"dimension_id": "r1d1", "score": 3, "reasoning": "Candidate described weekly customer calls."},
    {"dimension_id": "r2d1", "score": 2, "reasoning": "Candidate showed some product sense but lacked speed."},
]


# ---------------------------------------------------------------------------
# Mock helpers
# ---------------------------------------------------------------------------

def _build_mock_response(scores: list[dict] | None = None) -> MagicMock:
    """Return a mock Anthropic response with a tool_use content block."""
    if scores is None:
        scores = SCORE_ENTRIES

    tool_block = MagicMock()
    tool_block.type = "tool_use"
    tool_block.input = {"scores": scores}

    usage = SimpleNamespace(input_tokens=INPUT_TOKENS, output_tokens=OUTPUT_TOKENS)

    response = MagicMock()
    response.content = [tool_block]
    response.model = MODEL_NAME
    response.usage = usage
    response.model_dump.return_value = {"id": "msg_test", "model": MODEL_NAME}

    return response


def _make_client(response: MagicMock) -> AsyncMock:
    """Wrap a mock response in an async client mock."""
    client = MagicMock()
    client.messages = MagicMock()
    client.messages.create = AsyncMock(return_value=response)
    return client


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_happy_path_returns_correct_evaluation_result() -> None:
    """Happy path: valid tool_use response produces fully populated EvaluationResult."""
    client = _make_client(_build_mock_response())
    result = await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    assert isinstance(result, EvaluationResult)
    assert len(result.scores) == 2

    assert result.scores[0] == DimensionScoreResult(
        dimension_id="r1d1", score=3, reasoning="Candidate described weekly customer calls."
    )
    assert result.scores[1] == DimensionScoreResult(
        dimension_id="r2d1", score=2, reasoning="Candidate showed some product sense but lacked speed."
    )

    assert result.model == MODEL_NAME
    assert result.prompt_tokens == INPUT_TOKENS
    assert result.completion_tokens == OUTPUT_TOKENS
    assert isinstance(result.raw_response, str)
    parsed = json.loads(result.raw_response)
    assert "model" in parsed


@pytest.mark.asyncio
async def test_system_prompt_contains_case_prompt() -> None:
    """The system parameter passed to the API contains the case prompt text."""
    client = _make_client(_build_mock_response())
    await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    _, kwargs = client.messages.create.call_args
    assert CASE_PROMPT in kwargs["system"]


@pytest.mark.asyncio
async def test_system_prompt_contains_answer_text() -> None:
    """The system parameter passed to the API contains the answer text."""
    client = _make_client(_build_mock_response())
    await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    _, kwargs = client.messages.create.call_args
    assert ANSWER_TEXT in kwargs["system"]


@pytest.mark.asyncio
async def test_system_prompt_contains_anchor_level_descriptions() -> None:
    """The system parameter contains all 5 level descriptions for every anchor passed in."""
    client = _make_client(_build_mock_response())
    await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    _, kwargs = client.messages.create.call_args
    system_text: str = kwargs["system"]

    for anchor in ANCHORS:
        for level_text in anchor.levels.values():
            assert level_text in system_text, (
                f"Level description missing from system prompt: {level_text!r}"
            )


@pytest.mark.asyncio
async def test_system_prompt_contains_evaluation_instruction() -> None:
    """System prompt includes the required evaluation instruction about PM thinking over writing style."""
    instruction = "Evaluate the quality of PM thinking, not writing style"
    client = _make_client(_build_mock_response())
    await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    _, kwargs = client.messages.create.call_args
    assert instruction in kwargs["system"]


@pytest.mark.asyncio
async def test_api_call_uses_temperature_zero() -> None:
    """The API call is made with temperature=0 to ensure deterministic scoring."""
    client = _make_client(_build_mock_response())
    await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    _, kwargs = client.messages.create.call_args
    assert kwargs["temperature"] == 0


@pytest.mark.asyncio
async def test_score_out_of_range_raises_evaluation_error() -> None:
    """Scores outside 1-5 in the tool_use response raise EvaluationError."""
    bad_scores = [
        {"dimension_id": "r1d1", "score": 6, "reasoning": "Out of range high."},
    ]
    client = _make_client(_build_mock_response(scores=bad_scores))

    with pytest.raises(EvaluationError, match="out of range"):
        await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)


@pytest.mark.asyncio
async def test_score_zero_raises_evaluation_error() -> None:
    """Score of 0 is also out of range and raises EvaluationError."""
    bad_scores = [
        {"dimension_id": "r1d1", "score": 0, "reasoning": "Zero is invalid."},
    ]
    client = _make_client(_build_mock_response(scores=bad_scores))

    with pytest.raises(EvaluationError, match="out of range"):
        await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)


@pytest.mark.asyncio
async def test_no_tool_use_block_raises_evaluation_error() -> None:
    """Response with no tool_use content block raises EvaluationError."""
    text_block = MagicMock()
    text_block.type = "text"

    response = MagicMock()
    response.content = [text_block]
    response.model = MODEL_NAME
    response.usage = SimpleNamespace(input_tokens=INPUT_TOKENS, output_tokens=OUTPUT_TOKENS)
    response.model_dump.return_value = {}

    client = _make_client(response)

    with pytest.raises(EvaluationError, match="No tool_use content block"):
        await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)


@pytest.mark.asyncio
async def test_malformed_tool_input_raises_evaluation_error() -> None:
    """Malformed tool_use input (missing required keys) raises EvaluationError."""
    tool_block = MagicMock()
    tool_block.type = "tool_use"
    # Input is missing 'score' key
    tool_block.input = {"scores": [{"dimension_id": "r1d1", "reasoning": "No score key."}]}

    response = MagicMock()
    response.content = [tool_block]
    response.model = MODEL_NAME
    response.usage = SimpleNamespace(input_tokens=INPUT_TOKENS, output_tokens=OUTPUT_TOKENS)
    response.model_dump.return_value = {}

    client = _make_client(response)

    with pytest.raises(EvaluationError):
        await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)


@pytest.mark.asyncio
async def test_api_error_raises_evaluation_error_with_cause() -> None:
    """anthropic.APIError from the client is wrapped in EvaluationError with __cause__ set."""
    client = MagicMock()
    client.messages = MagicMock()

    original_error = anthropic.APIStatusError(
        message="Internal Server Error",
        response=MagicMock(status_code=500, headers={}),
        body={"error": {"message": "Internal Server Error", "type": "server_error"}},
    )
    client.messages.create = AsyncMock(side_effect=original_error)

    with pytest.raises(EvaluationError) as exc_info:
        await evaluate_answer(CASE_PROMPT, ANSWER_TEXT, ANCHORS, client=client)

    assert exc_info.value.__cause__ is original_error
