<script>
	import Nav from './layout.nav.svelte';
	import Loading from './loading.svelte';
	import Module from './module.svelte';
	import './layout.var.css';
	import './layout.main.css';

	import { dark } from '$lib/store.js';
</script>

<main class:dark={$dark}>
	<Nav />
	<slot />
	<Module />
	<Loading />
</main>

<style>
	main {
		position: relative;

		background-color: var(--ac5);
		color: var(--ac2);
		min-height: 100vh;
	}
</style>
