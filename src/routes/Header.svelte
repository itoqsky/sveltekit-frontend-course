<script lang="ts">
	import logo from '$lib/images/svelte-logo.svg';
	import NavMenu from '$lib/Nav_menu.svelte';
	
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<div class="proj__name">
		<p class="name__data">MindHelp</p>
	</div>

	<!-- Improve visual by adding styles -->

	<!-- Add Props and/or Events -->
	<NavMenu />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.proj__name {
		font: var(--font-mono);
	}

	.name__data {
		font-size: var(--h1-font-size);
	}
</style>
