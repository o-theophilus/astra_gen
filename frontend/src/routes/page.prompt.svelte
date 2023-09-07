<script>
	import { loading, size, history } from '$lib/store.js';
	import { createEventDispatcher } from 'svelte';

	let emit = createEventDispatcher();

	let user_prompt;
	export let error = {};

	const validate = () => {
		error = {};
		if (!user_prompt) {
			error.prompt = 'cannot be empty';
		}
		Object.keys(error).length === 0 && translate_prompt();
	};

	const translate_prompt = async () => {
		$loading = 'Generating Images';
		let resp = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: history(user_prompt),
				temperature: 0.2
			})
		});
		$loading = false;

		resp = await resp.json();
		console.log(resp.choices[0].message.content);
		generate_image(resp.choices[0].message.content);
	};

	const generate_image = async (dall_e_prompt) => {
		$loading = 'Generating Images';
		let resp = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				prompt: dall_e_prompt,
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
				user_prompt,
				urls
			});

			user_prompt = '';
		} else {
			error.error = resp.error.message;
		}
	};
</script>

<section>
	<div class="block">
		<label for="prompt"> Describe your clothing idea:</label>
		<div class="line">
			<input
				bind:value={user_prompt}
				id="prompt"
				type="text"
				placeholder="E.g. A loose red shirt made of suede for men to go for dinner."
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
