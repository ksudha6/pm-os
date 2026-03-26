export type AttemptResponse = {
	id: string;
	user_id: string;
	case_study_id: string;
	answer_text: string;
	started_at: string;
	submitted_at: string | null;
	time_spent_seconds: number | null;
};

export type DimensionScoreResult = {
	dimension_id: string;
	score: number;
	reasoning: string;
};

export type EvaluationResponse = {
	attempt_id: string;
	scores: DimensionScoreResult[];
	model: string;
	created_at: string;
};

export type EvalScoreResponse = {
	id: string;
	attempt_id: string;
	dimension_id: string;
	score: number;
	source: string;
	created_at: string;
};

export class ApiError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.name = 'ApiError';
	}
}
