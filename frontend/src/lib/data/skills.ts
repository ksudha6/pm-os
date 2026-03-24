import type { Skill } from '$lib/types/index.js';

export const skills: Skill[] = [
	{
		id: 1,
		name: 'User Empathy & Customer Knowledge',
		shortDescription: 'Direct, first-hand understanding of user behaviors, pain points, and motivations.',
		weight: 15,
		definition:
			'The depth and quality of your direct, first-hand understanding of your users — their behaviors, pain points, unspoken needs, context, and motivations. This is the input that feeds product sense, strategy, and discovery.',
		acidTest:
			"When your team debates a product direction, you bring the customer's perspective with enough depth and evidence that it shifts the conversation. Not anecdotes — pattern-matched insight from sustained exposure. You can predict how users will react to a new solution before it is built, and you are usually right.",
		staffFocus:
			'Deep expertise in one user segment or domain. Personally conducting interviews and synthesizing patterns within your product area.',
		principalFocus:
			'Pattern recognition across multiple user segments. Coaching other PMs on customer engagement practices. Setting the standard for user empathy across the org.',
		dependencies: [],
		rubricDimensions: [
			{
				id: 'r1d1',
				name: 'Direct Customer Exposure',
				description: 'Frequency and depth of direct customer/user contact (not delegated or proxied)'
			},
			{
				id: 'r1d2',
				name: 'Interview Quality',
				description:
					'Ability to use story-based interviewing to uncover real behavior vs. stated preferences'
			},
			{
				id: 'r1d3',
				name: 'Pattern Synthesis',
				description:
					'Ability to synthesize qualitative insights across many interactions into actionable patterns'
			},
			{
				id: 'r1d4',
				name: 'Predictive Accuracy',
				description: 'Track record of correctly predicting how users will respond to new solutions'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Deep Customer Knowledge',
				idea: 'PM must be the acknowledged expert on users and customers, built through direct repeated exposure'
			},
			{
				leader: 'Torres',
				term: 'Continuous Discovery Habits',
				idea: 'Weekly touchpoints with real users. Story-based interviewing to uncover real behavior, not stated preferences'
			},
			{
				leader: 'Gupta',
				term: 'User Empathy (core pillar)',
				idea: 'A cultivated skill developed from years of shipping products and building profound user empathy'
			},
			{
				leader: 'Huryn',
				term: 'Product Discovery competency',
				idea: 'Hypothesis-driven, interview-based discovery as a core PM competency area'
			}
		]
	},
	{
		id: 2,
		name: 'Product Sense & Judgment',
		shortDescription: 'Evaluating whether a product idea will create real value before committing resources.',
		weight: 15,
		definition:
			'The ability to evaluate whether a product idea, feature, or solution will create real value for users and the business — before engineering resources are committed. This is not an innate gift; it is built from the intersection of deep customer knowledge, data fluency, and domain expertise.',
		acidTest:
			'When someone pitches a feature idea in a meeting, you can articulate within minutes whether it will create real value, what the key risks are, and what you would need to learn first — and your track record shows you are right significantly more often than not.',
		staffFocus:
			'Strong product judgment within your product domain. Trusted as the person who spots bad ideas early and champions the right ones.',
		principalFocus:
			'Product judgment that spans multiple product areas. Other PMs and leaders seek your input on their hardest decisions. You set the bar for product quality across the org.',
		dependencies: [1],
		rubricDimensions: [
			{
				id: 'r2d1',
				name: 'Idea Evaluation Speed',
				description:
					'Can rapidly assess whether an idea addresses a real user need and has business viability'
			},
			{
				id: 'r2d2',
				name: 'Risk Identification',
				description:
					'Spots gaps, contradictions, and false assumptions in product specs before engineering begins'
			},
			{
				id: 'r2d3',
				name: 'Signal Synthesis',
				description:
					'Connects disparate signals (user feedback, data, market shifts, competitive moves) into coherent product insight'
			},
			{
				id: 'r2d4',
				name: 'Decision Track Record',
				description: 'Consistently makes good go/no-go calls under ambiguity'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Built from 4 knowledge areas',
				idea: 'Product sense emerges from the intersection of deep customer, data, industry, and business knowledge'
			},
			{
				leader: 'Torres',
				term: 'Opportunity Solution Tree',
				idea: 'Structured framework connecting outcomes to opportunities to solutions — forces rigorous product thinking'
			},
			{
				leader: 'Gupta',
				term: 'Cultivated through shipping',
				idea: 'Product sense is built by shipping products and learning from outcomes over many years'
			},
			{
				leader: 'Huryn',
				term: 'Product Discovery area',
				idea: 'The ability to formulate hypotheses, evaluate opportunities, and make evidence-based product decisions'
			}
		]
	},
	{
		id: 3,
		name: 'Strategic Thinking & Vision',
		shortDescription: 'Defining which problems are worth solving and how they connect to long-term vision.',
		weight: 15,
		definition:
			"The ability to define which problems are worth solving, in what sequence, for which customer segments, and how solving them connects to the company's long-term vision. This operates above roadmaps and feature lists — at the Strategy layer.",
		acidTest:
			"You can answer: 'Given our users, data, market position, and business constraints — here are the 3 problems that matter most, here is the evidence, and here is how solving them connects to our vision.' When challenged, you hold your ground or update your thinking based on new evidence, not seniority pressure.",
		staffFocus:
			'Defining strategy for your specific product area. Setting quarterly and annual priorities grounded in evidence.',
		principalFocus:
			'Shaping strategy across multiple products or the entire product portfolio. Influencing company-level direction. Connecting dots across business units.',
		dependencies: [2],
		rubricDimensions: [
			{
				id: 'r3d1',
				name: 'Strategy Articulation',
				description:
					'Can clearly articulate product strategy connecting mission to vision to problems to outcomes'
			},
			{
				id: 'r3d2',
				name: 'Prioritization Rigor',
				description:
					'Makes hard trade-off calls on what NOT to build, grounded in evidence not politics'
			},
			{
				id: 'r3d3',
				name: 'Multi-Quarter Thinking',
				description:
					'Makes bets based on where the market is heading, not just where it is today'
			},
			{
				id: 'r3d4',
				name: 'Strategy Defense',
				description:
					'Can defend strategy against executive pushback with evidence, updating when warranted'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Product Strategy layer',
				idea: 'Mission to Vision to Strategy to Discovery to Delivery. Staff/Principal PMs operate at the Strategy layer.'
			},
			{
				leader: 'Torres',
				term: 'Outcome-rooted OST',
				idea: 'Every strategic tree starts with a desired business outcome, not a feature or solution'
			},
			{
				leader: 'Gupta',
				term: 'Strategy pillar',
				idea: 'Owning outcomes, not features. Multi-year strategic problems spanning multiple teams.'
			},
			{
				leader: 'Huryn',
				term: 'Strategy & Business competency',
				idea: 'Vision, strategic models, market research, and product portfolio management'
			}
		]
	},
	{
		id: 4,
		name: 'Business Acumen & Viability',
		shortDescription: 'Understanding how the business works and assessing whether solutions are viable.',
		weight: 10,
		definition:
			'The depth of your understanding of how the business works — revenue models, unit economics, go-to-market mechanics, legal/regulatory constraints, and operational realities — and your ability to assess whether a valuable, usable, feasible solution is also viable for the business.',
		acidTest:
			"When a team is excited about a product idea, you are the person who asks: 'Can we actually sell this? Can we service it at scale? What does Legal say? Does the unit economics work?' And you already know the likely answers before you ask, because you understand the business that deeply.",
		staffFocus:
			"Deep understanding of your product's P&L, pricing, and go-to-market mechanics. Making viability calls within your domain.",
		principalFocus:
			'Understanding viability across the full product portfolio. Influencing pricing strategy, business model evolution, and partnership decisions at the company level.',
		dependencies: [3],
		rubricDimensions: [
			{
				id: 'r4d1',
				name: 'Business Model Understanding',
				description:
					'Understands revenue model, unit economics, and cost structure well enough to model product decision impact'
			},
			{
				id: 'r4d2',
				name: 'Viability Risk Assessment',
				description:
					'Can assess whether solutions work for the business across sales, legal, finance, and operations'
			},
			{
				id: 'r4d3',
				name: 'GTM Awareness',
				description:
					'Understands go-to-market fit — can the sales team sell this, can CS support it, does it fit pricing'
			},
			{
				id: 'r4d4',
				name: 'Financial Modeling',
				description: 'Can build basic financial models to justify or kill product investments'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Viability Risk (the 4th risk)',
				idea: 'The most underestimated risk. Expanded from 3 to 4 risks because PMs kept ignoring business viability.'
			},
			{
				leader: 'Torres',
				term: 'Business outcome as OST root',
				idea: 'Discovery must be rooted in business outcomes, connecting user value to business value'
			},
			{
				leader: 'Gupta',
				term: 'P&L ownership',
				idea: 'At senior levels, business acumen and financial modeling become non-negotiable'
			},
			{
				leader: 'Huryn',
				term: 'Strategy & Business area',
				idea: 'Revenue strategy, business models, and go-to-market within the competency framework'
			}
		]
	},
	{
		id: 5,
		name: 'Discovery Practice & Methods',
		shortDescription: 'Structured discipline of identifying opportunities and testing assumptions before building.',
		weight: 15,
		definition:
			'Your mastery of structured product discovery — the discipline of continuously identifying opportunities, generating solutions, and testing assumptions before committing engineering resources.',
		acidTest:
			"You never ship a major bet without evidence. When someone brings you a 'great idea,' your first instinct is 'what is the riskiest assumption and how do we test it cheaply?' — and you can design that test in the same conversation.",
		staffFocus:
			'Personal mastery of discovery methods. Running discovery within your product team as a continuous practice.',
		principalFocus:
			'Establishing discovery as an organizational practice. Coaching multiple teams on discovery habits. Setting the standard for evidence-based decision making across the PM org.',
		dependencies: [2],
		rubricDimensions: [
			{
				id: 'r5d1',
				name: 'Discovery as Habit',
				description:
					'Practices continuous discovery as a weekly rhythm, not a project phase'
			},
			{
				id: 'r5d2',
				name: 'Product Trio Collaboration',
				description:
					'Works as PM + Designer + Engineer doing discovery together, not handing down requirements'
			},
			{
				id: 'r5d3',
				name: 'Assumption Identification',
				description:
					'Can identify the riskiest assumption in any idea and design the smallest experiment to test it'
			},
			{
				id: 'r5d4',
				name: 'Experiment Selection',
				description:
					'Knows which experiment type fits which situation (prototype, Wizard of Oz, painted door, A/B test, etc.)'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Product Discovery',
				idea: 'De-risks all 4 risks before delivery. PMs should spend roughly half their time in discovery.'
			},
			{
				leader: 'Torres',
				term: 'Continuous Discovery + Assumption Testing',
				idea: 'Weekly rhythm. Identify riskiest assumption, design smallest test. Product Trio collaboration.'
			},
			{
				leader: 'Gupta',
				term: 'Execution discipline',
				idea: 'Rigorous validation before committing resources. Evidence over opinion.'
			},
			{
				leader: 'Huryn',
				term: 'Experimentation competency',
				idea: 'Hypothesis formulation, experiment design, and building a culture of evidence'
			}
		]
	},
	{
		id: 6,
		name: 'Data Fluency & Experimentation',
		shortDescription: 'Using quantitative data and rigorous experiments to inform decisions and measure outcomes.',
		weight: 10,
		definition:
			'Your ability to use quantitative data — product analytics, experimentation results, market data — to inform decisions, validate hypotheses, and measure outcomes. Combines analytical skill with the discipline of designing and running rigorous experiments.',
		acidTest:
			"You can take a dashboard that shows 'activation dropped 8%' and within a day combine it with qualitative understanding to explain why — and design an experiment to validate your hypothesis before the team reacts.",
		staffFocus:
			'Fluent in product analytics for your domain. Personally designing and analyzing experiments. Setting success metrics for your team.',
		principalFocus:
			"Setting analytics standards and experimentation practices across multiple teams. Catching misleading metrics org-wide. Defining what 'good measurement' looks like for the PM org.",
		dependencies: [5],
		rubricDimensions: [
			{
				id: 'r6d1',
				name: 'Analytics Fluency',
				description:
					'Masters product analytics frameworks (AARRR, funnel analysis, cohort analysis, leading vs. lagging indicators)'
			},
			{
				id: 'r6d2',
				name: 'Experiment Design',
				description:
					'Designs experiments with clear hypotheses, success criteria, and appropriate statistical rigor'
			},
			{
				id: 'r6d3',
				name: 'Data Skepticism',
				description: 'Catches when metrics are misleading, gamed, or masking the real signal'
			},
			{
				id: 'r6d4',
				name: 'Quant-Qual Integration',
				description: 'Combines quantitative data with qualitative insight for complete understanding'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Deep Data Knowledge',
				idea: 'Expert-level understanding of how the product is actually used, beyond what dashboards show'
			},
			{
				leader: 'Torres',
				term: 'Quant + Qual interplay',
				idea: 'Data identifies where opportunities live (quantitative); interviews reveal why (qualitative)'
			},
			{
				leader: 'Gupta',
				term: 'Analytical rigor',
				idea: 'Data-driven decision making as a core competency at every PM level'
			},
			{
				leader: 'Huryn',
				term: 'Product Analytics area',
				idea: 'AARRR metrics, funnel analysis, KPIs, heatmaps, and turning data into actionable insight'
			}
		]
	},
	{
		id: 7,
		name: 'Leadership, Influence & Execution',
		shortDescription: 'Leading without authority, aligning teams around outcomes, and executing with discipline.',
		weight: 10,
		definition:
			'Your ability to lead without authority, align cross-functional teams around outcomes, mentor junior PMs, and execute with discipline. This influence is earned through demonstrated competence and character, not political skill.',
		acidTest:
			"People follow your lead because they trust your judgment, not because of your title. When you push back on an executive's pet feature, they listen — because you have been right before and you brought evidence.",
		staffFocus:
			'Cross-functional leadership within your product team and adjacent teams. Mentoring 2-3 junior PMs. Driving execution with discipline.',
		principalFocus:
			'Cross-organizational force multiplier. Elevating product practices, decision-making frameworks, and strategic clarity across the entire PM org.',
		dependencies: [4, 6],
		rubricDimensions: [
			{
				id: 'r7d1',
				name: 'Influence Without Authority',
				description:
					'Aligns cross-functional teams around outcomes without direct authority, through credibility and evidence'
			},
			{
				id: 'r7d2',
				name: 'Communication Clarity',
				description:
					'Communicates strategy clearly across organizational levels — up to executives, across to peers, down to team'
			},
			{
				id: 'r7d3',
				name: 'Mentorship Impact',
				description:
					'Raises product craft of junior PMs — teaching discovery, strategy, and customer empathy'
			},
			{
				id: 'r7d4',
				name: 'Execution Discipline',
				description:
					'Drives outcomes over outputs. OKRs focused on business results and customer impact.'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Competence + Character',
				idea: 'Influence earned through demonstrated knowledge and integrity, not political skill'
			},
			{
				leader: 'Torres',
				term: 'Product Trio Leadership',
				idea: 'PM enables collaborative discovery with design and engineering, not top-down requirements'
			},
			{
				leader: 'Gupta',
				term: 'Influence (4th pillar)',
				idea: 'Force multiplier at Principal level. Cross-org impact and organizational leadership.'
			},
			{
				leader: 'Huryn',
				term: 'Leadership + Execution + People',
				idea: 'Leading with context and culture. Coaching, mentoring, hiring, and building alignment.'
			}
		]
	},
	{
		id: 8,
		name: 'Domain & Market Depth',
		shortDescription: 'Deep understanding of the competitive landscape, market dynamics, and customer ecosystem.',
		weight: 10,
		definition:
			"The depth of your understanding of the competitive landscape, market dynamics, technology trends, regulatory environment, and customer ecosystem within your product's domain. Includes understanding the full user lifecycle and how your product competes.",
		acidTest:
			'You are invited to industry conversations not because of your title, but because people in your domain respect your perspective. When a competitor makes a move, your team turns to you first because you can immediately explain what it means.',
		staffFocus:
			"Expert in your specific product's domain, competitive landscape, and market dynamics.",
		principalFocus:
			'Expert across the broader industry landscape. Identifying cross-market opportunities and threats. Advising the company on where the industry is heading.',
		dependencies: [4, 6],
		rubricDimensions: [
			{
				id: 'r8d1',
				name: 'Competitive Intelligence',
				description:
					'Deep knowledge of competitors — their strategies, strengths, weaknesses, and likely next moves'
			},
			{
				id: 'r8d2',
				name: 'Market Trajectory',
				description:
					'Understands where the domain is heading over 2-3 years and makes forward-looking bets'
			},
			{
				id: 'r8d3',
				name: 'Lifecycle Understanding',
				description:
					'Understands the full user lifecycle (acquisition, activation, retention, revenue, referral)'
			},
			{
				id: 'r8d4',
				name: 'Positioning Awareness',
				description:
					'Thinks about how the product is perceived relative to alternatives in the market'
			}
		],
		thoughtLeaders: [
			{
				leader: 'Cagan',
				term: 'Deep Industry Knowledge',
				idea: 'Market, competitive, regulatory, and technology landscape understanding'
			},
			{
				leader: 'Torres',
				term: '(Implicit)',
				idea: 'Domain knowledge enriches opportunity identification and solution quality in discovery'
			},
			{
				leader: 'Gupta',
				term: 'Domain expertise at senior levels',
				idea: 'Multi-year strategic bets rooted in deep market understanding'
			},
			{
				leader: 'Huryn',
				term: 'Product Growth + Marketing',
				idea: 'Full lifecycle understanding, positioning, go-to-market, and growth strategy'
			}
		]
	}
];
