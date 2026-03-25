<script lang="ts">
	import { skills } from '$lib/data/skills.js';
	import { caseStudies } from '$lib/data/case-studies.js';

	let selectedSkillId = $state<number | null>(null);

	const filtered = $derived(
		selectedSkillId === null
			? caseStudies
			: caseStudies.filter((c) => c.primarySkillId === selectedSkillId)
	);

	function skillName(id: number): string {
		return skills.find((s) => s.id === id)?.name ?? 'Unknown';
	}

	function formatCaseType(raw: string): string {
		return raw
			.split('_')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}
</script>

<h1>Practice</h1>

<div class="controls">
	<label for="skill-filter" class="sr-only">Filter by skill</label>
	<select
		id="skill-filter"
		onchange={(e) => {
			const val = (e.currentTarget as HTMLSelectElement).value;
			selectedSkillId = val === '' ? null : Number(val);
		}}
	>
		<option value="">All Skills</option>
		{#each skills as skill}
			<option value={skill.id}>{skill.name}</option>
		{/each}
	</select>
</div>

<ul class="case-list">
	{#each filtered as c (c.id)}
		<li class="case-item">
			<a href="/practice/{c.id}" class="case-title">{c.title}</a>
			<div class="case-meta">
				<span class="badge badge-{c.difficulty}">{c.difficulty}</span>
				<span class="meta-pill">{formatCaseType(c.caseType)}</span>
				<span class="meta-pill">{c.timeLimit} min</span>
				<span class="meta-pill skill-pill">{skillName(c.primarySkillId)}</span>
			</div>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 1.25rem;
	}

	.controls {
		margin-bottom: 1.25rem;
	}

	select {
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-size: 0.875rem;
		color: var(--color-text);
		background: var(--color-bg);
		cursor: pointer;
	}

	select:focus {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.case-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.case-item {
		padding: 0.875rem 0;
		border-bottom: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.case-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	.case-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-accent);
		text-decoration: none;
	}

	.case-title:hover {
		text-decoration: underline;
	}

	.case-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		align-items: center;
	}

	.badge {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.5rem;
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

	.meta-pill {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.meta-pill + .meta-pill::before {
		content: '·';
		margin-right: 0.375rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
