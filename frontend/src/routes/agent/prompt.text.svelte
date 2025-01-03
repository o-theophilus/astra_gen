<script>
	import { createEventDispatcher } from 'svelte';
	import { thinking } from '$lib/agent/index.js';

	let prompt;
	let emit = createEventDispatcher();

	const submit = () => {
		if (prompt) {
			emit('ok', prompt);
		} else {
			emit('error', 'cannot be empty');
		}
	};
	export const clear = () => {
		prompt = '';
	};
</script>

<div class="input">
	<input
		bind:value={prompt}
		id="prompt"
		type="text"
		placeholder="Message here"
		on:keypress={(e) => {
			if (e.key == 'Enter') {
				submit();
			}
		}}
		disabled={$thinking}
	/>

	<button class="btn" on:click={submit} disabled={$thinking}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" width="32">
			<path
				d="M23.6789 4.89647L10.9153 9.13688C2.33553 12.0062 2.33553 16.6848 10.9153 19.54L14.7034 20.798L15.9614 24.5861C18.8166 33.1659 23.5093 33.1659 26.3645 24.5861L30.6191 11.8366C32.5131 6.11206 29.4035 2.98829 23.6789 4.89647ZM24.1312 12.5009L18.76 17.9004C18.548 18.1124 18.2795 18.2114 18.0109 18.2114C17.7423 18.2114 17.4738 18.1124 17.2618 17.9004C16.8519 17.4905 16.8519 16.812 17.2618 16.4021L22.633 11.0027C23.0429 10.5928 23.7213 10.5928 24.1312 11.0027C24.5411 11.4126 24.5411 12.091 24.1312 12.5009Z"
			/>
		</svg>
	</button>
</div>

<style>
	.input {
		display: flex;
		gap: var(--sp2);
		align-items: center;
		width: 100%;

		background-color: rgba(217, 217, 217, 0.1);
		padding: 0 var(--sp2);
		border-radius: var(--sp2);
	}

	input {
		width: 100%;
		height: 60px;
		color: white;
	}
	input:disabled {
		opacity: 0.2;
	}

	.btn {
		display: flex;
		fill: white;
	}
	.btn:disabled {
		opacity: 0.2;
	}
</style>
