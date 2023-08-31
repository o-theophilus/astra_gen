<script>
	import Prompt from './page.prompt.svelte';
	import { loading } from '$lib/store.js';

	let history = [
		{
			prompt: 'flowery button up',
			category: 'Top',
			type: 'Shirt',
			urls: [
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D'
			]
		},
		{
			prompt: 'flowery button up',
			category: 'Top',
			type: 'Shirt',
			urls: [
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D',
				'https://oaidalleapiprodscus.blob.core.windows.net/private/org-lHjOntuceEFomYSRXZUjKxVR/user-lFbkUqxbRqMqj2KqzaHujFwG/img-zOEEX52IrBXN7xS8wPX9CgVw.png?st=2023-08-31T19%3A10%3A16Z&se=2023-08-31T21%3A10%3A16Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-31T00%3A39%3A12Z&ske=2023-09-01T00%3A39%3A12Z&sks=b&skv=2021-08-06&sig=kh6PQZv2JGxjJyV/1aQdwsdf7qRZ7T917i0m8pXKSYE%3D'
			]
		}
	];

	let error = {};

	const submit = async (src, form) => {
		$loading = 'Generating Variations';
		let resp = await fetch(`${import.meta.env.VITE_BACKEND}/variations`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				src,
				n: 4,
				size: '256x256'
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

			history.push({
				prompt: `${form.prompt} (Variation)`,
				category: form.category,
				type: form.type,
				urls
			});
			history = history;
		} else {
			error.error = resp.error.message;
		}
	};
</script>

<section>
	<div class="gen">
		<div class="block">
			<h1>Instruction</h1>
			<p>
				Select the clothing category and type from the options provided. Then, describe any specific
				style, color, or design details for the clothing. Be detailed for better results.
			</p>
		</div>
	</div>

	{#each history as x}
		<div class="gen">
			<div class="block">
				{x.category} | {x.type} | {x.prompt}
				<br />
				<br />
				<div class="image">
					{#each x.urls as src}
						<div class="img">
							<button
								on:click={() => {
									submit(src, x);
								}}
							>
								<svg width="16px" viewBox="0 0 226.22 226.22">
									<path
										d="M33.13 33.13c22.08,-22.09 51.03,-33.13 79.98,-33.13 28.95,0 57.9,11.04 79.98,33.13 22.09,22.08 33.13,51.03 33.13,79.98 0,28.95 -11.04,57.9 -33.13,79.98 -22.09,22.09 -51.03,33.13 -79.98,33.13 -28.95,0 -57.9,-11.04 -79.98,-33.13 -22.09,-22.09 -33.13,-51.03 -33.13,-79.98 0,-28.95 11.04,-57.9 33.13,-79.98zm75.28 -11.64l96.32 96.32c0.08,-1.57 0.12,-3.14 0.12,-4.7 -0,-23.48 -8.96,-46.95 -26.87,-64.87 -17.91,-17.91 -41.39,-26.87 -64.87,-26.87 -1.57,0 -3.14,0.04 -4.7,0.12zm91.41 121.64l-116.73 -116.73c-9.62,3.32 -18.79,8.29 -27.08,14.9l128.91 128.91c6.61,-8.29 11.58,-17.47 14.9,-27.08zm-173.62 -59.42l116.32 116.32c9.66,-3.26 18.89,-8.18 27.24,-14.75l-128.81 -128.81c-6.57,8.35 -11.48,17.58 -14.75,27.24zm90.82 121.05l-95.56 -95.56c-0.05,1.3 -0.08,2.6 -0.08,3.91 0,23.48 8.96,46.95 26.87,64.87 17.91,17.91 41.39,26.87 64.87,26.87 1.3,0 2.6,-0.03 3.91,-0.08z"
									/>
								</svg>
							</button>
							<img {src} alt={x.prompt} onerror="this.src='/image/error.png'" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>

<Prompt
	{error}
	on:ok={(e) => {
		history.push(e.detail);
		history = history;
	}}
/>

<style>
	section {
		min-height: calc(100vh - var(--nav_height) - var(--sp1) - 216px);
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
	.img {
		position: relative;
		height: fit-content;
		font-size: 0;
	}

	img {
		width: 100%;
		border-radius: var(--rd1);
		aspect-ratio: 1/1;
		background-size: cover;
	}

	button {
		position: absolute;
		bottom: 8px;
		left: 8px;

		padding: 0;
		background-color: transparent;
		border: none;
		font-size: 0;

		cursor: pointer;
	}
</style>
