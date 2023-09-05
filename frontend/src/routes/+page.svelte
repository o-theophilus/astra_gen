<script>
	import { portal } from '$lib/store.js';
	import Prompt from './page.prompt.svelte';
	import Photo from './page.photo.svelte';

	let history = [];
	let error = {};

	$: if ($portal) {
		if (!('error' in $portal)) {
			history.push($portal);
			history = history;
		} else {
			error = $portal;
		}
		$portal = '';
	}
</script>

<section>
	{#each history as x}
		<div class="gen">
			<div class="block">
				{x.user_prompt}
				<br />
				<br />
				<div class="image">
					{#each x.urls as src}
						<Photo
							user_prompt={x.user_prompt}
							{src}
							on:ok={(e) => {
								history.push(e.detail);
								history = history;
							}}
							on:error={(e) => [(error = e.detail)]}
						/>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>

<Prompt
	{error}
	on:ok={(e) => {
		history.push(e.detail);
		history = history;
	}}
/>

<style>
	section {
		--prompt_height: 112px;
		min-height: calc(100vh - var(--nav_height) - var(--prompt_height));
	}
	@media screen and (min-width: 500px) {
		section {
			--prompt_height: 124px;
		}
	}
	.gen {
		margin: var(--sp1) auto;
		max-width: var(--body_width);
		padding: 0 var(--sp1);
	}
	.block {
		padding: var(--sp1);
		border-radius: var(--rd1);
		background-color: var(--ac4);
	}

	.image {
		display: grid;

		gap: 8px;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
