<script>
	import { scale } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	import { loading } from '$lib/store.js';
</script>

{#if $loading}
	<section transition:scale|local={{ delay: 0, duration: 200, easing: backInOut }}>
		<div class="block">
			<span class="task">
				{$loading}
			</span>
			<span class="wait"> Please Wait . . . </span>
		</div>
	</section>
{/if}

<style>
	section,
	.block {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		padding: var(--sp1);
	}
	section {
		position: fixed;
		inset: 0;

		background-color: var(--overlay);
		z-index: 1;
	}

	.block {
		--size: 150px;

		width: 100%;
		max-width: calc(2 * var(--size));
		height: var(--size);
		border-radius: var(--rd1);

		background-color: var(--ac4);
	}
	.task {
		color: var(--ac1);
	}
	.wait {
		margin-top: var(--sp2);
		font-size: small;
	}
</style>
