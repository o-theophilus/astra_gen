<script>
	import { loading, size } from '$lib/store.js';
	import { tags, prompt } from '$lib/tools.js';
	import { createEventDispatcher } from 'svelte';

	let emit = createEventDispatcher();

	let input = {};
	export let error = {};

	const validate = () => {
		error = {};

		if (!input.prompt) {
			error.prompt = 'cannot be empty';
		}

		Object.keys(error).length === 0 && submit();
	};

	const submit = async () => {
		$loading = 'Generating Images';
		let resp = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				prompt: prompt(input),
				n: 4,
				size: `${size}x${size}`
			})
		});

		setTimeout(() => {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			$loading = false;
		}, 100);

		resp = await resp.json();

		if (!resp.error) {
			let urls = [];
			for (const x of resp.data) {
				urls.push(x.url);
			}

			emit('ok', {
				input: { ...input },
				urls
			});

			input.prompt = '';
		} else {
			error.error = resp.error.message;
		}
	};
</script>

<section>
	<div class="block">
		<div class="line">
			{#each Object.entries(tags) as [key, value]}
				<label>
					{key}
					<select class="wide" bind:value={input[key]}>
						{#each value as x}
							<option value={x}>
								{x}
							</option>
						{/each}
					</select>
				</label>
			{/each}
		</div>
		<br />
		<label for="prompt"> Prompt </label>
		<div class="line">
			<input
				bind:value={input.prompt}
				id="prompt"
				type="text"
				placeholder="Describe your clothing idea"
				on:keypress={(e) => {
					if (e.key == 'Enter') {
						validate();
					}
				}}
			/>

			<button class="btn" on:click={validate}>
				<svg viewBox="0 0 16 16" width="20px"
					><path
						fill="currentColor"
						d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
					/></svg
				>
			</button>
		</div>

		{#if error.prompt}
			<br />
			<span class="error">
				{error.prompt}
			</span>
		{/if}

		{#if error.error}
			<br />
			<span class="error">
				{error.error}
			</span>
		{/if}
	</div>
</section>

<style>
	section {
		position: sticky;
		bottom: 0;

		background-color: var(--ac4);
	}

	.block {
		max-width: var(--body_width);
		margin: auto;
		padding: var(--sp1);
	}

	.line {
		display: flex;
	}

	.wide,
	label,
	input {
		width: 100%;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 72px;
	}
</style>
