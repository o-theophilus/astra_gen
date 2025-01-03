<script>
	import { module } from '$lib/agent/index.js';
</script>

{#if $module}
	<section
		class="bg"
		on:click|self={() => {
			$module = false;
		}}
		role="presentation"
	>
		<div class="block">
			<img src={$module} alt="generated item" onerror="this.src='/image/error.png'" />
		</div>
	</section>
{/if}

<style>
	.bg {
		position: fixed;
		inset: 0;
		z-index: 1;

		display: flex;

		padding: var(--sp1);
		cursor: pointer;
		background-color: var(--overlay);
	}

	.block {
		width: 100%;
		max-width: calc(var(--body_width) - var(--sp1) * 2);
		margin: auto;
		padding: var(--sp1);

		border-radius: var(--rd1);
		background-color: var(--ac4);

		cursor: initial;
	}

	img {
		width: 100%;
		border-radius: var(--rd1);
	}
</style>
