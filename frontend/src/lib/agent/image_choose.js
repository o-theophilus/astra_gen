import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Generate a question to prompt the user to choose one of the 4 generated images. If the user does not like any of the options, ask them if they would like to try the image generation again.',
		'A question that asks the user to select one of the 4 generated images, or if none are suitable, whether they would like to generate new images.'
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user has provided the following input:
			"${user_text}"

			Please check if the user has selected one of the 4 generated images or indicated they want to try the image generation again. Respond as follows:
			- "status": 
				True if the user has selected one of the 4 generated images or wants to try the image generation again.
				False if the user did not select any of the 4 images and did not indicate they want to retry image generation.
			- "resp": 
				1, 2, 3, or 4 as the integer number of the chosen image,
				or 0 if the user wants to retry the image generation.
				If neither is provided, respond with a polite prompt asking the user to choose one of the 4 images or indicate if they want to retry.
		`,
		{
			status: {
				description: `
					Whether the user has provided a valid input:
					- True: If the user has selected one of the 4 images or wants to retry image generation.
					- False: If the user did not select an image and did not indicate they want to retry image generation.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					An integer representing the user's choice or a polite prompt:
					- 0: If the user wants to retry image generation.
					- 1: If the user chose the first image.
					- 2: If the user chose the second image.
					- 3: If the user chose the third image.
					- 4: If the user chose the fourth image.
					If neither is provided, return a polite prompt asking the user to choose one of the 4 images or indicate if they want to retry image generation.
				`,
				oneOf: [
					{ type: 'integer' },
					{ type: 'string' }
				]
			}
		},
		"design_photo_url"
	);
};
