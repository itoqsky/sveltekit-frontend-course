<script lang="ts">
	import './styles.css';
	import Header from './Header.svelte';
	import github from '$lib/images/github.svg';
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
	import { app } from '$lib/firebase/client';
	import { goto } from '$app/navigation';

	let user : User | null

	onMount(async () => {
		const auth = getAuth(app)
		onAuthStateChanged(auth, (newUser) => {
			user = newUser
			if(!user) {
        		goto("/auth/signin");
			}
		})
	})

</script>

<div class="app">
	{#if user}
		<Header />
	{/if}
	<main>
		<slot />
	</main>

	<footer>
		<p class="adress">Adress</p>

		<div class="corner">
			<a href="https://github.com/aigerimu/Frontend_course_project">
				<img src={github} alt="GitHub" />
			</a>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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

	.adress {
		font-size: var(--h2-font-size);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
