import { describe, it, expect } from 'vitest';
import { skills } from '$lib/data/skills';

describe('skills data integrity', () => {
	it('contains exactly 8 skills', () => {
		expect(skills).toHaveLength(8);
	});

	it('skill IDs are 1 through 8', () => {
		expect(skills.map((s) => s.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
	});

	it('weights sum to 100', () => {
		expect(skills.reduce((sum, s) => sum + s.weight, 0)).toBe(100);
	});

	it('each skill has exactly 4 rubric dimensions', () => {
		for (const skill of skills) {
			expect(skill.rubricDimensions, `skill ${skill.id}`).toHaveLength(4);
		}
	});

	it('all 32 rubric dimension IDs are unique', () => {
		const ids = skills.flatMap((s) => s.rubricDimensions.map((d) => d.id));
		expect(ids).toHaveLength(32);
		expect(new Set(ids).size).toBe(32);
	});

	it('rubric dimension IDs match format r{skillId}d{1-4}', () => {
		for (const skill of skills) {
			const expected = [1, 2, 3, 4].map((d) => `r${skill.id}d${d}`);
			expect(skill.rubricDimensions.map((d) => d.id)).toEqual(expected);
		}
	});

	it('each skill has exactly 4 thought leader mappings', () => {
		for (const skill of skills) {
			expect(skill.thoughtLeaders, `skill ${skill.id}`).toHaveLength(4);
		}
	});

	it('thought leader mappings cover all 4 leaders', () => {
		const expected = ['Cagan', 'Gupta', 'Huryn', 'Torres'];
		for (const skill of skills) {
			expect(skill.thoughtLeaders.map((t) => t.leader).sort()).toEqual(expected);
		}
	});

	it('every skill has non-empty definition, acidTest, staffFocus, principalFocus', () => {
		for (const skill of skills) {
			expect(skill.definition.length, `skill ${skill.id} definition`).toBeGreaterThan(0);
			expect(skill.acidTest.length, `skill ${skill.id} acidTest`).toBeGreaterThan(0);
			expect(skill.staffFocus.length, `skill ${skill.id} staffFocus`).toBeGreaterThan(0);
			expect(skill.principalFocus.length, `skill ${skill.id} principalFocus`).toBeGreaterThan(0);
		}
	});

	it('dependency graph matches spec', () => {
		const deps: Record<number, number[]> = {
			1: [],
			2: [1],
			3: [2],
			4: [3],
			5: [2],
			6: [5],
			7: [4, 6],
			8: [4, 6]
		};
		for (const skill of skills) {
			expect(skill.dependencies.sort(), `skill ${skill.id} dependencies`).toEqual(
				deps[skill.id].sort()
			);
		}
	});
});
