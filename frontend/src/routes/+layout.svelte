<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/practice', label: 'Practice' },
		{ href: '/progress', label: 'Progress' },
	] as const;

	function isActive(href: string): boolean {
		const pathname = page.url.pathname;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/" class="logo">PM-OS</a>
	<ul>
		{#each navLinks as link}
			<li>
				<a href={link.href} class:active={isActive(link.href)}>{link.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<main>
	{@render children()}
</main>

<style>
	:root {
		--nav-height: 52px;
		--color-bg: #ffffff;
		--color-border: #e2e8f0;
		--color-text: #374151;
		--color-text-muted: #6b7280;
		--color-accent: #4f46e5;
		--color-active-bg: #eef2ff;
		font-family: system-ui, sans-serif;
		box-sizing: border-box;
	}

	*, *::before, *::after {
		box-sizing: inherit;
	}

	nav {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		height: var(--nav-height);
		padding: 0 1.5rem;
		background: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
	}

	.logo {
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--color-accent);
		text-decoration: none;
		letter-spacing: -0.02em;
		flex-shrink: 0;
	}

	ul {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;
	}

	ul a {
		display: block;
		padding: 0.35rem 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.15s, background 0.15s;
	}

	ul a:hover {
		color: var(--color-text);
		background: var(--color-active-bg);
	}

	ul a.active {
		color: var(--color-accent);
		background: var(--color-active-bg);
		font-weight: 600;
	}

	main {
		padding: 1.5rem;
		max-width: 1100px;
		margin: 0 auto;
	}

	@media (max-width: 480px) {
		nav {
			padding: 0 1rem;
			gap: 1rem;
		}

		main {
			padding: 1rem;
		}
	}
</style>
