import { get } from 'svelte/store';
import { _ask, user_info, thinking, scroll, messages, design_photo_urls, prompt_engine } from './index.js';



export const ask = async () => {
	await _ask(
		'Generate a prompt to ask the user to enter a detailed description of the clothing item they want to generate. The description should include details like the type of clothing, style, color, patterns, and any specific design features.',
		'A clear and polite prompt designed to ask the user for a detailed description of the clothing item they want to generate, including specifics like type, style, color, and patterns.'
	);
};
export const ask_upload = async () => {
	await _ask(
		'Generate a prompt to ask the user to enter a detailed description of the clothing item they want to generate. Encourage them to include details like the type of clothing, style, color, patterns, and any specific design features. Let them know they can optionally upload their photo or texture of the fabric if they want it to be incorporated into the generated clothing item.',
		'A clear and polite prompt designed to ask the user for a detailed description of the clothing item they want to generate. It should mention specifics like type, style, color, and patterns, and inform them that they can optionally upload their photo or texture of the fabric for incorporation into the clothing item generation.'
	);
};


const photo_to_text = async (b64photo) => {
	thinking.set('Analyzing Texture . . .')
	let resp = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
			'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: 'Summarize this texture in a way that can be used to generate visuals. Focus on its patterns, colors, material, and style. Make the description concise but detailed enough for creative applications.'
						},
						{
							type: 'image_url',
							image_url: {
								url: b64photo
							}
						}
					]
				}
			],
			max_tokens: 300
		})
	});

	resp = await resp.json();
	thinking.set(false)
	return resp;
};


const text_to_photo = async (text_prompt, texture_info) => {
	let resp = await fetch('https://api.openai.com/v1/images/generations', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
			'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
		},
		body: JSON.stringify({
			model: 'dall-e-3',
			quality: 'hd',
			prompt: prompt_engine(text_prompt, texture_info),
			n: 1,
			size: "1024x1024"
		})
	});

	resp = await resp.json();
	return resp;
};



export const generate = async (user_text, b64photo) => {
	let texture_info = '';

	if (b64photo) {
		let resp1 = await photo_to_text(b64photo);
		texture_info = resp1.choices[0].message.content;
	}

	let count = 1;

	while (count < 5) {
		thinking.set(`Generating Image (${count} of 4) . . .`)
		let resp = await text_to_photo(user_text, texture_info);

		if (resp.error) {
			console.log(resp.error.message);
			return;
		} else {
			let url = get(design_photo_urls)
			url.push(resp.data[0].url);
			design_photo_urls.set(url)

			let msg = get(messages)
			msg.push({
				role: 'assistant',
				content: `
					Option ${count}:
				`,
				image_url: resp.data[0].url
			});
			messages.set(msg)
			scroll()
		}

		count++
		thinking.set(false)
	}

	let b = get(user_info)
	b.state++
	user_info.set(b)

};
