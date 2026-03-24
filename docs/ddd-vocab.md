# Domain Vocabulary

## Bounded Contexts

| Context | Responsibility |
|---------|---------------|
| Curriculum | Skills, rubric dimensions, case studies, thought leader mappings, 60-day schedule |
| Scoring | Dimension scores, skill progress, trend tracking |
| Progression | Day sequencing, phase transitions, user state |

## Terms

| Term | Definition | Bounded Context |
|------|-----------|-----------------|
| Skill | One of 8 core PM competency areas, each with a weight (summing to 100%), definition, acid test, staff focus, principal focus, rubric dimensions, and thought leader mappings. | Curriculum |
| Rubric Dimension | A scoring axis within a Skill. 32 total (4 per skill). ID format: `r{skillId}d{dimNumber}`. Each has a name and description. Some dimensions assess reasoning quality (can the learner produce analysis, apply frameworks, make recommendations given a scenario). Others assess articulation credibility (can the learner describe a practice with enough operational detail that an interviewer would believe they've done it). Both are legitimate in interview prep and scorable via case study. | Curriculum |
| Thought Leader Mapping | How a specific thought leader (Cagan, Torres, Gupta, or Huryn) frames a Skill. Contains their term for the concept and their core idea. | Curriculum |
| Case Study | The core unit of practice. A scenario prompt (2-4 paragraphs) set in a B2C, B2B, or Mixed context. Has a primary skill, secondary skills, a case type, difficulty (staff or principal), time limit (45 or 60 min), rubric dimension IDs to score on, and hints. 40 total: 5 per skill + 8 mocks. | Curriculum |
| Case Type | The format of a case study. One of: product_design, product_improvement, product_strategy, metric_diagnosis, estimation, trade_off, go_to_market, stakeholder_influence, discovery_plan, technical_judgment, mock_interview. | Curriculum |
| Curriculum Day | A single day in the 60-day program. Links a skill topic to a Lenny resource, an external resource, and a case study. Days 1-30 are Staff phase, 31-60 are Principal phase. Some days are practice days (heavier on case study). | Curriculum |
| Phase | Staff (days 1-30) or Principal (days 31-60). Staff phase covers skills individually. Principal phase combines skills, increases ambiguity, and spans multiple products/teams. | Progression |
| Dimension Score | A single score (1-5) on a rubric dimension for a specific case study attempt, timestamped. | Scoring |
| Skill Progress | Computed view of a skill's state: average score across its dimensions, total attempts, last practiced date, and trend (improving, stable, declining). | Scoring |
| User State | The learner's current position: current day (1-60), all dimension scores, and per-day status (not_started, in_progress, completed). | Progression |
| Skill Dependency | A directed relationship between skills. User Empathy feeds Product Sense, which feeds Strategy and Discovery. Discovery feeds Data Fluency. Data Fluency and Business Acumen feed Influence and Domain Depth. | Curriculum |
| Lenny Resource | A podcast or newsletter from Lenny Rachitsky's archive, referenced by exact filename. Paired with each curriculum day as primary reading/listening. | Curriculum |
| External Resource | A book chapter, article, or framework from a thought leader (Cagan, Torres, Gupta, Huryn, or others). Paired with each curriculum day as supplementary material. | Curriculum |
| Practice Day | A curriculum day where the case study is the primary activity rather than resource consumption. Roughly every 4th day. | Curriculum |

## The 8 Skills

| ID | Skill | Weight |
|----|-------|--------|
| 1 | User Empathy & Customer Knowledge | 15% |
| 2 | Product Sense & Judgment | 15% |
| 3 | Strategic Thinking & Vision | 15% |
| 4 | Business Acumen & Viability | 10% |
| 5 | Discovery Practice & Methods | 15% |
| 6 | Data Fluency & Experimentation | 10% |
| 7 | Leadership, Influence & Execution | 10% |
| 8 | Domain & Market Depth | 10% |

## Skill Dependencies

```
1 (User Empathy) → 2 (Product Sense) → 3 (Strategy) → 4 (Business Acumen)
                                      → 5 (Discovery) → 6 (Data Fluency) → 7 (Influence)
                                                                           → 8 (Domain Depth)
```

## Build Status

| Term | Status |
|------|--------|
| Skill, Rubric Dimension, Thought Leader Mapping, Skill Dependency | Done (Iteration 01) |
| Case Study, Case Type | Done (Iteration 02) |
| Dimension Score, Skill Progress, User State, Trend, Day Status | Done (Iteration 03) |
| Curriculum Day, Phase, Lenny Resource, External Resource, Practice Day | Future |
