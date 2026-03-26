import { describe, it, expect } from 'vitest';
import { calibrationAnchors } from '$lib/data/calibration';

const EXPECTED_DIMENSION_IDS = Array.from({ length: 8 }, (_, ri) =>
	Array.from({ length: 4 }, (_, di) => `r${ri + 1}d${di + 1}`)
).flat();

describe('calibration anchors data integrity', () => {
	it('contains exactly 32 anchors', () => {
		expect(calibrationAnchors).toHaveLength(32);
	});

	it('no duplicate dimensionIds', () => {
		const ids = calibrationAnchors.map((a) => a.dimensionId);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('every dimensionId matches pattern r{1-8}d{1-4}', () => {
		const pattern = /^r[1-8]d[1-4]$/;
		for (const anchor of calibrationAnchors) {
			expect(anchor.dimensionId, `invalid id: ${anchor.dimensionId}`).toMatch(pattern);
		}
	});

	it('full set r1d1 through r8d4 is present', () => {
		const ids = calibrationAnchors.map((a) => a.dimensionId).sort();
		expect(ids).toEqual(EXPECTED_DIMENSION_IDS.sort());
	});

	it('each anchor has exactly 5 levels with keys 1-5, all non-empty strings', () => {
		const LEVEL_KEYS = [1, 2, 3, 4, 5] as const;
		for (const anchor of calibrationAnchors) {
			const keys = Object.keys(anchor.levels).map(Number).sort((a, b) => a - b);
			expect(keys, `${anchor.dimensionId} level keys`).toEqual([1, 2, 3, 4, 5]);
			for (const key of LEVEL_KEYS) {
				expect(
					anchor.levels[key].length,
					`${anchor.dimensionId} level ${key}`
				).toBeGreaterThan(0);
			}
		}
	});

	it('principle is a non-empty string for every anchor', () => {
		for (const anchor of calibrationAnchors) {
			expect(anchor.principle.length, `${anchor.dimensionId} principle`).toBeGreaterThan(0);
		}
	});

	it('reflectionPrompt is a non-empty string for every anchor', () => {
		for (const anchor of calibrationAnchors) {
			expect(
				anchor.reflectionPrompt.length,
				`${anchor.dimensionId} reflectionPrompt`
			).toBeGreaterThan(0);
		}
	});

	it('all entries have skeleton: true', () => {
		for (const anchor of calibrationAnchors) {
			expect(anchor.skeleton, `${anchor.dimensionId} skeleton`).toBe(true);
		}
	});
});
