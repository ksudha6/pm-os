"""
Evaluator calls the Anthropic API to score a PM's answer against calibration anchors.
Each dimension receives a score (1-5) and reasoning via forced tool use.
"""

import json
from dataclasses import dataclass

import anthropic
from anthropic import AsyncAnthropic

from backend.src.calibration import CalibrationAnchor


@dataclass(frozen=True)
class DimensionScoreResult:
    dimension_id: str
    score: int
    reasoning: str


@dataclass(frozen=True)
class EvaluationResult:
    scores: list[DimensionScoreResult]
    raw_response: str
    model: str
    prompt_tokens: int
    completion_tokens: int


class EvaluationError(Exception):
    """Raised when evaluation fails for any reason."""


_RECORD_SCORES_TOOL = {
    "name": "record_scores",
    "description": "Record the evaluation scores for each dimension.",
    "input_schema": {
        "type": "object",
        "properties": {
            "scores": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "dimension_id": {"type": "string"},
                        "score": {"type": "integer"},
                        "reasoning": {"type": "string"},
                    },
                    "required": ["dimension_id", "score", "reasoning"],
                },
            }
        },
        "required": ["scores"],
    },
}


def _build_system_prompt(
    case_prompt: str,
    answer_text: str,
    anchors: tuple[CalibrationAnchor, ...],
) -> str:
    parts: list[str] = []

    parts.append("## Case Prompt")
    parts.append(case_prompt.strip())
    parts.append("")

    parts.append("## Candidate Answer")
    parts.append(answer_text.strip())
    parts.append("")

    parts.append("## Evaluation Instruction")
    parts.append(
        "Evaluate the quality of PM thinking, not writing style. "
        "A messy answer with strong insight scores higher than a polished answer with shallow thinking."
    )
    parts.append("")

    parts.append("## PM Skill Framework")
    parts.append(
        "The framework covers 8 PM skills, each with 4 dimensions. "
        "Score each dimension on a 1-5 scale using the behavioral anchors below."
    )
    parts.append("")

    for anchor in anchors:
        parts.append(f"### Dimension: {anchor.dimension_id}")
        parts.append(f"**Principle:** {anchor.principle}")
        parts.append("")
        parts.append("**Level descriptions:**")
        for level in range(1, 6):
            parts.append(f"- Level {level}: {anchor.levels[level]}")
        parts.append("")

    return "\n".join(parts)


async def evaluate_answer(
    case_prompt: str,
    answer_text: str,
    anchors: tuple[CalibrationAnchor, ...],
    client: AsyncAnthropic | None = None,
) -> EvaluationResult:
    """Score a PM answer against the given calibration anchors.

    Calls the Anthropic API with forced tool use so every dimension receives
    a structured score and reasoning string.
    """
    system_prompt = _build_system_prompt(case_prompt, answer_text, anchors)

    if client is None:
        client = AsyncAnthropic()

    try:
        response = await client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            temperature=0,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Please evaluate the candidate answer using the record_scores tool. "
                        "Score every dimension listed in the framework."
                    ),
                }
            ],
            tools=[_RECORD_SCORES_TOOL],
            tool_choice={"type": "tool", "name": "record_scores"},
        )
    except anthropic.APIError as exc:
        raise EvaluationError(f"Anthropic API error: {exc}") from exc

    # Find the tool_use content block.
    tool_use_block = next(
        (block for block in response.content if block.type == "tool_use"),
        None,
    )
    if tool_use_block is None:
        raise EvaluationError(
            "No tool_use content block in response; expected record_scores call."
        )

    try:
        raw_scores: list[dict] = tool_use_block.input["scores"]
    except (KeyError, TypeError) as exc:
        raise EvaluationError(f"Malformed tool input: {exc}") from exc

    dimension_scores: list[DimensionScoreResult] = []
    for entry in raw_scores:
        try:
            score_value = int(entry["score"])
            dimension_id = entry["dimension_id"]
            reasoning = entry["reasoning"]
        except (KeyError, TypeError, ValueError) as exc:
            raise EvaluationError(f"Invalid score entry {entry!r}: {exc}") from exc

        if not (1 <= score_value <= 5):
            raise EvaluationError(
                f"Score {score_value} for dimension {entry.get('dimension_id')!r} "
                "is out of range; must be 1-5."
            )

        dimension_scores.append(
            DimensionScoreResult(
                dimension_id=dimension_id,
                score=score_value,
                reasoning=reasoning,
            )
        )

    return EvaluationResult(
        scores=dimension_scores,
        raw_response=json.dumps(response.model_dump()),
        model=response.model,
        prompt_tokens=response.usage.input_tokens,
        completion_tokens=response.usage.output_tokens,
    )
