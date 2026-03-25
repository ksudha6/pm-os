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
- [ ] Nav bar with links: Dashboard, Practice, Progress
- [ ] Current route highlighted
- [ ] Layout wraps all routes

### localStorage store
- [ ] `user-state.svelte.ts` — persists `UserState` to localStorage
- [ ] Initialize from localStorage on load, reset on corruption
- [ ] Write on every state change

### Dashboard (`/`)
- [ ] 8 skill cards: name, weight, description, average score, attempts
- [ ] Overall readiness score at top
- [ ] Cards link to `/skill/[id]`

### Skill detail (`/skill/[id]`)
- [ ] Skill definition, acid test, staff/principal focus
- [ ] Rubric dimensions listed
- [ ] Thought leader table
- [ ] Case list for this skill with difficulty badges

### Case list (`/practice`)
- [ ] All 51 cases listed
- [ ] Filter by skill
- [ ] Each case links to `/practice/[caseId]`

### Skill detail cases link to `/practice/[caseId]`

### Case flow (`/practice/[caseId]`)
- [ ] Block 1: prompt, difficulty, case type, time limit, hints toggle, skill tags. "Start Timer" button gates Block 2
- [ ] Block 2: countdown timer (sticky), answer textarea, word count, "Submit" button. Auto-submits on timer expiry
- [ ] Block 3: self-assessment — rubric dimensions with 1-5 score selectors. "Complete" saves scores and navigates to dashboard

### Progress (`/progress`)
- [ ] Table: skill name, average score, attempts, trend, last practiced

## Tests

### Scratch (Playwright)
- [ ] Dashboard loads 8 skill cards with correct names and weights
- [ ] Skill card click navigates to `/skill/[id]`
- [ ] Skill detail shows rubric dimensions
- [ ] Practice page lists cases, filter narrows results
- [ ] Case flow: start timer, type answer, submit reveals self-assessment
- [ ] Self-assessment saves scores, dashboard reflects updated scores
- [ ] Navigation between all 5 routes works
- [ ] State persists across page reload
