import type { CaseStudy } from '$lib/types';

export const caseStudies: CaseStudy[] = [
	// ── Skill 1: User Empathy & Customer Knowledge ──────────────────────

	{
		id: 'cs_1_1',
		title: 'Spotify Podcast Commuters',
		prompt:
			"You are a PM at Spotify. Data shows that podcast listening among commuters has plateaued despite overall podcast growth. Your VP asks you to investigate and propose improvements. Walk through: How would you develop a deep understanding of commuter podcast listeners? What interview approach would you use? What specific behaviors and pain points would you look for? Propose 2-3 solution concepts grounded in user insight.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2],
		caseType: 'product_design',
		rubricDimensionIds: ['r1d1', 'r1d2', 'r1d3'],
		hints: [
			'Story-based interviewing (Torres)',
			'Distinguish stated vs. revealed preferences',
			'Map the full commute context — before, during, after'
		]
	},
	{
		id: 'cs_1_2',
		title: 'Slack Onboarding for Enterprise',
		prompt:
			"You are a PM at Slack. Enterprise customers (5000+ employees) report that new hires take 3+ weeks to become productive Slack users, compared to 3 days at smaller companies. Design a research plan to deeply understand the new hire experience at large enterprises. What would you observe? Who would you interview? What story-based questions would you ask? How would you distinguish between a training problem vs. a product problem?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d1', 'r1d2', 'r1d4'],
		hints: [
			"Observe actual onboarding sessions, don't just interview",
			'Interview both new hires AND the people who onboard them',
			'Look for workarounds — they reveal unmet needs'
		]
	},
	{
		id: 'cs_1_3',
		title: 'Duolingo Dropout Learners',
		prompt:
			"You are a PM at Duolingo. 60% of users who complete their first week drop off by week 4. Your task: Design a user research program to understand WHY these users leave. Consider: What segments of dropouts might exist? How would you recruit and interview them (they're no longer active)? What past behaviors would you ask about? How would you synthesize findings into actionable opportunities?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d1', 'r1d2', 'r1d3'],
		hints: [
			'Churned users are hard to recruit — think creatively',
			"Look for the 'aha moment' that didn't happen",
			'Segment by motivation: career, travel, hobby, school'
		]
	},
	{
		id: 'cs_1_4',
		title: 'Figma Plugin Ecosystem',
		prompt:
			"You are a PM at Figma responsible for the plugin ecosystem. Plugin adoption is high among power users but near-zero among casual designers. Design a research approach to understand the gap. Who are 'casual designers'? What does their workflow look like? What would story-based interviews reveal that usage data alone cannot? Propose an opportunity map based on hypothetical findings.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2, 8],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d1', 'r1d2', 'r1d3', 'r1d4'],
		hints: [
			"Don't ask 'would you use plugins?' — observe actual workflows",
			'Map the full design workflow, not just the Figma session',
			'Consider the discovery problem: how do casual users even find plugins?'
		]
	},
	{
		id: 'cs_1_5',
		title: 'Multi-Segment Empathy at Scale',
		prompt:
			"You are a Principal PM at a fintech company that serves three distinct segments: individual consumers, small businesses, and mid-market enterprises. Each segment has different needs, workflows, and pain points — but leadership wants a unified platform strategy. How would you build deep customer understanding across all three segments simultaneously? Design the research program, team structure, synthesis approach, and how you'd resolve conflicts between segment needs. How would you coach 3 PMs (one per segment) to maintain user empathy depth while you ensure cross-segment coherence?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 1,
		secondarySkillIds: [3, 7],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d1', 'r1d2', 'r1d3', 'r1d4'],
		hints: [
			"You can't be the expert on all three segments — build a system",
			"Cross-segment synthesis is the Principal PM's unique contribution",
			'Look for shared pain points that unlock unified solutions'
		]
	},
	{
		id: 'cs_1_6',
		title: 'Slack Search Sidebar Predictions',
		prompt:
			"You're the PM for Slack's message search feature. Currently, users search via a top-bar search box. Your team proposes moving search into a dedicated sidebar panel with advanced filters (date range, file type, user, channel). Before the experiment ships, what specific predictions would you make about user behavior? How would you know if you're right?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d4', 'r1d1', 'r1d3'],
		hints: [
			'Predict specific metrics shifts, not just directional guesses',
			'Consider both power users and casual searchers separately',
			'What behavioral proxy would tell you search is better vs just different?'
		]
	},
	{
		id: 'cs_1_7',
		title: 'Figma Collaborative Comments Predictions',
		prompt:
			"At Figma, you're shipping a new 'collaborative comments' feature that allows real-time threaded discussion on design elements. Design thinking says this will increase collaboration velocity. Before launch, what user reactions or behaviors are you most uncertain about? Walk me through how you'd set up your prediction framework.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [5],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d4', 'r1d2', 'r1d3'],
		hints: [
			'Distinguish adoption from sustained use',
			'Consider which team roles will use comments differently',
			'What would signal that comments replace meetings vs. add noise?'
		]
	},
	{
		id: 'cs_1_8',
		title: 'LinkedIn Passive Job Seeker Feed',
		prompt:
			"LinkedIn is testing a 'Jobs You Might Like' feed section for passive job seekers — people not actively looking. You have data showing these users visit LinkedIn 2x per week but rarely engage with job content. What's your prediction for engagement, click-through rate, and application rate? What would surprise you, and what would confirm your mental model is accurate?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r1d4', 'r2d3', 'r1d1'],
		hints: [
			'Passive seekers have fundamentally different intent than active seekers',
			'What click-through rate would indicate interest vs. curiosity?',
			'Consider the social risk of appearing to be job-hunting'
		]
	},
	{
		id: 'cs_1_9',
		title: 'Stripe Smart Retry Recovery Prediction',
		prompt:
			"Stripe is launching a new 'Smart Retry' feature that automatically retries failed payments on user-configurable schedules (e.g., retry every 3 days up to 5 times). Before shipping, you need to predict the key outcome: what percent of failed payments will successfully recover? Walk me through your prediction logic and what merchant feedback would validate or invalidate your assumption.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [2, 6],
		caseType: 'estimation',
		rubricDimensionIds: ['r1d4', 'r1d1', 'r2d2'],
		hints: [
			'Failed payments have different root causes: insufficient funds, expired cards, fraud blocks',
			'Retry timing matters — what day-of-week and time patterns exist?',
			'What recovery rate would merchants consider worth the effort?'
		]
	},
	{
		id: 'cs_1_10',
		title: 'Figma Design Systems Interview Craft',
		prompt:
			"You're interviewing power users of Figma to understand why they invest time building design systems. An obvious question: 'Do you think a design system saves time?' You predict they'll say yes. How do you ask this differently to uncover what they actually do — not what they think they should say? Give me 3 alternative questions and explain the difference.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [5],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d2', 'r1d1', 'r1d3'],
		hints: [
			'Story-based questions anchor in specific past events',
			'Ask about the last time they updated the system, not whether they find it useful',
			'Watch for the gap between aspirational answers and actual behavior'
		]
	},
	{
		id: 'cs_1_11',
		title: 'Duolingo Dropout Interview Design',
		prompt:
			"You're interviewing people who abandoned Duolingo after 2 weeks. You ask: 'What made you stop using Duolingo?' Most say 'I was too busy.' But you suspect that's rationalization — they got bored or found it too hard. How would you structure the interview to get past the surface answer? Walk me through your questioning sequence.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 1,
		secondarySkillIds: [5],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r1d2', 'r1d1', 'r1d3'],
		hints: [
			'Ask them to walk through their last session in detail',
			'Probe what they did instead of Duolingo — reveals true priority',
			'Timeline reconstruction beats direct why questions'
		]
	},

	// ── Skill 2: Product Sense & Judgment ────────────────────────────────

	{
		id: 'cs_2_1',
		title: 'LinkedIn Remote Workers',
		prompt:
			"LinkedIn is considering a new feature to help remote workers feel less isolated and more connected to their professional community. You're the PM. Three feature concepts have been proposed: (A) Virtual coworking rooms, (B) Professional interest-based group video chats, (C) AI-powered networking matches based on work context. Evaluate each concept. Which would you pursue and why? What risks does each carry across value, usability, feasibility, and viability? What would you need to learn before committing?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [1],
		caseType: 'product_design',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d3'],
		hints: [
			"Use Cagan's 4 risks framework for each option",
			'Consider what LinkedIn uniquely has (professional graph) vs. what others already do',
			"Think about the 'aha moment' for each concept"
		]
	},
	{
		id: 'cs_2_2',
		title: 'Notion AI Assistant Scope',
		prompt:
			"You're a PM at Notion. The team has built an AI assistant prototype that can do 5 things: (1) Summarize pages, (2) Generate meeting notes, (3) Auto-tag and organize content, (4) Answer questions about workspace content, (5) Draft documents from templates. You can only ship 2 features in the first release. Which 2 do you choose and why? Walk through your product judgment: What signals would you use? What user problems does each solve? What's the risk of shipping the wrong ones first?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [4],
		caseType: 'product_improvement',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d4'],
		hints: [
			"Which features create the strongest 'aha moment'?",
			'Consider activation vs. retention value',
			"What's the cost of being wrong for each?"
		]
	},
	{
		id: 'cs_2_3',
		title: 'Instagram Reels Discovery',
		prompt:
			"Instagram Reels engagement is growing but creators report that their content reaches fewer followers compared to TikTok. The algorithm team proposes three changes: (A) Prioritize follower content in the Reels feed, (B) Add a 'Following Reels' separate tab, (C) Boost new creators algorithmically for their first 30 days. Evaluate the product trade-offs of each approach. What second-order effects would each have? What data would you need? What's your recommendation?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [3, 8],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d3', 'r2d4'],
		hints: [
			'Creator-viewer balance is a two-sided marketplace problem',
			'Second-order effects: how does each change affect content creation incentives?',
			"What would TikTok's response be to each?"
		]
	},
	{
		id: 'cs_2_4',
		title: 'Stripe Payment Links Evolution',
		prompt:
			"You're a PM at Stripe. Payment Links (simple shareable payment pages) have been adopted primarily by micro-businesses and solopreneurs. The Growth team wants to add features to move upmarket (invoicing, subscriptions, analytics dashboard). The Core team argues this will cannibalize Stripe Billing. Use your product judgment: Is moving upmarket the right call? What signals would tell you? How do you evaluate the cannibalization risk? What would you recommend?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [4],
		caseType: 'product_improvement',
		rubricDimensionIds: ['r2d1', 'r2d3', 'r2d4'],
		hints: [
			'Cannibalization can be healthy if it captures users earlier',
			'Think about the user journey: solo → small team → growing business',
			"What's the cost of NOT moving upmarket?"
		]
	},
	{
		id: 'cs_2_5',
		title: 'Portfolio Product Judgment',
		prompt:
			"You are a Principal PM at a mid-stage SaaS company with 3 products: (A) a mature core product with 80% of revenue, (B) a 1-year-old growth product with strong adoption but no monetization, and (C) an early-stage experimental product with uncertain market fit. The CEO asks you to recommend how to allocate the next 2 quarters of product investment across these 3 products. Walk through your product judgment: What framework would you use? What data would you need? How do you balance short-term revenue protection vs. long-term growth? How do you make this call when you can't be the domain expert on all 3 products?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 2,
		secondarySkillIds: [3, 4],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d3', 'r2d4'],
		hints: [
			'This is a portfolio allocation problem, not a feature prioritization problem',
			'Consider the stage of each product: protect, grow, explore',
			"Your judgment about each PM's judgment matters here"
		]
	},
	{
		id: 'cs_2_6',
		title: 'AI Resume Screener Risk Evaluation',
		prompt:
			"A startup pitches you an idea: 'AI-powered resume screening that removes bias by anonymizing candidate names and demographics.' Evaluate this idea on Cagan's four risks: (1) Customer desirability, (2) Business viability, (3) Feasibility, (4) Usability. What's the highest risk, and what's a false assumption baked into this pitch?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [3],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d4'],
		hints: [
			'Anonymization doesn\'t remove all bias signals — job titles, schools, locations leak demographics',
			'Who is the buyer vs. the user? HR leaders buy, recruiters use',
			'Feasibility risk: does the AI actually reduce bias or just hide it?'
		]
	},
	{
		id: 'cs_2_7',
		title: 'Gmail AI Auto-Reply Evaluation',
		prompt:
			"Your team proposes: 'Add AI-powered auto-reply to Gmail so users can write emails faster.' You're skeptical. Walk through your evaluation: (1) What user need are we solving? (2) What are the risks? (3) How do Cagan's four risks apply? (4) What evidence would you need before committing engineering?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [1],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d4'],
		hints: [
			'Speed is a feature but authenticity is the cost',
			'Consider the embarrassment risk of a wrong auto-reply',
			'Gmail Smart Reply already exists — what gap remains?'
		]
	},
	{
		id: 'cs_2_8',
		title: 'Slack Paid-Only Model Risk',
		prompt:
			"Slack is considering: 'Paid only mode — no free tier, charge all teams $X/month.' On the surface, this increases revenue. What are the hidden risks you'd evaluate before pitching this to leadership? What signals would suggest this is a bad idea?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [3, 8],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d4'],
		hints: [
			'Free tier drives viral adoption — what happens to the growth loop?',
			'Competitive response: Teams is bundled with Office 365',
			'How many current paying teams started on free?'
		]
	},
	{
		id: 'cs_2_9',
		title: 'White-Label SaaS Risk Assessment',
		prompt:
			"A B2B SaaS founder proposes: 'White-label our product for agencies so they can sell it under their own brand.' Quick reaction: What's the core assumption here, and what's one way this could hurt the core business? How would you evaluate this idea rigorously?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 2,
		secondarySkillIds: [3],
		caseType: 'trade_off',
		rubricDimensionIds: ['r2d1', 'r2d2', 'r2d3'],
		hints: [
			'White-labeling removes your brand from the end user relationship',
			'Agency incentives may diverge from your product direction',
			'Support burden: who handles bugs — you or the agency?'
		]
	},

	// ── Skill 3: Strategic Thinking & Vision ─────────────────────────────

	{
		id: 'cs_3_1',
		title: 'Atlassian Jira for Non-Tech Teams',
		prompt:
			"You are a PM at Atlassian. Jira has strong adoption among engineering teams but struggles with marketing, HR, and operations teams who find it too complex. Your VP wants a strategy for expanding Jira to non-technical teams. Define: What is the strategic opportunity (size it)? What are the 2-3 biggest problems to solve? In what sequence would you solve them and why? How does this connect to Atlassian's broader mission? What would success look like in 12 months?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [4, 8],
		caseType: 'product_strategy',
		rubricDimensionIds: ['r3d1', 'r3d2', 'r3d3'],
		hints: [
			"Use Cagan's hierarchy: Mission → Vision → Strategy → Discovery",
			"Don't just simplify Jira — ask if the core metaphor works for non-tech teams",
			'Consider competitive landscape: Monday.com, Asana, Notion'
		]
	},
	{
		id: 'cs_3_2',
		title: 'Airbnb Experiences Strategy',
		prompt:
			"You are a PM at Airbnb. Experiences (bookable local activities) launched years ago but remain a small fraction of revenue compared to accommodation. Define a 2-year product strategy for Experiences. Consider: Why hasn't it grown faster? What's the real strategic value of Experiences to Airbnb (beyond direct revenue)? What 3 problems would you prioritize and why? How would you sequence them?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [4, 2],
		caseType: 'product_strategy',
		rubricDimensionIds: ['r3d1', 'r3d2', 'r3d3', 'r3d4'],
		hints: [
			'Think about Experiences as a strategic moat, not just a product',
			'Supply-side (hosts/guides) vs. demand-side (travelers) problems',
			'Gibson Biddle\'s DHM: Delight, Hard-to-copy, Margin-enhancing'
		]
	},
	{
		id: 'cs_3_3',
		title: "Shopify's AI Commerce Strategy",
		prompt:
			"You are a Staff PM at Shopify. The CEO has declared that AI will transform commerce. Define a product strategy for how Shopify should integrate AI capabilities for merchants. Be specific: What merchant problems does AI uniquely solve? What is Shopify's right to win vs. standalone AI tools? Propose a 3-phase strategy (6mo / 12mo / 24mo) with clear rationale for sequencing.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [4, 8],
		caseType: 'product_strategy',
		rubricDimensionIds: ['r3d1', 'r3d2', 'r3d3', 'r3d4'],
		hints: [
			'Right to win: Shopify has merchant data that no standalone AI tool has',
			'Phase 1 should create value AND generate training data for Phase 2+',
			'Consider the merchant skill spectrum: tech-savvy vs. non-technical'
		]
	},
	{
		id: 'cs_3_4',
		title: 'YouTube Shorts vs. Long-Form Balance',
		prompt:
			"You are a Staff PM at YouTube. Shorts are growing rapidly but long-form content generates significantly more ad revenue per view. Define a product strategy that grows Shorts without cannibalizing long-form. What's the strategic role of Shorts in YouTube's ecosystem? How do you resolve the tension between growth metrics (Shorts views) and revenue metrics (long-form watch time)? What would your North Star metric be?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [4, 2],
		caseType: 'product_strategy',
		rubricDimensionIds: ['r3d1', 'r3d2', 'r3d3'],
		hints: [
			'Think about Shorts as top-of-funnel for long-form creators',
			'The creator incentive structure is the strategic lever',
			'Consider the full creator journey, not just viewer engagement'
		]
	},
	{
		id: 'cs_3_5',
		title: 'Multi-Product Strategy for Fintech Expansion',
		prompt:
			"You are a Principal PM at a fintech company that started with personal finance (budgeting app, 5M users). The CEO wants to expand into: (A) Small business banking, (B) Investment/wealth management, (C) Insurance marketplace. You can only pursue one in the next 18 months. Write a product strategy recommendation: How do you evaluate each opportunity? What data and market signals inform your choice? How does each option connect to the company's existing strengths and user base? What are the viability risks for each? Present your recommendation with clear rationale.",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [4, 2, 8],
		caseType: 'product_strategy',
		rubricDimensionIds: ['r3d1', 'r3d2', 'r3d3', 'r3d4'],
		hints: [
			'This is a bet-sizing problem: which option has the best risk/reward?',
			'Consider adjacency: which expansion leverages existing user trust and data?',
			'Roger Martin: Where will you play? How will you win?'
		]
	},
	{
		id: 'cs_3_6',
		title: 'SMB vs Enterprise Strategy Defense',
		prompt:
			"You're the PM for an enterprise SaaS product. Your strategy: Focus on SMB (10-50 person teams) because they have faster buying cycles and higher NPS. The CEO disagrees: 'Why not go upmarket? Enterprise customers are worth 10x more.' You have data showing enterprise deals take 9 months while SMB deals close in 6 weeks. Walk me through how you'd defend your thesis in a board meeting, including what evidence would change your mind.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [2, 4],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r3d4', 'r3d1', 'r2d4'],
		hints: [
			'Revenue per customer vs. total revenue are different arguments',
			'What would the SMB CAC payback period need to be to beat enterprise?',
			'Name the conditions under which you would pivot upmarket'
		]
	},
	{
		id: 'cs_3_7',
		title: 'Notion Database vs Docs Strategy',
		prompt:
			"Your product strategy for Notion: Invest heavily in database and relational features, because power users who build databases have 5x higher retention. Your Head of Sales pushes back: 'Our enterprise sales team wants you to focus on document collaboration instead — that's what they hear in deals.' You have telemetry showing 60% of power users use Databases, but only 20% use collaborative docs. How do you navigate this disagreement?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [4],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r3d4', 'r4d3', 'r3d1'],
		hints: [
			'Sales hears from prospects, telemetry shows actual users — both are valid',
			'Retention driver vs. acquisition driver are different bets',
			'Is the sales team selling to power users or a different persona?'
		]
	},
	{
		id: 'cs_3_8',
		title: 'Figma Mobile Strategy Defense',
		prompt:
			"You're the PM for Figma's mobile app. Your strategy: Don't build mobile-first design tools; instead, build mobile view-and-comment. The VP of Product says: 'Apple and Google are pushing on-device ML. We should build mobile design tools with AI.' You disagree — you think the friction of designing on mobile makes it pointless. How do you have this conversation? What would need to change for you to agree with the VP?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 3,
		secondarySkillIds: [2, 8],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r3d4', 'r3d1', 'r2d4'],
		hints: [
			'Separate the technology trend from the user need',
			'What evidence of mobile design demand would change your mind?',
			'Consider whether AI changes the input problem (tiny screen) or not'
		]
	},

	// ── Skill 4: Business Acumen & Viability ─────────────────────────────

	{
		id: 'cs_4_1',
		title: 'Slack AI Assistant Pricing',
		prompt:
			"You are a PM at Slack. The team has built an AI assistant that can search across all channels, summarize threads, and draft messages. It costs $0.03 per query in LLM inference. Your task: Assess the business viability of this feature. Should it be included in existing plans, sold as an add-on, or gated by usage? Model the unit economics. What's the viability risk? How do you balance user value with business sustainability? What would you recommend to the leadership team?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3, 8],
		caseType: 'trade_off',
		rubricDimensionIds: ['r4d1', 'r4d2', 'r4d3', 'r4d4'],
		hints: [
			'Consider willingness to pay vs. cost to serve at different usage levels',
			'Look at how competitors (Teams, Notion) are pricing AI features',
			'The viability risk: heavy users may cost more than they pay'
		]
	},
	{
		id: 'cs_4_2',
		title: 'Spotify HiFi Tier Viability',
		prompt:
			"Spotify has long promised a HiFi (lossless audio) tier but hasn't launched it. You're the PM tasked with assessing viability. Consider: What would you price it at? What are the infrastructure costs of streaming lossless? What percentage of users would upgrade? How does this affect existing Premium subscribers (downgrade risk)? What's the competitive pressure (Apple Music already includes lossless for free)? Recommend: launch, don't launch, or alternative approach — with full business rationale.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3, 8],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r4d1', 'r4d2', 'r4d3', 'r4d4'],
		hints: [
			'Apple including lossless for free is a major viability threat',
			'Bandwidth costs scale differently than standard streaming',
			'Consider bundling: HiFi + other premium features'
		]
	},
	{
		id: 'cs_4_3',
		title: 'Figma Freemium to Enterprise Bridge',
		prompt:
			"You are a PM at Figma. The freemium plan drives massive adoption but many teams stay free indefinitely. Design proposes adding AI design features only on paid plans to drive conversion. Assess the viability: What's the risk to the growth flywheel? What conversion rate improvement would justify the change? How do you model the trade-off between free user growth and paid conversion? What would you recommend?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3, 2],
		caseType: 'trade_off',
		rubricDimensionIds: ['r4d1', 'r4d2', 'r4d3'],
		hints: [
			'Free users are part of the moat (network effects) — killing free growth has hidden costs',
			'Model the full funnel: free → team → org → enterprise',
			'Consider what features drive adoption vs. what features drive willingness to pay'
		]
	},
	{
		id: 'cs_4_4',
		title: 'DoorDash Grocery Delivery Viability',
		prompt:
			"You are a PM at DoorDash. Grocery delivery is growing but margins are significantly worse than restaurant delivery (larger orders, more items to pick, higher error rates). Assess the viability of continuing to invest in grocery. What are the unit economics? What would need to change for grocery to be viable? How does grocery delivery serve DoorDash's broader strategy even if it's not independently profitable? What's your recommendation?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3, 8],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r4d1', 'r4d2', 'r4d3', 'r4d4'],
		hints: [
			'Loss leaders can be strategically viable if they drive other revenue',
			'Consider: does grocery increase app open frequency for restaurant orders?',
			"Compare Instacart's model vs. DoorDash's integrated approach"
		]
	},
	{
		id: 'cs_4_5',
		title: 'Platform Business Model Evolution',
		prompt:
			"You are a Principal PM at a developer tools company (think Twilio/Stripe-like). Usage-based pricing drove hypergrowth but revenue is now volatile and unpredictable quarter to quarter. The CFO wants to shift toward more predictable subscription/committed-use pricing. The CTO warns this will alienate developers who love pay-as-you-go. Design a pricing evolution strategy that addresses both concerns. Model the trade-offs. How do you phase the transition? What viability risks exist in both the current and proposed models? Present your recommendation.",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 4,
		secondarySkillIds: [3, 7],
		caseType: 'trade_off',
		rubricDimensionIds: ['r4d1', 'r4d2', 'r4d3', 'r4d4'],
		hints: [
			'Committed use discounts (like AWS) offer a middle path',
			'Developer adoption funnel: free → pay-as-you-go → committed is natural',
			'Model revenue predictability vs. growth rate trade-off'
		]
	},
	{
		id: 'cs_4_6',
		title: 'Usage-Based Pricing Viability',
		prompt:
			"You're the PM for a B2B SaaS platform. Your team proposes a new 'usage-based pricing' model instead of the current per-seat model. Usage gets metered via API calls. Before you greenlight engineering, walk me through every viability risk you need to validate with legal, sales, finance, and ops. Which one is the biggest blocker?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [2, 3],
		caseType: 'trade_off',
		rubricDimensionIds: ['r4d2', 'r2d2', 'r4d1'],
		hints: [
			'Sales compensation changes when deals are usage-based — sales team may resist',
			'Finance needs predictable revenue forecasting — usage is inherently variable',
			'Legal: what happens when a customer disputes metering accuracy?'
		]
	},
	{
		id: 'cs_4_7',
		title: 'Notion API Rate Limit Viability',
		prompt:
			"Notion wants to launch an 'API Rate Limits' tier for the free plan — capping API calls at 100/hour to reduce infrastructure costs. Write the viability assessment covering sales impact, legal implications (terms of service updates), operations (billing and metering), and customer support escalations. What's your go/no-go recommendation?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r4d2', 'r4d3', 'r3d2'],
		hints: [
			'Free tier API users may include integration partners — breaking them has ecosystem cost',
			'How do you grandfather existing users vs. applying limits retroactively?',
			'What percentage of free users actually exceed 100 calls/hour?'
		]
	},
	{
		id: 'cs_4_8',
		title: 'Dropbox HIPAA Compliance Viability',
		prompt:
			"Dropbox is considering HIPAA compliance certification for the Enterprise tier. This requires new audit controls, encrypted audit logs, and monthly compliance reviews. Before committing resources, what viability questions must you answer with legal, sales (enterprise sales team), and ops? What's the hidden cost no one's talking about?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [3, 6],
		caseType: 'trade_off',
		rubricDimensionIds: ['r4d2', 'r4d3', 'r6d2'],
		hints: [
			'HIPAA compliance is ongoing, not a one-time certification',
			'What happens when an audit fails — what is the liability exposure?',
			'How many enterprise prospects have explicitly asked for HIPAA?'
		]
	},
	{
		id: 'cs_4_9',
		title: 'Google Meet External Recording Viability',
		prompt:
			"Google Meet is launching a new 'External Recording' feature that allows hosts to record meetings and share them with non-participants. What legal risks (consent, jurisdiction, GDPR, CCPA), sales implications (competitive positioning vs Zoom), and ops challenges (storage, compliance proof) must you validate before shipping? How do you prioritize risk?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 4,
		secondarySkillIds: [6],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r4d2', 'r4d3', 'r6d3'],
		hints: [
			'Recording consent laws vary by jurisdiction — two-party vs. one-party states',
			'Zoom already has this — what differentiation does Google Meet add?',
			'Storage cost at scale for video is significant — who pays?'
		]
	},

	// ── Skill 5: Discovery Practice & Methods ──────────────────────────

	{
		id: 'cs_5_1',
		title: 'Airbnb Unique Stays Discovery Plan',
		prompt:
			"You are a PM at Airbnb. Bookings for unique stays (treehouses, yurts, houseboats) have plateaued despite high browse-to-view rates. Design a complete discovery plan. Build an Opportunity Solution Tree: What is the desired outcome? What are the possible opportunities (user problems)? For your top 2 opportunities, propose solutions and the experiments you would run to test them. Be specific about experiment design: What's the hypothesis? What's the riskiest assumption? What's the smallest test?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d3', 'r5d4'],
		hints: [
			'High browse-to-view but low booking suggests a conversion problem, not a discovery problem',
			'Map the full booking funnel: search → view → consider → book',
			'Consider both guest-side and host-side opportunities'
		]
	},
	{
		id: 'cs_5_2',
		title: 'Notion Team Adoption Discovery',
		prompt:
			"You are a PM at Notion. Individual adoption is strong but team-level adoption stalls — one person sets up the workspace and teammates don't engage. Design a discovery sprint (2 weeks). Who is in your Product Trio? What interviews would you conduct in week 1? How would you build an OST from the findings? What assumption tests would you run in week 2? Be specific about methods.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d3'],
		hints: [
			"Interview both the 'champion' (active user) and the 'resistor' (non-adopter)",
			'The riskiest assumption might be about the value prop, not the UX',
			"Consider a 'painted door' test for potential team features"
		]
	},
	{
		id: 'cs_5_3',
		title: 'Uber Eats Repeat Order Optimization',
		prompt:
			"You are a PM at Uber Eats. Repeat order rate is 40% (users who order again within 30 days) and the target is 55%. Design a discovery process: How would you segment users to understand different repeat behaviors? Design 3 different experiment types (one qualitative, one prototype-based, one quantitative) to test different hypotheses about why users don't reorder. Walk through the OST: outcome → opportunities → solutions → experiments.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 6],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d3', 'r5d4'],
		hints: [
			'Segment: never-reorder vs. occasional vs. almost-frequent',
			'Qualitative: interview users 7 days after first order about their experience',
			"Prototype: test a 'reorder with one tap' flow; Quantitative: A/B test reminder notifications"
		]
	},
	{
		id: 'cs_5_4',
		title: 'HubSpot CRM AI Discovery',
		prompt:
			"You are a PM at HubSpot. The team wants to add AI-powered lead scoring to the CRM. Before building, you need to run discovery. The riskiest assumption is: 'Sales reps will trust AI-generated lead scores enough to change their prioritization behavior.' Design 3 experiments of increasing fidelity to test this assumption: (1) lowest-cost test, (2) medium-fidelity test, (3) highest-fidelity test before full build. For each, specify: hypothesis, method, success criteria, timeline, and what you'd learn.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d3', 'r5d4'],
		hints: [
			"Lowest cost: show existing reps a spreadsheet with 'AI scores' (actually manual) and observe behavior",
			'Medium: Wizard of Oz — human-generated scores presented as AI in the CRM',
			'Highest: prototype with real ML model for one sales team for 2 weeks'
		]
	},
	{
		id: 'cs_5_5',
		title: 'Building Org-Wide Discovery Culture',
		prompt:
			"You are a Principal PM at a Series C B2B SaaS company (200 employees, 8 product teams). Currently, only 2 of the 8 teams practice any form of structured discovery — the rest ship features from stakeholder requests. The CPO asks you to design a plan to establish continuous discovery across all 8 teams within 6 months. What does your rollout look like? How do you handle resistance from teams that say 'we don't have time for discovery'? What training, tooling, and rituals would you introduce? How do you measure whether it's working? What does the PM org look like in 6 months if this succeeds?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 5,
		secondarySkillIds: [1, 7],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d3', 'r5d4'],
		hints: [
			'Start with the 2 teams already doing it — make them showcases',
			"Don't mandate — create pull by showing results",
			'Torres: discovery is a habit, not a phase — design weekly rituals'
		]
	},
	{
		id: 'cs_5_6',
		title: 'Adobe Intelligent Cropping Trio Discovery',
		prompt:
			"You're running discovery for a new 'Intelligent Cropping' feature in Adobe Photoshop. The typical PM workflow is: interview users → write requirements → hand to design/eng. Describe an alternative approach where the PM, lead designer, and tech lead work together from day one. What changes? When do you split?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d2', 'r5d1', 'r5d3'],
		hints: [
			'Trio discovery means shared understanding, not shared tasks',
			'When should the engineer be in the room vs. building a prototype?',
			'What decisions require all three perspectives vs. just one?'
		]
	},
	{
		id: 'cs_5_7',
		title: 'Stripe Onboarding Trio Discovery',
		prompt:
			"Stripe is redesigning the merchant onboarding flow. Historically, PM owns the user journey, design owns the UX, and eng owns feasibility. You want to restructure this as a true trio. Walk me through: (1) What discovery happens together? (2) When does each person own a decision? (3) How do you prevent deadlock?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d2', 'r5d3', 'r4d3'],
		hints: [
			'Customer interviews should include all three — different ears hear different things',
			'Deadlock prevention: who has final call on what?',
			'Feasibility constraints discovered early reshape the solution space'
		]
	},
	{
		id: 'cs_5_8',
		title: 'Figma Smart Suggestions Trio Validation',
		prompt:
			"You're designing a new 'Smart Suggestions' feature for Figma that recommends design components based on project context. Your PM instinct says 'users need smarter recommendations.' But the designer worries about cognitive overload, and the eng lead says 'that's a 3-month ML project.' Describe how you'd approach discovery as a trio to validate whether this is worth the investment. What experiments do you run together?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d2', 'r5d4', 'r5d3'],
		hints: [
			'Each trio member has a different concern — address all three before committing',
			'Can you test the value without the ML model (Wizard of Oz)?',
			'What is the minimum evidence threshold for a 3-month investment?'
		]
	},
	{
		id: 'cs_5_9',
		title: 'Fintech Transaction Confirmation Trio',
		prompt:
			"You're the PM for a fintech app redesigning the transaction confirmation screen. A user complained: 'I can't tell if I sent money to the right person.' The designer proposes a new layout; the engineer says it'll require backend changes. Describe your discovery process with the trio: How do you avoid the PM dictating the solution? When is each person the decision-maker?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d2', 'r5d1', 'r5d3'],
		hints: [
			'One complaint may represent a pattern — validate the scope first',
			'Backend changes mean the solution space is constrained — engineer input early',
			'Who decides the layout: designer or PM? What about the data display?'
		]
	},
	{
		id: 'cs_5_10',
		title: 'Duolingo Reminder Notification Experiment',
		prompt:
			"At Duolingo, you're testing a hypothesis: 'Mobile learners will complete lessons more consistently if we send a reminder notification 24 hours after their last lesson.' You have three experiment options: (1) A/B test (50% on/off), (2) Time-series holdout (users in months 1-2 vs 3-4), (3) Quasi-experiment (cohort comparison). Which experiment type answers the question best? Why not the others?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [2],
		caseType: 'estimation',
		rubricDimensionIds: ['r5d4', 'r5d3', 'r2d2'],
		hints: [
			'Time-series designs confound with seasonality and product changes',
			'Cohort comparisons introduce selection bias unless carefully matched',
			'What is the unit of randomization — user or device?'
		]
	},
	{
		id: 'cs_5_11',
		title: 'Notion Database Relations Experiment Design',
		prompt:
			"Notion is testing: 'Users with more than 5 databases will adopt the new Database Relations feature.' The challenge: Relations are only useful when you have multiple linked databases, so the most engaged power users (who'd benefit) will adopt quickly regardless of marketing. Your team suggests a randomized controlled trial. Is that the right experiment? What's the hidden risk in experiment design here?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [2],
		caseType: 'trade_off',
		rubricDimensionIds: ['r5d4', 'r2d2', 'r5d3'],
		hints: [
			'Self-selection bias: power users adopt features regardless of treatment',
			'What would a negative result actually tell you?',
			'Consider whether you are testing adoption or value'
		]
	},
	{
		id: 'cs_5_12',
		title: 'Slack Workflows Retention Experiment',
		prompt:
			"Slack wants to test: 'Teams that use Slack Workflows (automation) will have higher retention.' But Workflows are opt-in and skew toward power users who are already engaged. An A/B test will conflate selection bias with causal impact. Design an experiment that separates these effects. What type of test would you use?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [2],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r5d4', 'r2d3', 'r5d3'],
		hints: [
			'Encouragement design: randomize access to Workflows, not Workflows usage',
			'Instrumental variable approaches separate selection from treatment',
			'What is the counterfactual for a power user who would have stayed anyway?'
		]
	},
	{
		id: 'cs_5_13',
		title: 'Stripe Checkout A/B Test Stratification',
		prompt:
			"You're testing a new checkout flow at Stripe: 'A one-page checkout increases conversion rate vs a two-step checkout.' You plan a standard A/B test (50/50 split). But you know: (1) Conversion varies wildly by device (mobile vs desktop), (2) International customers convert at 60% the rate of US customers. How does this change your experiment design? What's the right approach?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [2, 7],
		caseType: 'estimation',
		rubricDimensionIds: ['r5d4', 'r5d3', 'r7d4'],
		hints: [
			'Stratified randomization ensures balanced groups across known confounders',
			'Consider interaction effects: mobile + international may behave differently',
			'What sample size do you need per stratum for statistical power?'
		]
	},
	{
		id: 'cs_5_14',
		title: 'Gmail Smart Inbox Discovery',
		prompt:
			"You're designing a new 'Smart Inbox' for Gmail that filters low-priority emails (newsletters, promotions) into a separate folder. Walk me through your discovery process: (1) What is the core assumption you need to validate? (2) How would you talk to users? (3) What would you prototype? (4) What's your success metric?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d3'],
		hints: [
			'Gmail already has tabs and filters — what problem remains unsolved?',
			'False positives (hiding important email) have high cost',
			'What does success look like: fewer unread emails or faster response time?'
		]
	},
	{
		id: 'cs_5_15',
		title: 'Dropbox Anti-Piracy Watermark Discovery',
		prompt:
			"Dropbox is exploring a new anti-piracy feature that watermarks all downloaded files. Before you build it, what's the discovery process? Walk through: user interviews, value hypothesis, implementation risks, and how you'd test the idea without building the full feature.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d4'],
		hints: [
			'Who wants this: the file owner or the organization admin?',
			'Watermarking changes the user experience of every download — adoption risk',
			'Fake door test: offer watermark toggle and measure clicks before building'
		]
	},
	{
		id: 'cs_5_16',
		title: 'Spotify Collaborative Playlists Discovery',
		prompt:
			"You're the PM for Spotify and you're considering adding a 'Collaborative Playlists' feature where multiple users can add songs in real-time. Describe your discovery process. Where would your uncertainty be highest? How would you de-risk the biggest assumption before engineering begins?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d3', 'r5d4'],
		hints: [
			'Collaborative playlists already exist in basic form — what is new here?',
			'Real-time collaboration on playlists may not match how people discover music',
			'What is the smallest version you could ship to test demand?'
		]
	},
	{
		id: 'cs_5_17',
		title: 'B2B Dashboard Favorites Discovery',
		prompt:
			"You're the PM for a B2B analytics tool redesigning the dashboard interface. Your hypothesis: 'Most users only look at 3-5 metrics daily.' Your team proposes a 'favorites' feature to surface these. Walk through your discovery: What's the quickest way to validate this assumption? What could go wrong with your hypothesis?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d3', 'r5d4'],
		hints: [
			'Check existing analytics: do users actually view only 3-5 metrics?',
			'Favorites assumes users know what they want — what if they browse?',
			'What is the cost of being wrong: building a feature nobody uses?'
		]
	},
	{
		id: 'cs_5_18',
		title: 'Figma Component Versioning Discovery',
		prompt:
			"Figma is considering a 'Component Versioning' feature so teams can track and rollback changes to shared components. Describe the discovery process: (1) Who would you interview? (2) What's the core user need you're solving for? (3) How would you prototype this? (4) How would you measure success?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 4],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d2', 'r5d3'],
		hints: [
			'Interview design system maintainers, not just designers',
			'Versioning is a git concept — does it translate to design workflows?',
			'What is the real cost of a bad component update today?'
		]
	},
	{
		id: 'cs_5_19',
		title: 'Shopify Seller Analytics Discovery',
		prompt:
			"You're exploring a 'Seller Analytics' dashboard for Shopify sellers. You have a hypothesis: 'Sellers are most interested in product-level profitability (revenue - costs), not just sales volume.' How would you design discovery to test this? What's the riskiest assumption to validate? What's your fastest path to evidence?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 5,
		secondarySkillIds: [1, 2],
		caseType: 'discovery_plan',
		rubricDimensionIds: ['r5d1', 'r5d3', 'r5d4'],
		hints: [
			'Sellers may not track costs accurately — data quality is a blocker',
			'Fastest evidence: survey existing sellers on what metrics they check daily',
			'What does a seller actually do differently when they see profitability data?'
		]
	},

	// ── Skill 6: Data Fluency & Experimentation ────────────────────────

	{
		id: 'cs_6_1',
		title: 'Activation Drop Diagnosis',
		prompt:
			"You are a PM at a consumer fintech app (like Robinhood). After a recent redesign, 7-day activation dropped from 35% to 28%. Walk through your diagnostic process: What data would you look at first? How would you segment users to isolate the problem? What hypotheses would you form? Design an experiment to test your top hypothesis. Be specific about: success metrics, sample size considerations, and how you'd avoid false positives.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [5],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r6d1', 'r6d2', 'r6d3'],
		hints: [
			'Funnel analysis first: where exactly are users dropping off?',
			'Segment by acquisition channel — the redesign may affect different channels differently',
			'Be careful of novelty effects: compare week 1 vs. week 3 of the redesign'
		]
	},
	{
		id: 'cs_6_2',
		title: 'Feature Adoption Measurement',
		prompt:
			"You are a PM at Salesforce. You shipped a new 'AI Email Drafting' feature 6 weeks ago. Leadership wants to know: Is it working? Define: What does 'working' mean for this feature? What metrics would you track (leading and lagging)? How would you set up cohort analysis to measure true impact? What's the difference between adoption (usage) and value (does it help users)? Design a measurement framework and present your findings approach.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [1, 5],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r6d1', 'r6d2', 'r6d4'],
		hints: [
			'Adoption ≠ value. Users might try it once and abandon it.',
			"Cohort: compare users who adopted vs. matched users who didn't",
			'Leading metrics: time-to-send-email, response rates; Lagging: deal close rates'
		]
	},
	{
		id: 'cs_6_3',
		title: 'North Star Metric Design',
		prompt:
			"You are a PM at a meditation app (like Calm or Headspace). The team currently tracks DAU as its north star. You believe this is a vanity metric that doesn't capture real user value. Propose a better North Star metric. Walk through: Why is DAU insufficient? What metric better captures the value users get? How would you operationally define and measure it? What input metrics feed into it? How would you get the team and leadership aligned on the change?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [1, 7],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r6d1', 'r6d3', 'r6d4'],
		hints: [
			'DAU counts opens, not value — someone opening the app for 5 seconds counts the same as a 20-min meditation',
			"Consider: 'users who completed a meditation session 3+ times this week'",
			'Input metrics: session start rate, completion rate, streak length'
		]
	},
	{
		id: 'cs_6_4',
		title: 'Pricing Experiment Design',
		prompt:
			"You are a PM at a B2B SaaS tool. The team wants to test whether raising the Pro plan price from $29/mo to $39/mo will reduce churn enough to offset the revenue gain from higher ARPU. Design this experiment end-to-end: What's the hypothesis? How do you randomize (considering existing vs. new customers)? What sample size do you need? How long should you run it? What are the pitfalls of pricing experiments? What ethical considerations exist?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [4],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r6d1', 'r6d2', 'r6d3'],
		hints: [
			'You CANNOT A/B test prices to existing customers — legal and trust issues',
			'Test on new signups only, or test willingness-to-pay through surveys',
			'Consider long-term effects: 30-day churn may look fine but 6-month churn increases'
		]
	},
	{
		id: 'cs_6_5',
		title: 'Experimentation Culture at Scale',
		prompt:
			"You are a Principal PM at a mid-size tech company (500 employees). Only 1 in 5 product teams runs experiments before shipping. Most teams ship features and measure impact after launch (if at all). The CPO asks you to build an experimentation culture. Design the program: What infrastructure is needed? What training? How do you handle teams that say 'our feature can't be A/B tested'? What governance ensures experiment quality without creating bottlenecks? How do you measure whether the culture shift is working? What does success look like in 12 months?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 6,
		secondarySkillIds: [5, 7],
		caseType: 'metric_diagnosis',
		rubricDimensionIds: ['r6d1', 'r6d2', 'r6d3', 'r6d4'],
		hints: [
			'Not everything needs an A/B test — build a menu of experiment types',
			'Start with one showcase team, publish results org-wide',
			"Kohavi: most A/B tests fail — that's the point, it saves you from shipping bad ideas"
		]
	},

	// ── Skill 7: Leadership, Influence & Execution ─────────────────────

	{
		id: 'cs_7_1',
		title: 'Stakeholder Misalignment',
		prompt:
			"You are a Staff PM at a B2B company. Engineering wants to rebuild the backend (6-month investment, no user-facing value). Sales wants 5 specific features customers are asking for. Your VP wants a new product line. You have resources for ONE of these. Walk through: How would you evaluate each option? How would you influence each stakeholder without authority? What frameworks would you use to make your case? How would you build alignment when all three stakeholders have legitimate but conflicting needs?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 7,
		secondarySkillIds: [3],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r7d1', 'r7d2', 'r7d4'],
		hints: [
			"Seek intel on each stakeholder's real incentives (Jules Walter's tactic)",
			'Reframe: what outcome does each stakeholder actually need?',
			'Co-create the evaluation criteria before presenting your recommendation'
		]
	},
	{
		id: 'cs_7_2',
		title: 'Executive Buy-In for Risky Bet',
		prompt:
			"You are a Staff PM at a consumer social app. You've done extensive discovery and believe the company should pivot a major product area from feed-based content to messaging-first community. This is a risky, controversial bet that contradicts the CEO's public statements about the feed. Design your influence strategy: How would you build the case? Who would you pre-align with before the big meeting? How would you present the evidence? How would you handle pushback? What's your plan if the CEO says no?",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 7,
		secondarySkillIds: [3, 5],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r7d1', 'r7d2'],
		hints: [
			'Never surprise executives — pre-align with their trusted advisors',
			'Lead with the user evidence, not your opinion',
			'Progressive alignment: get small yeses before the big ask'
		]
	},
	{
		id: 'cs_7_3',
		title: 'Cross-Team Dependency Unblock',
		prompt:
			"You are a Staff PM. Your team's most important initiative is blocked by another team that won't prioritize the API you need. Their PM says it's not on their roadmap. Their engineering lead is sympathetic but can't override their PM. Design your approach: What are your options (escalation, negotiation, building it yourself, workaround)? How would you influence without creating political damage? What's the optimal outcome? Walk through the conversation you'd have with the other PM.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 7,
		secondarySkillIds: [3],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r7d1', 'r7d2', 'r7d4'],
		hints: [
			'Understand their priorities first — maybe you can frame your request as helping their goals too',
			'Building it yourself has hidden costs: maintenance, divergence, resentment',
			'Escalation should be your last resort, not your first move'
		]
	},
	{
		id: 'cs_7_4',
		title: 'Mentoring a Struggling PM',
		prompt:
			"You are a Staff PM mentoring a mid-level PM who has strong technical skills but weak user empathy. They consistently propose solutions based on engineering elegance rather than user needs. Their last two features shipped on time but had low adoption. Design your mentorship approach: How would you diagnose the root cause? What specific practices would you introduce? How would you give feedback that's direct but not demoralizing? What would a 90-day mentoring plan look like?",
		context: 'Mixed',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 7,
		secondarySkillIds: [1],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r7d3'],
		hints: [
			"Don't just tell them to 'talk to users more' — make it structural",
			'Co-interview with them: model story-based interviewing live',
			'Help them experience the gap: show them user session recordings of their features'
		]
	},
	{
		id: 'cs_7_5',
		title: 'PM Org Transformation',
		prompt:
			"You are a Principal PM at a company where the PM org is perceived as a 'project management' function — PMs write tickets, track sprints, and manage stakeholder requests, but don't own strategy or do discovery. The new CPO (from a Cagan-style background) wants to transform the PM org into empowered product teams within 12 months. You're tasked with leading this transformation. Design the plan: What does the current state → future state look like? How do you upskill existing PMs? How do you handle PMs who can't or won't make the transition? How do you change engineering and design's perception of PM? What does success look like at 3, 6, and 12 months?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 7,
		secondarySkillIds: [3, 5],
		caseType: 'stakeholder_influence',
		rubricDimensionIds: ['r7d1', 'r7d2', 'r7d3', 'r7d4'],
		hints: [
			"Start with one team as a showcase — don't try to transform all teams at once",
			"The biggest resistance will come from stakeholders who lose their 'order takers'",
			"Cagan's Transformed book is the playbook here"
		]
	},

	// ── Skill 8: Domain & Market Depth ─────────────────────────────────

	{
		id: 'cs_8_1',
		title: 'TikTok Competitive Response',
		prompt:
			"You are a Staff PM at Instagram. TikTok just launched a feature that lets creators sell products directly in their videos with one-tap checkout. Your VP asks: What does this mean for us? Should we respond? Analyze: What is TikTok's strategic intent? How does this affect Instagram's creator ecosystem? What are Instagram's options (copy, differentiate, or ignore)? Recommend a response strategy grounded in competitive analysis and market trajectory.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3, 4],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d4'],
		hints: [
			"Don't just react — think about Instagram's unique strengths vs. TikTok's",
			'Creator commerce is a platform play — consider the full ecosystem effect',
			"What's TikTok's likely next move after this?"
		]
	},
	{
		id: 'cs_8_2',
		title: 'AI Developer Tools Landscape',
		prompt:
			"You are a Staff PM at GitHub. The AI coding assistant space has exploded: Copilot, Cursor, Cody, Devin, and more. Your VP asks you to brief the leadership team on the competitive landscape and where GitHub should place its bets for the next 2 years. Deliver: Market map of competitors (segments, strengths, trajectories). Where is the market heading? What's GitHub's right to win? What 2-3 strategic bets should GitHub make? What are the risks of each?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3, 4],
		caseType: 'technical_judgment',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d4'],
		hints: [
			"GitHub's moat: the largest code repository and developer identity graph",
			'The market is moving from autocomplete → autonomous agents',
			'Consider: what if the IDE itself becomes less important?'
		]
	},
	{
		id: 'cs_8_3',
		title: 'Streaming Industry Consolidation',
		prompt:
			"You are a Principal PM advisor to a mid-size streaming service (think Paramount+ or Peacock scale). The streaming wars have led to consolidation — Disney+ absorbed Hulu, Warner merged Max. Your service is subscale. Analyze the market: What's the 3-year trajectory for mid-size streamers? What strategic options exist (merge, niche down, bundle, pivot to ad-supported)? Recommend a product strategy that leverages your unique assets. Model the viability of each option.",
		context: 'B2C',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 8,
		secondarySkillIds: [3, 4],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d3', 'r8d4'],
		hints: [
			"Subscale streamers can't compete on breadth — must find a wedge",
			'Consider: the bundle economics are actually favorable for smaller players',
			'What does the full user lifecycle look like for a niche streaming service?'
		]
	},
	{
		id: 'cs_8_4',
		title: 'Regulatory Disruption in Fintech',
		prompt:
			"You are a Principal PM at a fintech company. New regulations (similar to PSD3 in Europe) will require banks to share customer financial data with third-party apps via standardized APIs — effectively creating 'open banking 2.0.' This regulation takes effect in 18 months. Analyze: What opportunities does this create? What threats to existing fintechs? How does this change the competitive landscape? Design a product strategy that positions your company to benefit from this regulatory shift. Include timeline, viability assessment, and competitive response scenarios.",
		context: 'B2B',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 8,
		secondarySkillIds: [3, 4],
		caseType: 'technical_judgment',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d3', 'r8d4'],
		hints: [
			'Regulation creates both opportunities (new data access) and threats (incumbents can now offer your features)',
			'18-month runway means you need to start building NOW',
			'Consider: who wins in open banking — aggregators, specialists, or banks themselves?'
		]
	},
	{
		id: 'cs_8_5',
		title: 'Linear vs Jira Competitive Analysis',
		prompt:
			"You're the PM for Linear, a project management tool. Jira is the incumbent. Asana and Monday.com are growth challengers. Over the last 18 months, what is Jira doing strategically that Linear needs to notice? What are their likely next 3 moves? How does this shape Linear's roadmap strategy?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r3d1'],
		hints: [
			'Jira is investing in AI and automation — what does that mean for Linear?',
			'Linear wins on speed and UX — is that defensible long-term?',
			'What market segment is Jira least focused on?'
		]
	},
	{
		id: 'cs_8_6',
		title: 'Payment Processor Challenger Strategy',
		prompt:
			"Stripe and Adyen are the two largest payment processors for online businesses. You're the PM for a challenger (like Wise or Checkout.com). What is Stripe doing right in product that makes them hard to displace? What's the one product weakness Adyen has that you could exploit? How would you position against both?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d4', 'r3d2'],
		hints: [
			'Stripe wins on developer experience — can you out-DX Stripe?',
			'Adyen is enterprise-focused — where does that leave mid-market?',
			'Payments is a trust business — what builds trust faster than brand?'
		]
	},
	{
		id: 'cs_8_7',
		title: 'Slack Competitive Moat Analysis',
		prompt:
			"You're the PM for Slack. Microsoft Teams is free, integrated with Office 365, and targets enterprises. Discord is free, lightly moderated, targets communities and gaming. Based on product strategy, what is Slack's sustainable competitive advantage — and what should Slack do to maintain it?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d4'],
		hints: [
			'Slack Connect (cross-company channels) is a unique moat — why?',
			'Teams bundles; Slack must justify standalone cost — how?',
			'What user segment will never switch from Slack to Teams?'
		]
	},
	{
		id: 'cs_8_8',
		title: 'Figma Positioning vs Alternatives',
		prompt:
			"Figma's positioning: 'The collaborative design tool for teams.' But Adobe XD (free), Canva (ease of use), and Penpot (open source) all solve design. How is Figma's positioning different from each, and what product features protect that positioning? What is Figma not trying to be?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d4', 'r8d1', 'r3d2'],
		hints: [
			'Figma is not trying to be Canva — different user, different job',
			'Multiplayer is the moat — single-player design tools can\'t replicate it easily',
			'What would Figma need to do if Penpot achieved feature parity?'
		]
	},
	{
		id: 'cs_8_9',
		title: 'Notion Analytics Positioning',
		prompt:
			"Notion wants to expand to analytics (currently dominated by Tableau, Looker). What's Notion's positioning advantage vs these incumbents? What would have to be true about Notion's product for 'Notion for Analytics' to be credible? What's the risk of this positioning?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d4', 'r8d2', 'r3d2'],
		hints: [
			'Notion is easy to use but analytics requires data connections — different problem',
			'Tableau users are data analysts; Notion users are PMs and designers — different persona',
			'What is the minimum data capability to be taken seriously?'
		]
	},
	{
		id: 'cs_8_10',
		title: 'Slack-First Support Tool Positioning',
		prompt:
			"You're the PM for a startup offering 'Slack for customer support' (like Zendesk but simpler, cheaper, Slack-native). Your positioning: 'Slack-first customer support, not email-first.' How is this different from the market's current positioning? What product bets must you make to own this positioning? What's one way you could fail at it?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d4', 'r3d2', 'r8d1'],
		hints: [
			'Slack-native means your product lives where the team already works',
			'Risk: Slack itself could build this — platform dependency',
			'What happens when customers outgrow Slack-based support?'
		]
	},
	{
		id: 'cs_8_11',
		title: 'Vertical Payment Processor Strategy',
		prompt:
			"The payment processor market is dominated by Stripe (online), Square (in-person), and PayPal (legacy). If you were building a payment processor for a specific vertical (e.g., SaaS subscriptions, freelance platforms, B2B invoicing), which would you choose and why? What's the competitive play?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d4', 'r3d1'],
		hints: [
			'Vertical specialization means deeper integration — what does that look like?',
			'Stripe Billing already targets SaaS — how do you differentiate?',
			'What vertical has the worst existing payment experience?'
		]
	},
	{
		id: 'cs_8_12',
		title: 'Linear Default PM Tool Strategy',
		prompt:
			"The project management market has Asana, Monday.com, and Jira. Linear is growing fast. What is Linear's strategy, and what would have to change in the market for them to become the default PM tool for startups instead of Jira?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r3d1'],
		hints: [
			'Linear is already default for many startups — what market shift made that possible?',
			'Jira wins on customization; Linear wins on opinionation — which scales better?',
			'What happens when Linear startups grow into enterprises?'
		]
	},
	{
		id: 'cs_8_13',
		title: 'Documentation Tool Market Position',
		prompt:
			"The documentation tool market includes Notion, Confluence, Docs, and specialized tools like GitBook. Where is the most defensible market position and why? If you were starting a documentation startup today, what niche would you own?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d4', 'r3d1'],
		hints: [
			'Documentation for developers vs. documentation for teams are different markets',
			'Notion is general-purpose; GitBook is developer-focused — where is the gap?',
			'What makes documentation tools sticky — content lock-in or workflow integration?'
		]
	},
	{
		id: 'cs_8_14',
		title: 'Zoom Long-Term Competitive Threat',
		prompt:
			"Video conferencing market: Zoom dominates, but Microsoft Teams is growing via Office 365 bundling, and Google Meet is free. What's the long-term competitive threat to Zoom? What would Zoom need to do to maintain leadership in 2027?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d4'],
		hints: [
			'Bundling is the biggest threat — meetings are a feature, not a product',
			'Zoom is expanding into platform (Zoom Phone, Zoom Rooms) — is that the right bet?',
			'What user segment chooses Zoom over free alternatives and why?'
		]
	},
	{
		id: 'cs_8_15',
		title: 'Figma Design Tool Moat',
		prompt:
			"The design tool market: Figma is the leader but has competitors (Adobe XD, Penpot, Sketch). Based on product strategy, what is Figma's most defensible moat? What would have to happen for a competitor to displace them?",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 8,
		secondarySkillIds: [3],
		caseType: 'go_to_market',
		rubricDimensionIds: ['r8d1', 'r8d2', 'r8d3'],
		hints: [
			'Network effects in design: teams adopt together, not individually',
			'Plugin ecosystem creates switching costs — how strong are they?',
			'What would an open-source Figma clone need to achieve parity?'
		]
	},

	// ── Mock Interviews ────────────────────────────────────────────────

	{
		id: 'cs_mock_1',
		title: 'Full Mock: Consumer Social Platform Redesign',
		prompt:
			"You are a Principal PM at a consumer social platform (200M MAU) experiencing declining engagement among 18-24 year olds while growing among 35+. The CEO asks you to develop a strategy to reverse the youth engagement trend without alienating the growing older demographic. This is a full-scope case: demonstrate user empathy (how would you understand both segments?), product sense (what would you build?), strategic thinking (what's the 2-year vision?), business acumen (how does this affect advertising revenue?), and discovery approach (how would you validate before building?).",
		context: 'B2C',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r2d1', 'r3d1', 'r4d2', 'r5d3'],
		hints: [
			'Address ALL 8 requirements in your answer',
			'Start with strategy, then show how discovery validates it',
			'The demographic tension is the core strategic challenge'
		]
	},
	{
		id: 'cs_mock_2',
		title: 'Full Mock: B2B SaaS Platform Expansion',
		prompt:
			"You are a Principal PM at a B2B project management tool (think Asana/Monday.com, 50K paying companies). Growth has slowed from 40% to 15% YoY. The board wants a path back to 30%+ growth. Develop a comprehensive product strategy: What's driving the slowdown? What expansion opportunities exist (new segments, new products, international, platform/marketplace)? Which would you pursue and why? How would you validate your recommendation? What's the business case? How would you align the org around this new direction?",
		context: 'B2B',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5, 7],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d3', 'r2d3', 'r3d1', 'r4d1', 'r5d1', 'r7d1'],
		hints: [
			'Diagnose before prescribing: is it market saturation, competitive pressure, or product stagnation?',
			'Consider all growth levers: new customers, expansion revenue, retention improvement',
			'Your influence plan matters as much as your strategy'
		]
	},
	{
		id: 'cs_mock_3',
		title: 'Full Mock: Marketplace Rebalancing',
		prompt:
			'You are a Principal PM at a two-sided marketplace (like Etsy or Fiverr). Supply (sellers/freelancers) has grown 3x in the past year but demand (buyers) has only grown 1.5x. Seller satisfaction is dropping because of lower earnings per seller. Buyer experience is declining due to search overload. Design a comprehensive strategy to rebalance the marketplace. Address: user empathy for both sides, product solutions, experimentation plan, business viability (marketplace take rate impact), and how you\'d influence both the growth team and the seller success team.',
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 5, 6, 7],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r2d2', 'r3d2', 'r5d3', 'r6d1', 'r7d1'],
		hints: [
			'Two-sided marketplace problems require thinking about both sides simultaneously',
			'Sometimes reducing supply quality improves the marketplace',
			'Marketplace liquidity metrics are your north star here'
		]
	},
	{
		id: 'cs_mock_4',
		title: 'Full Mock: AI Product Strategy',
		prompt:
			"You are a Principal PM at a company that wants to build an AI-powered product in the customer support space. You're starting from scratch — no existing product. The CEO gives you 6 months and a team of 8 engineers + 2 designers. Define: Who is the target customer and what problem are you solving? What's the competitive landscape? What's your product strategy and go-to-market? How would you run discovery in the first 4 weeks? What experiments would you run before building the full product? What are the key risks (value, usability, feasibility, viability) and how would you address each?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5, 6, 8],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r2d1', 'r3d1', 'r4d2', 'r5d1', 'r6d2', 'r8d1'],
		hints: [
			'0-to-1 product: discovery is EVERYTHING in the first 4 weeks',
			"Don't build the AI first — validate the workflow value with a Wizard of Oz",
			'Customer support AI is crowded — you need a sharp wedge'
		]
	},
	{
		id: 'cs_mock_5',
		title: 'Full Mock: Cross-Domain Platform Play',
		prompt:
			"You are a Principal PM at a company that has a successful B2C app (food delivery, 10M users) and wants to leverage its logistics network to enter B2B (restaurant supply chain management). This is a platform play: using consumer delivery infrastructure to power a business-to-business product. Develop the full strategy: Why is this the right move? What's the platform thesis? How do the two products reinforce each other? What are the organizational challenges (two very different customer segments)? How would you validate the B2B opportunity? What's the 18-month roadmap?",
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5, 7, 8],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r2d3', 'r3d1', 'r4d1', 'r5d3', 'r7d1', 'r8d2'],
		hints: [
			'The platform thesis must show clear synergy, not just shared infrastructure',
			'B2B and B2C product cultures are very different — organizational design matters',
			'Validate B2B demand with concierge MVP before building anything'
		]
	},
	{
		id: 'cs_mock_6',
		title: 'Full Mock: Enterprise Transformation',
		prompt:
			"You are a Principal PM hired to transform a legacy enterprise software company (think SAP/Oracle-scale) that is losing market share to modern cloud-native competitors. The product is 15 years old, has 2000+ enterprise customers, and generates $500M ARR — but NPS is -15 and churn is accelerating. The CEO asks: What's the product strategy to modernize without losing existing customers? Address: How do you understand the needs of both loyal (but frustrated) existing customers and prospects choosing competitors? What's the modernization strategy? How do you sequence it? What are the viability risks of each approach (rebuild, re-platform, gradual migration)? How do you get buy-in from 200+ PMs and engineers who've built the legacy product?",
		context: 'B2B',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5, 7, 8],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r2d2', 'r3d1', 'r4d1', 'r5d1', 'r7d1', 'r8d1'],
		hints: [
			'Never do a full rewrite — strangle the legacy system gradually',
			"Existing customers' workflows ARE the product — you can't break them",
			"Cagan's Transformed is literally about this problem"
		]
	},
	{
		id: 'cs_mock_7',
		title: 'Full Mock: Self-Assessment & Gap Analysis',
		prompt:
			'Reflect on your performance across all 60 days. For each of the 8 requirements: (1) What is your current score (1-5)? (2) What specific evidence from your case study answers supports this score? (3) What is your biggest gap within this requirement? (4) What specific actions would close this gap in the next 30 days? Be brutally honest. This is not about looking good — it\'s about knowing exactly where you stand and what to work on next.',
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 2, 4, 5, 6, 7, 8],
		caseType: 'mock_interview',
		rubricDimensionIds: [
			'r1d1',
			'r2d1',
			'r3d1',
			'r4d1',
			'r5d1',
			'r6d1',
			'r7d1',
			'r8d1'
		],
		hints: [
			'Score yourself on demonstrated ability, not theoretical knowledge',
			"Look at your actual case study answers — not what you think you know",
			'The gap analysis is more valuable than the score'
		]
	},
	{
		id: 'cs_mock_8',
		title: 'Full Mock: Personal PM Development Plan',
		prompt:
			'Based on your self-assessment from Day 59, design your personal PM development plan for the next 6 months. For your 3 weakest requirements: (1) What specific practices will you adopt? (2) What resources will you study? (3) How will you get real-world practice opportunities? (4) How will you measure progress? For your 3 strongest requirements: (1) How will you maintain and deepen these strengths? (2) How will you use them to create outsized impact? Create a concrete monthly plan with specific actions, not vague goals.',
		context: 'Mixed',
		difficulty: 'principal',
		timeLimit: 60,
		primarySkillId: 3,
		secondarySkillIds: [1, 7],
		caseType: 'mock_interview',
		rubricDimensionIds: ['r1d1', 'r3d1', 'r7d3'],
		hints: [
			"A development plan without specific weekly actions is just a wish list",
			'Find real-world practice: volunteer for projects that target your weak areas',
			'Build accountability: share your plan with a mentor or peer'
		]
	},

	// ── Estimation Cases ───────────────────────────────────────────────

	{
		id: 'cs_est_1',
		title: 'DoorDash US Annual Revenue',
		prompt:
			"You are a Staff PM at a food delivery competitor. Your CEO asks: 'How big is DoorDash in the US, what is their annual revenue?' Estimate it from first principles. You have no data, just your reasoning. Decompose the problem, state your assumptions clearly, show your math, and sanity-check your final number against anything you know about the market.",
		context: 'B2C',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [4],
		caseType: 'estimation',
		rubricDimensionIds: ['r6d1', 'r4d1'],
		hints: [
			'Decompose: users x orders/user x AOV x take rate',
			'US population -> smartphone users -> food delivery users -> DoorDash share',
			'Sanity check: DoorDash is publicly traded, does your number feel right for a company of that scale?'
		]
	},
	{
		id: 'cs_est_2',
		title: 'Slack Daily Messages Volume',
		prompt:
			"Estimate the number of Slack messages sent per day across all paid workspaces globally. Walk through your reasoning: How many companies pay for Slack? What is the average workspace size? How many messages does a typical user send per day? How does usage vary by company size? Sanity-check your answer.",
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [8],
		caseType: 'estimation',
		rubricDimensionIds: ['r6d1', 'r8d3'],
		hints: [
			"Start with Slack's reported metrics: ~750K paid organizations",
			'Segment by company size: small (10-50), medium (50-500), large (500+)',
			'Power users vs. lurkers: not everyone sends the same volume'
		]
	},
	{
		id: 'cs_est_3',
		title: 'Netflix AWS Storage Cost',
		prompt:
			"Estimate the annual storage cost AWS incurs to host Netflix's entire video library. Consider: How many titles does Netflix have? How many hours of content? What encoding formats and bitrates are used? How does redundancy and CDN replication affect total storage? What does AWS charge for storage at scale? Show your full calculation.",
		context: 'Mixed',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [4, 8],
		caseType: 'estimation',
		rubricDimensionIds: ['r6d1', 'r4d4', 'r8d1'],
		hints: [
			'Netflix has ~17,000 titles across all regions',
			'Each title is encoded in multiple resolutions (480p to 4K) and multiple bitrates',
			'AWS S3 pricing at scale: ~$0.021/GB/month, but Netflix likely has negotiated rates'
		]
	},
	{
		id: 'cs_est_4',
		title: 'AI Code Assistant TAM',
		prompt:
			'Estimate the total addressable market (TAM) for AI-powered code assistants (like GitHub Copilot) in 2026. Segment by: individual developers, small teams, and enterprise. Consider: How many developers exist globally? What percentage would use AI assistants? What are they willing to pay? How does enterprise pricing differ? What is the realistic serviceable market vs. the theoretical total?',
		context: 'B2B',
		difficulty: 'staff',
		timeLimit: 45,
		primarySkillId: 6,
		secondarySkillIds: [4, 8],
		caseType: 'estimation',
		rubricDimensionIds: ['r6d1', 'r4d1', 'r4d4', 'r8d2'],
		hints: [
			'Global developer population: ~28M professional developers (Stack Overflow survey)',
			'Segment willingness to pay: hobbyist ($0-10/mo), professional ($10-20/mo), enterprise ($30-50/seat/mo)',
			'TAM vs SAM vs SOM: not every developer will adopt'
		]
	}
];
