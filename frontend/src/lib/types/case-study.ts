export type CaseType =
	| 'product_design'
	| 'product_improvement'
	| 'product_strategy'
	| 'metric_diagnosis'
	| 'estimation'
	| 'trade_off'
	| 'go_to_market'
	| 'stakeholder_influence'
	| 'discovery_plan'
	| 'technical_judgment'
	| 'mock_interview';

export type CaseStudy = {
	id: string;
	title: string;
	prompt: string;
	context: 'B2C' | 'B2B' | 'Mixed';
	difficulty: 'staff' | 'principal';
	timeLimit: 45 | 60;
	primarySkillId: number;
	secondarySkillIds: number[];
	caseType: CaseType;
	rubricDimensionIds: string[];
	hints: string[];
};
