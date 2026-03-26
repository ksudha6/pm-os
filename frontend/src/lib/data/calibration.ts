import type { CalibrationAnchor } from '$lib/types/index.js';

export const calibrationAnchors: CalibrationAnchor[] = [
	// Skill 1: User Empathy & Customer Knowledge
	{
		dimensionId: 'r1d1',
		principle: 'Direct, unmediated contact with real users is the only reliable source of customer knowledge.',
		levels: {
			1: 'Rarely talks to users directly; relies on secondhand summaries from research or CS teams.',
			2: 'Occasionally joins user calls but does not drive them; exposure is infrequent and passive.',
			3: 'Maintains a regular cadence of direct user conversations within their product area.',
			4: 'Conducts weekly user touchpoints and can articulate behavioral patterns across sessions.',
			5: 'Deep, sustained user relationships across multiple segments; recognized as the customer authority in the org.'
		},
		reflectionPrompt: 'When did you last talk to a user directly, and what did you learn that you could not have learned from a dashboard?',
		skeleton: true
	},
	{
		dimensionId: 'r1d2',
		principle: 'Story-based interviewing reveals actual behavior, not intentions or post-hoc rationalization.',
		levels: {
			1: 'Asks leading or hypothetical questions; surfaces stated preferences rather than real behavior.',
			2: 'Uses some open-ended questions but frequently steers the conversation toward confirming existing ideas.',
			3: 'Consistently uses story prompts ("tell me about the last time...") to uncover real past behavior.',
			4: 'Adapts interview technique in real time; surfaces unexpected pain points through active listening.',
			5: 'Coaches others on interview craft; consistently produces novel behavioral insights from each session.'
		},
		reflectionPrompt: 'In your last user interview, what story did the user tell that surprised you?',
		skeleton: true
	},
	{
		dimensionId: 'r1d3',
		principle: 'Qualitative insight becomes actionable only when synthesized into patterns across many interactions.',
		levels: {
			1: 'Treats each user conversation as an isolated anecdote; does not look for patterns.',
			2: 'Notices recurring themes informally but rarely documents or communicates them systematically.',
			3: 'Synthesizes findings across sessions into named patterns that inform product decisions.',
			4: 'Builds a living model of user behavior that evolves with new data; shares it across teams.',
			5: 'Produces synthesis that shifts team mental models; patterns become shared vocabulary in the org.'
		},
		reflectionPrompt: 'What recurring user pattern have you identified that changed how your team thinks about the problem?',
		skeleton: true
	},
	{
		dimensionId: 'r1d4',
		principle: "A PM's predictive accuracy about user reaction is a measurable indicator of customer knowledge depth.",
		levels: {
			1: 'Surprised by user reactions to shipped features; cannot predict adoption or rejection in advance.',
			2: 'Makes occasional correct predictions but without clear reasoning; accuracy is inconsistent.',
			3: 'Regularly makes explicit predictions before shipping and tracks them against actual outcomes.',
			4: 'High accuracy on prediction; can explain the reasoning behind each prediction clearly.',
			5: 'Prediction accuracy is recognized by peers and leadership; used as a calibration signal for team decisions.'
		},
		reflectionPrompt: 'What was the last feature you predicted users would resist, and were you right?',
		skeleton: true
	},

	// Skill 2: Product Sense & Judgment
	{
		dimensionId: 'r2d1',
		principle: 'Product judgment includes the speed to assess viability and value before resources are committed.',
		levels: {
			1: 'Cannot quickly evaluate whether an idea addresses a real need; needs extensive analysis time.',
			2: 'Can assess ideas given time but struggles to form a rapid, structured view in meetings.',
			3: 'Can articulate within a short discussion whether an idea has merit and what the key risks are.',
			4: 'Rapid, reliable idea evaluation that others trust; surfaces non-obvious risks others miss.',
			5: 'Consistently correct fast assessments across domains; sets the evaluation bar for the PM org.'
		},
		reflectionPrompt: 'How quickly can you tell whether a new feature idea is worth pursuing, and what signals do you look for?',
		skeleton: true
	},
	{
		dimensionId: 'r2d2',
		principle: 'Catching false assumptions in specs before engineering begins is cheaper than fixing them after.',
		levels: {
			1: 'Does not systematically review specs for gaps; relies on engineering or design to catch problems.',
			2: 'Catches obvious contradictions but misses deeper structural assumptions in specs.',
			3: 'Proactively identifies the riskiest assumptions in any spec and flags them before work starts.',
			4: 'Consistently finds non-obvious risks; creates a culture of assumption-checking in the team.',
			5: 'Prevents entire categories of rework through early risk identification; mentors others on this skill.'
		},
		reflectionPrompt: 'What is the most consequential false assumption you caught in a spec before engineering began?',
		skeleton: true
	},
	{
		dimensionId: 'r2d3',
		principle: 'Coherent product insight requires connecting disparate signals that individually are too weak to act on.',
		levels: {
			1: 'Treats signals (data, feedback, market) as separate inputs; does not integrate them into a view.',
			2: 'Connects two signal types (e.g., data + user feedback) but misses market or competitive signals.',
			3: 'Synthesizes user, data, and market signals into a coherent product perspective regularly.',
			4: 'Builds signal integration into team rituals; catches early signals others overlook.',
			5: 'Cross-domain signal synthesis is a recognized strength; regularly surfaces insight that changes strategy.'
		},
		reflectionPrompt: 'Describe a time when combining two unexpected signals led you to a product insight you could not have reached from either alone.',
		skeleton: true
	},
	{
		dimensionId: 'r2d4',
		principle: 'Good go/no-go decisions under ambiguity require both judgment and a track record to validate it.',
		levels: {
			1: 'Avoids making calls under ambiguity; defers to stakeholders or waits for more data.',
			2: 'Makes decisions but frequently revisits them; track record is unclear or not tracked.',
			3: 'Makes explicit go/no-go decisions with stated reasoning; tracks outcomes against decisions.',
			4: 'Strong track record of correct calls under ambiguity; acknowledged by peers as reliable.',
			5: 'Decision quality is a model for the team; actively reviews past calls to improve future judgment.'
		},
		reflectionPrompt: 'What is a difficult go/no-go call you made without sufficient data, and how did it turn out?',
		skeleton: true
	},

	// Skill 3: Strategic Thinking & Vision
	{
		dimensionId: 'r3d1',
		principle: 'Strategy is only useful when it connects mission to vision to specific problems to measurable outcomes.',
		levels: {
			1: 'Cannot articulate product strategy beyond a list of features or roadmap items.',
			2: 'Describes strategy in terms of themes but cannot connect them to outcomes or company vision.',
			3: 'Articulates a clear strategy linking mission, vision, problems, and expected outcomes.',
			4: 'Strategy is well-documented, coherent, and can be explained in multiple contexts and formats.',
			5: 'Strategy articulation is crisp enough that cross-functional partners can repeat it accurately.'
		},
		reflectionPrompt: 'If a new engineer joined your team today, could you explain your product strategy in five minutes in a way they could repeat back correctly?',
		skeleton: true
	},
	{
		dimensionId: 'r3d2',
		principle: 'Saying no to a good idea in favor of a better one is the core of strategic prioritization.',
		levels: {
			1: 'Struggles to say no; backlog grows because everything is kept; deprioritization is avoided.',
			2: 'Makes some trade-off calls but relies on political safety rather than evidence to defend them.',
			3: 'Makes hard trade-offs grounded in evidence; can explain what was cut and why.',
			4: 'Proactively cleans the backlog; deprioritization is a team habit, not an uncomfortable event.',
			5: 'Trade-off calls are transparent, well-reasoned, and serve as a model for other PMs.'
		},
		reflectionPrompt: 'What is the most valuable thing you said no to in the last quarter, and what evidence supported that call?',
		skeleton: true
	},
	{
		dimensionId: 'r3d3',
		principle: 'Bets placed on where the market is heading are worth more than optimizations on where it is today.',
		levels: {
			1: 'Plans only for the current quarter; does not think explicitly about market direction.',
			2: 'Mentions future trends but does not factor them into current prioritization or investment decisions.',
			3: 'Makes multi-quarter bets based on explicit market trajectory hypotheses.',
			4: 'Forward-looking bets are documented, reviewed, and updated as evidence changes.',
			5: 'Market trajectory thinking influences org-level strategy; recognized as a forward-looking voice.'
		},
		reflectionPrompt: 'What bet are you making today based on where your market will be in two years?',
		skeleton: true
	},
	{
		dimensionId: 'r3d4',
		principle: 'The ability to hold or update a position under executive pressure separates strategic thinking from compliance.',
		levels: {
			1: 'Folds under executive pushback; changes position based on seniority, not evidence.',
			2: 'Defends strategy briefly but concedes without new evidence when pressure increases.',
			3: 'Holds position under pushback with evidence; updates when the counterargument has merit.',
			4: 'Strategy defense is confident and data-backed; earns executive respect through consistency.',
			5: 'Executives specifically seek this PM\'s strategic pushback because of track record of accuracy.'
		},
		reflectionPrompt: 'When did you last hold your ground against an executive on a strategic call, and what happened?',
		skeleton: true
	},

	// Skill 4: Business Acumen & Viability
	{
		dimensionId: 'r4d1',
		principle: 'Understanding unit economics enables a PM to model the business impact of product decisions before committing.',
		levels: {
			1: 'Cannot explain how the product generates revenue or what drives costs.',
			2: 'Understands the revenue model at a high level but cannot model the impact of specific decisions.',
			3: 'Can model how product decisions affect revenue, margin, and cost structure.',
			4: 'Uses financial modeling routinely to support prioritization and investment cases.',
			5: 'Cited by finance and leadership as a PM who understands the business as deeply as the product.'
		},
		reflectionPrompt: 'What is the unit economics impact of the last significant product decision you made?',
		skeleton: true
	},
	{
		dimensionId: 'r4d2',
		principle: 'A solution that users love but cannot be sold, supported, or legally shipped is not viable.',
		levels: {
			1: 'Does not assess sales, legal, or operational viability before proposing solutions.',
			2: 'Checks one or two viability dimensions (e.g., legal) but misses others (e.g., ops, sales fit).',
			3: 'Systematically assesses viability across sales, legal, finance, and operations for major decisions.',
			4: 'Viability review is embedded in the team\'s decision process; catches issues before they escalate.',
			5: 'Proactively involves relevant stakeholders early; viability problems are rare because they are caught upstream.'
		},
		reflectionPrompt: 'Describe a time when you caught a viability problem in a solution that the team was excited about.',
		skeleton: true
	},
	{
		dimensionId: 'r4d3',
		principle: 'GTM fit means the sales team can sell it, CS can support it, and it fits the pricing structure.',
		levels: {
			1: 'Does not consider sales or CS constraints when scoping solutions.',
			2: 'Checks with sales or CS after the fact; changes late in the process are common.',
			3: 'Involves GTM stakeholders early; scopes solutions within sales and pricing constraints.',
			4: 'GTM considerations shape product decisions from the start; rework due to GTM mismatch is rare.',
			5: 'Partners with sales leadership to define GTM strategy; product and GTM are designed together.'
		},
		reflectionPrompt: 'How do you ensure that what you are building fits the sales motion and pricing structure before engineering begins?',
		skeleton: true
	},
	{
		dimensionId: 'r4d4',
		principle: 'Financial models are decision tools that justify or kill investments with explicit assumptions.',
		levels: {
			1: 'Does not build financial models; investment cases are qualitative or narrative.',
			2: 'Builds basic spreadsheets but assumptions are implicit or borrowed without validation.',
			3: 'Builds financial models with explicit assumptions; can defend the key inputs.',
			4: 'Models are shared and reviewed with finance; assumptions are tested against actuals.',
			5: 'Financial modeling is a routine practice that shapes prioritization; used as a reference by others.'
		},
		reflectionPrompt: 'Walk through the last financial model you built to support a product decision. What were the key assumptions?',
		skeleton: true
	},

	// Skill 5: Discovery Practice & Methods
	{
		dimensionId: 'r5d1',
		principle: 'Discovery is a continuous weekly practice, not a phase that precedes delivery.',
		levels: {
			1: 'Discovery happens only at the start of major projects; no regular rhythm exists.',
			2: 'Some discovery activity occurs but it is sporadic and tied to delivery schedules.',
			3: 'Maintains a weekly discovery cadence alongside delivery; treats both as ongoing.',
			4: 'Discovery rhythm is a team norm; the team does not wait for a "discovery phase" to start learning.',
			5: 'Discovery practice is a model for other teams; contributes to org-level discovery standards.'
		},
		reflectionPrompt: 'What did you learn in discovery this week, and how does it connect to what your team is building?',
		skeleton: true
	},
	{
		dimensionId: 'r5d2',
		principle: 'Discovery done as a product trio (PM, designer, engineer) produces better solutions than requirements handed down.',
		levels: {
			1: 'Conducts discovery alone and hands findings to design and engineering as requirements.',
			2: 'Occasionally includes design or engineering in discovery but it is not a consistent practice.',
			3: 'Routinely runs discovery sessions with PM, designer, and at least one engineer present.',
			4: 'Product trio collaboration is the default; each discipline contributes to opportunity identification.',
			5: 'Coaches other PMs on trio-based discovery; the model is adopted across multiple teams.'
		},
		reflectionPrompt: 'When did your designer or engineer change your understanding of a user problem during a discovery session?',
		skeleton: true
	},
	{
		dimensionId: 'r5d3',
		principle: 'Every idea contains a riskiest assumption; identifying and testing it cheaply beats building to find out.',
		levels: {
			1: 'Does not explicitly identify assumptions in ideas; moves to solution without testing.',
			2: 'Identifies some assumptions but focuses on easy-to-test ones rather than the riskiest.',
			3: 'Consistently identifies the riskiest assumption in any idea and designs a test for it.',
			4: 'Assumption mapping is a team habit; the process is fast and embedded in how ideas are reviewed.',
			5: 'Teaches assumption identification to other PMs; frameworks are adopted by other teams.'
		},
		reflectionPrompt: 'For the feature you are working on now, what is the riskiest assumption and how are you testing it?',
		skeleton: true
	},
	{
		dimensionId: 'r5d4',
		principle: 'Matching the experiment type to the situation determines whether learning is cheap or expensive.',
		levels: {
			1: 'Uses a single experiment type (e.g., user interviews) regardless of what is being tested.',
			2: 'Knows a few experiment types but defaults to familiar ones without considering fit.',
			3: 'Selects experiment type based on what is being tested: prototype, Wizard of Oz, A/B test, etc.',
			4: 'Experiment selection is fast and confident; cost and learning quality are both considered.',
			5: 'Introduces new experiment types to the team; adapts methods to novel situations.'
		},
		reflectionPrompt: 'Describe the last three experiments you ran. Why did you choose each method?',
		skeleton: true
	},

	// Skill 6: Data Fluency & Experimentation
	{
		dimensionId: 'r6d1',
		principle: 'Analytics fluency means reading funnels, cohorts, and leading indicators without needing a data analyst.',
		levels: {
			1: 'Cannot read product dashboards independently; relies on data team to interpret metrics.',
			2: 'Can read standard dashboards but struggles with cohort analysis, funnels, or leading indicators.',
			3: 'Fluent with AARRR, funnel analysis, and cohort analysis; identifies leading vs. lagging indicators.',
			4: 'Builds custom analyses when needed; can spot anomalies and hypothesize causes independently.',
			5: 'Sets analytics standards for the team; mentors others on metric selection and interpretation.'
		},
		reflectionPrompt: 'What leading indicator best predicts your key outcome metric, and how did you establish that relationship?',
		skeleton: true
	},
	{
		dimensionId: 'r6d2',
		principle: 'A well-designed experiment has a clear hypothesis, defined success criteria, and appropriate sample size.',
		levels: {
			1: 'Runs experiments without pre-defined success criteria; interprets results post-hoc.',
			2: 'Defines success criteria but does not account for statistical significance or sample size.',
			3: 'Designs experiments with clear hypotheses, success metrics, and appropriate rigor.',
			4: 'Experiment design is a documented process; results are interpreted with statistical care.',
			5: 'Sets experiment design standards; coaches others on hypothesis formulation and rigor.'
		},
		reflectionPrompt: 'Walk through the last experiment you designed. What was the hypothesis, success metric, and required sample size?',
		skeleton: true
	},
	{
		dimensionId: 'r6d3',
		principle: 'Metrics can be gamed, misread, or masking a real signal; skepticism about what a number means is as important as reading it.',
		levels: {
			1: 'Accepts metric movements at face value without questioning what might be causing them.',
			2: 'Sometimes questions metrics but lacks a systematic approach to identifying misleading data.',
			3: 'Routinely checks for confounds, gaming, or segmentation effects before acting on metrics.',
			4: 'Catches misleading metrics before they influence team decisions; documents findings for future reference.',
			5: 'Recognized org-wide for data skepticism; prevents metric-driven mistakes at the org level.'
		},
		reflectionPrompt: 'Describe a metric that looked positive but was actually masking a problem. How did you find it?',
		skeleton: true
	},
	{
		dimensionId: 'r6d4',
		principle: 'Quantitative data identifies where; qualitative insight explains why; neither alone is sufficient.',
		levels: {
			1: 'Uses only one type of data (all quant or all qual); does not integrate the two.',
			2: 'Uses both types but treats them as separate workstreams rather than complementary inputs.',
			3: 'Combines quant signals with qualitative interviews to build a complete picture of a problem.',
			4: 'Quant-qual integration is a team norm; each method informs the questions asked of the other.',
			5: 'Trains others on integrated analysis; the approach is adopted as a team standard.'
		},
		reflectionPrompt: 'What quantitative signal prompted your last qualitative investigation, and what did you find?',
		skeleton: true
	},

	// Skill 7: Leadership, Influence & Execution
	{
		dimensionId: 'r7d1',
		principle: 'Influence without authority is earned through credibility and evidence, not title or persistence.',
		levels: {
			1: 'Struggles to align cross-functional partners without direct authority; relies on escalation.',
			2: 'Can align immediate team members but loses influence with adjacent teams or stakeholders.',
			3: 'Regularly aligns cross-functional partners through evidence and clear communication of outcomes.',
			4: 'Trusted across functions; other teams actively seek alignment with this PM\'s roadmap.',
			5: 'Recognized as an organizational aligner; sets influence patterns others in the PM org follow.'
		},
		reflectionPrompt: 'Describe a time you changed a cross-functional partner\'s position through evidence, not authority.',
		skeleton: true
	},
	{
		dimensionId: 'r7d2',
		principle: 'Effective communication adapts the same strategy to the audience level without losing accuracy.',
		levels: {
			1: 'Uses the same communication style for all audiences; misses or confuses stakeholders regularly.',
			2: 'Adapts tone but not substance; executive summaries bury the lead, team updates lack detail.',
			3: 'Adjusts framing, detail level, and vocabulary by audience; key message lands at every level.',
			4: 'Communication is consistently crisp and well-received; rarely needs to re-explain or follow up.',
			5: 'Communication style is a model for the PM team; coaches others on executive and team communication.'
		},
		reflectionPrompt: 'How do you communicate the same product strategy differently to your engineering team versus a VP?',
		skeleton: true
	},
	{
		dimensionId: 'r7d3',
		principle: 'Mentorship impact is measured by the observable growth in a junior PM\'s discovery, strategy, and customer skills.',
		levels: {
			1: 'Does not actively mentor; feedback is rare and reactive.',
			2: 'Gives ad hoc feedback but does not have a structured approach to growing junior PMs.',
			3: 'Regularly mentors 1-2 junior PMs with focused areas of growth and visible progress.',
			4: 'Mentorship produces measurable skill improvement; junior PMs cite this PM as formative.',
			5: 'Recognized as a developer of PM talent; mentorship approach is adopted as a team practice.'
		},
		reflectionPrompt: 'What specific skill has a PM you mentored improved most, and what did you do to help them get there?',
		skeleton: true
	},
	{
		dimensionId: 'r7d4',
		principle: 'Execution discipline means OKRs track business and customer outcomes, not feature delivery counts.',
		levels: {
			1: 'OKRs track outputs (features shipped) rather than outcomes (user or business impact).',
			2: 'Some OKRs reference outcomes but team progress is still measured primarily in delivery terms.',
			3: 'OKRs are outcome-focused; team discusses business and customer impact in sprint reviews.',
			4: 'Outcome thinking is embedded in how the team plans, executes, and retrospects.',
			5: 'Execution model is cited by leadership as a benchmark; other teams adopt OKR framing from this PM.'
		},
		reflectionPrompt: 'What is your team\'s most important OKR right now, and how are you measuring customer impact rather than feature delivery?',
		skeleton: true
	},

	// Skill 8: Domain & Market Depth
	{
		dimensionId: 'r8d1',
		principle: 'Deep competitive intelligence enables a PM to explain competitor moves before the team asks.',
		levels: {
			1: 'Cannot name key competitors\' strategies or differentiators; learns of moves reactively.',
			2: 'Aware of top competitors but knowledge is surface-level and not regularly updated.',
			3: 'Maintains current knowledge of key competitors\' strategies, strengths, and likely next moves.',
			4: 'Proactively monitors competitive landscape; brief the team before competitors\' moves become news.',
			5: 'Competitive intelligence is a team asset; PM is the go-to expert for the entire org on competitive dynamics.'
		},
		reflectionPrompt: 'What do you expect your top competitor to ship in the next two quarters, and what signals are you reading to make that prediction?',
		skeleton: true
	},
	{
		dimensionId: 'r8d2',
		principle: 'Forward-looking market bets require an explicit view of where the domain will be in 2-3 years.',
		levels: {
			1: 'Does not think about market trajectory; roadmap reflects today\'s market, not tomorrow\'s.',
			2: 'Aware of market trends but does not translate them into explicit product bets.',
			3: 'Maintains a documented view of where the market is heading and which bets it implies.',
			4: 'Forward-looking bets are tested and updated regularly; past predictions are reviewed for accuracy.',
			5: 'Market trajectory thinking informs company-level strategy; recognized as a forward-looking voice.'
		},
		reflectionPrompt: 'What structural change in your market over the next two years are you building toward today?',
		skeleton: true
	},
	{
		dimensionId: 'r8d3',
		principle: 'Understanding the full user lifecycle reveals where the product creates and destroys value across acquisition, activation, retention, revenue, and referral.',
		levels: {
			1: 'Focuses on one lifecycle stage (usually activation or feature usage); ignores acquisition and retention.',
			2: 'Understands multiple lifecycle stages but cannot explain how they connect or reinforce each other.',
			3: 'Maps the full user lifecycle for their product and identifies the highest-leverage stages.',
			4: 'Lifecycle model informs roadmap prioritization; gaps in retention or referral are addressed proactively.',
			5: 'Lifecycle thinking is a team standard; PM coaches others on identifying cross-stage leverage points.'
		},
		reflectionPrompt: 'Which lifecycle stage is most broken in your product right now, and what evidence points to it?',
		skeleton: true
	},
	{
		dimensionId: 'r8d4',
		principle: 'Positioning awareness means understanding how users perceive the product relative to alternatives, not just how the company describes it.',
		levels: {
			1: 'Cannot articulate how users perceive the product relative to alternatives; relies on marketing messaging.',
			2: 'Aware of positioning statements but does not validate them against actual user perceptions.',
			3: 'Tests positioning with real users; can describe where the product wins and loses in user perception.',
			4: 'Positioning insights inform product decisions; misalignment between message and perception is caught early.',
			5: 'Positioning is a product input, not just a marketing output; PM shapes how the product earns its perception.'
		},
		reflectionPrompt: 'How do your users actually describe your product to colleagues, and how does that differ from your official positioning?',
		skeleton: true
	}
];
