<script lang="ts">
	import { skills } from '$lib/data/skills.js';
	import { caseStudies } from '$lib/data/case-studies.js';
	import { userState } from '$lib/stores/user-state.svelte.js';
	import { computeAllProgress } from '$lib/scoring/engine.js';
	import type { SkillProgress, Trend } from '$lib/types/scoring.js';

	const TREND_ARROW: Record<Trend, string> = {
		improving: '↑',
		stable: '→',
		declining: '↓'
	} as const;

	const progress = $derived(computeAllProgress(userState.scores, caseStudies));

	function findProgress(skillId: number): SkillProgress | undefined {
		return progress.find((p) => p.skillId === skillId);
	}

	function formatScore(p: SkillProgress | undefined): string {
		if (!p || p.totalAttempts === 0) return '—';
		return p.averageScore.toFixed(1);
	}

	function formatAttempts(p: SkillProgress | undefined): string {
		if (!p) return '0';
		return String(p.totalAttempts);
	}

	function formatTrend(p: SkillProgress | undefined): string {
		if (!p || p.totalAttempts === 0) return '—';
		return TREND_ARROW[p.trend];
	}

	function formatTrendLabel(p: SkillProgress | undefined): string {
		if (!p || p.totalAttempts === 0) return '';
		return p.trend;
	}

	function formatDate(p: SkillProgress | undefined): string {
		if (!p || p.lastPracticed === null) return '—';
		return new Date(p.lastPracticed).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="progress-page">
	<h1>Progress</h1>
	<table>
		<thead>
			<tr>
				<th>Skill</th>
				<th>Score</th>
				<th>Attempts</th>
				<th>Trend</th>
				<th>Last Practiced</th>
			</tr>
		</thead>
		<tbody>
			{#each skills as skill, i}
				{@const p = findProgress(skill.id)}
				<tr class:even={i % 2 === 1}>
					<td class="skill-name">{skill.name}</td>
					<td class="numeric">{formatScore(p)}</td>
					<td class="numeric">{formatAttempts(p)}</td>
					<td class="trend" data-trend={formatTrendLabel(p)}>{formatTrend(p)}</td>
					<td class="date">{formatDate(p)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.progress-page {
		padding-top: 0.5rem;
	}

	h1 {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 1.25rem 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
		color: var(--color-text);
	}

	thead tr {
		border-bottom: 2px solid var(--color-border);
	}

	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	td.numeric {
		text-align: right;
	}

	td {
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		vertical-align: middle;
	}

	tr.even td {
		background: #f9fafb;
	}

	.skill-name {
		font-weight: 500;
	}

	.numeric {
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	.trend {
		font-size: 1rem;
		color: var(--color-text-muted);
	}

	.trend[data-trend='improving'] {
		color: #16a34a;
	}

	.trend[data-trend='declining'] {
		color: #dc2626;
	}

	.date {
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	@media (max-width: 480px) {
		th,
		td {
			padding: 0.5rem 0.5rem;
		}

		.date {
			display: none;
		}
	}
</style>
