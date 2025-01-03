<script>
	import { module } from '$lib/agent/index.js';
	export let item = {};
</script>

{#if item.role != 'developer'}
	<div class="block {item.role}">
		<div class="position">
			<div class="bubble">
				{@html item.content}

				{#if item.image_url}
					<br />
					<br />
					<img
						src={item.image_url}
						alt={item.content}
						onerror="this.src='/image/error.png'"
						role="presentation"
						on:click={() => {
							$module = item.image_url;
						}}
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.block {
		padding: 0 var(--sp1);
		margin: var(--sp2) 0;
	}

	.position {
		padding: 0 calc(var(--sp3) * 2) 0 0;
		margin: auto;

		width: 100%;
		max-width: calc(var(--body_width) - var(--sp1) * 2);
	}

	.bubble {
		background-color: rgb(46, 46, 46);

		padding: var(--sp1);
		border-radius: var(--sp2);
	}

	img {
		width: 100%;
		border-radius: var(--rd1);
		aspect-ratio: 1/1;
		background-size: cover;
	}

	.user .position {
		padding: 0 0 0 calc(var(--sp3) * 2);
	}
	.user .bubble {
		background-color: rgb(23, 10, 73);
	}
</style>
