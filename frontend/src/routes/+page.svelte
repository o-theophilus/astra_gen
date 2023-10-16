<script>
	import { portal } from '$lib/store.js';
	import Prompt from './page.prompt.svelte';
	import Photo from './page.photo.svelte';
	import Footer from './footer.svelte';

	let history = [];
	let error = {};
	let down_height;
	let nav_height;

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

<section class="page">
	<nav bind:clientHeight={nav_height}>
		<img src="/image/logo.png" alt="" />
	</nav>

	<section class="scrolller" style:--scroller_height="{down_height + nav_height}px">
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
								on:error={(e) => {
									error = e.detail;
								}}
							/>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</section>

	<section class="down" bind:clientHeight={down_height}>
		<Prompt
			{error}
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
		position: sticky;
		top: 0;

		display: flex;
		justify-content: center;

		padding: var(--sp3);

		z-index: 1;
		background-color: rgba(0, 0, 0, 0.95);
	}
	img {
		width: 100%;
		max-width: 200px;
	}
	.scrolller {
		min-height: calc(100vh - 1px - var(--scroller_height));
	}
	.down {
		position: sticky;
		bottom: 0;

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
