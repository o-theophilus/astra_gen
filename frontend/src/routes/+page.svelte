<script>
	import { portal } from '$lib/store.js';
	import Prompt from './page.prompt.svelte';
	import Photo from './page.gen.photo.svelte';

	let history = [];
	let error = {};

	$: if ($portal) {
		if (!('error' in $portal)) {
			history.push($portal);
			history = history;
		} else {
			error = $portal;
		}
	}
</script>

<section>
	<div class="gen">
		<div class="block">
			<h1>Instruction</h1>
			<p>
				Select the clothing category and type from the options provided. Then, describe any specific
				style, color, or design details for the clothing. Be detailed for better results.
			</p>
		</div>
	</div>

	{#each history as x}
		<div class="gen">
			<div class="block">
				{x.input.gender} |
				{x.input.category} |
				{x.input.style} |
				{x.input.material} |
				{x.input.pattern} |
				{x.input.fit} |
				{x.input.size} |
				{x.input.prompt}
				<br />
				<br />
				<div class="image">
					{#each x.urls as src}
						<Photo
							input={x.input}
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
		min-height: calc(100vh - var(--nav_height) - var(--sp1) - 218px);
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
