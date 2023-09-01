<script>
	import { module, loading, portal, size } from '$lib/store.js';

	const submit = async () => {
		$portal = {
			error: ''
		};

		$loading = 'Generating Variations';
		let resp = await fetch(`${import.meta.env.VITE_BACKEND}/variations`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				src: $module.src,
				n: 4,
				size: `${size}x${size}`
			})
		});

		setTimeout(() => {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			$loading = false;
		}, 100);

		resp = await resp.json();

		if (!resp.error) {
			let urls = [];
			for (const x of resp.data) {
				urls.push(x.url);
			}

			$module.input.prompt += ' -var';
			$portal = {
				input: $module.input,
				urls
			};
		} else {
			$portal = {
				error: resp.error.message
			};
		}
		$module = '';
	};
</script>

{#if $module}
	<section
		class="bg"
		on:click|self={() => {
			$module = '';
		}}
		role="presentation"
	>
		<div class="block">
			{$module.input.gender} |
			{$module.input.category} |
			{$module.input.style} |
			{$module.input.material} |
			{$module.input.pattern} |
			{$module.input.fit} |
			{$module.input.size} |
			{$module.input.prompt}
			<br />
			<br />
			<img src={$module.src} alt={$module.input.prompt} onerror="this.src='/image/error.png'" />
			<br />
			<br />
			<button class="btn" on:click|stopPropagation={submit}>
				Get Variations

				<svg width="16px" viewBox="0 0 226.22 226.22">
					<path
						d="M33.13 33.13c22.08,-22.09 51.03,-33.13 79.98,-33.13 28.95,0 57.9,11.04 79.98,33.13 22.09,22.08 33.13,51.03 33.13,79.98 0,28.95 -11.04,57.9 -33.13,79.98 -22.09,22.09 -51.03,33.13 -79.98,33.13 -28.95,0 -57.9,-11.04 -79.98,-33.13 -22.09,-22.09 -33.13,-51.03 -33.13,-79.98 0,-28.95 11.04,-57.9 33.13,-79.98zm75.28 -11.64l96.32 96.32c0.08,-1.57 0.12,-3.14 0.12,-4.7 -0,-23.48 -8.96,-46.95 -26.87,-64.87 -17.91,-17.91 -41.39,-26.87 -64.87,-26.87 -1.57,0 -3.14,0.04 -4.7,0.12zm91.41 121.64l-116.73 -116.73c-9.62,3.32 -18.79,8.29 -27.08,14.9l128.91 128.91c6.61,-8.29 11.58,-17.47 14.9,-27.08zm-173.62 -59.42l116.32 116.32c9.66,-3.26 18.89,-8.18 27.24,-14.75l-128.81 -128.81c-6.57,8.35 -11.48,17.58 -14.75,27.24zm90.82 121.05l-95.56 -95.56c-0.05,1.3 -0.08,2.6 -0.08,3.91 0,23.48 8.96,46.95 26.87,64.87 17.91,17.91 41.39,26.87 64.87,26.87 1.3,0 2.6,-0.03 3.91,-0.08z"
					/>
				</svg>
			</button>
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

	.btn {
		fill: var(--ac5_);
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>
