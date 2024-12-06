<script>
	import { portal } from '$lib/store.js';
	import Prompt from './prompt.svelte';
	import Photo from './photo.svelte';
	import Footer from './footer.svelte';

	let history = [];
	let down_height;

	$: if ($portal) {
		history.push($portal);
		history = history;
		$portal = '';
	}
</script>

<section class="page">
	<section class="scrolller" style:--down_height="{down_height}px">
		<nav>
			<img src="/image/logo.png" alt="" />
		</nav>

		{#each history as x}
			<div class="gen">
				<div class="block">
					{#if x.error}
						<span class="error">
							{x.error}
						</span>
					{:else}
						{x.prompt}
						<br />
						<br />
						<div class="image">
							{#each x.urls as src}
								<Photo
									prompt={x.prompt}
									{src}
									on:ok={(e) => {
										history.push(e.detail);
										history = history;
									}}
								/>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</section>

	<section class="down" bind:clientHeight={down_height}>
		<Prompt
			on:ok={(e) => {
				history.push(e.detail);
				history = history;
			}}
		/>
		<Footer />
	</section>
</section>

<style>
	.page {
		background-image: url(/image/bg.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}

	nav {
		display: flex;
		justify-content: center;
		padding: var(--sp3);
	}
	img {
		width: 100%;
		max-width: 200px;
	}
	.scrolller {
		min-height: calc(100vh - var(--down_height));
	}
	.down {
		position: sticky;
		bottom: -1px;

		background-color: rgba(0, 0, 0, 0.95);
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
