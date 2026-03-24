export type Trend = 'improving' | 'stable' | 'declining';

export type DimensionScore = {
	dimensionId: string;
	caseStudyId: string;
	score: number;
	weight: number;
	timestamp: string;
};

export type SkillProgress = {
	skillId: number;
	averageScore: number;
	totalAttempts: number;
	lastPracticed: string | null;
	trend: Trend;
};

export type DayStatus = 'not_started' | 'in_progress' | 'completed';

export type UserState = {
	currentDay: number;
	scores: DimensionScore[];
	dayStatuses: Record<number, DayStatus>;
};
