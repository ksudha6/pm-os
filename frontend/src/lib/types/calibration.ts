export type CalibrationAnchor = {
	dimensionId: string;
	principle: string;
	levels: Record<1 | 2 | 3 | 4 | 5, string>;
	reflectionPrompt: string;
	skeleton: boolean;
};
