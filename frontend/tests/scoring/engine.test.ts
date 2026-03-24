import { describe, it, expect } from 'vitest';
import type { Skill } from '$lib/types/skill.js';
import type { CaseStudy } from '$lib/types/case-study.js';
import type { DimensionScore, UserState } from '$lib/types/scoring.js';
import {
	recordScores,
	computeSkillProgress,
	computeTrend,
	computeAllProgress,
	computeReadiness,
	getCaseBreakdown,
	PRIMARY_WEIGHT,
	SECONDARY_WEIGHT
} from '$lib/scoring/engine.js';

// ── Fixtures ────────────────────────────────────────────────────────────────

const testSkill1: Skill = {
	id: 1,
	name: 'Test Skill 1',
	shortDescription: 'test',
	weight: 15,
	definition: 'test',
	acidTest: 'test',
	staffFocus: 'test',
	principalFocus: 'test',
	dependencies: [],
	rubricDimensions: [
		{ id: 'r1d1', name: 'Dim 1-1', description: 'test' },
		{ id: 'r1d2', name: 'Dim 1-2', description: 'test' }
	],
	thoughtLeaders: []
};

const testSkill2: Skill = {
	id: 2,
	name: 'Test Skill 2',
	shortDescription: 'test',
	weight: 15,
	definition: 'test',
	acidTest: 'test',
	staffFocus: 'test',
	principalFocus: 'test',
	dependencies: [],
	rubricDimensions: [
		{ id: 'r2d1', name: 'Dim 2-1', description: 'test' },
		{ id: 'r2d2', name: 'Dim 2-2', description: 'test' }
	],
	thoughtLeaders: []
};

const testSkill3: Skill = {
	id: 3,
	name: 'Test Skill 3',
	shortDescription: 'test',
	weight: 10,
	definition: 'test',
	acidTest: 'test',
	staffFocus: 'test',
	principalFocus: 'test',
	dependencies: [],
	rubricDimensions: [
		{ id: 'r3d1', name: 'Dim 3-1', description: 'test' },
		{ id: 'r3d2', name: 'Dim 3-2', description: 'test' }
	],
	thoughtLeaders: []
};

const testCase: CaseStudy = {
	id: 'test_case_1',
	title: 'Test Case',
	prompt: 'test',
	context: 'B2C',
	difficulty: 'staff',
	timeLimit: 45,
	primarySkillId: 1,
	secondarySkillIds: [2],
	caseType: 'product_design',
	rubricDimensionIds: ['r1d1', 'r1d2', 'r2d1'],
	hints: []
};

const emptyUserState: UserState = {
	currentDay: 1,
	scores: [],
	dayStatuses: {}
};

// ── recordScores ─────────────────────────────────────────────────────────────

describe('recordScores', () => {
	it('records primary skill dimensions with weight 1.0', () => {
		const result = recordScores(
			'test_case_1',
			[
				{ dimensionId: 'r1d1', score: 3 },
				{ dimensionId: 'r1d2', score: 4 }
			],
			emptyUserState,
			[testCase]
		);
		const primaryScores = result.scores.filter(
			(s) => s.dimensionId === 'r1d1' || s.dimensionId === 'r1d2'
		);
		expect(primaryScores).toHaveLength(2);
		for (const s of primaryScores) {
			expect(s.weight).toBe(PRIMARY_WEIGHT);
		}
	});

	it('records secondary skill dimensions with weight 0.6', () => {
		const result = recordScores(
			'test_case_1',
			[{ dimensionId: 'r2d1', score: 3 }],
			emptyUserState,
			[testCase]
		);
		const secondary = result.scores.find((s) => s.dimensionId === 'r2d1');
		expect(secondary).toBeDefined();
		expect(secondary!.weight).toBe(SECONDARY_WEIGHT);
	});

	it('skips dimensions not belonging to primary or secondary skills', () => {
		const result = recordScores(
			'test_case_1',
			[
				{ dimensionId: 'r1d1', score: 3 },
				{ dimensionId: 'r3d1', score: 4 }
			],
			emptyUserState,
			[testCase]
		);
		const skipped = result.scores.find((s) => s.dimensionId === 'r3d1');
		expect(skipped).toBeUndefined();
	});

	it('throws RangeError for score below 1', () => {
		expect(() =>
			recordScores(
				'test_case_1',
				[{ dimensionId: 'r1d1', score: 0 }],
				emptyUserState,
				[testCase]
			)
		).toThrow(RangeError);
	});

	it('throws RangeError for score above 5', () => {
		expect(() =>
			recordScores(
				'test_case_1',
				[{ dimensionId: 'r1d1', score: 6 }],
				emptyUserState,
				[testCase]
			)
		).toThrow(RangeError);
	});

	it('throws RangeError for non-integer score', () => {
		expect(() =>
			recordScores(
				'test_case_1',
				[{ dimensionId: 'r1d1', score: 3.5 }],
				emptyUserState,
				[testCase]
			)
		).toThrow(RangeError);
	});

	it('throws Error for unknown case study ID', () => {
		expect(() =>
			recordScores(
				'bogus_case_id',
				[{ dimensionId: 'r1d1', score: 3 }],
				emptyUserState,
				[testCase]
			)
		).toThrow(Error);
	});

	it('does not mutate input userState', () => {
		const originalScores = [...emptyUserState.scores];
		recordScores(
			'test_case_1',
			[{ dimensionId: 'r1d1', score: 3 }],
			emptyUserState,
			[testCase]
		);
		expect(emptyUserState.scores).toEqual(originalScores);
	});
});

// ── computeSkillProgress ──────────────────────────────────────────────────────

describe('computeSkillProgress', () => {
	it('returns zero progress for skill with no scores', () => {
		const result = computeSkillProgress(1, [], [testCase]);
		expect(result).toEqual({
			skillId: 1,
			averageScore: 0,
			totalAttempts: 0,
			lastPracticed: null,
			trend: 'stable'
		});
	});

	it('computes weighted average from primary and secondary scores', () => {
		// primary score for skill 1: score=4, weight=1.0
		// secondary score for skill 1 from another case: score=2, weight=0.6
		// weighted average = (4 * 1.0 + 2 * 0.6) / (1.0 + 0.6) = 5.2 / 1.6 = 3.25
		const scores: DimensionScore[] = [
			{
				dimensionId: 'r1d1',
				caseStudyId: 'test_case_1',
				score: 4,
				weight: PRIMARY_WEIGHT,
				timestamp: '2024-01-01T00:00:00.000Z'
			},
			{
				dimensionId: 'r1d2',
				caseStudyId: 'test_case_2',
				score: 2,
				weight: SECONDARY_WEIGHT,
				timestamp: '2024-01-02T00:00:00.000Z'
			}
		];
		const expectedAverage = (4 * PRIMARY_WEIGHT + 2 * SECONDARY_WEIGHT) / (PRIMARY_WEIGHT + SECONDARY_WEIGHT);
		const result = computeSkillProgress(1, scores, [testCase]);
		expect(result.averageScore).toBeCloseTo(expectedAverage, 5);
	});

	it('counts unique case study IDs as totalAttempts', () => {
		const scores: DimensionScore[] = [
			{
				dimensionId: 'r1d1',
				caseStudyId: 'test_case_1',
				score: 3,
				weight: PRIMARY_WEIGHT,
				timestamp: '2024-01-01T00:00:00.000Z'
			},
			{
				dimensionId: 'r1d2',
				caseStudyId: 'test_case_1',
				score: 3,
				weight: PRIMARY_WEIGHT,
				timestamp: '2024-01-01T00:00:00.000Z'
			},
			{
				dimensionId: 'r1d1',
				caseStudyId: 'test_case_2',
				score: 4,
				weight: PRIMARY_WEIGHT,
				timestamp: '2024-01-02T00:00:00.000Z'
			}
		];
		const result = computeSkillProgress(1, scores, [testCase]);
		expect(result.totalAttempts).toBe(2);
	});

	it('finds the most recent timestamp as lastPracticed', () => {
		const olderTimestamp = '2024-01-01T00:00:00.000Z';
		const newerTimestamp = '2024-06-15T12:00:00.000Z';
		const scores: DimensionScore[] = [
			{
				dimensionId: 'r1d1',
				caseStudyId: 'test_case_1',
				score: 3,
				weight: PRIMARY_WEIGHT,
				timestamp: olderTimestamp
			},
			{
				dimensionId: 'r1d2',
				caseStudyId: 'test_case_2',
				score: 4,
				weight: PRIMARY_WEIGHT,
				timestamp: newerTimestamp
			}
		];
		const result = computeSkillProgress(1, scores, [testCase]);
		expect(result.lastPracticed).toBe(newerTimestamp);
	});
});

// ── computeTrend ──────────────────────────────────────────────────────────────

function makeDimScore(score: number, offsetDays: number): DimensionScore {
	const ts = new Date(2024, 0, offsetDays + 1).toISOString();
	return { dimensionId: 'r1d1', caseStudyId: 'test_case_1', score, weight: PRIMARY_WEIGHT, timestamp: ts };
}

describe('computeTrend', () => {
	it('returns stable when fewer than 3 scores', () => {
		const scores = [makeDimScore(3, 0), makeDimScore(4, 1)];
		expect(computeTrend(scores)).toBe('stable');
	});

	it('returns stable when 5 or fewer scores (no previous window)', () => {
		const scores = [
			makeDimScore(1, 0),
			makeDimScore(2, 1),
			makeDimScore(3, 2),
			makeDimScore(4, 3),
			makeDimScore(5, 4)
		];
		expect(computeTrend(scores)).toBe('stable');
	});

	it('returns improving when recent average exceeds previous by more than 0.3', () => {
		// previous 5 (indices 0-4): all score 2 → avg 2.0
		// recent 5 (indices 5-9): all score 4 → avg 4.0; diff = 2.0 > 0.3
		const scores = [
			makeDimScore(2, 0),
			makeDimScore(2, 1),
			makeDimScore(2, 2),
			makeDimScore(2, 3),
			makeDimScore(2, 4),
			makeDimScore(4, 5),
			makeDimScore(4, 6),
			makeDimScore(4, 7),
			makeDimScore(4, 8),
			makeDimScore(4, 9)
		];
		expect(computeTrend(scores)).toBe('improving');
	});

	it('returns declining when recent average is below previous by more than 0.3', () => {
		// previous 5 (indices 0-4): all score 5 → avg 5.0
		// recent 5 (indices 5-9): all score 2 → avg 2.0; diff = -3.0 < -0.3
		const scores = [
			makeDimScore(5, 0),
			makeDimScore(5, 1),
			makeDimScore(5, 2),
			makeDimScore(5, 3),
			makeDimScore(5, 4),
			makeDimScore(2, 5),
			makeDimScore(2, 6),
			makeDimScore(2, 7),
			makeDimScore(2, 8),
			makeDimScore(2, 9)
		];
		expect(computeTrend(scores)).toBe('declining');
	});

	it('returns stable when difference is within threshold', () => {
		// previous 5: avg 3.0, recent 5: avg 3.2; diff = 0.2 ≤ 0.3
		const scores = [
			makeDimScore(3, 0),
			makeDimScore(3, 1),
			makeDimScore(3, 2),
			makeDimScore(3, 3),
			makeDimScore(3, 4),
			makeDimScore(3, 5),
			makeDimScore(3, 6),
			makeDimScore(3, 7),
			makeDimScore(3, 8),
			makeDimScore(3, 9)
		];
		expect(computeTrend(scores)).toBe('stable');
	});
});

// ── computeAllProgress ────────────────────────────────────────────────────────

describe('computeAllProgress', () => {
	it('returns 8 SkillProgress entries', () => {
		const result = computeAllProgress([], [testCase]);
		expect(result).toHaveLength(8);
	});
});

// ── computeReadiness ──────────────────────────────────────────────────────────

describe('computeReadiness', () => {
	it('returns 0 when no skills have progress', () => {
		const allProgress = computeAllProgress([], [testCase]);
		const result = computeReadiness(allProgress, [testSkill1, testSkill2, testSkill3]);
		expect(result).toBe(0);
	});

	it('computes correct readiness for known inputs', () => {
		// skill1: weight=15, averageScore=4 → contribution = 15 * (4/5) = 12
		// skill2: weight=15, averageScore=3 → contribution = 15 * (3/5) = 9
		// skill3: weight=10, averageScore=5 → contribution = 10 * (5/5) = 10
		// total = 31.0
		const progresses = [
			{ skillId: 1, averageScore: 4, totalAttempts: 1, lastPracticed: '2024-01-01T00:00:00.000Z', trend: 'stable' as const },
			{ skillId: 2, averageScore: 3, totalAttempts: 1, lastPracticed: '2024-01-01T00:00:00.000Z', trend: 'stable' as const },
			{ skillId: 3, averageScore: 5, totalAttempts: 1, lastPracticed: '2024-01-01T00:00:00.000Z', trend: 'stable' as const }
		];
		const expected = 15 * (4 / 5) + 15 * (3 / 5) + 10 * (5 / 5);
		const result = computeReadiness(progresses, [testSkill1, testSkill2, testSkill3]);
		expect(result).toBeCloseTo(expected, 1);
	});

	it('returns 100 when all skills score 5/5', () => {
		// Use skills whose weights sum to 100 to verify ceiling
		const skills8: Skill[] = Array.from({ length: 8 }, (_, i) => ({
			...testSkill1,
			id: i + 1,
			weight: i < 2 ? 15 : i < 6 ? 12 : 13
		}));
		// weights: 15+15+12+12+12+12+13+13 = 104 — use actual skill weights from data instead
		// Build minimal: two skills weight 50 each
		const skillA: Skill = { ...testSkill1, id: 10, weight: 50 };
		const skillB: Skill = { ...testSkill2, id: 11, weight: 50 };
		const progresses = [
			{ skillId: 10, averageScore: 5, totalAttempts: 1, lastPracticed: '2024-01-01T00:00:00.000Z', trend: 'stable' as const },
			{ skillId: 11, averageScore: 5, totalAttempts: 1, lastPracticed: '2024-01-01T00:00:00.000Z', trend: 'stable' as const }
		];
		const result = computeReadiness(progresses, [skillA, skillB]);
		expect(result).toBe(100);
	});
});

// ── getCaseBreakdown ──────────────────────────────────────────────────────────

describe('getCaseBreakdown', () => {
	it('groups dimensions by skill', () => {
		const caseStudyId = 'test_case_1';
		const scores: DimensionScore[] = [
			{ dimensionId: 'r1d1', caseStudyId, score: 3, weight: PRIMARY_WEIGHT, timestamp: '2024-01-01T00:00:00.000Z' },
			{ dimensionId: 'r1d2', caseStudyId, score: 4, weight: PRIMARY_WEIGHT, timestamp: '2024-01-01T00:00:00.000Z' },
			{ dimensionId: 'r2d1', caseStudyId, score: 2, weight: SECONDARY_WEIGHT, timestamp: '2024-01-01T00:00:00.000Z' }
		];
		const result = getCaseBreakdown(caseStudyId, scores, [testSkill1, testSkill2]);
		expect(result).toHaveLength(2);
		const skill1Group = result.find((g) => g.skillId === 1);
		const skill2Group = result.find((g) => g.skillId === 2);
		expect(skill1Group).toBeDefined();
		expect(skill1Group!.dimensions).toHaveLength(2);
		expect(skill2Group).toBeDefined();
		expect(skill2Group!.dimensions).toHaveLength(1);
	});

	it('returns empty array when no scores for case study', () => {
		const result = getCaseBreakdown('nonexistent_case', [], [testSkill1, testSkill2]);
		expect(result).toEqual([]);
	});
});
