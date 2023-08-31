<script>
	import { createEventDispatcher } from 'svelte';
	import { loading } from '$lib/store.js';

	let emit = createEventDispatcher();

	const validate = () => {
		error = {};

		if (!form.prompt) {
			error.prompt = 'cannot be empty';
		}

		Object.keys(error).length === 0 && submit();
	};

	const prompt = (form) => {
		return `
Create a ${form.prompt} ${form.category} on a plain white background. 
The ${form.category} should be a ${form.type} and should only show the clothing item, no human. 
Incorporate the following specifications into the ${form.category} design: ${form.prompt}.
The cloth should be realistic and the proportion shoulb be accurate.
`;
	};

	const submit = async () => {
		$loading = "Generating Images";
		let resp = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
				'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
			},
			body: JSON.stringify({
				prompt: prompt(form),
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

			emit('ok', {
				prompt: form.prompt,
				category: form.category,
				type: form.type,
				urls
			});

			form.prompt = '';
		} else {
			error.error = resp.error.message;
		}
	};

	const categories = {
		Top: [
			'Shirt',
			'Blouse',
			'T-shirt',
			'Tank top',
			'Sweatshirt',
			'Hoodie',
			'Sweater',
			'Cardigan',
			'Jacket',
			'Coat'
		],
		Bottom: ['Pants', 'Jeans', 'Trouser', 'Leggings', 'Skirt', 'Shorts', 'Capri', 'Culotte'],
		Dress: [
			'Maxi dress',
			'Mini dress',
			'Midi dress',
			'Wrap dress',
			'Shift dress',
			'Sheath dress',
			'A-line dress',
			'Ball gown'
		],
		'Jumpsuit & Romper': [
			'Jumpsuit',
			'Romper',
			'Overall',
			'Playsuit',
			'Utility jumpsuit',
			'Denim jumpsuit'
		],
		Gown: [
			'Evening gown',
			'Formal gown',
			'Wedding gown',
			'Prom gown',
			'Ballroom gown',
			'Red carpet gown'
		],
		Outerwear: ['Jacket', 'Coat', 'Parka', 'Trench coat', 'Windbreaker', 'Puffer jacket', 'Blazer'],
		'Active Wear': [
			'Activewear top',
			'Sports bra',
			'Leggings',
			'Athletic shorts',
			'Track pants',
			'Hoodie',
			'Athletic jacket'
		],
		Intimate: ['Bra', 'Panty', 'Underwear', 'Lingerie set', 'Shapewear'],
		Swimwear: ['Bikini', 'One-piece swimsuit', 'Tankini', 'Swim trunk'],
		Accessory: ['Scarf', 'Hat', 'Glove', 'Belt', 'Tie', 'Headband'],
		Footwear: ['Sneaker', 'Boot', 'Sandal', 'Heel', 'Flat', 'Loafer'],
		Sleepwear: ['Pajama', 'Nightgown', 'Sleep shirt', 'Sleep short'],
		Loungewear: ['Lounge pant', 'Lounge top', 'Robe'],
		'Formal Wear': ['Tuxedo', 'Suit', 'Evening gown', 'Formal dress'],
		'Work Wear': ['Business suit', 'Dress shirt', 'Dress pant', 'Pencil skirt'],
		'Casual Wear': ['Everyday casual outfit'],
		'Maternity Wear': ['Maternity dress', 'Maternity top', 'Maternity pant'],
		'Ethnic Wear': ['Traditional clothing from various cultures']
	};
	let form = {
		category: Object.keys(categories)[0],
		type: categories[Object.keys(categories)[0]][0]
	};

	export let error = {};
</script>

<section>
	<div class="block">
		<div class="line">
			<label>
				Category
				<select
					class="wide"
					bind:value={form.category}
					on:change={() => {
						form.type = categories[form.category][0];
					}}
				>
					{#each Object.keys(categories) as x}
						<option value={x}>
							{x}
						</option>
					{/each}
				</select>
			</label>

			<label>
				Type
				<select class="wide" bind:value={form.type}>
					{#each categories[form.category] as x}
						<option value={x}>
							{x}
						</option>
					{/each}
				</select>
			</label>
		</div>
		<br />
		<label for="prompt"> Prompt </label>
		<div class="line">
			<input
				bind:value={form.prompt}
				id="prompt"
				type="text"
				placeholder="Describe your clothing idea"
				on:keypress={(e) => {
					if (e.key == 'Enter') {
						validate();
					}
				}}
			/>

			<button class="btn" on:click={validate}>
				<svg viewBox="0 0 16 16" width="20px"
					><path
						fill="currentColor"
						d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
					/></svg
				>
			</button>
		</div>

		{#if error.prompt}
			<br />
			<span class="error">
				{error.prompt}
			</span>
		{/if}

		{#if error.error}
			<br />
			<span class="error">
				{error.error}
			</span>
		{/if}
	</div>
</section>

<style>
	section {
		position: sticky;
		bottom: 0;

		background-color: var(--ac4);
	}

	.block {
		max-width: var(--body_width);
		margin: auto;
		padding: var(--sp1);
	}

	.line {
		display: flex;
	}

	.wide,
	label,
	input {
		width: 100%;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 72px;
	}
</style>
