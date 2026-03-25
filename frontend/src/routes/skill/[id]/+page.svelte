<script lang="ts">
	import { page } from '$app/state';
	import { skills } from '$lib/data/skills.js';
	import { caseStudies } from '$lib/data/case-studies.js';

	const skillId = $derived(Number(page.params.id));
	const skill = $derived(skills.find((s) => s.id === skillId) ?? null);
	const relatedCases = $derived(
		skill ? caseStudies.filter((c) => c.primarySkillId === skillId) : []
	);

	function formatCaseType(caseType: string): string {
		return caseType.replace(/_/g, ' ');
	}
</script>

{#if skill === null}
	<div class="not-found">
		<h1>Skill not found</h1>
		<p>No skill with ID "{page.params.id}" exists.</p>
		<a href="/">Back to Dashboard</a>
	</div>
{:else}
	<div class="skill-detail">
		<header class="skill-header">
			<div class="skill-meta">
				<span class="weight-badge">Weight: {skill.weight}%</span>
			</div>
			<h1>{skill.name}</h1>
			<p class="short-description">{skill.shortDescription}</p>
		</header>

		<section class="section">
			<h2>Definition</h2>
			<p>{skill.definition}</p>
		</section>

		<section class="section">
			<h2>Acid Test</h2>
			<p>{skill.acidTest}</p>
		</section>

		<section class="section focus-section">
			<h2>Focus by Level</h2>
			<div class="focus-grid">
				<div class="focus-block">
					<h3>Staff Focus</h3>
					<p>{skill.staffFocus}</p>
				</div>
				<div class="focus-block">
					<h3>Principal Focus</h3>
					<p>{skill.principalFocus}</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Rubric Dimensions</h2>
			<ul class="rubric-list">
				{#each skill.rubricDimensions as dim}
					<li class="rubric-item">
						<span class="dim-name">{dim.name}</span>
						<span class="dim-desc">{dim.description}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section class="section">
			<h2>Thought Leaders</h2>
			<table class="leader-table">
				<thead>
					<tr>
						<th>Leader</th>
						<th>Their Term</th>
						<th>Core Idea</th>
					</tr>
				</thead>
				<tbody>
					{#each skill.thoughtLeaders as tl}
						<tr>
							<td class="leader-name">{tl.leader}</td>
							<td class="leader-term">{tl.term}</td>
							<td>{tl.idea}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>

		{#if relatedCases.length > 0}
			<section class="section">
				<h2>Case Studies</h2>
				<ul class="case-list">
					{#each relatedCases as c}
						<li class="case-item">
							<a href="/practice/{c.id}" class="case-link">
								<span class="case-title">{c.title}</span>
								<span class="case-meta">
									<span class="badge difficulty-{c.difficulty}">{c.difficulty}</span>
									<span class="case-type">{formatCaseType(c.caseType)}</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>
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

	.skill-detail {
		max-width: 800px;
	}

	.skill-header {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.skill-meta {
		margin-bottom: 0.5rem;
	}

	.weight-badge {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--color-accent);
		background: #eef2ff;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
	}

	.skill-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0.25rem 0 0.5rem;
	}

	.short-description {
		color: var(--color-text-muted);
		font-size: 1rem;
		margin: 0;
	}

	.section {
		margin-bottom: 2rem;
	}

	.section h2 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 0.75rem;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--color-border);
	}

	.section p {
		color: var(--color-text);
		line-height: 1.65;
		margin: 0;
	}

	.focus-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.focus-block {
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
	}

	.focus-block h3 {
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
		margin: 0 0 0.5rem;
	}

	.focus-block p {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text);
		margin: 0;
	}

	.rubric-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.rubric-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
	}

	.dim-name {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-text);
	}

	.dim-desc {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.leader-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	.leader-table th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
		border-bottom: 2px solid var(--color-border);
	}

	.leader-table td {
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-text);
		line-height: 1.5;
		vertical-align: top;
	}

	.leader-table tr:last-child td {
		border-bottom: none;
	}

	.leader-name {
		font-weight: 600;
		white-space: nowrap;
	}

	.leader-term {
		font-style: italic;
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	.case-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.case-item {
		border: 1px solid var(--color-border);
		border-radius: 6px;
	}

	.case-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		text-decoration: none;
		gap: 1rem;
	}

	.case-link:hover {
		background: #f8fafc;
	}

	.case-title {
		font-size: 0.95rem;
		color: var(--color-text);
		line-height: 1.4;
	}

	.case-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.badge {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		text-transform: capitalize;
	}

	.difficulty-staff {
		background: #dcfce7;
		color: #166534;
	}

	.difficulty-principal {
		background: #f3e8ff;
		color: #6b21a8;
	}

	.case-type {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		text-transform: capitalize;
	}

	@media (max-width: 600px) {
		.focus-grid {
			grid-template-columns: 1fr;
		}

		.case-link {
			flex-direction: column;
			align-items: flex-start;
		}

		.leader-table {
			display: block;
			overflow-x: auto;
		}
	}
</style>
