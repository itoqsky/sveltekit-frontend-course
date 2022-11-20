<script lang="ts">
	import { goto } from '$app/navigation';
	import { app } from '$lib/firebase/client';

	import {
		getAuth,
		signOut,
		type User,
		onAuthStateChanged,
		createUserWithEmailAndPassword,
		updateProfile
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	
	let email = '';
	let password = '';

  	let nickname = '';

	let user: User | null;

  	const signup = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      	user = userCredential.user;
		updateProfile(user, {
			displayName: nickname
		})
		if(user) {
			localStorage.setItem("uid", user.uid)
			localStorage.setItem("isLoggedIn", "true")
			goto("/")
		}
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

	const logout = async () => {
		const auth = getAuth(app);
		signOut(auth);
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
{:else}
	<p>Singup</p>
	<input type="email" id="email" placeholder="email" bind:value={email} />
  	<input id="nickname" placeholder="nickname" bind:value={nickname}>
	<input type="password" id="password" placeholder="password" bind:value={password} />
	<button on:click={signup}>Signup</button>
	<button on:click={() => (goto("/auth/signin"))}> or Login </button>
{/if}