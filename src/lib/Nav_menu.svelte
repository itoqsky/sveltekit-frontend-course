<script lang="ts">
	import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
	import { onMount } from "svelte";
	import { app } from "./firebase/client";

	// import { page } from '$app/stores';
	import { base } from '$app/paths';
	let menu: boolean = false;
	let user: User | null

	onMount(async () => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (newUser) => {
			user = newUser;
		});
	});
	
</script>

<!-- Navigation element -->
<nav class="nav bd-container">
	<div class={menu === true ? 'nav__menu show-menu' : 'nav__menu'}>
		<!-- Can be changed to #each loop nav__link element-->

		<ul class="nav__list">
			<!-- Home-->

			{#if user}
				<li class="nav__item">
					<a href="/auth/confirmed" class="nav__link active-link" on:click={() => (menu = !menu)}>
						<i class="bx bx-wink-smile" />{user.displayName}
					</a>
				</li>
			{/if}

			<li class="nav__item">
				<a href="{base}/" class="nav__link active-link" on:click={() => (menu = !menu)}>
					<i class="bx bx-home-alt-2 nav___icon" />Home
				</a>
			</li>

			<!-- Image blurring-->
			<li class="nav__item">
				<a href="/image_blurring" class="nav__link" on:click={() => (menu = !menu)}>
					<i class="bx bx-wink-smile" /> Image blurring
				</a>
			</li>

			<!-- Image detection-->
			<li class="nav__item">
				<a href="/image_detection" class="nav__link" on:click={() => (menu = !menu)}>
					<i class="bx bx-wink-smile" />Image detection
				</a>
			</li>

		</ul>
	</div>

	<!-- Can be resolved by changing EsLint configurations-->
	<div class="nav__toggle" on:click={() => (menu = !menu)}>
		<i class="bx bx-grid-alt" />
	</div>
</nav>

<style>
	.nav__menu {
		position: fixed;
		top: -100%;
		left: 80%;
		width: 20%;
		padding: 2rem 1.5rem;
		background-color: var(--body-color);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
		border-radius: 1rem 1rem 0 0;
		z-index: var(--z-fixed);
		transition: 0.3s;
	}

	.show-menu {
		top: var(--header-height);
	}

	.nav {
		height: var(--header-height);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.bd-container {
		max-width: 3rem;
		width: calc(100% - 3rem);
		margin-left: var(--mb-1);
		margin-right: var(--mb-1);
	}

	.nav__list {
		display: flex;
		flex-direction: column;
		gap: 2 rem;
	}

	.nav__item {
		text-align: center;
	}

	.nav__link {
		display: flex;
		flex-direction: column;
		font-size: var(--smaller-font-size);
		color: var(--text-color-light);
	}

	.nav__link:hover {
		color: var(--title-color);
	}

	.active-link {
		color: var(--title-color);
	}

	.nav__toggle {
		width: 0;
		height: 0;
		color: var(--title-color);
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>
