from pydantic import BaseModel


class CaseStudyResponse(BaseModel):
    id: str
    title: str
    prompt: str
    case_type: str
    difficulty: str
    context: str
    time_limit: int
    primary_skill_id: int
    secondary_skill_ids: list[int]
    rubric_dimension_ids: list[str]
    hints: list[str]


class CaseStudyListResponse(BaseModel):
    cases: list[CaseStudyResponse]
    total: int
