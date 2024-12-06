<script>
	import { createEventDispatcher } from 'svelte';

	let emit = createEventDispatcher();
	let src = '/image/select_photo.png';
	let input;
	let dragover = false;
	let has_texture = false;

	const process = () => {
		src = '/image/select_photo.png';
		let file = input.files[0];

		if (file) {
			let [media, type] = file.type.split('/');
			if (media != 'image' || ['svg+xml', 'x-icon'].includes(type)) {
				emit('error', 'invalid photo file');
			} else {
				let reader = new FileReader();
				reader.onload = async (e) => {
					src = e.target.result;
					emit('ok', e.target.result);
					has_texture = true;
				};
				reader.readAsDataURL(file);
			}
		}
	};

	export const clear = () => {
		input.value = '';
		src = '/image/select_photo.png';
		has_texture = false;
		emit('ok', input.value);
	};
</script>

<div class="block">
	<img
		{src}
		alt="prompt guide"
		class:dragover
		on:click={() => {
			input.click();
		}}
		on:dragover|preventDefault={() => {
			dragover = true;
		}}
		on:dragenter
		on:dragleave|preventDefault={() => {
			dragover = false;
		}}
		on:drop={(e) => {
			dragover = false;
			e.preventDefault();
			input.files = e.dataTransfer.files;
			process();
		}}
		role="presentation"
	/>
	{#if has_texture}
		<button on:click={clear}>x</button>
	{/if}
</div>

<input style:display="none" type="file" accept="image/*" bind:this={input} on:change={process} />

<style>
	.block {
		position: relative;
	}

	img {
		display: block;

		width: 60px;
		height: 60px;
		object-fit: cover;

		border-radius: var(--sp2);
		outline: 2px solid var(--ac4);
		transition: outline-color 0.2s;
	}
	img:hover,
	.dragover {
		outline-color: var(--ac1);
		cursor: pointer;
	}

	button {
		position: absolute;
		top: 4px;
		right: 4px;

		display: flex;
		justify-content: center;
		align-items: center;

		--size: 20px;
		width: var(--size);
		height: var(--size);

		border-radius: 50%;

		background-color: var(--ac1);
		transition: background-color, color 0.2s;
	}

	button:hover {
		color: var(--ac1);
		background-color: red;
	}
</style>
