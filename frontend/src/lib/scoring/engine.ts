import type { Skill, CaseStudy, DimensionScore, SkillProgress, Trend, UserState } from '$lib/types/index.js';

export const PRIMARY_WEIGHT = 1.0;
export const SECONDARY_WEIGHT = 0.6;
export const TREND_THRESHOLD = 0.3;
export const TREND_MIN_SCORES = 3;
export const MIN_SCORE = 1;
export const MAX_SCORE = 5;

// Parses the skillId from a dimensionId formatted as r{skillId}d{dimNumber}.
function parseSkillIdFromDimensionId(dimensionId: string): number | null {
	const match = dimensionId.match(/^r(\d+)d\d+$/);
	if (!match) return null;
	return parseInt(match[1], 10);
}

// Computes trend by comparing average score of the last 5 scores vs the previous 5.
// Returns 'stable' when fewer than TREND_MIN_SCORES scores exist or no prior window to compare.
export function computeTrend(scores: DimensionScore[]): Trend {
	if (scores.length < TREND_MIN_SCORES) return 'stable';

	const sorted = [...scores].sort(
		(a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
	);

	const recentWindow = sorted.slice(-5);
	const previousWindow = sorted.slice(-10, -5);

	if (previousWindow.length === 0) return 'stable';

	const recentAvg = recentWindow.reduce((sum, s) => sum + s.score, 0) / recentWindow.length;
	const previousAvg = previousWindow.reduce((sum, s) => sum + s.score, 0) / previousWindow.length;

	const diff = recentAvg - previousAvg;
	if (diff > TREND_THRESHOLD) return 'improving';
	if (diff < -TREND_THRESHOLD) return 'declining';
	return 'stable';
}

// Appends dimension scores for a completed case study attempt to userState.
// Validates each score is an integer in [1, 5]. Skips dimensions whose skillId does not
// match the case study's primary or secondary skills (data integrity guard).
// Returns a new UserState; the input is not mutated.
export function recordScores(
	caseStudyId: string,
	dimensionScores: { dimensionId: string; score: number }[],
	userState: UserState,
	caseStudies: CaseStudy[]
): UserState {
	const caseStudy = caseStudies.find((cs) => cs.id === caseStudyId);
	if (!caseStudy) {
		throw new Error(`Case study not found: ${caseStudyId}`);
	}

	const timestamp = new Date().toISOString();
	const newScores: DimensionScore[] = [];

	for (const { dimensionId, score } of dimensionScores) {
		if (!Number.isInteger(score) || score < MIN_SCORE || score > MAX_SCORE) {
			throw new RangeError(
				`Score ${score} for dimension ${dimensionId} is not an integer in [${MIN_SCORE}, ${MAX_SCORE}]`
			);
		}

		const skillId = parseSkillIdFromDimensionId(dimensionId);
		if (skillId === null) continue;

		let weight: number;
		if (skillId === caseStudy.primarySkillId) {
			weight = PRIMARY_WEIGHT;
		} else if (caseStudy.secondarySkillIds.includes(skillId)) {
			weight = SECONDARY_WEIGHT;
		} else {
			// dimensionId does not belong to this case study's skill set; skip
			continue;
		}

		newScores.push({ dimensionId, caseStudyId, score, weight, timestamp });
	}

	return {
		...userState,
		scores: [...userState.scores, ...newScores]
	};
}

// Computes progress metrics for a single skill across all recorded dimension scores.
export function computeSkillProgress(
	skillId: number,
	scores: DimensionScore[],
	caseStudies: CaseStudy[]
): SkillProgress {
	const prefix = `r${skillId}d`;
	const matching = scores.filter((s) => s.dimensionId.startsWith(prefix));

	if (matching.length === 0) {
		return { skillId, averageScore: 0, totalAttempts: 0, lastPracticed: null, trend: 'stable' };
	}

	const totalWeight = matching.reduce((sum, s) => sum + s.weight, 0);
	const weightedSum = matching.reduce((sum, s) => sum + s.score * s.weight, 0);
	const averageScore = totalWeight > 0 ? weightedSum / totalWeight : 0;

	const uniqueCaseStudyIds = new Set(matching.map((s) => s.caseStudyId));
	const totalAttempts = uniqueCaseStudyIds.size;

	const lastPracticed = matching.reduce((latest, s) => {
		if (latest === null) return s.timestamp;
		return s.timestamp > latest ? s.timestamp : latest;
	}, null as string | null);

	const trend = computeTrend(matching);

	return { skillId, averageScore, totalAttempts, lastPracticed, trend };
}

// Computes progress for all 8 PM skills (IDs 1–8).
export function computeAllProgress(
	scores: DimensionScore[],
	caseStudies: CaseStudy[]
): SkillProgress[] {
	return Array.from({ length: 8 }, (_, i) =>
		computeSkillProgress(i + 1, scores, caseStudies)
	);
}

// Computes overall readiness as a weighted sum of (skill.weight * averageScore / 5).
// Result is in the 0–100 range, rounded to 1 decimal place.
export function computeReadiness(skillProgresses: SkillProgress[], skills: Skill[]): number {
	let readiness = 0;
	for (const skill of skills) {
		const progress = skillProgresses.find((sp) => sp.skillId === skill.id);
		if (!progress) continue;
		readiness += skill.weight * (progress.averageScore / 5);
	}
	return Math.round(readiness * 10) / 10;
}

// Returns a per-skill breakdown of dimension scores for a given case study attempt.
// Groups dimension scores by skillId, attaches skill and dimension names, and sorts by skillId.
export function getCaseBreakdown(
	caseStudyId: string,
	scores: DimensionScore[],
	skills: Skill[]
): {
	skillId: number;
	skillName: string;
	dimensions: { dimensionId: string; dimensionName: string; score: number; weight: number }[];
}[] {
	const caseScores = scores.filter((s) => s.caseStudyId === caseStudyId);

	// Group by skillId
	const groups = new Map<
		number,
		{ dimensionId: string; dimensionName: string; score: number; weight: number }[]
	>();

	for (const s of caseScores) {
		const skillId = parseSkillIdFromDimensionId(s.dimensionId);
		if (skillId === null) continue;

		const skill = skills.find((sk) => sk.id === skillId);
		const dimensionName =
			skill?.rubricDimensions.find((d) => d.id === s.dimensionId)?.name ?? s.dimensionId;

		if (!groups.has(skillId)) {
			groups.set(skillId, []);
		}
		groups.get(skillId)!.push({
			dimensionId: s.dimensionId,
			dimensionName,
			score: s.score,
			weight: s.weight
		});
	}

	return Array.from(groups.entries())
		.sort(([a], [b]) => a - b)
		.map(([skillId, dimensions]) => {
			const skill = skills.find((sk) => sk.id === skillId);
			return {
				skillId,
				skillName: skill?.name ?? `Skill ${skillId}`,
				dimensions
			};
		});
}
