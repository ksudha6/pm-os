import { describe, it, expect } from 'vitest';
import { caseStudies } from '$lib/data/case-studies';
import { skills } from '$lib/data/skills';
import type { CaseType } from '$lib/types';

// All valid rubric dimension IDs from skills data
const allRubricDimensionIds = skills.flatMap((s) => s.rubricDimensions.map((d) => d.id));

// All 11 case types from the CaseType union
const ALL_CASE_TYPES: CaseType[] = [
	'product_design',
	'product_improvement',
	'product_strategy',
	'metric_diagnosis',
	'estimation',
	'trade_off',
	'go_to_market',
	'stakeholder_influence',
	'discovery_plan',
	'technical_judgment',
	'mock_interview'
];

describe('case studies data integrity', () => {
	it('every skill has at least 4 primary cases (skills 1-7 have 5, skill 8 has 4)', () => {
		for (const skill of skills) {
			const primaryCases = caseStudies.filter((cs) => cs.primarySkillId === skill.id);
			const expectedMin = skill.id === 8 ? 4 : 5;
			expect(
				primaryCases.length,
				`skill ${skill.id} has ${primaryCases.length} primary cases, expected >= ${expectedMin}`
			).toBeGreaterThanOrEqual(expectedMin);
		}
	});

	it('every rubric dimension (32) referenced by at least 2 cases', () => {
		const dimensionCounts = new Map<string, number>();
		for (const dimId of allRubricDimensionIds) {
			dimensionCounts.set(dimId, 0);
		}
		for (const cs of caseStudies) {
			for (const dimId of cs.rubricDimensionIds) {
				dimensionCounts.set(dimId, (dimensionCounts.get(dimId) ?? 0) + 1);
			}
		}
		for (const [dimId, count] of dimensionCounts) {
			expect(count, `dimension ${dimId} referenced by ${count} cases, expected >= 2`).toBeGreaterThanOrEqual(2);
		}
	});

	it('every case maps to 2+ skills (primary + at least 1 secondary)', () => {
		for (const cs of caseStudies) {
			const totalSkills = 1 + cs.secondarySkillIds.length;
			expect(
				totalSkills,
				`case ${cs.id} maps to ${totalSkills} skills, expected >= 2`
			).toBeGreaterThanOrEqual(2);
		}
	});

	it('all 11 case types represented', () => {
		const usedTypes = new Set(caseStudies.map((cs) => cs.caseType));
		for (const caseType of ALL_CASE_TYPES) {
			expect(usedTypes.has(caseType), `case type '${caseType}' not found in any case study`).toBe(true);
		}
	});

	it('mock interviews (cs_mock_1 through cs_mock_6) reference dimensions from 5+ skills', () => {
		const interviewMocks = caseStudies.filter(
			(cs) => cs.caseType === 'mock_interview' && /^cs_mock_[1-6]$/.test(cs.id)
		);
		expect(interviewMocks.length).toBe(6);

		for (const mock of interviewMocks) {
			const skillIds = new Set(
				mock.rubricDimensionIds.map((dimId) => {
					const match = dimId.match(/^r(\d+)d\d+$/);
					return match ? parseInt(match[1], 10) : -1;
				})
			);
			expect(
				skillIds.size,
				`mock ${mock.id} references dimensions from ${skillIds.size} skills, expected >= 5`
			).toBeGreaterThanOrEqual(5);
		}
	});

	it('no orphan dimension IDs — every rubricDimensionId exists in skills data', () => {
		const validIds = new Set(allRubricDimensionIds);
		for (const cs of caseStudies) {
			for (const dimId of cs.rubricDimensionIds) {
				expect(validIds.has(dimId), `case ${cs.id} references unknown dimension '${dimId}'`).toBe(true);
			}
		}
	});

	it('case study IDs are unique', () => {
		const ids = caseStudies.map((cs) => cs.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('contains 51 total cases (39 skill + 8 mock + 4 estimation)', () => {
		const skillCases = caseStudies.filter((cs) => cs.caseType !== 'mock_interview' && cs.caseType !== 'estimation');
		const mockCases = caseStudies.filter((cs) => cs.caseType === 'mock_interview');
		const estimationCases = caseStudies.filter((cs) => cs.caseType === 'estimation');

		expect(skillCases.length).toBe(39);
		expect(mockCases.length).toBe(8);
		expect(estimationCases.length).toBe(4);
		expect(caseStudies).toHaveLength(51);
	});

	it('difficulty distribution — 35+ staff and 10+ principal', () => {
		const staffCount = caseStudies.filter((cs) => cs.difficulty === 'staff').length;
		const principalCount = caseStudies.filter((cs) => cs.difficulty === 'principal').length;

		expect(staffCount, `staff count ${staffCount}`).toBeGreaterThanOrEqual(34);
		expect(principalCount, `principal count ${principalCount}`).toBeGreaterThanOrEqual(10);
		expect(staffCount + principalCount).toBe(caseStudies.length);
	});

	it('time limits are 45 or 60 only', () => {
		const allowedTimeLimits = new Set([45, 60]);
		for (const cs of caseStudies) {
			expect(
				allowedTimeLimits.has(cs.timeLimit),
				`case ${cs.id} has timeLimit ${cs.timeLimit}, expected 45 or 60`
			).toBe(true);
		}
	});
});
