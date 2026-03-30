# PM-OS Practice Bank Gap Fillers

**Purpose**: This document contains 36 new high-quality PM case study questions specifically designed to fill coverage gaps identified in the PM-OS practice bank audit (2026-03-30).

**Rationale**: These questions target:
- **ZERO coverage dimensions** (4): Must test r1d4, r4d2, r5d2, r5d4
- **Weak coverage dimensions** (4): Add depth to r1d2, r3d4, r8d1, r8d4
- **Undercovered skills** (3): Expand Skill 5 (2→8 questions), Skill 8 (3→8 questions), Skill 2 (8→12 questions)

All questions are realistic, scenario-based, and grounded in real FAANG/top-tier company contexts.

---

## ZERO COVERAGE: r1d4 — Predictive Accuracy

**Dimension Definition**: Making specific, documented predictions about user reaction *before* shipping, with a track record of accuracy. This tests whether customer knowledge is deep enough to generate foresight, not just hindsight.

---

### Q_NEW_001
- **Question**: You're the PM for Slack's message search feature. Currently, users search via a top-bar search box. Your team proposes moving search into a dedicated sidebar panel with advanced filters (date range, file type, user, channel). Before the experiment ships, what specific predictions would you make about user behavior? How would you know if you're right?
- **Company**: Slack
- **Category**: Product Improvement
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d4, r1d1, r1d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_002
- **Question**: At Figma, you're shipping a new "collaborative comments" feature that allows real-time threaded discussion on design elements. Design thinking says this will increase collaboration velocity. Before launch, what user reactions or behaviors are you most uncertain about? Walk me through how you'd set up your prediction framework.
- **Company**: Figma
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d4, r1d2, r1d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_003
- **Question**: LinkedIn is testing a "Jobs You Might Like" feed section for passive job seekers — people not actively looking. You have data showing these users visit LinkedIn 2x per week but rarely engage with job content. What's your prediction for engagement, click-through rate, and application rate? What would surprise you, and what would confirm your mental model is accurate?
- **Company**: LinkedIn
- **Category**: Product Improvement
- **Difficulty**: Medium
- **Question Type**: metric_diagnosis
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d4, r2d3, r1d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_004
- **Question**: Stripe is launching a new "Smart Retry" feature that automatically retries failed payments on user-configurable schedules (e.g., retry every 3 days up to 5 times). Before shipping, you need to predict the key outcome: what percent of failed payments will successfully recover? Walk me through your prediction logic and what merchant feedback would validate or invalidate your assumption.
- **Company**: Stripe
- **Category**: Product Improvement
- **Difficulty**: Hard
- **Question Type**: estimation
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d4, r1d1, r2d2
- **Source**: PM-OS Generated (Gap Filler)

---

## ZERO COVERAGE: r4d2 — Viability Risk Assessment

**Dimension Definition**: Assessing whether a solution works for the business across sales, legal, finance, and operations — the viability risk check most PMs skip. This tests cross-functional rigor before engineering commitment.

---

### Q_NEW_005
- **Question**: You're the PM for a B2B SaaS platform. Your team proposes a new "usage-based pricing" model instead of the current per-seat model. Usage gets metered via API calls. Before you greenlight engineering, walk me through every viability risk you need to validate with legal, sales, finance, and ops. Which one is the biggest blocker?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 4
- **Primary Skill Name**: Execution & Delivery
- **Dimensions Tested**: r4d2, r2d2, r4d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_006
- **Question**: Notion wants to launch an "API Rate Limits" tier for the free plan — capping API calls at 100/hour to reduce infrastructure costs. Write the viability assessment covering sales impact, legal implications (terms of service updates), operations (billing and metering), and customer support escalations. What's your go/no-go recommendation?
- **Company**: Notion
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: stakeholder_influence
- **Primary Skill**: 4
- **Primary Skill Name**: Execution & Delivery
- **Dimensions Tested**: r4d2, r4d3, r3d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_007
- **Question**: Dropbox is considering HIPAA compliance certification for the Enterprise tier. This requires new audit controls, encrypted audit logs, and monthly compliance reviews. Before committing resources, what viability questions must you answer with legal, sales (enterprise sales team), and ops? What's the hidden cost no one's talking about?
- **Company**: Dropbox
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 4
- **Primary Skill Name**: Execution & Delivery
- **Dimensions Tested**: r4d2, r4d3, r6d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_008
- **Question**: Google Meet is launching a new "External Recording" feature that allows hosts to record meetings and share them with non-participants. What legal risks (consent, jurisdiction, GDPR, CCPA), sales implications (competitive positioning vs Zoom), and ops challenges (storage, compliance proof) must you validate before shipping? How do you prioritize risk?
- **Company**: Google
- **Category**: Product Improvement
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 4
- **Primary Skill Name**: Execution & Delivery
- **Dimensions Tested**: r4d2, r4d3, r6d3
- **Source**: PM-OS Generated (Gap Filler)

---

## ZERO COVERAGE: r5d2 — Product Trio Collaboration

**Dimension Definition**: Discovery done as a Product Trio (PM, Designer, Engineer) working together — not PM handing down requirements — produces better solutions and faster alignment.

---

### Q_NEW_009
- **Question**: You're running discovery for a new "Intelligent Cropping" feature in Adobe Photoshop. The typical PM workflow is: interview users → write requirements → hand to design/eng. Describe an alternative approach where the PM, lead designer, and tech lead work together from day one. What changes? When do you split?
- **Company**: Adobe
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d2, r5d1, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_010
- **Question**: Stripe is redesigning the merchant onboarding flow. Historically, PM owns the user journey, design owns the UX, and eng owns feasibility. You want to restructure this as a true trio. Walk me through: (1) What discovery happens together? (2) When does each person own a decision? (3) How do you prevent deadlock?
- **Company**: Stripe
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d2, r5d3, r4d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_011
- **Question**: You're designing a new "Smart Suggestions" feature for Figma that recommends design components based on project context. Your PM instinct says "users need smarter recommendations." But the designer worries about cognitive overload, and the eng lead says "that's a 3-month ML project." Describe how you'd approach discovery as a trio to validate whether this is worth the investment. What experiments do you run together?
- **Company**: Figma
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d2, r5d4, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_012
- **Question**: You're the PM for a fintech app redesigning the transaction confirmation screen. A user complained: "I can't tell if I sent money to the right person." The designer proposes a new layout; the engineer says it'll require backend changes. Describe your discovery process with the trio: How do you avoid the PM dictating the solution? When is each person the decision-maker?
- **Company**: General
- **Category**: Product Improvement
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d2, r5d1, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

## ZERO COVERAGE: r5d4 — Experiment Selection

**Dimension Definition**: Matching the right experiment type to each assumption type prevents over-engineering tests and ensures evidence collected is actionable.

---

### Q_NEW_013
- **Question**: At Duolingo, you're testing a hypothesis: "Mobile learners will complete lessons more consistently if we send a reminder notification 24 hours after their last lesson." You have three experiment options: (1) A/B test (50% on/off), (2) Time-series holdout (users in months 1-2 vs 3-4), (3) Quasi-experiment (cohort comparison). Which experiment type answers the question best? Why not the others?
- **Company**: Duolingo
- **Category**: Product Improvement
- **Difficulty**: Hard
- **Question Type**: estimation
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d4, r5d3, r2d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_014
- **Question**: Notion is testing: "Users with more than 5 databases will adopt the new 'Database Relations' feature." The challenge: Relations are only useful when you have multiple linked databases, so the most engaged power users (who'd benefit) will adopt quickly regardless of marketing. Your team suggests a randomized controlled trial. Is that the right experiment? What's the hidden risk in experiment design here?
- **Company**: Notion
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d4, r2d2, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_015
- **Question**: Slack wants to test: "Teams that use Slack Workflows (automation) will have higher retention." But Workflows are opt-in and skew toward power users who are already engaged. An A/B test will conflate selection bias with causal impact. Design an experiment that separates these effects. What type of test would you use?
- **Company**: Slack
- **Category**: Metrics & Analytics
- **Difficulty**: Hard
- **Question Type**: metric_diagnosis
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d4, r2d3, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_016
- **Question**: You're testing a new checkout flow at Stripe: "A one-page checkout increases conversion rate vs a two-step checkout." You plan a standard A/B test (50/50 split). But you know: (1) Conversion varies wildly by device (mobile vs desktop), (2) International customers convert at 60% the rate of US customers. How does this change your experiment design? What's the right approach?
- **Company**: Stripe
- **Category**: Metrics & Analytics
- **Difficulty**: Hard
- **Question Type**: estimation
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d4, r5d3, r7d4
- **Source**: PM-OS Generated (Gap Filler)

---

## WEAK COVERAGE: r1d2 — Interview Quality (Add 2 more)

**Dimension Definition**: Story-based interviewing surfaces real behavior rather than stated preferences. This tests structural interview skill.

---

### Q_NEW_017
- **Question**: You're interviewing power users of Figma to understand why they invest time building design systems. An obvious question: "Do you think a design system saves time?" You predict they'll say yes. How do you ask this differently to uncover what they *actually* do — not what they *think* they should say? Give me 3 alternative questions and explain the difference.
- **Company**: Figma
- **Category**: Product Design
- **Difficulty**: Medium
- **Question Type**: discovery_plan
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d2, r1d1, r1d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_018
- **Question**: You're interviewing people who abandoned Duolingo after 2 weeks. You ask: "What made you stop using Duolingo?" Most say "I was too busy." But you suspect that's rationalization — they got bored or found it too hard. How would you structure the interview to get past the surface answer? Walk me through your questioning sequence.
- **Company**: Duolingo
- **Category**: Behavioral
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 1
- **Primary Skill Name**: User Empathy & Customer Knowledge
- **Dimensions Tested**: r1d2, r1d1, r1d3
- **Source**: PM-OS Generated (Gap Filler)

---

## WEAK COVERAGE: r3d4 — Strategy Defense (Add 3 more)

**Dimension Definition**: Defending strategy against executive pushback with evidence — and updating when genuinely warranted — distinguishes principled thinking from stubbornness.

---

### Q_NEW_019
- **Question**: You're the PM for an enterprise SaaS product. Your strategy: Focus on SMB (10-50 person teams) because they have faster buying cycles and higher NPS. The CEO disagrees: "Why not go upmarket? Enterprise customers are worth 10x more." You have data showing enterprise deals take 9 months while SMB deals close in 6 weeks. Walk me through how you'd defend your thesis in a board meeting, including what evidence would change your mind.
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: stakeholder_influence
- **Primary Skill**: 3
- **Primary Skill Name**: Strategic Thinking & Vision
- **Dimensions Tested**: r3d4, r3d1, r2d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_020
- **Question**: Your product strategy for Notion: Invest heavily in database and relational features, because power users who build databases have 5x higher retention. Your Head of Sales pushes back: "Our enterprise sales team wants you to focus on document collaboration instead — that's what they hear in deals." You have telemetry showing 60% of power users use Databases, but only 20% use collaborative docs. How do you navigate this disagreement?
- **Company**: Notion
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: stakeholder_influence
- **Primary Skill**: 3
- **Primary Skill Name**: Strategic Thinking & Vision
- **Dimensions Tested**: r3d4, r4d3, r3d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_021
- **Question**: You're the PM for Figma's mobile app. Your strategy: Don't build mobile-first design tools; instead, build mobile view-and-comment. The VP of Product says: "Apple and Google are pushing on-device ML. We should build mobile design tools with AI." You disagree — you think the friction of designing on mobile makes it pointless. How do you have this conversation? What would need to change for you to agree with the VP?
- **Company**: Figma
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: stakeholder_influence
- **Primary Skill**: 3
- **Primary Skill Name**: Strategic Thinking & Vision
- **Dimensions Tested**: r3d4, r3d1, r2d4
- **Source**: PM-OS Generated (Gap Filler)

---

## WEAK COVERAGE: r8d1 — Competitive Intelligence (Add 3 more)

**Dimension Definition**: Deep knowledge of competitors — their strategies, strengths, weaknesses, and likely next moves — enables proactive positioning.

---

### Q_NEW_022
- **Question**: You're the PM for Linear, a project management tool. Jira is the incumbent. Asana and Monday.com are growth challengers. Over the last 18 months, what is Jira doing strategically that Linear needs to notice? What are their likely next 3 moves? How does this shape Linear's roadmap strategy?
- **Company**: Linear
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d2, r3d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_023
- **Question**: Stripe and Adyen are the two largest payment processors for online businesses. You're the PM for a challenger (like Wise or Checkout.com). What is Stripe doing right in product that makes them hard to displace? What's the one product weakness Adyen has that you could exploit? How would you position against both?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d4, r3d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_024
- **Question**: You're the PM for Slack. Microsoft Teams is free, integrated with Office 365, and targets enterprises. Discord is free, lightly moderated, targets communities and gaming. Based on *product strategy*, what is Slack's sustainable competitive advantage — and what should Slack do to maintain it?
- **Company**: Slack
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d2, r8d4
- **Source**: PM-OS Generated (Gap Filler)

---

## WEAK COVERAGE: r8d4 — Positioning Awareness (Add 3 more)

**Dimension Definition**: Thinking about how the product is perceived relative to alternatives in the market drives intentional positioning rather than accidental differentiation.

---

### Q_NEW_025
- **Question**: Figma's positioning: "The collaborative design tool for teams." But Adobe XD (free), Canva (ease of use), and Penpot (open source) all solve design. How is Figma's positioning different from each, and what product features protect that positioning? What is Figma *not* trying to be?
- **Company**: Figma
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d4, r8d1, r3d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_026
- **Question**: Notion wants to expand to analytics (currently dominated by Tableau, Looker). What's Notion's positioning advantage vs these incumbents? What would have to be true about Notion's product for "Notion for Analytics" to be credible? What's the risk of this positioning?
- **Company**: Notion
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d4, r8d2, r3d2
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_027
- **Question**: You're the PM for a startup offering "Slack for customer support" (like Zendesk but simpler, cheaper, Slack-native). Your positioning: "Slack-first customer support, not email-first." How is this different from the market's current positioning? What product bets must you make to own this positioning? What's one way you could fail at it?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d4, r3d2, r8d1
- **Source**: PM-OS Generated (Gap Filler)

---

## UNDERCOVERED SKILL 5: Discovery Practice & Methods (Add 6 more)

Currently 2 questions. Target: 8 questions (need 6 more).

---

### Q_NEW_028
- **Question**: You're designing a new "Smart Inbox" for Gmail that filters low-priority emails (newsletters, promotions) into a separate folder. Walk me through your discovery process: (1) What is the core assumption you need to validate? (2) How would you talk to users? (3) What would you prototype? (4) What's your success metric?
- **Company**: Google
- **Category**: Product Design
- **Difficulty**: Medium
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d2, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_029
- **Question**: Dropbox is exploring a new anti-piracy feature that watermarks all downloaded files. Before you build it, what's the discovery process? Walk through: user interviews, value hypothesis, implementation risks, and how you'd test the idea without building the full feature.
- **Company**: Dropbox
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d2, r5d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_030
- **Question**: You're the PM for Spotify and you're considering adding a "Collaborative Playlists" feature where multiple users can add songs in real-time. Describe your discovery process. Where would your uncertainty be highest? How would you de-risk the biggest assumption before engineering begins?
- **Company**: Spotify
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d3, r5d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_031
- **Question**: You're the PM for a B2B analytics tool redesigning the dashboard interface. Your hypothesis: "Most users only look at 3-5 metrics daily." Your team proposes a 'favorites' feature to surface these. Walk through your discovery: What's the quickest way to validate this assumption? What could go wrong with your hypothesis?
- **Company**: General
- **Category**: Product Improvement
- **Difficulty**: Medium
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d3, r5d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_032
- **Question**: Figma is considering a "Component Versioning" feature so teams can track and rollback changes to shared components. Describe the discovery process: (1) Who would you interview? (2) What's the core user need you're solving for? (3) How would you prototype this? (4) How would you measure success?
- **Company**: Figma
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d2, r5d3
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_033
- **Question**: You're exploring a "Seller Analytics" dashboard for Shopify sellers. You have a hypothesis: "Sellers are most interested in product-level profitability (revenue - costs), not just sales volume." How would you design discovery to test this? What's the riskiest assumption to validate? What's your fastest path to evidence?
- **Company**: Shopify
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: discovery_plan
- **Primary Skill**: 5
- **Primary Skill Name**: Discovery Practice & Methods
- **Dimensions Tested**: r5d1, r5d3, r5d4
- **Source**: PM-OS Generated (Gap Filler)

---

## UNDERCOVERED SKILL 8: Domain & Market Depth (Add 5 more)

Currently 3 questions. Target: 8 questions (need 5 more).

---

### Q_NEW_034
- **Question**: The payment processor market is dominated by Stripe (online), Square (in-person), and PayPal (legacy). If you were building a payment processor for a specific vertical (e.g., SaaS subscriptions, freelance platforms, B2B invoicing), which would you choose and why? What's the competitive play?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d4, r3d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_035
- **Question**: The project management market has Asana, Monday.com, and Jira. Linear is growing fast. What is Linear's strategy, and what would have to change in the market for them to become the default PM tool for startups instead of Jira?
- **Company**: Linear
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d2, r3d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_036
- **Question**: The documentation tool market includes Notion, Confluence, Docs, and specialized tools like GitBook. Where is the most defensible market position and why? If you were starting a documentation startup today, what niche would you own?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d4, r3d1
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_037
- **Question**: Video conferencing market: Zoom dominates, but Microsoft Teams is growing via Office 365 bundling, and Google Meet is free. What's the long-term competitive threat to Zoom? What would Zoom need to do to maintain leadership in 2027?
- **Company**: Zoom
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d2, r8d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_038
- **Question**: The design tool market: Figma is the leader but has competitors (Adobe XD, Penpot, Sketch). Based on *product strategy*, what is Figma's most defensible moat? What would have to happen for a competitor to displace them?
- **Company**: Figma
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: go_to_market
- **Primary Skill**: 8
- **Primary Skill Name**: Domain & Market Depth
- **Dimensions Tested**: r8d1, r8d2, r8d3
- **Source**: PM-OS Generated (Gap Filler)

---

## UNDERCOVERED SKILL 2: Product Sense & Judgment (Add 4 more)

Currently 8 questions. Target: 12 questions (need 4 more).

---

### Q_NEW_039
- **Question**: A startup pitches you an idea: "AI-powered resume screening that removes bias by anonymizing candidate names and demographics." Evaluate this idea on Cagan's four risks: (1) Customer desirability, (2) Business viability, (3) Feasibility, (4) Usability. What's the highest risk, and what's a false assumption baked into this pitch?
- **Company**: General
- **Category**: Behavioral
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 2
- **Primary Skill Name**: Product Sense & Judgment
- **Dimensions Tested**: r2d1, r2d2, r2d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_040
- **Question**: Your team proposes: "Add AI-powered auto-reply to Gmail so users can write emails faster." You're skeptical. Walk through your evaluation: (1) What user need are we solving? (2) What are the risks? (3) How do Cagan's four risks apply? (4) What evidence would you need before committing engineering?
- **Company**: Google
- **Category**: Product Design
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 2
- **Primary Skill Name**: Product Sense & Judgment
- **Dimensions Tested**: r2d1, r2d2, r2d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_041
- **Question**: Slack is considering: "Paid only mode — no free tier, charge all teams $X/month." On the surface, this increases revenue. What are the hidden risks you'd evaluate before pitching this to leadership? What signals would suggest this is a bad idea?
- **Company**: Slack
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 2
- **Primary Skill Name**: Product Sense & Judgment
- **Dimensions Tested**: r2d1, r2d2, r2d4
- **Source**: PM-OS Generated (Gap Filler)

---

### Q_NEW_042
- **Question**: A B2B SaaS founder proposes: "White-label our product for agencies so they can sell it under their own brand." Quick reaction: What's the core assumption here, and what's one way this could hurt the core business? How would you evaluate this idea rigorously?
- **Company**: General
- **Category**: Product Strategy
- **Difficulty**: Hard
- **Question Type**: trade_off
- **Primary Skill**: 2
- **Primary Skill Name**: Product Sense & Judgment
- **Dimensions Tested**: r2d1, r2d2, r2d3
- **Source**: PM-OS Generated (Gap Filler)

---

---

## COVERAGE SUMMARY

| Dimension Code | Dimension Name | Gap Type | New Questions | Action |
|---|---|---|---|---|
| r1d4 | Predictive Accuracy | ZERO | 4 | NEW: Q_NEW_001-004 |
| r4d2 | Viability Risk Assessment | ZERO | 4 | NEW: Q_NEW_005-008 |
| r5d2 | Product Trio Collaboration | ZERO | 4 | NEW: Q_NEW_009-012 |
| r5d4 | Experiment Selection | ZERO | 4 | NEW: Q_NEW_013-016 |
| r1d2 | Interview Quality | WEAK (1-2) | 2 | NEW: Q_NEW_017-018 |
| r3d4 | Strategy Defense | WEAK (1-2) | 3 | NEW: Q_NEW_019-021 |
| r8d1 | Competitive Intelligence | WEAK (1-2) | 3 | NEW: Q_NEW_022-024 |
| r8d4 | Positioning Awareness | WEAK (1-2) | 3 | NEW: Q_NEW_025-027 |
| Skill 5 | Discovery Practice | UNDERCOVERED | 6 | NEW: Q_NEW_028-033 |
| Skill 8 | Domain & Market Depth | UNDERCOVERED | 5 | NEW: Q_NEW_034-038 |
| Skill 2 | Product Sense & Judgment | UNDERCOVERED | 4 | NEW: Q_NEW_039-042 |

**Total New Questions: 42**

### Gap Closure Summary

- **ZERO coverage**: 16 questions created (4 per dimension × 4 dimensions)
- **Weak coverage**: 8 questions created (2-3 per dimension × 4 dimensions)
- **Undercovered skills**: 18 questions created
- **Total**: 42 high-quality gap-fillers

### Dimension-Level Improvements

- **r1d4 (Predictive Accuracy)**: 0 → 4 questions
- **r4d2 (Viability Risk Assessment)**: 0 → 4 questions
- **r5d2 (Product Trio Collaboration)**: 0 → 4 questions
- **r5d4 (Experiment Selection)**: 0 → 4 questions
- **r1d2 (Interview Quality)**: 2 → 4 questions
- **r3d4 (Strategy Defense)**: 1 → 4 questions
- **r8d1 (Competitive Intelligence)**: 2 → 5 questions
- **r8d4 (Positioning Awareness)**: 2 → 5 questions

### Skill-Level Improvements

- **Skill 1 (User Empathy)**: 8 → 12 questions (add 4)
- **Skill 2 (Product Sense)**: 8 → 12 questions (add 4)
- **Skill 3 (Strategic Thinking)**: 7 → 10 questions (add 3)
- **Skill 5 (Discovery Practice)**: 2 → 8 questions (add 6)
- **Skill 8 (Domain & Market)**: 3 → 8 questions (add 5)

---

## Next Steps

1. **Import questions** into `frontend/src/lib/data/case-studies.ts` using the question IDs (Q_NEW_001 through Q_NEW_042)
2. **Map dimensions** in `PM_Practice_Bank.xlsx` Dimension Coverage sheet
3. **Run calibration** against the rubric in `backend/src/calibration.py`
4. **Verify coverage** reaches target minimums per dimension
