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


class CreateAttemptRequest(BaseModel):
    user_id: str
    case_study_id: str
    answer_text: str = ""


class SubmitAttemptRequest(BaseModel):
    answer_text: str
    time_spent_seconds: int | None = None


class EvalScoreCreate(BaseModel):
    dimension_id: str
    score: int  # 1-5
    source: str  # 'llm' or 'self'


class AttemptResponse(BaseModel):
    id: str
    user_id: str
    case_study_id: str
    answer_text: str
    started_at: str
    submitted_at: str | None
    time_spent_seconds: int | None


class AttemptListResponse(BaseModel):
    attempts: list[AttemptResponse]
    total: int


class EvalScoreResponse(BaseModel):
    id: str
    attempt_id: str
    dimension_id: str
    score: int
    source: str
    created_at: str


class SkillCoverageResponse(BaseModel):
    skill_id: int
    attempts_count: int
    last_practiced_at: str | None


class ProgressResponse(BaseModel):
    eval_scores: list[EvalScoreResponse]
    coverage: list[SkillCoverageResponse]


class DimensionScoreResultResponse(BaseModel):
    dimension_id: str
    score: int
    reasoning: str


class EvaluationResponse(BaseModel):
    attempt_id: str
    scores: list[DimensionScoreResultResponse]
    model: str
    created_at: str
