import type { AttemptResponse, EvaluationResponse, EvalScoreResponse } from '$lib/types/index.js';
import { apiFetch } from './client.js';

export function createAttempt(userId: string, caseStudyId: string): Promise<AttemptResponse> {
	return apiFetch<AttemptResponse>('POST', '/api/v1/attempts', {
		user_id: userId,
		case_study_id: caseStudyId
	});
}

export function submitAttempt(
	attemptId: string,
	answerText: string,
	timeSpentSeconds: number
): Promise<AttemptResponse> {
	return apiFetch<AttemptResponse>('PUT', `/api/v1/attempts/${attemptId}/submit`, {
		answer_text: answerText,
		time_spent_seconds: timeSpentSeconds
	});
}

export function evaluateAttempt(attemptId: string): Promise<EvaluationResponse> {
	return apiFetch<EvaluationResponse>('POST', `/api/v1/attempts/${attemptId}/evaluate`);
}

export function getScores(userId: string): Promise<EvalScoreResponse[]> {
	return apiFetch<EvalScoreResponse[]>('GET', `/api/v1/progress/${userId}/scores`);
}
