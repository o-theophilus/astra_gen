<script>
	import { onMount } from 'svelte';
	import { messages, scroll, user_info, design_photo_urls } from '$lib/agent/index.js';
	import { ask as welcome_user } from '$lib/agent/welcome.js';
	import { ask as name_ask, validate as name_validate } from '$lib/agent/name.js';
	import { ask as age_ask, validate as age_validate } from '$lib/agent/age.js';
	import { ask as start_generation } from '$lib/agent/start_generation.js';
	import {
		ask as ask_fabric_photo,
		validate as validate_fabric_photo
	} from '$lib/agent/fabric_photo.js';
	import {
		ask as ask_generate,
		ask_upload as ask_generate_upload,
		generate
	} from '$lib/agent/image_generation.js';
	import {
		ask as ask_image_choose,
		validate as validate_image_choose
	} from '$lib/agent/image_choose.js';
	import { ask as image_choose_ok } from '$lib/agent/image_choose_ok.js';
	import { ask as ask_fabric, validate as validate_fabric } from '$lib/agent/fabric.js';
	import {
		ask as ask_duration,
		validate as validate_duration
	} from '$lib/agent/production_duration.js';
	import { ask as ask_cost, validate as validate_cost } from '$lib/agent/production_cost.js';
	import { ask as ask_end } from '$lib/agent/end.js';

	import TextPrompt from './prompt.text.svelte';
	import PhotoPrompt from '../prompt.photo.svelte';

	let textPrompt_comp;
	let photoPrompt_comp;

	let b64photo;
	let error = {};

	const submit = async (user_text) => {
		if ($user_info.state == 1) {
			await name_validate(user_text);
			if ($user_info.state == 2) {
				await age_ask();
			}
		} else if ($user_info.state == 2) {
			await age_validate(user_text);
			if ($user_info.state == 3) {
				await start_generation();
				await ask_fabric_photo();
			}
		} else if ($user_info.state == 3) {
			await validate_fabric_photo(user_text);
			if ($user_info.state == 4) {
				if ($user_info.has_fabric_photo) {
					await ask_generate_upload();
				} else {
					await ask_generate();
				}
			}
		} else if ($user_info.state == 4) {
			await generate(user_text, b64photo);
			if ($user_info.state == 5) {
				await ask_image_choose();
			}
		} else if ($user_info.state == 5) {
			await validate_image_choose(user_text);
			if ($user_info.state == 6) {
				if ($user_info.design_photo_url == 0) {
					$user_info.state = 3;
					await ask_fabric_photo();
				} else {
					$user_info.design_photo_url = $design_photo_urls[$user_info.design_photo_url - 1];

					await image_choose_ok();
					await ask_fabric();
				}
			}
		} else if ($user_info.state == 6) {
			await validate_fabric(user_text);
			if ($user_info.state == 7) {
				await ask_duration();
			}
		} else if ($user_info.state == 7) {
			await validate_duration(user_text);
			if ($user_info.state == 8) {
				await ask_cost();
			}
		} else if ($user_info.state == 8) {
			await validate_cost(user_text);
			if ($user_info.state == 9) {
				await ask_end();
			}
		}
	};

	onMount(async () => {
		await welcome_user();
		$user_info.state++;
		await name_ask();
	});
</script>

<div class="block">
	<div class="prompt">
		{#if $user_info.state == 4 && $user_info.has_fabric_photo}
			<PhotoPrompt
				bind:this={photoPrompt_comp}
				on:ok={(e) => {
					error = {};
					b64photo = e.detail;
				}}
				on:error={(e) => {
					error.prompt = e.detail;
				}}
			/>
		{/if}

		<TextPrompt
			bind:this={textPrompt_comp}
			on:ok={(e) => {
				$messages.push({
					role: 'user',
					content: e.detail
				});
				$messages = $messages;
				scroll();
				error = {};
				submit(e.detail);

				textPrompt_comp.clear();
				// if ($user_info.state == 4 && $user_info.has_fabric_photo) {
				// 	photoPrompt_comp.clear();
				// }
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

	.prompt {
		display: flex;
		gap: var(--sp2);
	}
</style>
