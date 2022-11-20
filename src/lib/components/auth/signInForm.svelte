<script lang="ts">
	import { goto } from '$app/navigation';
import { app } from '$lib/firebase/client';
	import {
		getAuth,
		signInWithEmailAndPassword,
		type User,
		onAuthStateChanged,
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	
	let email = '';
	let password = '';

	let user: User | null;

	const login = () => {
		const auth = getAuth(app);
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential)=>{
			user = userCredential.user
			if(user){
				localStorage.setItem("isLoggedIn", "true")
				goto("/")
			}
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
	};

	onMount(async () => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (newUser) => {
			// console.log(user);
			user = newUser;
		});
	});
</script>

	<p>Login</p>
	<input type="email" id="email" placeholder="email" bind:value={email} />
	<input type="password" id="password" placeholder="password" bind:value={password} />
	<button on:click={login}>Login</button>
	<button on:click={() => (goto("/auth/signup"))}> or Signup </button>
