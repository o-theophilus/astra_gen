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
		// console.log(resp.choices[0].message.content);
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

<div class="block">
	<label for="prompt"> Describe your clothing idea:</label>
	<div class="input">
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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" width="32">
				<path
					d="M23.6789 4.89647L10.9153 9.13688C2.33553 12.0062 2.33553 16.6848 10.9153 19.54L14.7034 20.798L15.9614 24.5861C18.8166 33.1659 23.5093 33.1659 26.3645 24.5861L30.6191 11.8366C32.5131 6.11206 29.4035 2.98829 23.6789 4.89647ZM24.1312 12.5009L18.76 17.9004C18.548 18.1124 18.2795 18.2114 18.0109 18.2114C17.7423 18.2114 17.4738 18.1124 17.2618 17.9004C16.8519 17.4905 16.8519 16.812 17.2618 16.4021L22.633 11.0027C23.0429 10.5928 23.7213 10.5928 24.1312 11.0027C24.5411 11.4126 24.5411 12.091 24.1312 12.5009Z"
				/>
			</svg>
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

<style>
	.block {
		max-width: var(--body_width);
		margin: auto;
		padding: var(--sp1);
	}

	.input {
		display: flex;
		gap: var(--sp2);

		background-color: rgba(217, 217, 217, 0.1);
		padding: var(--sp2);
		border-radius: var(--sp2);
	}

	label {
		display: block;
		font-weight: 500;
		text-align: center;
		margin-bottom: var(--sp2);
	}

	label,
	input {
		width: 100%;
	}

	.btn {
		display: flex;
		fill: white;
	}
</style>
