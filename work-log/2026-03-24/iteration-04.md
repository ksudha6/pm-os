# Iteration 04 — 2026-03-24

## Context

I want to build the UI shell: routes, navigation, localStorage state, and the case study practice flow. User can browse skills, pick a case, answer it, and self-score

No adaptive engine yet, so `/practice` is a filterable case list.

### Routes
```
/                       → Dashboard (skill cards, readiness score)
/skill/[id]             → Skill detail (definition, rubric, cases)
/practice               → Case list (filterable by skill)
/practice/[caseId]      → Case flow (prompt → timer + answer → self-assessment)
/progress               → Score overview
```

## JTBD

1. When a user opens PM-OS, they need to move between dashboard, skills, practice, and progress so they can find what they're looking for.
2. When a user wants to understand a skill, they need to see its definition, rubric dimensions, and available cases so they can decide what to practice.
3. When a user wants to practice, they need to browse and filter cases by skill so they can choose one that fits.
4. When a user starts a case, they need to read the prompt, run a timer, and write an answer so they can simulate interview conditions.
5. When a user finishes a case, they need to rate themselves on each rubric dimension so their scores are recorded and reflected on the dashboard.

## Tasks

### Layout & navigation
- [x] Nav bar with links: Dashboard, Practice, Progress
- [x] Current route highlighted
- [x] Layout wraps all routes

### localStorage store
- [x] `user-state.svelte.ts` — persists `UserState` to localStorage
- [x] Initialize from localStorage on load, reset on corruption
- [x] Write on every state change

### Dashboard (`/`)
- [x] 8 skill cards: name, weight, description, average score, attempts
- [x] Overall readiness score at top
- [x] Cards link to `/skill/[id]`

### Skill detail (`/skill/[id]`)
- [x] Skill definition, acid test, staff/principal focus
- [x] Rubric dimensions listed
- [x] Thought leader table
- [x] Case list for this skill with difficulty badges

### Case list (`/practice`)
- [x] All 51 cases listed
- [x] Filter by skill
- [x] Each case links to `/practice/[caseId]`

### Skill detail cases link to `/practice/[caseId]`

### Case flow (`/practice/[caseId]`)
- [x] Block 1: prompt, difficulty, case type, time limit, hints toggle, skill tags. "Start Timer" button gates Block 2
- [x] Block 2: countdown timer (sticky), answer textarea, word count, "Submit" button. Auto-submits on timer expiry
- [x] Block 3: self-assessment — rubric dimensions with 1-5 score selectors. "Complete" saves scores and navigates to dashboard

### Progress (`/progress`)
- [x] Table: skill name, average score, attempts, trend, last practiced

## Tests

### Scratch (Playwright)
- [x] Dashboard loads 8 skill cards with correct names and weights
- [x] Skill card click navigates to `/skill/[id]`
- [x] Skill detail shows rubric dimensions
- [x] Practice page lists cases, filter narrows results
- [x] Case flow: start timer, type answer, submit reveals self-assessment
- [x] Self-assessment saves scores, dashboard reflects updated scores
- [x] Navigation between all 5 routes works
- [x] State persists across page reload

## Notes

5 routes built: dashboard, skill detail, practice list, case flow, and progress. Nav with active-route highlighting wraps all pages. localStorage-backed user state persists scores across reloads. Case flow gates answer input behind a countdown timer and gates completion behind scoring all rubric dimensions. No new domain terms introduced beyond what was already in the vocab.
