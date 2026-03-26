<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { skills } from '$lib/data/skills.js';
	import { caseStudies } from '$lib/data/case-studies.js';
	import { userState, addScores } from '$lib/stores/user-state.svelte.js';
	import { recordScores } from '$lib/scoring/engine.js';
	import { createAttempt, submitAttempt, evaluateAttempt } from '$lib/api/attempts.js';
	import type { RubricDimension, EvaluationResponse } from '$lib/types/index.js';

	// ── Derived data ──────────────────────────────────────────────────────

	const caseId = $derived(page.params.caseId);
	const caseStudy = $derived(caseStudies.find((c) => c.id === caseId) ?? null);

	const primarySkill = $derived(
		caseStudy ? (skills.find((s) => s.id === caseStudy.primarySkillId) ?? null) : null
	);

	const secondarySkills = $derived(
		caseStudy ? skills.filter((s) => caseStudy.secondarySkillIds.includes(s.id)) : []
	);

	// Resolve each rubricDimensionId to its full RubricDimension object.
	// dimensionId format: r{skillId}d{dimNumber}
	function resolveDimension(dimensionId: string): (RubricDimension & { skillId: number }) | null {
		const match = dimensionId.match(/^r(\d+)d\d+$/);
		if (!match) return null;
		const skillId = parseInt(match[1], 10);
		const skill = skills.find((s) => s.id === skillId);
		if (!skill) return null;
		const dim = skill.rubricDimensions.find((d) => d.id === dimensionId);
		if (!dim) return null;
		return { ...dim, skillId };
	}

	// ── Phase state ───────────────────────────────────────────────────────
	// 'prompt' → 'answer' → 'evaluating' → 'results'
	type Phase = 'prompt' | 'answer' | 'evaluating' | 'results';
	let phase = $state<Phase>('prompt');

	// ── Attempt + evaluation state ────────────────────────────────────────
	let attemptId: string | null = $state(null);
	let evaluationResult: EvaluationResponse | null = $state(null);
	let evaluationError: string | null = $state(null);

	// ── Block 1 state ─────────────────────────────────────────────────────
	let hintsVisible = $state(false);

	// ── Block 2 state ─────────────────────────────────────────────────────
	let answerText = $state('');
	let secondsRemaining = $state(0);
	let timerInterval = $state<ReturnType<typeof setInterval> | null>(null);

	const wordCount = $derived(
		answerText.trim() === '' ? 0 : answerText.trim().split(/\s+/).length
	);

	const timerMinutes = $derived(Math.floor(secondsRemaining / 60));
	const timerSeconds = $derived(secondsRemaining % 60);
	const timerDisplay = $derived(
		`${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`
	);
	const timerWarning = $derived(secondsRemaining <= 300 && secondsRemaining > 0);
	const timerExpired = $derived(secondsRemaining === 0 && phase === 'answer');

	// ── Timer management ──────────────────────────────────────────────────

	async function startTimer() {
		if (!caseStudy) return;
		try {
			const attempt = await createAttempt('default-user', caseStudy.id);
			attemptId = attempt.id;
		} catch (e) {
			console.error('Failed to create attempt:', e);
			// Don't block timer start
		}
		secondsRemaining = caseStudy.timeLimit * 60;
		phase = 'answer';
		timerInterval = setInterval(() => {
			secondsRemaining -= 1;
			if (secondsRemaining <= 0) {
				secondsRemaining = 0;
				clearTimerInterval();
				submitAnswer();
			}
		}, 1000);
	}

	function clearTimerInterval() {
		if (timerInterval !== null) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}

	async function submitAnswer() {
		clearTimerInterval();
		const timeSpentSeconds = caseStudy ? caseStudy.timeLimit * 60 - secondsRemaining : 0;
		phase = 'evaluating';
		try {
			if (attemptId) {
				await submitAttempt(attemptId, answerText, timeSpentSeconds);
				const result = await evaluateAttempt(attemptId);
				evaluationResult = result;
				phase = 'results';
			}
		} catch (e) {
			evaluationError = e instanceof Error ? e.message : 'Evaluation failed';
			// Stay in 'evaluating' phase to show error + retry
		}
	}

	// ── Helper functions ──────────────────────────────────────────────────

	function lookupDimensionName(dimensionId: string): string {
		for (const skill of skills) {
			const dim = skill.rubricDimensions.find((d) => d.id === dimensionId);
			if (dim) return dim.name;
		}
		return 'Unknown dimension';
	}

	let missingDimensions = $derived(
		evaluationResult && caseStudy
			? (() => {
					const scoredIds = new Set(evaluationResult.scores.map((s) => s.dimension_id));
					return caseStudy.rubricDimensionIds.filter((id) => !scoredIds.has(id));
				})()
			: []
	);

	function handleComplete() {
		if (!evaluationResult || !caseStudy) return;
		const convertedScores = evaluationResult.scores.map((s) => ({
			dimensionId: s.dimension_id,
			score: s.score
		}));
		const newState = recordScores(caseStudy.id, convertedScores, userState, caseStudies);
		addScores(newState.scores.slice(-convertedScores.length));
		window.location.href = '/';
	}

	// Clean up timer on component destroy
	$effect(() => {
		return () => {
			clearTimerInterval();
		};
	});

	// ── Formatting helpers ────────────────────────────────────────────────

	function formatCaseType(raw: string): string {
		return raw
			.split('_')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}
</script>

{#if caseStudy === null}
	<div class="not-found">
		<h1>Case not found</h1>
		<p>No case study with ID "{caseId}" exists.</p>
		<a href="/">Back to Dashboard</a>
	</div>
{:else}
	<div class="practice-page">
		<!-- ── Block 1: Case Study Prompt ──────────────────────────────────── -->
		<section class="block block-prompt">
			<header class="prompt-header">
				<div class="badges">
					<span class="badge badge-{caseStudy.difficulty}">{caseStudy.difficulty}</span>
					<span class="badge badge-type">{formatCaseType(caseStudy.caseType)}</span>
					<span class="badge badge-context">{caseStudy.context}</span>
				</div>
				<h1 class="case-title">{caseStudy.title}</h1>
				<div class="time-limit">
					<span class="time-label">Time limit:</span>
					<span class="time-value">{caseStudy.timeLimit} minutes</span>
				</div>
			</header>

			<div class="prompt-body">
				<p class="prompt-text">{caseStudy.prompt}</p>
			</div>

			<div class="skills-section">
				<div class="skill-tags">
					{#if primarySkill}
						<span class="skill-tag skill-tag-primary">{primarySkill.name}</span>
					{/if}
					{#each secondarySkills as skill}
						<span class="skill-tag skill-tag-secondary">{skill.name}</span>
					{/each}
				</div>
			</div>

			<div class="hints-section">
				<button class="btn-ghost" onclick={() => (hintsVisible = !hintsVisible)}>
					{hintsVisible ? 'Hide hints' : 'Show hints'}
				</button>
				{#if hintsVisible}
					<ul class="hints-list">
						{#each caseStudy.hints as hint}
							<li>{hint}</li>
						{/each}
					</ul>
				{/if}
			</div>

			{#if phase === 'prompt'}
				<div class="start-action">
					<button class="btn-primary" onclick={startTimer}>Start Timer</button>
				</div>
			{/if}
		</section>

		<!-- ── Block 2: Answer Area ────────────────────────────────────────── -->
		{#if phase === 'answer' || phase === 'evaluating' || phase === 'results'}
			<section class="block block-answer">
				{#if phase === 'answer'}
					<div class="timer-sticky" class:timer-warning={timerWarning} class:timer-expired={timerExpired}>
						<span class="timer-label">Time remaining</span>
						<span class="timer-display">{timerDisplay}</span>
					</div>
				{:else}
					<div class="timer-submitted">
						<span class="timer-label">Submitted</span>
					</div>
				{/if}

				<div class="answer-area">
					<textarea
						class="answer-textarea"
						placeholder="Type your answer here..."
						value={answerText}
						oninput={(e) => (answerText = (e.currentTarget as HTMLTextAreaElement).value)}
						disabled={phase !== 'answer'}
					></textarea>
					<div class="word-count">{wordCount} words</div>
				</div>

				{#if phase === 'answer'}
					<div class="submit-action">
						<button class="btn-primary" onclick={submitAnswer}>Submit Answer</button>
					</div>
				{/if}
			</section>
		{/if}

		<!-- ── Block 3: Evaluating ─────────────────────────────────────────── -->
		{#if phase === 'evaluating'}
			<section class="block block-evaluating">
				<div class="evaluating-container">
					{#if evaluationError}
						<p class="error-message">{evaluationError}</p>
						<button class="btn-primary" onclick={async () => {
							evaluationError = null;
							try {
								if (attemptId) {
									const result = await evaluateAttempt(attemptId);
									evaluationResult = result;
									phase = 'results';
								}
							} catch (e) {
								evaluationError = e instanceof Error ? e.message : 'Evaluation failed';
							}
						}}>Retry</button>
					{:else}
						<p>Evaluating your answer...</p>
					{/if}
				</div>
			</section>
		{/if}

		<!-- ── Block 4: Results ────────────────────────────────────────────── -->
		{#if phase === 'results'}
			<section class="block block-results">
				<div class="results-container">
					<h2 class="section-heading">Evaluation Results</h2>
					{#each evaluationResult?.scores ?? [] as score}
						{@const dimensionName = lookupDimensionName(score.dimension_id)}
						<div class="score-card">
							<div class="score-header">
								<span class="dimension-name">{dimensionName}</span>
								<span class="score-badge">{score.score}/5</span>
							</div>
							<p class="reasoning">{score.reasoning}</p>
						</div>
					{/each}

					{#if missingDimensions.length > 0}
						{#each missingDimensions as dimId}
							<div class="score-card not-evaluated">
								<span>{lookupDimensionName(dimId)}</span>
								<span>Not evaluated</span>
							</div>
						{/each}
					{/if}

					<button class="btn-primary" onclick={handleComplete}>Complete</button>
				</div>
			</section>
		{/if}
	</div>
{/if}

<style>
	.not-found {
		text-align: center;
		padding: 4rem 1rem;
		color: var(--color-text-muted);
	}

	.not-found h1 {
		font-size: 1.5rem;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.not-found a {
		display: inline-block;
		margin-top: 1rem;
		color: var(--color-accent);
		text-decoration: none;
	}

	.practice-page {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* ── Blocks ─────────────────────────────────────────────────────────── */

	.block {
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	/* ── Block 1 ─────────────────────────────────────────────────────────── */

	.prompt-header {
		margin-bottom: 1.25rem;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.badge {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.2rem 0.55rem;
		border-radius: 4px;
	}

	.badge-staff {
		background: #dbeafe;
		color: #1e40af;
	}

	.badge-principal {
		background: #ede9fe;
		color: #5b21b6;
	}

	.badge-type {
		background: #f1f5f9;
		color: var(--color-text-muted);
	}

	.badge-context {
		background: #ecfdf5;
		color: #065f46;
	}

	.case-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 0.5rem;
		line-height: 1.3;
	}

	.time-limit {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.time-label {
		margin-right: 0.25rem;
	}

	.time-value {
		font-weight: 600;
		color: var(--color-text);
	}

	.prompt-body {
		margin-bottom: 1.25rem;
	}

	.prompt-text {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-text);
		margin: 0;
		white-space: pre-wrap;
	}

	.skills-section {
		margin-bottom: 1rem;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.skill-tag {
		font-size: 0.8rem;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.skill-tag-primary {
		background: #eef2ff;
		color: var(--color-accent);
	}

	.skill-tag-secondary {
		background: #f1f5f9;
		color: var(--color-text-muted);
	}

	.hints-section {
		margin-bottom: 1rem;
	}

	.hints-list {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.hints-list li {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.start-action {
		margin-top: 1.25rem;
	}

	/* ── Block 2 ─────────────────────────────────────────────────────────── */

	.timer-sticky {
		position: sticky;
		top: var(--nav-height, 52px);
		z-index: 50;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 0.6rem 1rem;
		margin-bottom: 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.timer-submitted {
		padding: 0.6rem 0;
		margin-bottom: 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.timer-label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	.timer-display {
		font-size: 1.75rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--color-text);
		letter-spacing: 0.02em;
	}

	.timer-warning .timer-display {
		color: #dc2626;
	}

	.timer-expired .timer-display {
		color: #dc2626;
	}

	.answer-area {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.answer-textarea {
		width: 100%;
		min-height: 320px;
		padding: 0.875rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-size: 0.9375rem;
		line-height: 1.65;
		color: var(--color-text);
		background: var(--color-bg);
		resize: vertical;
		font-family: inherit;
	}

	.answer-textarea:focus {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.answer-textarea:disabled {
		background: #f8fafc;
		color: var(--color-text-muted);
		cursor: default;
	}

	.word-count {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		text-align: right;
	}

	.submit-action {
		margin-top: 0.5rem;
	}

	/* ── Block 3 ─────────────────────────────────────────────────────────── */

	.section-heading {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 0.5rem;
	}

	.assess-intro {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		margin: 0 0 1.25rem;
	}

	.dimensions-list {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.dimension-item {
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.dimension-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.dimension-name {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-text);
	}

	.dimension-desc {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.score-selector {
		display: flex;
		gap: 0.5rem;
	}

	.score-btn {
		width: 2.25rem;
		height: 2.25rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg);
		color: var(--color-text-muted);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.1s, color 0.1s, border-color 0.1s;
	}

	.score-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.score-selected {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #ffffff;
	}

	.complete-action {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.complete-hint {
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}

	/* ── Buttons ─────────────────────────────────────────────────────────── */

	.btn-primary {
		display: inline-block;
		padding: 0.55rem 1.25rem;
		background: var(--color-accent);
		color: #ffffff;
		font-size: 0.9375rem;
		font-weight: 600;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.btn-primary:hover:not(:disabled) {
		opacity: 0.88;
	}

	.btn-primary:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.btn-ghost {
		background: none;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 0.35rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: color 0.15s, border-color 0.15s;
	}

	.btn-ghost:hover {
		color: var(--color-text);
		border-color: var(--color-text-muted);
	}

	/* ── Block 3: Evaluating ─────────────────────────────────────────────── */

	.evaluating-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 1rem;
		text-align: center;
		color: var(--color-text-muted);
	}

	.error-message {
		color: #dc2626;
		font-size: 0.9rem;
		margin: 0;
	}

	/* ── Block 4: Results ────────────────────────────────────────────────── */

	.results-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.score-card {
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.score-card.not-evaluated {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	.score-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.score-badge {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 700;
		background: var(--color-accent);
		color: #ffffff;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		white-space: nowrap;
	}

	.reasoning {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.55;
		margin: 0;
	}

	/* ── Responsive ──────────────────────────────────────────────────────── */

	@media (max-width: 480px) {
		.block {
			padding: 1rem;
		}

		.case-title {
			font-size: 1.25rem;
		}

		.timer-display {
			font-size: 1.4rem;
		}

		.score-selector {
			gap: 0.375rem;
		}
	}
</style>
