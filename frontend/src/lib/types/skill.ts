export type RubricDimension = {
	id: string;
	name: string;
	description: string;
};

export type ThoughtLeaderMapping = {
	leader: 'Cagan' | 'Torres' | 'Gupta' | 'Huryn';
	term: string;
	idea: string;
};

export type Skill = {
	id: number;
	name: string;
	shortDescription: string;
	weight: number;
	definition: string;
	acidTest: string;
	staffFocus: string;
	principalFocus: string;
	dependencies: number[];
	rubricDimensions: RubricDimension[];
	thoughtLeaders: ThoughtLeaderMapping[];
};
