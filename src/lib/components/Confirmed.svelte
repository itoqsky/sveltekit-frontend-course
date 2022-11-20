<script lang="ts">
	import { goto } from "$app/navigation";
	import { app } from "$lib/firebase/client";
	import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
	import { onMount } from "svelte";

    let user: User | null

    const logout = async () => {
		const auth = getAuth(app);
		signOut(auth);
        goto("/auth/signin")
	};

    onMount(async () => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (newUser) => {
			// console.log(user);
			user = newUser;
		});
	});

</script>

{#if user}
	<p>Signed in with {user.displayName}!</p>
	<button on:click={logout}>Logout</button>
{/if}