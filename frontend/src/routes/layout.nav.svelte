<script>
	import Theme from './layout.nav.theme.svelte';
</script>

<nav>
	<div class="block">
		<img src="/image/logo.png" alt="" />
		<Theme />
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;

		background: linear-gradient(to top right, var(--cl1), #4f7aa6);
		z-index: 1;
	}

	.block {
		display: grid;
		grid-template-columns: auto auto;
		align-content: center;
		justify-content: space-between;
		gap: var(--sp1);

		height: var(--nav_height);
		max-width: var(--body_width);
		padding: var(--sp1);
		margin: auto;
	}

	img {
		width: 100%;
		max-width: 280px;
	}
</style>
