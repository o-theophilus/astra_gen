<script>
	import { loading, size, prompt_engine } from '$lib/store.js';
	import { createEventDispatcher } from 'svelte';

	import TextPrompt from './prompt.text.svelte';
	import PhotoPrompt from './prompt.photo.svelte';

	let emit = createEventDispatcher();

	let b64photo;
	let texture_info = '';
	let error = {};

	let textPrompt;
	let photoPrompt;

	const submit = async (prompt) => {
		let urls = [];
		texture_info = '';

		if (b64photo) {
			$loading = 'Analyzing texture';
			let resp1 = await photo_to_text();
			texture_info = resp1.choices[0].message.content;
			console.log(texture_info);
		}

		while (urls.length < 4) {
			$loading = `Generating Image (${urls.length + 1} of 4)`;
			let resp = await generate_photo(prompt);

			if (resp.error) {
				$loading = false;
				emit('ok', {
					error: resp.error.message
				});
				return;
			} else {
				urls.push(resp.data[0].url);
			}
		}

		setTimeout(() => {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			$loading = false;
		}, 100);

		emit('ok', { prompt, urls });
		textPrompt.clear();
		photoPrompt.clear();
	};

	const generate_photo = async (text_prompt) => {
		let resp = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				model: 'dall-e-3',
				quality: 'hd',
				prompt: prompt_engine(text_prompt, texture_info),
				n: 1,
				size: `${size}x${size}`
			})
		});

		resp = await resp.json();
		return resp;
	};

	const photo_to_text = async () => {
		let resp = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: [
							{
								type: 'text',
								text: 'Summarize this texture in a way that can be used to generate visuals. Focus on its patterns, colors, material, and style. Make the description concise but detailed enough for creative applications.'
							},
							{
								type: 'image_url',
								image_url: {
									url: b64photo
								}
							}
						]
					}
				],
				max_tokens: 300
			})
		});

		resp = await resp.json();
		return resp;
	};
</script>

<div class="block">
	<label for="prompt"> Upload a texture & Describe your clothing idea:</label>

	<div class="prompt">
		<PhotoPrompt
			bind:this={photoPrompt}
			on:ok={(e) => {
				error = {};
				b64photo = e.detail;
			}}
			on:error={(e) => {
				error.prompt = e.detail;
			}}
		/>

		<TextPrompt
			bind:this={textPrompt}
			on:ok={(e) => {
				error = {};
				submit(e.detail);
			}}
			on:error={(e) => {
				error.prompt = e.detail;
			}}
		/>
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

	label {
		display: block;
		width: 100%;
		font-weight: 500;
		text-align: center;
		margin-bottom: var(--sp2);
	}

	.prompt {
		display: flex;
		gap: var(--sp2);
	}
</style>
