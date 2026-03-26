import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createAttempt, submitAttempt, evaluateAttempt, getScores } from '$lib/api/attempts';
import { ApiError } from '$lib/types/index.js';
import type { AttemptResponse, EvaluationResponse, EvalScoreResponse } from '$lib/types/index.js';

const USER_ID = 'user-abc';
const CASE_STUDY_ID = 'case-001';
const ATTEMPT_ID = 'attempt-xyz';

function makeResponse(body: unknown, status = 200): Response {
	return {
		ok: status >= 200 && status < 300,
		status,
		statusText: status === 200 ? 'OK' : 'Error',
		json: () => Promise.resolve(body)
	} as unknown as Response;
}

beforeEach(() => {
	vi.restoreAllMocks();
});

describe('createAttempt', () => {
	it('sends POST to /api/v1/attempts with user_id and case_study_id, returns AttemptResponse', async () => {
		const expected: AttemptResponse = {
			id: ATTEMPT_ID,
			user_id: USER_ID,
			case_study_id: CASE_STUDY_ID,
			answer_text: '',
			started_at: '2026-01-01T00:00:00Z',
			submitted_at: null,
			time_spent_seconds: null
		};
		const fetchMock = vi.fn().mockResolvedValue(makeResponse(expected));
		globalThis.fetch = fetchMock;

		const result = await createAttempt(USER_ID, CASE_STUDY_ID);

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe('http://localhost:8000/api/v1/attempts');
		expect(init.method).toBe('POST');
		expect(JSON.parse(init.body)).toEqual({ user_id: USER_ID, case_study_id: CASE_STUDY_ID });
		expect(result).toEqual(expected);
	});
});

describe('submitAttempt', () => {
	it('sends PUT to /api/v1/attempts/{id}/submit with answer_text and time_spent_seconds', async () => {
		const ANSWER = 'My answer text';
		const TIME = 120;
		const expected: AttemptResponse = {
			id: ATTEMPT_ID,
			user_id: USER_ID,
			case_study_id: CASE_STUDY_ID,
			answer_text: ANSWER,
			started_at: '2026-01-01T00:00:00Z',
			submitted_at: '2026-01-01T00:02:00Z',
			time_spent_seconds: TIME
		};
		const fetchMock = vi.fn().mockResolvedValue(makeResponse(expected));
		globalThis.fetch = fetchMock;

		const result = await submitAttempt(ATTEMPT_ID, ANSWER, TIME);

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe(`http://localhost:8000/api/v1/attempts/${ATTEMPT_ID}/submit`);
		expect(init.method).toBe('PUT');
		expect(JSON.parse(init.body)).toEqual({ answer_text: ANSWER, time_spent_seconds: TIME });
		expect(result).toEqual(expected);
	});
});

describe('evaluateAttempt', () => {
	it('sends POST to /api/v1/attempts/{id}/evaluate, returns EvaluationResponse with scores array', async () => {
		const expected: EvaluationResponse = {
			attempt_id: ATTEMPT_ID,
			scores: [
				{ dimension_id: 'r1d1', score: 4, reasoning: 'Good clarity' },
				{ dimension_id: 'r1d2', score: 3, reasoning: 'Adequate depth' }
			],
			model: 'gpt-4o',
			created_at: '2026-01-01T00:05:00Z'
		};
		const fetchMock = vi.fn().mockResolvedValue(makeResponse(expected));
		globalThis.fetch = fetchMock;

		const result = await evaluateAttempt(ATTEMPT_ID);

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe(`http://localhost:8000/api/v1/attempts/${ATTEMPT_ID}/evaluate`);
		expect(init.method).toBe('POST');
		expect(init.body).toBeUndefined();
		expect(result).toEqual(expected);
		expect(result.scores).toHaveLength(2);
	});
});

describe('getScores', () => {
	it('sends GET to /api/v1/progress/{userId}/scores, returns EvalScoreResponse[]', async () => {
		const expected: EvalScoreResponse[] = [
			{
				id: 'score-1',
				attempt_id: ATTEMPT_ID,
				dimension_id: 'r1d1',
				score: 4,
				source: 'llm',
				created_at: '2026-01-01T00:05:00Z'
			},
			{
				id: 'score-2',
				attempt_id: ATTEMPT_ID,
				dimension_id: 'r1d2',
				score: 3,
				source: 'llm',
				created_at: '2026-01-01T00:05:00Z'
			}
		];
		const fetchMock = vi.fn().mockResolvedValue(makeResponse(expected));
		globalThis.fetch = fetchMock;

		const result = await getScores(USER_ID);

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe(`http://localhost:8000/api/v1/progress/${USER_ID}/scores`);
		expect(init.method).toBe('GET');
		expect(result).toEqual(expected);
		expect(result).toHaveLength(2);
	});
});

describe('error handling', () => {
	it('throws ApiError with correct status on non-200 response', async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(makeResponse({ detail: 'Not found' }, 404));
		globalThis.fetch = fetchMock;

		await expect(getScores(USER_ID)).rejects.toSatisfy(
			(err: unknown) => err instanceof ApiError && err.status === 404
		);
	});

	it('throws ApiError with status 0 on network failure', async () => {
		const fetchMock = vi.fn().mockRejectedValue(new Error('Failed to fetch'));
		globalThis.fetch = fetchMock;

		await expect(getScores(USER_ID)).rejects.toSatisfy(
			(err: unknown) => err instanceof ApiError && err.status === 0
		);
	});
});
