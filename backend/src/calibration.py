"""
Calibration anchors define the scoring standard for each rubric dimension.
Each anchor owns the behavioral descriptions and reflection prompt for one dimension.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class CalibrationAnchor:
    dimension_id: str
    principle: str
    levels: dict[int, str]
    reflection_prompt: str
    skeleton: bool


CALIBRATION_ANCHORS: tuple[CalibrationAnchor, ...] = (
    # Skill 1: User Empathy & Customer Knowledge
    CalibrationAnchor(
        dimension_id="r1d1",
        principle="Frequency and depth of direct, unproxied customer contact is what builds genuine understanding of user behavior.",
        levels={
            1: "Rarely speaks directly with customers; relies on summaries from others or secondhand reports.",
            2: "Occasionally joins customer calls but does not initiate them; contact is infrequent and shallow.",
            3: "Regularly conducts direct customer conversations on a weekly cadence with meaningful engagement.",
            4: "Maintains sustained, deep customer relationships across multiple segments; sets the standard for direct exposure on the team.",
            5: "Customer contact is a non-negotiable personal practice; builds org-wide norms for direct exposure and coaches others on it.",
        },
        reflection_prompt="How often do you personally speak with customers, and can you describe the depth of those conversations?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r1d2",
        principle="Story-based interviewing surfaces real behavior rather than stated preferences, yielding more reliable insight.",
        levels={
            1: "Asks leading or hypothetical questions; collects stated preferences rather than behavioral evidence.",
            2: "Uses some open-ended questions but often reverts to opinion-seeking rather than story-eliciting.",
            3: "Consistently uses story-based prompts to uncover past behavior and context during interviews.",
            4: "Interviews reveal non-obvious behavioral patterns; coaches teammates on effective interview technique.",
            5: "Defines the interview standard for the team; designs interview guides that systematically surface latent needs.",
        },
        reflection_prompt="Walk me through how you structure a customer interview — what questions do you ask and why?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r1d3",
        principle="Synthesis transforms raw qualitative observations into actionable patterns that can inform product decisions.",
        levels={
            1: "Shares individual anecdotes without connecting them to broader themes or patterns.",
            2: "Identifies obvious common themes but misses nuance; synthesis stays at the surface.",
            3: "Produces clear insight documents that connect multiple interviews into patterns with named opportunities.",
            4: "Synthesis distinguishes signal from noise reliably and generates non-obvious insights across many interactions.",
            5: "Builds scalable synthesis frameworks used by the broader PM org; patterns discovered here shape strategy.",
        },
        reflection_prompt="Describe a time you synthesized qualitative research into an insight that changed a product decision.",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r1d4",
        principle="A track record of correct predictions about user response demonstrates that customer knowledge is deep enough to generate foresight.",
        levels={
            1: "Predictions about user reaction are rarely made explicitly; outcomes often surprise.",
            2: "Makes rough predictions but they match outcomes less than half the time in tracked cases.",
            3: "Predictions about user response are made before launches and are correct the majority of the time.",
            4: "Consistently predicts user behavior accurately across diverse features; misses are rare and explained.",
            5: "Predictive accuracy is recognized by peers and leadership as a differentiating strength; others consult before shipping.",
        },
        reflection_prompt="Can you recall a recent feature where you predicted user response before launch — what happened?",
        skeleton=True,
    ),
    # Skill 2: Product Sense & Judgment
    CalibrationAnchor(
        dimension_id="r2d1",
        principle="Rapid, accurate assessment of whether an idea addresses a real user need with business viability is the core of product sense.",
        levels={
            1: "Takes days or weeks to form a view on an idea; evaluation lacks a structured lens.",
            2: "Can evaluate ideas with time and prompting but struggles to do it quickly in conversation.",
            3: "Evaluates ideas in real-time by applying user need and business viability checks within minutes.",
            4: "Rapid evaluation is consistently accurate; others rely on this judgment before committing resources.",
            5: "Sets the speed-and-accuracy benchmark for idea evaluation; trains others on the evaluation framework.",
        },
        reflection_prompt="How do you evaluate a new feature idea in the moment — what mental framework do you apply?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r2d2",
        principle="Spotting gaps, contradictions, and false assumptions in specs before engineering begins prevents costly rework.",
        levels={
            1: "Rarely questions assumptions; specs are taken at face value until problems emerge in engineering.",
            2: "Identifies obvious gaps when reviewing specs but misses subtler contradictions or edge cases.",
            3: "Systematically reviews specs for assumptions and flags the riskiest ones before engineering begins.",
            4: "Catches false assumptions across other teams' specs too; risk identification is recognized as a strength.",
            5: "Defines assumption review practices for the PM org; prevents entire categories of preventable rework.",
        },
        reflection_prompt="Describe a time you caught a false assumption in a spec before engineering started — how did you spot it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r2d3",
        principle="Connecting disparate signals into coherent product insight separates reactive PMs from ones with genuine product judgment.",
        levels={
            1: "Treats signals in isolation; user feedback, data, and market shifts are evaluated independently.",
            2: "Connects two or three signals occasionally but doesn't form a coherent picture reliably.",
            3: "Regularly synthesizes signals across feedback, data, and competitive moves into a unified product view.",
            4: "Signal synthesis generates insights others miss; provides new frames for understanding the problem space.",
            5: "Recognized org-wide for pattern-matching across signals; synthesis shapes quarterly product direction.",
        },
        reflection_prompt="Describe a time you connected signals from different sources into an insight that no single source revealed.",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r2d4",
        principle="A reliable decision track record under ambiguity is the ultimate measure of product sense in practice.",
        levels={
            1: "Go/no-go calls are delayed, escalated, or reversed frequently; track record is not tracked.",
            2: "Makes calls but accuracy under ambiguity is inconsistent; good calls are not clearly attributable to reasoning.",
            3: "Makes go/no-go calls with explicit reasoning under ambiguity; right more often than not across a visible set of decisions.",
            4: "Decision track record is strong and visible; leadership trusts judgment on ambiguous calls.",
            5: "Defines decision quality norms for the team; others benchmark their process against this PM's reasoning.",
        },
        reflection_prompt="What's a go/no-go call you made under significant ambiguity, and how did it turn out?",
        skeleton=True,
    ),
    # Skill 3: Strategic Thinking & Vision
    CalibrationAnchor(
        dimension_id="r3d1",
        principle="Clear articulation of strategy — connecting mission to vision to problems to outcomes — is what makes strategy actionable rather than abstract.",
        levels={
            1: "Cannot articulate strategy beyond roadmap features; strategy and execution are conflated.",
            2: "Articulates strategy at a high level but cannot connect it clearly to user problems or measurable outcomes.",
            3: "Articulates a coherent strategy linking mission, vision, target problems, and desired outcomes for the product area.",
            4: "Strategy articulation is crisp and defensible; can communicate it at any level of the organization without losing the thread.",
            5: "Strategy articulation sets the standard; frames strategy for multiple product areas and coaches others on structuring it.",
        },
        reflection_prompt="How would you explain your product strategy to a new executive who has never heard it before?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r3d2",
        principle="Hard trade-off calls on what not to build, grounded in evidence rather than politics, are what make prioritization meaningful.",
        levels={
            1: "Avoids saying no; roadmap is shaped by stakeholder pressure rather than evidence-based trade-offs.",
            2: "Makes some trade-off calls but struggles to hold them under pressure or without explicit evidence.",
            3: "Makes and defends trade-off decisions using user data, business impact, and strategic fit as criteria.",
            4: "Trade-off reasoning is transparent and replicable; teams understand why things are not prioritized.",
            5: "Sets prioritization standards; helps other PMs think through trade-offs rigorously without dictating outcomes.",
        },
        reflection_prompt="Tell me about a high-visibility feature you decided not to build — what was your reasoning and how did you defend it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r3d3",
        principle="Bets made on where the market is heading rather than where it is today is what separates strategic thinking from roadmap planning.",
        levels={
            1: "Roadmap reacts to current customer requests; no forward-looking bets are made or tracked.",
            2: "Considers near-term market trends but doesn't make explicit multi-quarter bets with documented rationale.",
            3: "Makes explicit multi-quarter bets based on observed market signals with documented reasoning.",
            4: "Bets span 2-3 years; track record shows these bets were correct more often than not.",
            5: "Shapes company-level long-horizon bets; recognized externally or internally as a forward-looking thinker.",
        },
        reflection_prompt="What market bet are you currently making that most people on your team don't fully believe yet?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r3d4",
        principle="Defending strategy against executive pushback with evidence — updating when warranted — is what distinguishes principled thinking from stubbornness.",
        levels={
            1: "Capitulates to pushback without counter-argument, or digs in without updating based on new information.",
            2: "Attempts to defend strategy but lacks the evidence or framing to hold ground under real pressure.",
            3: "Defends strategy with evidence and updates position when presented with genuinely new information.",
            4: "Handles pushback from senior leaders confidently; updates are made based on reasoning, not seniority.",
            5: "Models how to hold a strategic position under pressure for the PM org; coaches others on principled defense.",
        },
        reflection_prompt="Describe a time an executive pushed back on your strategy — how did you respond?",
        skeleton=True,
    ),
    # Skill 4: Business Acumen & Viability
    CalibrationAnchor(
        dimension_id="r4d1",
        principle="Understanding revenue model, unit economics, and cost structure well enough to model product decision impact is the baseline for business acumen.",
        levels={
            1: "Cannot explain the product's revenue model or how product decisions affect unit economics.",
            2: "Has surface familiarity with revenue model but cannot connect product decisions to financial impact.",
            3: "Understands the product's revenue model and can articulate how major product decisions affect unit economics.",
            4: "Builds rough financial models to evaluate product investments; models are reviewed and trusted by Finance.",
            5: "Financial modeling is a recognized strength; informs pricing and investment decisions at the portfolio level.",
        },
        reflection_prompt="How does your most important product decision this quarter affect the unit economics of the business?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r4d2",
        principle="Assessing whether a solution works for the business across sales, legal, finance, and operations is the viability risk check most PMs skip.",
        levels={
            1: "Viability risks are not checked before engineering; surprises from Legal or Finance emerge late.",
            2: "Checks with some functions (e.g. Legal) but misses others (e.g. Sales feasibility, CS support load).",
            3: "Proactively checks viability across all relevant functions before committing engineering resources.",
            4: "Viability risks are identified early and resolved before they become project-blocking issues.",
            5: "Builds viability review practices into the team's development process; prevents org-wide viability failures.",
        },
        reflection_prompt="Walk me through the last time you killed or changed a feature because of a viability risk you discovered — which function surfaced it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r4d3",
        principle="Understanding go-to-market fit — whether the sales team can sell it, CS can support it, and it fits pricing — is the operational layer of product viability.",
        levels={
            1: "GTM is treated as a post-launch concern; sales and CS learn about features at or after launch.",
            2: "Involves Sales and CS occasionally but GTM readiness is not part of the feature development process.",
            3: "Validates GTM fit during development; confirms sales can position it and CS can support it before launch.",
            4: "GTM conversations happen early in discovery; features are shaped partly by sales and support constraints.",
            5: "Partners with Sales and CS leadership to co-design features with GTM fit built in from the start.",
        },
        reflection_prompt="How do you involve Sales and Customer Success when planning a new feature?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r4d4",
        principle="Building basic financial models to justify or kill product investments brings rigor to decisions that would otherwise be based on intuition.",
        levels={
            1: "Product investments are justified with qualitative arguments; no financial modeling is attempted.",
            2: "Uses rough back-of-envelope numbers but models lack key assumptions or cost structure.",
            3: "Builds structured financial models with revenue, cost, and break-even estimates for major investments.",
            4: "Models are reviewed by Finance and used as input to prioritization; assumptions are documented and tracked.",
            5: "Financial modeling skill is used to evaluate investments across multiple product areas; sets the template for others.",
        },
        reflection_prompt="Walk me through a financial model you built to justify or kill a product investment.",
        skeleton=True,
    ),
    # Skill 5: Discovery Practice & Methods
    CalibrationAnchor(
        dimension_id="r5d1",
        principle="Continuous discovery practiced as a weekly rhythm — not a project phase — keeps the team connected to real user problems at all times.",
        levels={
            1: "Discovery happens as a one-time phase before major projects, then stops until the next initiative.",
            2: "Conducts discovery periodically but cadence is irregular and driven by project milestones.",
            3: "Maintains a weekly discovery rhythm with regular customer touchpoints independent of delivery cycles.",
            4: "Discovery cadence is embedded in the team's operating model; never ships a major bet without evidence.",
            5: "Establishes continuous discovery as an org-wide practice; coaches multiple teams on weekly discovery rhythms.",
        },
        reflection_prompt="Describe your current discovery cadence — how often do you talk to users and what triggers it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r5d2",
        principle="Discovery done as a Product Trio (PM, Designer, Engineer) together rather than PM handing down requirements produces better solutions and faster alignment.",
        levels={
            1: "Discovery is PM-only; designers and engineers receive requirements rather than participating in research.",
            2: "Designers occasionally join discovery activities but engineers are rarely involved in pre-spec research.",
            3: "Conducts discovery sessions with the full product trio; all three roles observe customers and ideate together.",
            4: "Product trio collaboration is the norm; engineers and designers contribute insights that shape the opportunity space.",
            5: "Models trio-based discovery for the org; coaches PMs on how to bring engineers and designers into research.",
        },
        reflection_prompt="When did an engineer or designer last observe a customer interview with you, and what did they surface?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r5d3",
        principle="Identifying the riskiest assumption in any idea and designing the smallest experiment to test it prevents expensive bets on unvalidated beliefs.",
        levels={
            1: "Assumptions are not explicitly named; teams proceed on unvalidated beliefs through to development.",
            2: "Can name assumptions when prompted but doesn't systematically identify the riskiest one before building.",
            3: "Routinely maps assumptions for each idea and identifies which assumption, if wrong, would kill the idea.",
            4: "Assumption mapping is done for all significant initiatives; experiments are designed to test the most critical ones cheaply.",
            5: "Teaches assumption identification as a practice; reviews other teams' assumption maps and sharpens their thinking.",
        },
        reflection_prompt="What's the riskiest assumption behind your current biggest initiative, and how are you testing it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r5d4",
        principle="Matching the right experiment type to each situation prevents over-engineering tests and ensures the evidence collected is actionable.",
        levels={
            1: "Uses one experiment type (usually a full build or A/B test) regardless of the question being asked.",
            2: "Familiar with a few experiment types but selection is not driven by the type of assumption being tested.",
            3: "Selects experiment type based on the assumption being tested — uses prototypes, Wizard of Oz, painted door, or A/B tests appropriately.",
            4: "Experiment design is consistently efficient; avoids over-engineering tests and gets to evidence quickly.",
            5: "Coaches teams on experiment selection; defines a shared vocabulary for experiment types across the PM org.",
        },
        reflection_prompt="For your last discovery experiment, what type did you choose and why was it the right fit for that assumption?",
        skeleton=True,
    ),
    # Skill 6: Data Fluency & Experimentation
    CalibrationAnchor(
        dimension_id="r6d1",
        principle="Mastery of product analytics frameworks — AARRR, funnels, cohorts, leading vs. lagging indicators — is the foundation for data-informed product decisions.",
        levels={
            1: "Consumes dashboards passively; cannot explain metrics in terms of underlying frameworks or user behavior.",
            2: "Familiar with basic metrics but cannot apply funnel or cohort analysis independently to diagnose problems.",
            3: "Applies AARRR, funnel, and cohort frameworks to diagnose metric changes and identify opportunities.",
            4: "Analytics fluency is recognized by Data and Engineering; goes beyond dashboards to identify leading indicators.",
            5: "Defines analytics frameworks for the team; spots missing or misleading instrumentation and drives fixes.",
        },
        reflection_prompt="Walk me through how you used funnel or cohort analysis to diagnose a metric drop in the last quarter.",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r6d2",
        principle="Designing experiments with clear hypotheses, success criteria, and appropriate statistical rigor separates experiments that produce actionable conclusions from ones that produce noise.",
        levels={
            1: "Experiments lack explicit hypotheses or success criteria; results are interpreted post-hoc to confirm priors.",
            2: "States a hypothesis but success criteria are vague and statistical rigor is not considered in design.",
            3: "Designs experiments with explicit hypotheses, defined success metrics, and appropriate sample size planning.",
            4: "Experiment design is reviewed by Data Science and considered rigorous; avoids common validity threats.",
            5: "Sets the experiment design standard for the team; coaches others on hypothesis formation and statistical validity.",
        },
        reflection_prompt="Walk me through an experiment you designed — what was the hypothesis, success criteria, and how did you handle statistical validity?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r6d3",
        principle="Catching when metrics are misleading, gamed, or masking the real signal prevents the team from optimizing for the wrong thing.",
        levels={
            1: "Takes metrics at face value; does not question whether the measurement captures the intended behavior.",
            2: "Occasionally raises questions about metric quality but doesn't have a systematic way to detect misleading signals.",
            3: "Routinely checks whether metrics can be gamed, whether selection bias exists, or whether the signal is confounded.",
            4: "Has caught misleading metrics before they drove poor decisions; recognized as a skeptic who improves data quality.",
            5: "Defines data quality standards; identifies systemic instrumentation problems before they mislead multiple teams.",
        },
        reflection_prompt="Describe a time you caught a metric that was misleading and what the real signal turned out to be.",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r6d4",
        principle="Combining quantitative data with qualitative insight produces a complete picture that neither source provides alone.",
        levels={
            1: "Relies exclusively on either quantitative data or qualitative feedback, not both in combination.",
            2: "References both data and qualitative feedback but doesn't systematically integrate them into a unified explanation.",
            3: "Uses quantitative data to identify where problems exist and qualitative methods to understand why they exist.",
            4: "Quant-qual integration produces insights that consistently explain metric changes with behavioral root causes.",
            5: "Defines the quant-qual integration practice for the team; teaches others to use data to find problems and interviews to explain them.",
        },
        reflection_prompt="Describe a metric anomaly you diagnosed — how did quantitative data and qualitative research work together in your analysis?",
        skeleton=True,
    ),
    # Skill 7: Leadership, Influence & Execution
    CalibrationAnchor(
        dimension_id="r7d1",
        principle="Aligning cross-functional teams around outcomes without direct authority — through credibility and evidence — is the core leadership challenge for PMs.",
        levels={
            1: "Struggles to align stakeholders who don't report to them; alignment depends on escalation to management.",
            2: "Gets alignment from immediate team but struggles with adjacent teams or senior stakeholders.",
            3: "Consistently aligns cross-functional partners through evidence and outcome framing without needing escalation.",
            4: "Influence extends across organizational boundaries; gains alignment from skeptical or senior stakeholders.",
            5: "Models influence-without-authority for the PM org; coaches others on how to earn credibility-based alignment.",
        },
        reflection_prompt="Describe a time you got a cross-functional team to change direction based on your judgment — how did you build that alignment?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r7d2",
        principle="Communicating strategy clearly across organizational levels — up to executives, across to peers, and down to the team — ensures that everyone is working toward the same outcome.",
        levels={
            1: "Communication is inconsistent across audiences; executives and team members receive different or conflicting messages.",
            2: "Communicates well with peers but struggles to adapt messaging effectively for executives or for the team.",
            3: "Adapts strategy communication clearly for each audience; executives, peers, and team members all receive coherent, consistent messages.",
            4: "Communication is crisp and action-driving at all levels; updates create clarity and alignment rather than confusion.",
            5: "Sets the communication standard for the PM org; coaches others on how to structure strategy for different audiences.",
        },
        reflection_prompt="How do you adjust how you communicate a product strategy when talking to an engineer versus an executive?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r7d3",
        principle="Raising the product craft of junior PMs — through teaching discovery, strategy, and customer empathy — is how senior PMs multiply their impact beyond their own product area.",
        levels={
            1: "Does not invest time in mentoring; growth of junior PMs is left to chance or to management.",
            2: "Provides occasional feedback to junior PMs but mentoring is reactive rather than intentional.",
            3: "Actively mentors 2-3 junior PMs with deliberate focus on discovery, strategy, and customer engagement practices.",
            4: "Mentees make measurable progress in product craft; mentoring approach is recognized by leadership and the mentees.",
            5: "Mentorship scales beyond direct relationships; builds coaching programs or frameworks used across the PM org.",
        },
        reflection_prompt="Who are you currently mentoring and what specific product skill are you developing in them?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r7d4",
        principle="Driving outcomes over outputs — with OKRs focused on business results and customer impact — is what separates execution discipline from feature shipping.",
        levels={
            1: "Measures success by features shipped; OKRs (if they exist) track output metrics rather than outcomes.",
            2: "Has outcome-oriented OKRs but team activity is still primarily evaluated by delivery throughput.",
            3: "Team OKRs are anchored to business results and customer impact; delivery is evaluated against outcome progress.",
            4: "Execution discipline is visible and consistent; outcomes are tracked rigorously and drive prioritization in real time.",
            5: "Sets the execution standard for the org; coaches other PMs on shifting from output to outcome measurement.",
        },
        reflection_prompt="What outcome metric is your team optimizing for this quarter and how does it connect to a business result?",
        skeleton=True,
    ),
    # Skill 8: Domain & Market Depth
    CalibrationAnchor(
        dimension_id="r8d1",
        principle="Deep knowledge of competitors — their strategies, strengths, weaknesses, and likely next moves — enables proactive positioning rather than reactive response.",
        levels={
            1: "Competitive knowledge is superficial; competitor moves are discovered late or through others' alerts.",
            2: "Monitors competitors' announcements but doesn't have a structured view of their strategy or weaknesses.",
            3: "Maintains a current competitive landscape view including strategy, positioning, and likely next moves for key competitors.",
            4: "Competitive analysis informs product strategy; team turns to this PM first when a competitor makes a move.",
            5: "Competitive intelligence is an organizational asset; shapes how the company positions and invests at the portfolio level.",
        },
        reflection_prompt="If a major competitor launched a new product today, how would you assess what it means for your strategy?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r8d2",
        principle="Understanding where the domain is heading over 2-3 years enables forward-looking bets rather than reactions to what has already happened.",
        levels={
            1: "Market view is limited to current state; no explicit view on where the domain is heading over 2-3 years.",
            2: "Aware of macro trends but cannot articulate how they will affect the product's competitive position specifically.",
            3: "Maintains an explicit 2-3 year market trajectory view that informs current product investment decisions.",
            4: "Market trajectory calls have proven accurate; investments made based on forward view are paying off.",
            5: "Market perspective shapes company-level investment decisions; recognized internally or externally as a domain authority.",
        },
        reflection_prompt="What is the single most important market shift in your domain over the next 2-3 years, and how is your product currently positioned for it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r8d3",
        principle="Understanding the full user lifecycle (acquisition, activation, retention, revenue, referral) reveals the complete picture of how users experience the product over time.",
        levels={
            1: "Focus is limited to one lifecycle stage (typically activation or core feature usage); other stages are not considered.",
            2: "Aware of the full lifecycle but product decisions are primarily focused on one or two stages.",
            3: "Makes product decisions with explicit consideration of impact across multiple lifecycle stages.",
            4: "Lifecycle understanding shapes instrumentation, success metrics, and feature priorities across the full user journey.",
            5: "Lifecycle framework is used by the full team; owns the model of how users move through acquisition to referral.",
        },
        reflection_prompt="Where in the user lifecycle does your product have the biggest drop-off, and what have you done about it?",
        skeleton=True,
    ),
    CalibrationAnchor(
        dimension_id="r8d4",
        principle="Thinking about how the product is perceived relative to alternatives in the market is what drives intentional positioning rather than accidental differentiation.",
        levels={
            1: "Positioning is not actively considered; the product is described by its features rather than its differentiated value.",
            2: "Has a general sense of positioning but it is not explicitly documented or validated with target users.",
            3: "Maintains a clear and validated positioning statement grounded in how users perceive the product relative to alternatives.",
            4: "Positioning drives messaging, feature prioritization, and partnership decisions in a consistent and visible way.",
            5: "Positioning strategy shapes go-to-market and product investment across multiple product areas; raises the org's positioning sophistication.",
        },
        reflection_prompt="How does your product's positioning differ from the closest alternative in the market, and how confident are you that users perceive it that way?",
        skeleton=True,
    ),
)
