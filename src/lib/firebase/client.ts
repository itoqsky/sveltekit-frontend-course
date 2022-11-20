import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCxQ_6zDSAJv52JcsmJvhpqdc0iZ7jig3s",
    authDomain: "fwd-svelte.firebaseapp.com",
    projectId: "fwd-svelte",
    storageBucket: "fwd-svelte.appspot.com",
    messagingSenderId: "69496942757",
    appId: "1:69496942757:web:da37c69a6b0f0c72dd1d4c",
    measurementId: "G-18FMVSYMQF"
};

export const app = initializeApp(firebaseConfig);