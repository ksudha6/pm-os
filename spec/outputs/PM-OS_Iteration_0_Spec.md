# PM-OS: Iteration 0 — Project Setup & Data Model

## Overview

Build the data foundation for a 60-day interactive PM learning system. This iteration creates the project scaffold and all data files that every subsequent iteration depends on.

**Tech stack:** Svelte + Vite
**Output:** 3 data files + 1 test file, all passing

---

## Step 1: Project Setup

```bash
npm create vite@latest pm-os -- --template svelte
cd pm-os
npm install
npm install -D vitest
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

Add `vitest.config.js`:
```js
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node' } });
```

---

## Step 2: Create Data Files

### File 1: `src/data/requirements.js`

Export an array of 8 requirement objects. Each object has this shape:

```js
{
  id: 1,                          // 1-8
  name: "...",                    // Short name
  shortDescription: "...",       // One-liner
  definition: "...",             // Full paragraph definition
  weight: 15,                    // Percentage (all 8 must sum to 100)
  acidTest: "...",               // The acid test paragraph
  staffFocus: "...",             // What this looks like at Staff PM level
  principalFocus: "...",         // What this looks like at Principal PM level
  rubricDimensions: [            // 3-4 scoring dimensions for self-assessment
    { id: "r1d1", name: "...", description: "..." },
  ],
  thoughtLeaders: [              // How each thought leader frames this
    { leader: "Marty Cagan", term: "...", idea: "..." },
    { leader: "Teresa Torres", term: "...", idea: "..." },
    { leader: "Aakash Gupta", term: "...", idea: "..." },
    { leader: "Pawel Huryn", term: "...", idea: "..." },
  ],
}
```

**The 8 requirements (use these exactly):**

#### Requirement 1: User Empathy & Customer Knowledge
- **Weight:** 15%
- **Definition:** The depth and quality of your direct, first-hand understanding of your users — their behaviors, pain points, unspoken needs, context, and motivations. This is the input that feeds product sense, strategy, and discovery.
- **Acid test:** When your team debates a product direction, you bring the customer's perspective with enough depth and evidence that it shifts the conversation. Not anecdotes — pattern-matched insight from sustained exposure. You can predict how users will react to a new solution before it is built, and you are usually right.
- **Staff focus:** Deep expertise in one user segment or domain. Personally conducting interviews and synthesizing patterns within your product area.
- **Principal focus:** Pattern recognition across multiple user segments. Coaching other PMs on customer engagement practices. Setting the standard for user empathy across the org.
- **Rubric dimensions:**
  - `r1d1`: "Direct Customer Exposure" — "Frequency and depth of direct customer/user contact (not delegated or proxied)"
  - `r1d2`: "Interview Quality" — "Ability to use story-based interviewing to uncover real behavior vs. stated preferences"
  - `r1d3`: "Pattern Synthesis" — "Ability to synthesize qualitative insights across many interactions into actionable patterns"
  - `r1d4`: "Predictive Accuracy" — "Track record of correctly predicting how users will respond to new solutions"
- **Thought leaders:**
  - Cagan: "Deep Customer Knowledge" — "PM must be the acknowledged expert on users and customers, built through direct repeated exposure"
  - Torres: "Continuous Discovery Habits" — "Weekly touchpoints with real users. Story-based interviewing to uncover real behavior, not stated preferences"
  - Gupta: "User Empathy (core pillar)" — "A cultivated skill developed from years of shipping products and building profound user empathy"
  - Huryn: "Product Discovery competency" — "Hypothesis-driven, interview-based discovery as a core PM competency area"

#### Requirement 2: Product Sense & Judgment
- **Weight:** 15%
- **Definition:** The ability to evaluate whether a product idea, feature, or solution will create real value for users and the business — before engineering resources are committed. This is not an innate gift; it is built from the intersection of deep customer knowledge, data fluency, and domain expertise.
- **Acid test:** When someone pitches a feature idea in a meeting, you can articulate within minutes whether it will create real value, what the key risks are, and what you would need to learn first — and your track record shows you are right significantly more often than not.
- **Staff focus:** Strong product judgment within your product domain. Trusted as the person who spots bad ideas early and champions the right ones.
- **Principal focus:** Product judgment that spans multiple product areas. Other PMs and leaders seek your input on their hardest decisions. You set the bar for product quality across the org.
- **Rubric dimensions:**
  - `r2d1`: "Idea Evaluation Speed" — "Can rapidly assess whether an idea addresses a real user need and has business viability"
  - `r2d2`: "Risk Identification" — "Spots gaps, contradictions, and false assumptions in product specs before engineering begins"
  - `r2d3`: "Signal Synthesis" — "Connects disparate signals (user feedback, data, market shifts, competitive moves) into coherent product insight"
  - `r2d4`: "Decision Track Record" — "Consistently makes good go/no-go calls under ambiguity"
- **Thought leaders:**
  - Cagan: "Built from 4 knowledge areas" — "Product sense emerges from the intersection of deep customer, data, industry, and business knowledge"
  - Torres: "Opportunity Solution Tree" — "Structured framework connecting outcomes to opportunities to solutions — forces rigorous product thinking"
  - Gupta: "Cultivated through shipping" — "Product sense is built by shipping products and learning from outcomes over many years"
  - Huryn: "Product Discovery area" — "The ability to formulate hypotheses, evaluate opportunities, and make evidence-based product decisions"

#### Requirement 3: Strategic Thinking & Vision
- **Weight:** 15%
- **Definition:** The ability to define which problems are worth solving, in what sequence, for which customer segments, and how solving them connects to the company's long-term vision. This operates above roadmaps and feature lists — at the Strategy layer.
- **Acid test:** You can answer: 'Given our users, data, market position, and business constraints — here are the 3 problems that matter most, here is the evidence, and here is how solving them connects to our vision.' When challenged, you hold your ground or update your thinking based on new evidence, not seniority pressure.
- **Staff focus:** Defining strategy for your specific product area. Setting quarterly and annual priorities grounded in evidence.
- **Principal focus:** Shaping strategy across multiple products or the entire product portfolio. Influencing company-level direction. Connecting dots across business units.
- **Rubric dimensions:**
  - `r3d1`: "Strategy Articulation" — "Can clearly articulate product strategy connecting mission to vision to problems to outcomes"
  - `r3d2`: "Prioritization Rigor" — "Makes hard trade-off calls on what NOT to build, grounded in evidence not politics"
  - `r3d3`: "Multi-Quarter Thinking" — "Makes bets based on where the market is heading, not just where it is today"
  - `r3d4`: "Strategy Defense" — "Can defend strategy against executive pushback with evidence, updating when warranted"
- **Thought leaders:**
  - Cagan: "Product Strategy layer" — "Mission to Vision to Strategy to Discovery to Delivery. Staff/Principal PMs operate at the Strategy layer."
  - Torres: "Outcome-rooted OST" — "Every strategic tree starts with a desired business outcome, not a feature or solution"
  - Gupta: "Strategy pillar" — "Owning outcomes, not features. Multi-year strategic problems spanning multiple teams."
  - Huryn: "Strategy & Business competency" — "Vision, strategic models, market research, and product portfolio management"

#### Requirement 4: Business Acumen & Viability
- **Weight:** 10%
- **Definition:** The depth of your understanding of how the business works — revenue models, unit economics, go-to-market mechanics, legal/regulatory constraints, and operational realities — and your ability to assess whether a valuable, usable, feasible solution is also viable for the business.
- **Acid test:** When a team is excited about a product idea, you are the person who asks: 'Can we actually sell this? Can we service it at scale? What does Legal say? Does the unit economics work?' And you already know the likely answers before you ask, because you understand the business that deeply.
- **Staff focus:** Deep understanding of your product's P&L, pricing, and go-to-market mechanics. Making viability calls within your domain.
- **Principal focus:** Understanding viability across the full product portfolio. Influencing pricing strategy, business model evolution, and partnership decisions at the company level.
- **Rubric dimensions:**
  - `r4d1`: "Business Model Understanding" — "Understands revenue model, unit economics, and cost structure well enough to model product decision impact"
  - `r4d2`: "Viability Risk Assessment" — "Can assess whether solutions work for the business across sales, legal, finance, and operations"
  - `r4d3`: "GTM Awareness" — "Understands go-to-market fit — can the sales team sell this, can CS support it, does it fit pricing"
  - `r4d4`: "Financial Modeling" — "Can build basic financial models to justify or kill product investments"
- **Thought leaders:**
  - Cagan: "Viability Risk (the 4th risk)" — "The most underestimated risk. Expanded from 3 to 4 risks because PMs kept ignoring business viability."
  - Torres: "Business outcome as OST root" — "Discovery must be rooted in business outcomes, connecting user value to business value"
  - Gupta: "P&L ownership" — "At senior levels, business acumen and financial modeling become non-negotiable"
  - Huryn: "Strategy & Business area" — "Revenue strategy, business models, and go-to-market within the competency framework"

#### Requirement 5: Discovery Practice & Methods
- **Weight:** 15%
- **Definition:** Your mastery of structured product discovery — the discipline of continuously identifying opportunities, generating solutions, and testing assumptions before committing engineering resources.
- **Acid test:** You never ship a major bet without evidence. When someone brings you a 'great idea,' your first instinct is 'what is the riskiest assumption and how do we test it cheaply?' — and you can design that test in the same conversation.
- **Staff focus:** Personal mastery of discovery methods. Running discovery within your product team as a continuous practice.
- **Principal focus:** Establishing discovery as an organizational practice. Coaching multiple teams on discovery habits. Setting the standard for evidence-based decision making across the PM org.
- **Rubric dimensions:**
  - `r5d1`: "Discovery as Habit" — "Practices continuous discovery as a weekly rhythm, not a project phase"
  - `r5d2`: "Product Trio Collaboration" — "Works as PM + Designer + Engineer doing discovery together, not handing down requirements"
  - `r5d3`: "Assumption Identification" — "Can identify the riskiest assumption in any idea and design the smallest experiment to test it"
  - `r5d4`: "Experiment Selection" — "Knows which experiment type fits which situation (prototype, Wizard of Oz, painted door, A/B test, etc.)"
- **Thought leaders:**
  - Cagan: "Product Discovery" — "De-risks all 4 risks before delivery. PMs should spend roughly half their time in discovery."
  - Torres: "Continuous Discovery + Assumption Testing" — "Weekly rhythm. Identify riskiest assumption, design smallest test. Product Trio collaboration."
  - Gupta: "Execution discipline" — "Rigorous validation before committing resources. Evidence over opinion."
  - Huryn: "Experimentation competency" — "Hypothesis formulation, experiment design, and building a culture of evidence"

#### Requirement 6: Data Fluency & Experimentation
- **Weight:** 10%
- **Definition:** Your ability to use quantitative data — product analytics, experimentation results, market data — to inform decisions, validate hypotheses, and measure outcomes. Combines analytical skill with the discipline of designing and running rigorous experiments.
- **Acid test:** You can take a dashboard that shows 'activation dropped 8%' and within a day combine it with qualitative understanding to explain why — and design an experiment to validate your hypothesis before the team reacts.
- **Staff focus:** Fluent in product analytics for your domain. Personally designing and analyzing experiments. Setting success metrics for your team.
- **Principal focus:** Setting analytics standards and experimentation practices across multiple teams. Catching misleading metrics org-wide. Defining what 'good measurement' looks like for the PM org.
- **Rubric dimensions:**
  - `r6d1`: "Analytics Fluency" — "Masters product analytics frameworks (AARRR, funnel analysis, cohort analysis, leading vs. lagging indicators)"
  - `r6d2`: "Experiment Design" — "Designs experiments with clear hypotheses, success criteria, and appropriate statistical rigor"
  - `r6d3`: "Data Skepticism" — "Catches when metrics are misleading, gamed, or masking the real signal"
  - `r6d4`: "Quant-Qual Integration" — "Combines quantitative data with qualitative insight for complete understanding"
- **Thought leaders:**
  - Cagan: "Deep Data Knowledge" — "Expert-level understanding of how the product is actually used, beyond what dashboards show"
  - Torres: "Quant + Qual interplay" — "Data identifies where opportunities live (quantitative); interviews reveal why (qualitative)"
  - Gupta: "Analytical rigor" — "Data-driven decision making as a core competency at every PM level"
  - Huryn: "Product Analytics area" — "AARRR metrics, funnel analysis, KPIs, heatmaps, and turning data into actionable insight"

#### Requirement 7: Leadership, Influence & Execution
- **Weight:** 10%
- **Definition:** Your ability to lead without authority, align cross-functional teams around outcomes, mentor junior PMs, and execute with discipline. This influence is earned through demonstrated competence and character, not political skill.
- **Acid test:** People follow your lead because they trust your judgment, not because of your title. When you push back on an executive's pet feature, they listen — because you have been right before and you brought evidence.
- **Staff focus:** Cross-functional leadership within your product team and adjacent teams. Mentoring 2-3 junior PMs. Driving execution with discipline.
- **Principal focus:** Cross-organizational force multiplier. Elevating product practices, decision-making frameworks, and strategic clarity across the entire PM org.
- **Rubric dimensions:**
  - `r7d1`: "Influence Without Authority" — "Aligns cross-functional teams around outcomes without direct authority, through credibility and evidence"
  - `r7d2`: "Communication Clarity" — "Communicates strategy clearly across organizational levels — up to executives, across to peers, down to team"
  - `r7d3`: "Mentorship Impact" — "Raises product craft of junior PMs — teaching discovery, strategy, and customer empathy"
  - `r7d4`: "Execution Discipline" — "Drives outcomes over outputs. OKRs focused on business results and customer impact."
- **Thought leaders:**
  - Cagan: "Competence + Character" — "Influence earned through demonstrated knowledge and integrity, not political skill"
  - Torres: "Product Trio Leadership" — "PM enables collaborative discovery with design and engineering, not top-down requirements"
  - Gupta: "Influence (4th pillar)" — "Force multiplier at Principal level. Cross-org impact and organizational leadership."
  - Huryn: "Leadership + Execution + People" — "Leading with context and culture. Coaching, mentoring, hiring, and building alignment."

#### Requirement 8: Domain & Market Depth
- **Weight:** 10%
- **Definition:** The depth of your understanding of the competitive landscape, market dynamics, technology trends, regulatory environment, and customer ecosystem within your product's domain. Includes understanding the full user lifecycle and how your product competes.
- **Acid test:** You are invited to industry conversations not because of your title, but because people in your domain respect your perspective. When a competitor makes a move, your team turns to you first because you can immediately explain what it means.
- **Staff focus:** Expert in your specific product's domain, competitive landscape, and market dynamics.
- **Principal focus:** Expert across the broader industry landscape. Identifying cross-market opportunities and threats. Advising the company on where the industry is heading.
- **Rubric dimensions:**
  - `r8d1`: "Competitive Intelligence" — "Deep knowledge of competitors — their strategies, strengths, weaknesses, and likely next moves"
  - `r8d2`: "Market Trajectory" — "Understands where the domain is heading over 2-3 years and makes forward-looking bets"
  - `r8d3`: "Lifecycle Understanding" — "Understands the full user lifecycle (acquisition, activation, retention, revenue, referral)"
  - `r8d4`: "Positioning Awareness" — "Thinks about how the product is perceived relative to alternatives in the market"
- **Thought leaders:**
  - Cagan: "Deep Industry Knowledge" — "Market, competitive, regulatory, and technology landscape understanding"
  - Torres: "(Implicit)" — "Domain knowledge enriches opportunity identification and solution quality in discovery"
  - Gupta: "Domain expertise at senior levels" — "Multi-year strategic bets rooted in deep market understanding"
  - Huryn: "Product Growth + Marketing" — "Full lifecycle understanding, positioning, go-to-market, and growth strategy"

---

### File 2: `src/data/curriculum.js`

Export an array of 60 day objects. Each object has this shape:

```js
{
  day: 1,                           // 1-60
  phase: "staff",                   // "staff" (days 1-30) or "principal" (days 31-60)
  requirementId: 1,                 // Which requirement this day covers (1-8)
  topic: "...",                     // Concept topic for the day
  lennyResource: {
    title: "...",                   // Exact title from Lenny's archive
    filename: "...",                // Exact filename (e.g., "podcasts/teresa-torres.md")
    type: "podcast" | "newsletter", // Content type
  },
  externalResource: {
    author: "...",                  // Author name
    title: "...",                   // Resource title
    source: "...",                  // Book name, website, etc.
  },
  caseStudyId: "...",              // References a case study from caseStudies.js
  isPracticeDay: false,            // true if this is a "practice day" (heavier on case study)
}
```

**Complete 60-day schedule:**

#### PHASE 1: STAFF PM LEVEL (Days 1-30)

**Week 1: User Empathy & Customer Knowledge (Req 1) + Product Sense (Req 2)**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 1 | 1 | Why user empathy is the foundation — direct customer exposure | Teresa Torres on how to interview customers | podcasts/teresa-torres.md | Cagan — Inspired Ch. 5-6 (Deep Knowledge of Customers) | cs_1_1 | false |
| 2 | 1 | Story-based interviewing & uncovering real behavior | Startup to exit: Lessons from a first-time founder | newsletters/startup-to-exit-lessons-from-a-first-time-founder.md | Torres — Continuous Discovery Habits Ch. 7 (Interviewing) | cs_1_2 | false |
| 3 | 1 | Automating & scaling customer research | Unorthodox PM wisdom: Kevin Yien (Stripe, Square) | podcasts/kevin-yien.md | Huryn — PM Competencies Map (Discovery area) | cs_1_3 | false |
| 4 | 1 | Practice day: User empathy deep-dive | Why great AI products are all about the data — Shaun Clowes | podcasts/shaun-clowes.md | Adam Fishman — user research informs your model of the customer | cs_1_4 | true |
| 5 | 2 | What product sense actually is — taste, judgment, intuition | When they hired their first PM | newsletters/when-they-hired-their-first-pm.md | Cagan — Inspired Ch. 7 (Deep Knowledge of the Data) | cs_2_1 | false |
| 6 | 2 | Ravi Mehta's 12 PM competencies & product strategy stack | Ravi Mehta — 12 competencies, PM archetypes, product strategy stack | podcasts/ravi-mehta.md | Ravi Mehta — Product Manager Skills framework | cs_2_2 | false |
| 7 | 2 | Product sense in practice — evaluating ideas rapidly | The 10 traits of great PMs — Noah Weiss (Slack) | podcasts/noah-weiss.md | Gupta — The 9 PM Skills Required | cs_2_3 | false |
| 8 | 2 | Practice day: Product sense case studies | Skills PMs need to build | newsletters/skills-pms-need-to-build.md | Ravi Mehta — What's Your Shape? PM archetypes | cs_2_4 | true |

**Week 2: Discovery Practice (Req 5) + Strategic Thinking (Req 3)**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 9 | 5 | Opportunity Solution Trees & continuous discovery | How to ship like a startup (Figma) | newsletters/how-to-ship-like-a-startup.md | Torres — Continuous Discovery Habits Ch. 4-5 (OST) | cs_5_1 | false |
| 10 | 5 | Prototyping & testing before building | How to get your entire team prototyping with AI | newsletters/how-to-get-your-entire-team-prototyping-with-ai.md | Torres — Assumption Testing framework | cs_5_2 | false |
| 11 | 5 | The Product Trio — PM, Designer, Engineer discovering together | Lessons from Atlassian — Megan Cook (Jira) | podcasts/megan-cook.md | Cagan — Empowered (Product Trio chapter) | cs_5_3 | false |
| 12 | 5 | Practice day: Discovery methods | The full-stack PM — Anuj Rathi (Swiggy, Flipkart) | podcasts/anuj-rathi.md | Huryn — PM Skills Assessment (Experimentation area) | cs_5_4 | true |
| 13 | 3 | Product strategy frameworks — DHM model | Gibson Biddle — DHM product strategy framework, Netflix case studies | podcasts/gibson-biddle.md | Cagan — Empowered (Product Strategy chapter) | cs_3_1 | false |
| 14 | 3 | Strategy Blocks — an operator's guide | Strategy Blocks: An operator's guide to product strategy | newsletters/strategy-blocks-an-operators-guide-to-product-strategy.md | Chandra Janakiraman — Strategy Blocks framework | cs_3_2 | false |
| 15 | 3 | Roger Martin's 5 strategic questions | Roger Martin — 5 essential questions to craft a winning strategy | podcasts/roger-martin.md | Roger Martin — Playing to Win | cs_3_3 | false |
| 16 | 3 | Mission-Vision-Strategy-Goals-Roadmap hierarchy | Mission to Vision to Strategy to Goals to Roadmap to Task | newsletters/mission--vision--strategy--goals--roadmap--task.md | Lenny — Getting better at product strategy | cs_3_4 | true |

**Week 3: Business Acumen (Req 4) + Data Fluency (Req 6)**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 17 | 4 | Business models, unit economics & the viability risk | The Subscription Value Loop | newsletters/the-subscription-value-loop-a-framework-for-growing-consumer-subscription-busine.md | Cagan — The Four Big Risks (Viability) | cs_4_1 | false |
| 18 | 4 | Anchoring product strategy to financial models | How Ramp builds product | newsletters/how-ramp-builds-product.md | Gupta — P&L ownership at senior levels | cs_4_2 | false |
| 19 | 4 | Pricing strategy & go-to-market viability | Hamilton Helmer — 7 Powers, moats, and business strategy | podcasts/hamilton-helmer.md | Huryn — Revenue strategy competency | cs_4_3 | false |
| 20 | 4 | Practice day: Business acumen | Velocity over everything — Geoff Charles, Ramp | podcasts/geoff-charles.md | Patrick Campbell — customer research driving pricing | cs_4_4 | true |
| 21 | 6 | Product analytics fundamentals — AARRR, funnels, cohorts | How to measure cohort retention | newsletters/how-to-measure-cohort-retention.md | Huryn — Product Analytics (AARRR, KPIs) | cs_6_1 | false |
| 22 | 6 | A/B testing mastery — design, analysis, pitfalls | Ronny Kohavi — The ultimate guide to A/B testing | podcasts/ronny-kohavi.md | Kohavi — Trustworthy Online Controlled Experiments | cs_6_2 | false |
| 23 | 6 | Growth metrics, loops & north star metrics | Brian Balfour — 10 lessons on career, growth, and life | podcasts/brian-balfour.md | Reforge — Growth Series frameworks | cs_6_3 | false |
| 24 | 6 | Practice day: Data & experimentation | How to build a high-performing growth team — Adam Fishman | podcasts/adam-fishman.md | Huryn — Experimentation competency | cs_6_4 | true |

**Week 4: Influence (Req 7) + Domain Depth (Req 8) + Integration**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 25 | 7 | Influence tactics — stakeholder intel, reframing, coalitions | A PM's guide to influence | newsletters/a-pms-guide-to-influence.md | Cagan — Competence + Character model | cs_7_1 | false |
| 26 | 7 | Getting buy-in — co-creation, storytelling, presence | Getting buy-in | newsletters/getting-buy-in.md | Torres — Product Trio collaboration | cs_7_2 | false |
| 27 | 7 | Working with engineers & cross-functional leadership | Unpacking Amazon's unique ways of working — Bill Carr | podcasts/bill-carr.md | Huryn — Leadership + Execution areas | cs_7_3 | false |
| 28 | 7 | Practice day: Influence & leadership | Bending the universe in your favor — Claire Vo | podcasts/claire-vo.md | Evan LaPointe — Influence frameworks | cs_7_4 | true |
| 29 | 8 | Competitive moats, 7 Powers & market analysis | Growth tactics, retention strategies — Julian Shapiro | podcasts/julian-shapiro.md | Porter — Competitive Strategy fundamentals | cs_8_1 | false |
| 30 | 8 | Growth, lifecycle & positioning | Relentless curiosity — Christopher Miller (HubSpot) | podcasts/christopher-miller.md | Huryn — Product Growth + Marketing areas | cs_8_2 | true |

#### PHASE 2: PRINCIPAL PM LEVEL (Days 31-60)

In Phase 2, requirements are combined. Case studies span multiple products/teams, are multi-quarter, ambiguous, and cross-functional.

**Week 5: Req 1+2 Combined — Cross-Segment Empathy + Portfolio Judgment**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 31 | 1 | Scaling user empathy across multiple segments | How to create a winning product strategy — Melissa Perri | podcasts/melissa-perri.md | Cagan — Transformed (Product Model Competencies) | cs_1_5 | false |
| 32 | 2 | Product judgment across a multi-product portfolio | Ravi Mehta — 12 competencies (revisit at Principal depth) | podcasts/ravi-mehta.md | Gupta — Principal PM as top-tier IC | cs_2_5 | false |
| 33 | 1+2 | Combining empathy + judgment for portfolio decisions | An operator's guide to product strategy — Chandra Janakiraman | podcasts/chandra-janakiraman.md | Torres + Cagan — OST at portfolio level | cs_1_5 | true |
| 34 | 1+2 | Practice: Multi-segment user empathy + product sense | OpenAI's CPO on how AI changes must-have skills — Kevin Weil | podcasts/kevin-weil.md | Cagan — Deep Knowledge across multiple domains | cs_2_5 | true |

**Week 6: Req 3+4 Combined — Org-Wide Strategy + Business Model Evolution**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 35 | 3 | Strategy at the portfolio/company level | Getting better at product strategy | newsletters/getting-better-at-product-strategy.md | Cagan — Mission to Vision to Strategy hierarchy | cs_3_5 | false |
| 36 | 4 | Business model evolution & multi-product viability | Marc Andreessen: The real AI boom hasn't even started yet | podcasts/marc-andreessen.md | Helmer — 7 Powers applied to portfolio strategy | cs_4_5 | false |
| 37 | 3+4 | Connecting product strategy to financial outcomes | How Ramp builds product (revisit at Principal depth) | newsletters/how-ramp-builds-product.md | Gupta — Strategy + P&L at Director+ level | cs_3_5 | true |
| 38 | 3+4 | Practice: Org-wide strategy + business viability | Prioritizing | newsletters/prioritizing.md | Roger Martin + Cagan — Strategy + Viability combined | cs_4_5 | true |

**Week 7: Req 5+6 Combined — Org-Wide Discovery Culture + Measurement Standards**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 39 | 5 | Building org-wide discovery culture | Teresa Torres on how to interview customers (revisit at org level) | podcasts/teresa-torres.md | Torres — Scaling discovery across teams | cs_5_5 | false |
| 40 | 6 | Setting measurement standards across teams | Ronny Kohavi (revisit) — experimentation at scale | podcasts/ronny-kohavi.md | Kohavi — Org-wide experimentation culture | cs_6_5 | false |
| 41 | 5+6 | Combining discovery + experimentation at scale | You should be playing with GPTs at work | newsletters/you-should-be-playing-with-gpts-at-work.md | Huryn — Experimentation + Analytics at org level | cs_5_5 | true |
| 42 | 5+6 | Practice: Building discovery & measurement culture | How Devin replaces your junior engineers — Scott Wu (Cognition) | podcasts/scott-wu.md | Torres + Kohavi combined frameworks | cs_6_5 | true |

**Week 8: Req 7+8 Combined — Force Multiplier Leadership + Industry-Level Thinking**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 43 | 7 | Force multiplier leadership — elevating the PM org | Improve strategy, influence, and decision-making — Evan LaPointe | podcasts/evan-lapointe.md | Cagan — Principal PM as culture shaper | cs_7_5 | false |
| 44 | 8 | Industry-level domain thinking & forward-looking bets | I've run 75+ businesses — Andrew Wilkinson (Tiny) | podcasts/andrew-wilkinson.md | Helmer — 7 Powers for long-term industry analysis | cs_8_3 | false |
| 45 | 7+8 | Combining influence + market depth for org-level impact | Building better product roadmaps — Janna Bastow | podcasts/janna-bastow.md | Gupta + Huryn — Leadership + Domain at Principal level | cs_7_5 | true |
| 46 | 7+8 | Practice: Cross-org leadership + industry strategy | Understanding the role of product ops — Christine Itwaru | podcasts/christine-itwaru.md | Cagan — Competence + Character at scale | cs_8_4 | true |

**Week 9: Full Integration & Mock Interviews (Days 47-60)**

| Day | Req | Topic | Lenny Resource | Lenny Filename | External Resource | Case Study ID | Practice Day |
|-----|-----|-------|---------------|----------------|-------------------|---------------|-------------|
| 47 | 1+3 | Integration: User empathy driving strategy | Gibson Biddle (revisit at integration level) | podcasts/gibson-biddle.md | Cagan — All 4 knowledge areas combined | cs_1_5 | true |
| 48 | 2+5 | Integration: Product sense powering discovery | My favorite PM courses | newsletters/my-favorite-pm-courses.md | Torres — OST + Product Sense combined | cs_2_5 | true |
| 49 | 3+4+6 | Integration: Strategy + viability + data | Strategy Blocks (revisit with data lens) | newsletters/strategy-blocks-an-operators-guide-to-product-strategy.md | All four thought leaders — integrated framework | cs_3_5 | true |
| 50 | 5+7 | Integration: Discovery + influence | A PM's guide to influence (revisit) | newsletters/a-pms-guide-to-influence.md | Torres + Cagan — Discovery meets leadership | cs_5_5 | true |
| 51 | ALL | Full mock interview #1: B2C consumer product | Merci Grace — PLG, interviewing, storytelling (Slack) | podcasts/merci-grace.md | Full framework application | cs_mock_1 | true |
| 52 | ALL | Full mock interview #2: B2B SaaS product | How Ramp builds product (final revisit) | newsletters/how-ramp-builds-product.md | Full framework application | cs_mock_2 | true |
| 53 | ALL | Full mock interview #3: Marketplace/platform | Brian Balfour (revisit — growth + moats) | podcasts/brian-balfour.md | Full framework application | cs_mock_3 | true |
| 54 | ALL | Full mock interview #4: AI product | AI evals — Hamel Husain & Shreya Shankar | podcasts/hamel-husain--shreya-shankar.md | Full framework application | cs_mock_4 | true |
| 55 | 1+2+3 | Weakness targeting: Review lowest-scoring requirements | My all-time favorite reads on product, growth, leadership | newsletters/my-all-time-favorite-reads-on-product-growth-leadership-writing-investing-and-mu.md | Targeted practice on weakest areas | cs_1_5 | true |
| 56 | 4+5+6 | Weakness targeting: Review lowest-scoring requirements | Teresa Torres — Step-by-Step Guide to AI Product Discovery | podcasts/teresa-torres.md | Targeted practice on weakest areas | cs_5_5 | true |
| 57 | ALL | Full mock interview #5: Cross-domain integration | Roger Martin (revisit — strategic thinking) | podcasts/roger-martin.md | Full framework application | cs_mock_5 | true |
| 58 | ALL | Full mock interview #6: Enterprise transformation | Melissa Perri (revisit — product strategy at scale) | podcasts/melissa-perri.md | Full framework application | cs_mock_6 | true |
| 59 | ALL | Final self-assessment & reflection | Skills PMs need to build (revisit) | newsletters/skills-pms-need-to-build.md | All four thought leaders — final assessment | cs_mock_7 | true |
| 60 | ALL | Capstone: Build your personal PM development plan | Product Management Resources — Pawel Huryn | newsletters/product-management-resources.md | Growth plan for the next 6 months | cs_mock_8 | true |

---

### File 3: `src/data/caseStudies.js`

Export an array of case study objects. Each has this shape:

```js
{
  id: "cs_1_1",                    // Format: cs_{reqId}_{number} or cs_mock_{number}
  requirementId: 1,                // Primary requirement tested (use 0 for mock interviews)
  title: "...",                    // Short case study title
  prompt: "...",                   // The full case study prompt (2-4 paragraphs)
  context: "B2C" | "B2B" | "Mixed", // Industry context
  difficulty: "staff" | "principal", // Difficulty level
  timeLimit: 45 | 60,             // Minutes
  rubricDimensionIds: ["r1d1", "r1d2", ...], // Which rubric dimensions to score on
  hints: ["...", "..."],           // 2-3 hints/frameworks to consider
}
```

**Complete case study bank (40 total — 5 per requirement + 8 mocks):**

#### Requirement 1: User Empathy & Customer Knowledge

**cs_1_1** (Staff, B2C, 45 min)
- **Title:** "Spotify Podcast Commuters"
- **Prompt:** "You are a PM at Spotify. Data shows that podcast listening among commuters has plateaued despite overall podcast growth. Your VP asks you to investigate and propose improvements. Walk through: How would you develop a deep understanding of commuter podcast listeners? What interview approach would you use? What specific behaviors and pain points would you look for? Propose 2-3 solution concepts grounded in user insight."
- **Rubric:** r1d1, r1d2, r1d3
- **Hints:** "Story-based interviewing (Torres)", "Distinguish stated vs. revealed preferences", "Map the full commute context — before, during, after"

**cs_1_2** (Staff, B2B, 45 min)
- **Title:** "Slack Onboarding for Enterprise"
- **Prompt:** "You are a PM at Slack. Enterprise customers (5000+ employees) report that new hires take 3+ weeks to become productive Slack users, compared to 3 days at smaller companies. Design a research plan to deeply understand the new hire experience at large enterprises. What would you observe? Who would you interview? What story-based questions would you ask? How would you distinguish between a training problem vs. a product problem?"
- **Rubric:** r1d1, r1d2, r1d4
- **Hints:** "Observe actual onboarding sessions, don't just interview", "Interview both new hires AND the people who onboard them", "Look for workarounds — they reveal unmet needs"

**cs_1_3** (Staff, B2C, 45 min)
- **Title:** "Duolingo Dropout Learners"
- **Prompt:** "You are a PM at Duolingo. 60% of users who complete their first week drop off by week 4. Your task: Design a user research program to understand WHY these users leave. Consider: What segments of dropouts might exist? How would you recruit and interview them (they're no longer active)? What past behaviors would you ask about? How would you synthesize findings into actionable opportunities?"
- **Rubric:** r1d1, r1d2, r1d3
- **Hints:** "Churned users are hard to recruit — think creatively", "Look for the 'aha moment' that didn't happen", "Segment by motivation: career, travel, hobby, school"

**cs_1_4** (Staff, B2B, 45 min)
- **Title:** "Figma Plugin Ecosystem"
- **Prompt:** "You are a PM at Figma responsible for the plugin ecosystem. Plugin adoption is high among power users but near-zero among casual designers. Design a research approach to understand the gap. Who are 'casual designers'? What does their workflow look like? What would story-based interviews reveal that usage data alone cannot? Propose an opportunity map based on hypothetical findings."
- **Rubric:** r1d1, r1d2, r1d3, r1d4
- **Hints:** "Don't ask 'would you use plugins?' — observe actual workflows", "Map the full design workflow, not just the Figma session", "Consider the discovery problem: how do casual users even find plugins?"

**cs_1_5** (Principal, Mixed, 60 min)
- **Title:** "Multi-Segment Empathy at Scale"
- **Prompt:** "You are a Principal PM at a fintech company that serves three distinct segments: individual consumers, small businesses, and mid-market enterprises. Each segment has different needs, workflows, and pain points — but leadership wants a unified platform strategy. How would you build deep customer understanding across all three segments simultaneously? Design the research program, team structure, synthesis approach, and how you'd resolve conflicts between segment needs. How would you coach 3 PMs (one per segment) to maintain user empathy depth while you ensure cross-segment coherence?"
- **Rubric:** r1d1, r1d2, r1d3, r1d4
- **Hints:** "You can't be the expert on all three segments — build a system", "Cross-segment synthesis is the Principal PM's unique contribution", "Look for shared pain points that unlock unified solutions"

#### Requirement 2: Product Sense & Judgment

**cs_2_1** (Staff, B2C, 45 min)
- **Title:** "LinkedIn Remote Workers"
- **Prompt:** "LinkedIn is considering a new feature to help remote workers feel less isolated and more connected to their professional community. You're the PM. Three feature concepts have been proposed: (A) Virtual coworking rooms, (B) Professional interest-based group video chats, (C) AI-powered networking matches based on work context. Evaluate each concept. Which would you pursue and why? What risks does each carry across value, usability, feasibility, and viability? What would you need to learn before committing?"
- **Rubric:** r2d1, r2d2, r2d3
- **Hints:** "Use Cagan's 4 risks framework for each option", "Consider what LinkedIn uniquely has (professional graph) vs. what others already do", "Think about the 'aha moment' for each concept"

**cs_2_2** (Staff, B2B, 45 min)
- **Title:** "Notion AI Assistant Scope"
- **Prompt:** "You're a PM at Notion. The team has built an AI assistant prototype that can do 5 things: (1) Summarize pages, (2) Generate meeting notes, (3) Auto-tag and organize content, (4) Answer questions about workspace content, (5) Draft documents from templates. You can only ship 2 features in the first release. Which 2 do you choose and why? Walk through your product judgment: What signals would you use? What user problems does each solve? What's the risk of shipping the wrong ones first?"
- **Rubric:** r2d1, r2d2, r2d4
- **Hints:** "Which features create the strongest 'aha moment'?", "Consider activation vs. retention value", "What's the cost of being wrong for each?"

**cs_2_3** (Staff, B2C, 45 min)
- **Title:** "Instagram Reels Discovery"
- **Prompt:** "Instagram Reels engagement is growing but creators report that their content reaches fewer followers compared to TikTok. The algorithm team proposes three changes: (A) Prioritize follower content in the Reels feed, (B) Add a 'Following Reels' separate tab, (C) Boost new creators algorithmically for their first 30 days. Evaluate the product trade-offs of each approach. What second-order effects would each have? What data would you need? What's your recommendation?"
- **Rubric:** r2d1, r2d2, r2d3, r2d4
- **Hints:** "Creator-viewer balance is a two-sided marketplace problem", "Second-order effects: how does each change affect content creation incentives?", "What would TikTok's response be to each?"

**cs_2_4** (Staff, B2B, 45 min)
- **Title:** "Stripe Payment Links Evolution"
- **Prompt:** "You're a PM at Stripe. Payment Links (simple shareable payment pages) have been adopted primarily by micro-businesses and solopreneurs. The Growth team wants to add features to move upmarket (invoicing, subscriptions, analytics dashboard). The Core team argues this will cannibalize Stripe Billing. Use your product judgment: Is moving upmarket the right call? What signals would tell you? How do you evaluate the cannibalization risk? What would you recommend?"
- **Rubric:** r2d1, r2d3, r2d4
- **Hints:** "Cannibalization can be healthy if it captures users earlier", "Think about the user journey: solo → small team → growing business", "What's the cost of NOT moving upmarket?"

**cs_2_5** (Principal, Mixed, 60 min)
- **Title:** "Portfolio Product Judgment"
- **Prompt:** "You are a Principal PM at a mid-stage SaaS company with 3 products: (A) a mature core product with 80% of revenue, (B) a 1-year-old growth product with strong adoption but no monetization, and (C) an early-stage experimental product with uncertain market fit. The CEO asks you to recommend how to allocate the next 2 quarters of product investment across these 3 products. Walk through your product judgment: What framework would you use? What data would you need? How do you balance short-term revenue protection vs. long-term growth? How do you make this call when you can't be the domain expert on all 3 products?"
- **Rubric:** r2d1, r2d2, r2d3, r2d4
- **Hints:** "This is a portfolio allocation problem, not a feature prioritization problem", "Consider the stage of each product: protect, grow, explore", "Your judgment about each PM's judgment matters here"

#### Requirement 3: Strategic Thinking & Vision

**cs_3_1** (Staff, B2B, 45 min)
- **Title:** "Atlassian Jira for Non-Tech Teams"
- **Prompt:** "You are a PM at Atlassian. Jira has strong adoption among engineering teams but struggles with marketing, HR, and operations teams who find it too complex. Your VP wants a strategy for expanding Jira to non-technical teams. Define: What is the strategic opportunity (size it)? What are the 2-3 biggest problems to solve? In what sequence would you solve them and why? How does this connect to Atlassian's broader mission? What would success look like in 12 months?"
- **Rubric:** r3d1, r3d2, r3d3
- **Hints:** "Use Cagan's hierarchy: Mission → Vision → Strategy → Discovery", "Don't just simplify Jira — ask if the core metaphor works for non-tech teams", "Consider competitive landscape: Monday.com, Asana, Notion"

**cs_3_2** (Staff, B2C, 45 min)
- **Title:** "Airbnb Experiences Strategy"
- **Prompt:** "You are a PM at Airbnb. Experiences (bookable local activities) launched years ago but remain a small fraction of revenue compared to accommodation. Define a 2-year product strategy for Experiences. Consider: Why hasn't it grown faster? What's the real strategic value of Experiences to Airbnb (beyond direct revenue)? What 3 problems would you prioritize and why? How would you sequence them?"
- **Rubric:** r3d1, r3d2, r3d3, r3d4
- **Hints:** "Think about Experiences as a strategic moat, not just a product", "Supply-side (hosts/guides) vs. demand-side (travelers) problems", "Gibson Biddle's DHM: Delight, Hard-to-copy, Margin-enhancing"

**cs_3_3** (Staff, B2B, 45 min)
- **Title:** "Shopify's AI Commerce Strategy"
- **Prompt:** "You are a Staff PM at Shopify. The CEO has declared that AI will transform commerce. Define a product strategy for how Shopify should integrate AI capabilities for merchants. Be specific: What merchant problems does AI uniquely solve? What is Shopify's right to win vs. standalone AI tools? Propose a 3-phase strategy (6mo / 12mo / 24mo) with clear rationale for sequencing."
- **Rubric:** r3d1, r3d2, r3d3, r3d4
- **Hints:** "Right to win: Shopify has merchant data that no standalone AI tool has", "Phase 1 should create value AND generate training data for Phase 2+", "Consider the merchant skill spectrum: tech-savvy vs. non-technical"

**cs_3_4** (Staff, B2C, 45 min)
- **Title:** "YouTube Shorts vs. Long-Form Balance"
- **Prompt:** "You are a Staff PM at YouTube. Shorts are growing rapidly but long-form content generates significantly more ad revenue per view. Define a product strategy that grows Shorts without cannibalizing long-form. What's the strategic role of Shorts in YouTube's ecosystem? How do you resolve the tension between growth metrics (Shorts views) and revenue metrics (long-form watch time)? What would your North Star metric be?"
- **Rubric:** r3d1, r3d2, r3d3
- **Hints:** "Think about Shorts as top-of-funnel for long-form creators", "The creator incentive structure is the strategic lever", "Consider the full creator journey, not just viewer engagement"

**cs_3_5** (Principal, Mixed, 60 min)
- **Title:** "Multi-Product Strategy for Fintech Expansion"
- **Prompt:** "You are a Principal PM at a fintech company that started with personal finance (budgeting app, 5M users). The CEO wants to expand into: (A) Small business banking, (B) Investment/wealth management, (C) Insurance marketplace. You can only pursue one in the next 18 months. Write a product strategy recommendation: How do you evaluate each opportunity? What data and market signals inform your choice? How does each option connect to the company's existing strengths and user base? What are the viability risks for each? Present your recommendation with clear rationale."
- **Rubric:** r3d1, r3d2, r3d3, r3d4
- **Hints:** "This is a bet-sizing problem: which option has the best risk/reward?", "Consider adjacency: which expansion leverages existing user trust and data?", "Roger Martin: Where will you play? How will you win?"

#### Requirement 4: Business Acumen & Viability

**cs_4_1** (Staff, B2B, 45 min)
- **Title:** "Slack AI Assistant Pricing"
- **Prompt:** "You are a PM at Slack. The team has built an AI assistant that can search across all channels, summarize threads, and draft messages. It costs $0.03 per query in LLM inference. Your task: Assess the business viability of this feature. Should it be included in existing plans, sold as an add-on, or gated by usage? Model the unit economics. What's the viability risk? How do you balance user value with business sustainability? What would you recommend to the leadership team?"
- **Rubric:** r4d1, r4d2, r4d3, r4d4
- **Hints:** "Consider willingness to pay vs. cost to serve at different usage levels", "Look at how competitors (Teams, Notion) are pricing AI features", "The viability risk: heavy users may cost more than they pay"

**cs_4_2** (Staff, B2C, 45 min)
- **Title:** "Spotify HiFi Tier Viability"
- **Prompt:** "Spotify has long promised a HiFi (lossless audio) tier but hasn't launched it. You're the PM tasked with assessing viability. Consider: What would you price it at? What are the infrastructure costs of streaming lossless? What percentage of users would upgrade? How does this affect existing Premium subscribers (downgrade risk)? What's the competitive pressure (Apple Music already includes lossless for free)? Recommend: launch, don't launch, or alternative approach — with full business rationale."
- **Rubric:** r4d1, r4d2, r4d3, r4d4
- **Hints:** "Apple including lossless for free is a major viability threat", "Bandwidth costs scale differently than standard streaming", "Consider bundling: HiFi + other premium features"

**cs_4_3** (Staff, B2B, 45 min)
- **Title:** "Figma Freemium to Enterprise Bridge"
- **Prompt:** "You are a PM at Figma. The freemium plan drives massive adoption but many teams stay free indefinitely. Design proposes adding AI design features only on paid plans to drive conversion. Assess the viability: What's the risk to the growth flywheel? What conversion rate improvement would justify the change? How do you model the trade-off between free user growth and paid conversion? What would you recommend?"
- **Rubric:** r4d1, r4d2, r4d3
- **Hints:** "Free users are part of the moat (network effects) — killing free growth has hidden costs", "Model the full funnel: free → team → org → enterprise", "Consider what features drive adoption vs. what features drive willingness to pay"

**cs_4_4** (Staff, B2C, 45 min)
- **Title:** "DoorDash Grocery Delivery Viability"
- **Prompt:** "You are a PM at DoorDash. Grocery delivery is growing but margins are significantly worse than restaurant delivery (larger orders, more items to pick, higher error rates). Assess the viability of continuing to invest in grocery. What are the unit economics? What would need to change for grocery to be viable? How does grocery delivery serve DoorDash's broader strategy even if it's not independently profitable? What's your recommendation?"
- **Rubric:** r4d1, r4d2, r4d3, r4d4
- **Hints:** "Loss leaders can be strategically viable if they drive other revenue", "Consider: does grocery increase app open frequency for restaurant orders?", "Compare Instacart's model vs. DoorDash's integrated approach"

**cs_4_5** (Principal, Mixed, 60 min)
- **Title:** "Platform Business Model Evolution"
- **Prompt:** "You are a Principal PM at a developer tools company (think Twilio/Stripe-like). Usage-based pricing drove hypergrowth but revenue is now volatile and unpredictable quarter to quarter. The CFO wants to shift toward more predictable subscription/committed-use pricing. The CTO warns this will alienate developers who love pay-as-you-go. Design a pricing evolution strategy that addresses both concerns. Model the trade-offs. How do you phase the transition? What viability risks exist in both the current and proposed models? Present your recommendation."
- **Rubric:** r4d1, r4d2, r4d3, r4d4
- **Hints:** "Committed use discounts (like AWS) offer a middle path", "Developer adoption funnel: free → pay-as-you-go → committed is natural", "Model revenue predictability vs. growth rate trade-off"

#### Requirement 5: Discovery Practice & Methods

**cs_5_1** (Staff, B2C, 45 min)
- **Title:** "Airbnb Unique Stays Discovery Plan"
- **Prompt:** "You are a PM at Airbnb. Bookings for unique stays (treehouses, yurts, houseboats) have plateaued despite high browse-to-view rates. Design a complete discovery plan. Build an Opportunity Solution Tree: What is the desired outcome? What are the possible opportunities (user problems)? For your top 2 opportunities, propose solutions and the experiments you would run to test them. Be specific about experiment design: What's the hypothesis? What's the riskiest assumption? What's the smallest test?"
- **Rubric:** r5d1, r5d2, r5d3, r5d4
- **Hints:** "High browse-to-view but low booking suggests a conversion problem, not a discovery problem", "Map the full booking funnel: search → view → consider → book", "Consider both guest-side and host-side opportunities"

**cs_5_2** (Staff, B2B, 45 min)
- **Title:** "Notion Team Adoption Discovery"
- **Prompt:** "You are a PM at Notion. Individual adoption is strong but team-level adoption stalls — one person sets up the workspace and teammates don't engage. Design a discovery sprint (2 weeks). Who is in your Product Trio? What interviews would you conduct in week 1? How would you build an OST from the findings? What assumption tests would you run in week 2? Be specific about methods."
- **Rubric:** r5d1, r5d2, r5d3
- **Hints:** "Interview both the 'champion' (active user) and the 'resistor' (non-adopter)", "The riskiest assumption might be about the value prop, not the UX", "Consider a 'painted door' test for potential team features"

**cs_5_3** (Staff, B2C, 45 min)
- **Title:** "Uber Eats Repeat Order Optimization"
- **Prompt:** "You are a PM at Uber Eats. Repeat order rate is 40% (users who order again within 30 days) and the target is 55%. Design a discovery process: How would you segment users to understand different repeat behaviors? Design 3 different experiment types (one qualitative, one prototype-based, one quantitative) to test different hypotheses about why users don't reorder. Walk through the OST: outcome → opportunities → solutions → experiments."
- **Rubric:** r5d1, r5d3, r5d4
- **Hints:** "Segment: never-reorder vs. occasional vs. almost-frequent", "Qualitative: interview users 7 days after first order about their experience", "Prototype: test a 'reorder with one tap' flow; Quantitative: A/B test reminder notifications"

**cs_5_4** (Staff, B2B, 45 min)
- **Title:** "HubSpot CRM AI Discovery"
- **Prompt:** "You are a PM at HubSpot. The team wants to add AI-powered lead scoring to the CRM. Before building, you need to run discovery. The riskiest assumption is: 'Sales reps will trust AI-generated lead scores enough to change their prioritization behavior.' Design 3 experiments of increasing fidelity to test this assumption: (1) lowest-cost test, (2) medium-fidelity test, (3) highest-fidelity test before full build. For each, specify: hypothesis, method, success criteria, timeline, and what you'd learn."
- **Rubric:** r5d3, r5d4
- **Hints:** "Lowest cost: show existing reps a spreadsheet with 'AI scores' (actually manual) and observe behavior", "Medium: Wizard of Oz — human-generated scores presented as AI in the CRM", "Highest: prototype with real ML model for one sales team for 2 weeks"

**cs_5_5** (Principal, Mixed, 60 min)
- **Title:** "Building Org-Wide Discovery Culture"
- **Prompt:** "You are a Principal PM at a Series C B2B SaaS company (200 employees, 8 product teams). Currently, only 2 of the 8 teams practice any form of structured discovery — the rest ship features from stakeholder requests. The CPO asks you to design a plan to establish continuous discovery across all 8 teams within 6 months. What does your rollout look like? How do you handle resistance from teams that say 'we don't have time for discovery'? What training, tooling, and rituals would you introduce? How do you measure whether it's working? What does the PM org look like in 6 months if this succeeds?"
- **Rubric:** r5d1, r5d2, r5d3, r5d4
- **Hints:** "Start with the 2 teams already doing it — make them showcases", "Don't mandate — create pull by showing results", "Torres: discovery is a habit, not a phase — design weekly rituals"

#### Requirement 6: Data Fluency & Experimentation

**cs_6_1** (Staff, B2C, 45 min)
- **Title:** "Activation Drop Diagnosis"
- **Prompt:** "You are a PM at a consumer fintech app (like Robinhood). After a recent redesign, 7-day activation dropped from 35% to 28%. Walk through your diagnostic process: What data would you look at first? How would you segment users to isolate the problem? What hypotheses would you form? Design an experiment to test your top hypothesis. Be specific about: success metrics, sample size considerations, and how you'd avoid false positives."
- **Rubric:** r6d1, r6d2, r6d3
- **Hints:** "Funnel analysis first: where exactly are users dropping off?", "Segment by acquisition channel — the redesign may affect different channels differently", "Be careful of novelty effects: compare week 1 vs. week 3 of the redesign"

**cs_6_2** (Staff, B2B, 45 min)
- **Title:** "Feature Adoption Measurement"
- **Prompt:** "You are a PM at Salesforce. You shipped a new 'AI Email Drafting' feature 6 weeks ago. Leadership wants to know: Is it working? Define: What does 'working' mean for this feature? What metrics would you track (leading and lagging)? How would you set up cohort analysis to measure true impact? What's the difference between adoption (usage) and value (does it help users)? Design a measurement framework and present your findings approach."
- **Rubric:** r6d1, r6d2, r6d4
- **Hints:** "Adoption ≠ value. Users might try it once and abandon it.", "Cohort: compare users who adopted vs. matched users who didn't", "Leading metrics: time-to-send-email, response rates; Lagging: deal close rates"

**cs_6_3** (Staff, B2C, 45 min)
- **Title:** "North Star Metric Design"
- **Prompt:** "You are a PM at a meditation app (like Calm or Headspace). The team currently tracks DAU as its north star. You believe this is a vanity metric that doesn't capture real user value. Propose a better North Star metric. Walk through: Why is DAU insufficient? What metric better captures the value users get? How would you operationally define and measure it? What input metrics feed into it? How would you get the team and leadership aligned on the change?"
- **Rubric:** r6d1, r6d3, r6d4
- **Hints:** "DAU counts opens, not value — someone opening the app for 5 seconds counts the same as a 20-min meditation", "Consider: 'users who completed a meditation session 3+ times this week'", "Input metrics: session start rate, completion rate, streak length"

**cs_6_4** (Staff, B2B, 45 min)
- **Title:** "Pricing Experiment Design"
- **Prompt:** "You are a PM at a B2B SaaS tool. The team wants to test whether raising the Pro plan price from $29/mo to $39/mo will reduce churn enough to offset the revenue gain from higher ARPU. Design this experiment end-to-end: What's the hypothesis? How do you randomize (considering existing vs. new customers)? What sample size do you need? How long should you run it? What are the pitfalls of pricing experiments? What ethical considerations exist?"
- **Rubric:** r6d1, r6d2, r6d3
- **Hints:** "You CANNOT A/B test prices to existing customers — legal and trust issues", "Test on new signups only, or test willingness-to-pay through surveys", "Consider long-term effects: 30-day churn may look fine but 6-month churn increases"

**cs_6_5** (Principal, Mixed, 60 min)
- **Title:** "Experimentation Culture at Scale"
- **Prompt:** "You are a Principal PM at a mid-size tech company (500 employees). Only 1 in 5 product teams runs experiments before shipping. Most teams ship features and measure impact after launch (if at all). The CPO asks you to build an experimentation culture. Design the program: What infrastructure is needed? What training? How do you handle teams that say 'our feature can't be A/B tested'? What governance ensures experiment quality without creating bottlenecks? How do you measure whether the culture shift is working? What does success look like in 12 months?"
- **Rubric:** r6d1, r6d2, r6d3, r6d4
- **Hints:** "Not everything needs an A/B test — build a menu of experiment types", "Start with one showcase team, publish results org-wide", "Kohavi: most A/B tests fail — that's the point, it saves you from shipping bad ideas"

#### Requirement 7: Leadership, Influence & Execution

**cs_7_1** (Staff, B2B, 45 min)
- **Title:** "Stakeholder Misalignment"
- **Prompt:** "You are a Staff PM at a B2B company. Engineering wants to rebuild the backend (6-month investment, no user-facing value). Sales wants 5 specific features customers are asking for. Your VP wants a new product line. You have resources for ONE of these. Walk through: How would you evaluate each option? How would you influence each stakeholder without authority? What frameworks would you use to make your case? How would you build alignment when all three stakeholders have legitimate but conflicting needs?"
- **Rubric:** r7d1, r7d2, r7d4
- **Hints:** "Seek intel on each stakeholder's real incentives (Jules Walter's tactic)", "Reframe: what outcome does each stakeholder actually need?", "Co-create the evaluation criteria before presenting your recommendation"

**cs_7_2** (Staff, B2C, 45 min)
- **Title:** "Executive Buy-In for Risky Bet"
- **Prompt:** "You are a Staff PM at a consumer social app. You've done extensive discovery and believe the company should pivot a major product area from feed-based content to messaging-first community. This is a risky, controversial bet that contradicts the CEO's public statements about the feed. Design your influence strategy: How would you build the case? Who would you pre-align with before the big meeting? How would you present the evidence? How would you handle pushback? What's your plan if the CEO says no?"
- **Rubric:** r7d1, r7d2
- **Hints:** "Never surprise executives — pre-align with their trusted advisors", "Lead with the user evidence, not your opinion", "Progressive alignment: get small yeses before the big ask"

**cs_7_3** (Staff, B2B, 45 min)
- **Title:** "Cross-Team Dependency Unblock"
- **Prompt:** "You are a Staff PM. Your team's most important initiative is blocked by another team that won't prioritize the API you need. Their PM says it's not on their roadmap. Their engineering lead is sympathetic but can't override their PM. Design your approach: What are your options (escalation, negotiation, building it yourself, workaround)? How would you influence without creating political damage? What's the optimal outcome? Walk through the conversation you'd have with the other PM."
- **Rubric:** r7d1, r7d2, r7d4
- **Hints:** "Understand their priorities first — maybe you can frame your request as helping their goals too", "Building it yourself has hidden costs: maintenance, divergence, resentment", "Escalation should be your last resort, not your first move"

**cs_7_4** (Staff, Mixed, 45 min)
- **Title:** "Mentoring a Struggling PM"
- **Prompt:** "You are a Staff PM mentoring a mid-level PM who has strong technical skills but weak user empathy. They consistently propose solutions based on engineering elegance rather than user needs. Their last two features shipped on time but had low adoption. Design your mentorship approach: How would you diagnose the root cause? What specific practices would you introduce? How would you give feedback that's direct but not demoralizing? What would a 90-day mentoring plan look like?"
- **Rubric:** r7d3
- **Hints:** "Don't just tell them to 'talk to users more' — make it structural", "Co-interview with them: model story-based interviewing live", "Help them experience the gap: show them user session recordings of their features"

**cs_7_5** (Principal, Mixed, 60 min)
- **Title:** "PM Org Transformation"
- **Prompt:** "You are a Principal PM at a company where the PM org is perceived as a 'project management' function — PMs write tickets, track sprints, and manage stakeholder requests, but don't own strategy or do discovery. The new CPO (from a Cagan-style background) wants to transform the PM org into empowered product teams within 12 months. You're tasked with leading this transformation. Design the plan: What does the current state → future state look like? How do you upskill existing PMs? How do you handle PMs who can't or won't make the transition? How do you change engineering and design's perception of PM? What does success look like at 3, 6, and 12 months?"
- **Rubric:** r7d1, r7d2, r7d3, r7d4
- **Hints:** "Start with one team as a showcase — don't try to transform all teams at once", "The biggest resistance will come from stakeholders who lose their 'order takers'", "Cagan's Transformed book is the playbook here"

#### Requirement 8: Domain & Market Depth

**cs_8_1** (Staff, B2C, 45 min)
- **Title:** "TikTok Competitive Response"
- **Prompt:** "You are a Staff PM at Instagram. TikTok just launched a feature that lets creators sell products directly in their videos with one-tap checkout. Your VP asks: What does this mean for us? Should we respond? Analyze: What is TikTok's strategic intent? How does this affect Instagram's creator ecosystem? What are Instagram's options (copy, differentiate, or ignore)? Recommend a response strategy grounded in competitive analysis and market trajectory."
- **Rubric:** r8d1, r8d2, r8d4
- **Hints:** "Don't just react — think about Instagram's unique strengths vs. TikTok's", "Creator commerce is a platform play — consider the full ecosystem effect", "What's TikTok's likely next move after this?"

**cs_8_2** (Staff, B2B, 45 min)
- **Title:** "AI Developer Tools Landscape"
- **Prompt:** "You are a Staff PM at GitHub. The AI coding assistant space has exploded: Copilot, Cursor, Cody, Devin, and more. Your VP asks you to brief the leadership team on the competitive landscape and where GitHub should place its bets for the next 2 years. Deliver: Market map of competitors (segments, strengths, trajectories). Where is the market heading? What's GitHub's right to win? What 2-3 strategic bets should GitHub make? What are the risks of each?"
- **Rubric:** r8d1, r8d2, r8d4
- **Hints:** "GitHub's moat: the largest code repository and developer identity graph", "The market is moving from autocomplete → autonomous agents", "Consider: what if the IDE itself becomes less important?"

**cs_8_3** (Principal, B2C, 60 min)
- **Title:** "Streaming Industry Consolidation"
- **Prompt:** "You are a Principal PM advisor to a mid-size streaming service (think Paramount+ or Peacock scale). The streaming wars have led to consolidation — Disney+ absorbed Hulu, Warner merged Max. Your service is subscale. Analyze the market: What's the 3-year trajectory for mid-size streamers? What strategic options exist (merge, niche down, bundle, pivot to ad-supported)? Recommend a product strategy that leverages your unique assets. Model the viability of each option."
- **Rubric:** r8d1, r8d2, r8d3, r8d4
- **Hints:** "Subscale streamers can't compete on breadth — must find a wedge", "Consider: the bundle economics are actually favorable for smaller players", "What does the full user lifecycle look like for a niche streaming service?"

**cs_8_4** (Principal, B2B, 60 min)
- **Title:** "Regulatory Disruption in Fintech"
- **Prompt:** "You are a Principal PM at a fintech company. New regulations (similar to PSD3 in Europe) will require banks to share customer financial data with third-party apps via standardized APIs — effectively creating 'open banking 2.0.' This regulation takes effect in 18 months. Analyze: What opportunities does this create? What threats to existing fintechs? How does this change the competitive landscape? Design a product strategy that positions your company to benefit from this regulatory shift. Include timeline, viability assessment, and competitive response scenarios."
- **Rubric:** r8d1, r8d2, r8d3, r8d4
- **Hints:** "Regulation creates both opportunities (new data access) and threats (incumbents can now offer your features)", "18-month runway means you need to start building NOW", "Consider: who wins in open banking — aggregators, specialists, or banks themselves?"

#### Mock Interview Case Studies (Days 51-60)

**cs_mock_1** (Principal, B2C, 60 min)
- **Title:** "Full Mock: Consumer Social Platform Redesign"
- **Prompt:** "You are a Principal PM at a consumer social platform (200M MAU) experiencing declining engagement among 18-24 year olds while growing among 35+. The CEO asks you to develop a strategy to reverse the youth engagement trend without alienating the growing older demographic. This is a full-scope case: demonstrate user empathy (how would you understand both segments?), product sense (what would you build?), strategic thinking (what's the 2-year vision?), business acumen (how does this affect advertising revenue?), and discovery approach (how would you validate before building?)."
- **Rubric:** r1d1, r2d1, r3d1, r4d2, r5d3
- **Hints:** "Address ALL 8 requirements in your answer", "Start with strategy, then show how discovery validates it", "The demographic tension is the core strategic challenge"

**cs_mock_2** (Principal, B2B, 60 min)
- **Title:** "Full Mock: B2B SaaS Platform Expansion"
- **Prompt:** "You are a Principal PM at a B2B project management tool (think Asana/Monday.com, 50K paying companies). Growth has slowed from 40% to 15% YoY. The board wants a path back to 30%+ growth. Develop a comprehensive product strategy: What's driving the slowdown? What expansion opportunities exist (new segments, new products, international, platform/marketplace)? Which would you pursue and why? How would you validate your recommendation? What's the business case? How would you align the org around this new direction?"
- **Rubric:** r1d3, r2d3, r3d1, r4d1, r5d1, r7d1
- **Hints:** "Diagnose before prescribing: is it market saturation, competitive pressure, or product stagnation?", "Consider all growth levers: new customers, expansion revenue, retention improvement", "Your influence plan matters as much as your strategy"

**cs_mock_3** (Principal, Mixed, 60 min)
- **Title:** "Full Mock: Marketplace Rebalancing"
- **Prompt:** "You are a Principal PM at a two-sided marketplace (like Etsy or Fiverr). Supply (sellers/freelancers) has grown 3x in the past year but demand (buyers) has only grown 1.5x. Seller satisfaction is dropping because of lower earnings per seller. Buyer experience is declining due to search overload. Design a comprehensive strategy to rebalance the marketplace. Address: user empathy for both sides, product solutions, experimentation plan, business viability (marketplace take rate impact), and how you'd influence both the growth team and the seller success team."
- **Rubric:** r1d1, r2d2, r3d2, r5d3, r6d1, r7d1
- **Hints:** "Two-sided marketplace problems require thinking about both sides simultaneously", "Sometimes reducing supply quality improves the marketplace", "Marketplace liquidity metrics are your north star here"

**cs_mock_4** (Principal, Mixed, 60 min)
- **Title:** "Full Mock: AI Product Strategy"
- **Prompt:** "You are a Principal PM at a company that wants to build an AI-powered product in the customer support space. You're starting from scratch — no existing product. The CEO gives you 6 months and a team of 8 engineers + 2 designers. Define: Who is the target customer and what problem are you solving? What's the competitive landscape? What's your product strategy and go-to-market? How would you run discovery in the first 4 weeks? What experiments would you run before building the full product? What are the key risks (value, usability, feasibility, viability) and how would you address each?"
- **Rubric:** r1d1, r2d1, r3d1, r4d2, r5d1, r6d2, r8d1
- **Hints:** "0-to-1 product: discovery is EVERYTHING in the first 4 weeks", "Don't build the AI first — validate the workflow value with a Wizard of Oz", "Customer support AI is crowded — you need a sharp wedge"

**cs_mock_5** (Principal, Mixed, 60 min)
- **Title:** "Full Mock: Cross-Domain Platform Play"
- **Prompt:** "You are a Principal PM at a company that has a successful B2C app (food delivery, 10M users) and wants to leverage its logistics network to enter B2B (restaurant supply chain management). This is a platform play: using consumer delivery infrastructure to power a business-to-business product. Develop the full strategy: Why is this the right move? What's the platform thesis? How do the two products reinforce each other? What are the organizational challenges (two very different customer segments)? How would you validate the B2B opportunity? What's the 18-month roadmap?"
- **Rubric:** r1d1, r2d3, r3d1, r4d1, r5d3, r7d1, r8d2
- **Hints:** "The platform thesis must show clear synergy, not just shared infrastructure", "B2B and B2C product cultures are very different — organizational design matters", "Validate B2B demand with concierge MVP before building anything"

**cs_mock_6** (Principal, B2B, 60 min)
- **Title:** "Full Mock: Enterprise Transformation"
- **Prompt:** "You are a Principal PM hired to transform a legacy enterprise software company (think SAP/Oracle-scale) that is losing market share to modern cloud-native competitors. The product is 15 years old, has 2000+ enterprise customers, and generates $500M ARR — but NPS is -15 and churn is accelerating. The CEO asks: What's the product strategy to modernize without losing existing customers? Address: How do you understand the needs of both loyal (but frustrated) existing customers and prospects choosing competitors? What's the modernization strategy? How do you sequence it? What are the viability risks of each approach (rebuild, re-platform, gradual migration)? How do you get buy-in from 200+ PMs and engineers who've built the legacy product?"
- **Rubric:** r1d1, r2d2, r3d1, r4d1, r5d1, r7d1, r8d1
- **Hints:** "Never do a full rewrite — strangle the legacy system gradually", "Existing customers' workflows ARE the product — you can't break them", "Cagan's Transformed is literally about this problem"

**cs_mock_7** (Principal, Mixed, 60 min)
- **Title:** "Full Mock: Self-Assessment & Gap Analysis"
- **Prompt:** "Reflect on your performance across all 60 days. For each of the 8 requirements: (1) What is your current score (1-5)? (2) What specific evidence from your case study answers supports this score? (3) What is your biggest gap within this requirement? (4) What specific actions would close this gap in the next 30 days? Be brutally honest. This is not about looking good — it's about knowing exactly where you stand and what to work on next."
- **Rubric:** r1d1, r2d1, r3d1, r4d1, r5d1, r6d1, r7d1, r8d1
- **Hints:** "Score yourself on demonstrated ability, not theoretical knowledge", "Look at your actual case study answers — not what you think you know", "The gap analysis is more valuable than the score"

**cs_mock_8** (Principal, Mixed, 60 min)
- **Title:** "Full Mock: Personal PM Development Plan"
- **Prompt:** "Based on your self-assessment from Day 59, design your personal PM development plan for the next 6 months. For your 3 weakest requirements: (1) What specific practices will you adopt? (2) What resources will you study? (3) How will you get real-world practice opportunities? (4) How will you measure progress? For your 3 strongest requirements: (1) How will you maintain and deepen these strengths? (2) How will you use them to create outsized impact? Create a concrete monthly plan with specific actions, not vague goals."
- **Rubric:** r1d1, r3d1, r7d3
- **Hints:** "A development plan without specific weekly actions is just a wish list", "Find real-world practice: volunteer for projects that target your weak areas", "Build accountability: share your plan with a mentor or peer"

---

## Step 3: Create Test File

### File: `src/data/__tests__/data.test.js`

Write tests using Vitest that validate:

1. **Requirements data integrity:**
   - Exactly 8 requirements exist
   - All IDs are unique (1-8)
   - All weights sum to exactly 100
   - Each requirement has 3-4 rubric dimensions
   - Each requirement has exactly 4 thought leader entries
   - No empty strings in any field

2. **Curriculum data integrity:**
   - Exactly 60 days exist
   - Day numbers are sequential (1-60)
   - Days 1-30 have phase "staff", days 31-60 have phase "principal"
   - Every day references a valid requirementId (1-8)
   - Every day has a non-empty lennyResource with title, filename, and type
   - Every day has a non-empty externalResource
   - Every day references a valid caseStudyId that exists in case studies

3. **Case studies data integrity:**
   - At least 5 case studies per requirement (requirementId 1-8)
   - At least 8 mock case studies (requirementId 0 or "ALL")
   - No duplicate case study IDs
   - All case studies have non-empty prompt, title, context, difficulty, timeLimit
   - Staff case studies have timeLimit 45, Principal have timeLimit 60
   - All rubricDimensionIds reference valid dimensions from requirements
   - Mix of B2B and B2C exists (at least 2 of each)

4. **Cross-file consistency:**
   - Every caseStudyId referenced in curriculum exists in case studies
   - Every rubricDimensionId in case studies exists in some requirement's rubricDimensions

Run with: `cd pm-os && npm run test`

**All tests must pass before moving to Iteration 1.**

---

## Done Criteria

- [ ] Svelte + Vite project scaffolds and builds (`npm run build` succeeds)
- [ ] `src/data/requirements.js` exports 8 requirement objects with all fields populated
- [ ] `src/data/curriculum.js` exports 60 day objects with all fields populated
- [ ] `src/data/caseStudies.js` exports 48 case study objects (40 + 8 mocks) with all fields populated
- [ ] `npm run test` passes all validation tests
- [ ] No empty strings, no missing references, no data gaps
