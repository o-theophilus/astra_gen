<script>
	import { messages, thinking } from '$lib/agent/index.js';
	import Prompt from './prompt.svelte';
	import BubbleText from './bubble_text.svelte';
	import Footer from '../footer.svelte';

	let down_height;
</script>

<section class="page">
	<section class="scrolller" style:--down_height="{down_height}px">
		<nav>
			<img src="/image/logo.png" alt="" />
		</nav>

		{#each $messages as x}
			<BubbleText item={x} />
		{/each}

		{#if $thinking}
			<BubbleText item={{ role: 'assistant', content: $thinking }} />
		{/if}
	</section>

	<section class="down" bind:clientHeight={down_height}>
		<Prompt />
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
</style>
