<script lang="ts">

	import type { PageData } from './$types';
	export let data: PageData;

	let dropped : string | null
	let fileinput : HTMLInputElement;
	let result: any;

	// interface Eye{
	// 	x : number,
	// 	y : number,
	// }

	const onFileSelected =(e: Event)=>{
		let target = e.target as HTMLInputElement
		let file: File = (target.files as FileList)[0];
		let reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = e => {
			let targ = e.target as FileReader
			dropped = (targ.result as string);

		};
	} 
	// let leftEye: any
	try {
		if(data){
			if(data.hasOwnProperty("response")){
				if(data.response.hasOwnProperty("faces")){
					if(data.response.faces[0].hasOwnProperty("landmarks")){
						const {landmarks} = data.response.faces[0];
						// console.log(landmarks);
						result = landmarks
					}
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
	
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
	
</svelte:head>
<form method="POST">
	<h1>Image Detection
		<div class="conver">
			<button>click to process</button>
		</div>
	</h1>
	<div class="grid-containers-images">

		<div class="upload" on:click={()=>{fileinput.click();}}>
			{#if dropped}
				<img class="dropped" src="{dropped}" alt="d" />
			{:else}
				<div class="logo"> 
					<img class="proc-img" src="https://static.thenounproject.com/png/625182-200.png" alt=""  />
				</div>
				<div class="chan">Upload an image or drag it here</div>
			{/if}
		</div>
		
		<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
		
		<input style="display:none" name="orgimg" value={dropped}>

		<div class="result">
			{#if result}
				<!-- <img class="dropped" src={result} alt="wait or try again" /> -->
			<!-- {:else} -->
			<p class="landmarks" style="font-size:20px">&#128065; Left eye {'{'} x: {result.leftEye.x}, y: {result.leftEye.y} {'}'} </p>
			<p class="landmarks" style="font-size:20px" > &#128065; Right eye {'{'} x: {result.rightEye.x}, y: {result.rightEye.y} {'}'} </p>

			<p class="landmarks" style="font-size:20px">&#128067; Nose tip {'{'} x: {result.noseTip.x}, y: {result.noseTip.y} {'}'}  </p>

			<p class="landmarks" style="font-size:20px">&#128068; Left mouth corner tip {'{'} x: {result.leftMouthCorner.x}, y: {result.leftMouthCorner.y} {'}'}  </p>
			<p class="landmarks" style="font-size:20px">&#128068; Right mouth corner tip {'{'} x: {result.rightMouthCorner.x}, y: {result.rightMouthCorner.y} {'}'} </p>
			{/if}
		</div>

	</div>
</form>


<style>

.landmarks {
	position: relative;
	top: 2em;
	left: 2em;
}

.grid-containers-images {
	display: grid;
	float: left;
	grid-template-columns: 1fr 1fr; 

	gap: 120px;
	padding: 10px;
	width: 100%;
}

.grid-containers-images > div{
	float: left;

	position: relative;
    border:2px solid rgb(180, 190, 198);
	background-color: rgb(197, 210, 220);
	border-style:dashed; border-width:4px;
	border-radius: 2em;
	box-shadow: 2em;
	height: 450px;
	width: 450px;
}

.dropped{
	display:flex;
	border-radius: 2em;
	border-color: aqua;
	box-shadow: 2em;
	height:100%;
	width:100%;
}

.logo{
	position: relative;
	margin: auto;
	text-align: center;
	margin-top: 9em;
	right: 0.5em;
	height: 100px;
	width: 100px;
}
.chan{
	margin: auto;
	height: 100px;
	text-align: center;
	width: 300px;
}

.proc-img{
	height: 100px;
	width: 100px;
}

</style>