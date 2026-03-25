<script lang="ts">
	import { skills } from '$lib/data/skills.js';
	import { caseStudies } from '$lib/data/case-studies.js';
	import { userState } from '$lib/stores/user-state.svelte.js';
	import { computeAllProgress, computeReadiness } from '$lib/scoring/engine.js';

	const progresses = $derived(computeAllProgress(userState.scores, caseStudies));
	const readiness = $derived(computeReadiness(progresses, skills));

	function progressForSkill(skillId: number) {
		return progresses.find((p) => p.skillId === skillId);
	}

	function formatScore(score: number): string {
		if (score === 0) return '—';
		return score.toFixed(1);
	}
</script>

<div class="dashboard">
	<section class="readiness-banner">
		<span class="readiness-label">Overall Readiness</span>
		<span class="readiness-score">{readiness}</span>
		<span class="readiness-max">/ 100</span>
	</section>

	<section class="skills-section">
		<h2 class="section-heading">Skills</h2>
		<div class="skills-grid">
			{#each skills as skill}
				{@const progress = progressForSkill(skill.id)}
				<a href="/skill/{skill.id}" class="skill-card">
					<div class="card-header">
						<span class="skill-name">{skill.name}</span>
						<span class="skill-weight">{skill.weight}%</span>
					</div>
					<p class="skill-desc">{skill.shortDescription}</p>
					<div class="card-stats">
						<div class="stat">
							<span class="stat-label">Avg score</span>
							<span class="stat-value">{formatScore(progress?.averageScore ?? 0)}</span>
						</div>
						<div class="stat">
							<span class="stat-label">Attempts</span>
							<span class="stat-value">{progress?.totalAttempts ?? 0}</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<div class="practice-cta">
		<a href="/practice" class="btn-primary">Start Practice</a>
	</div>
</div>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Readiness banner */
	.readiness-banner {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 1.5rem 2rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-active-bg);
	}

	.readiness-label {
		font-size: 0.95rem;
		color: var(--color-text-muted);
		flex: 1;
	}

	.readiness-score {
		font-size: 3rem;
		font-weight: 700;
		color: var(--color-accent);
		line-height: 1;
	}

	.readiness-max {
		font-size: 1.1rem;
		color: var(--color-text-muted);
	}

	/* Skills grid */
	.section-heading {
		margin: 0 0 1rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 900px) {
		.skills-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	/* Skill card */
	.skill-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-bg);
		color: var(--color-text);
		text-decoration: none;
		transition: border-color 0.15s, background 0.15s;
	}

	.skill-card:hover {
		border-color: var(--color-accent);
		background: var(--color-active-bg);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.skill-name {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text);
		line-height: 1.3;
	}

	.skill-weight {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-accent);
		background: var(--color-active-bg);
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.skill-desc {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.4;
		margin: 0;
		flex: 1;
	}

	.card-stats {
		display: flex;
		gap: 1rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--color-border);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.stat-label {
		font-size: 0.7rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.stat-value {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text);
	}

	/* CTA */
	.practice-cta {
		display: flex;
		justify-content: center;
		padding-bottom: 1rem;
	}

	.btn-primary {
		display: inline-block;
		padding: 0.65rem 1.75rem;
		background: var(--color-accent);
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		border-radius: 8px;
		text-decoration: none;
		transition: opacity 0.15s;
	}

	.btn-primary:hover {
		opacity: 0.88;
	}
</style>
