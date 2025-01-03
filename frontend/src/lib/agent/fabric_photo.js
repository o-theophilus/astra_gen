import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Ask the user if they have a photo or texture of the fabric they want to use for making the clothing.',
		'A clear and polite question asking the user if they have a photo or texture of the fabric for their clothing project.'
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user provided the following input:
			"${user_text}"
			
			Check if the input indicates whether the user has a photo or texture of the fabric. Respond as follows:
			- "status": 
				True if the input confirms the user either has a texture or does not have a texture.
				False if the input does not indicate whether the user has a texture or not.
			- "resp": 
				- True (boolean) if the user confirms they have a photo or texture.
				- False (boolean) if the user confirms they do not have a photo or texture.
				- A polite prompt (string) to ask again if the input is unclear.
		`,
		{
			status: {
				description: `
					Indicates if the user's input provided clarity about having a photo or texture of the fabric:
					- True: If the user confirms they either have a texture or do not have a texture.
					- False: If the user did not indicate whether they have a texture or not.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					- True if the user confirms they have a photo or texture (boolean).
					- False if the user confirms they do not have a photo or texture (boolean).
					- A polite follow-up prompt to clarify if the input is unclear (string).
				`,
				oneOf: [
					{ type: 'boolean' },
					{ type: 'string' }
				]
			}
		},
		"has_fabric_photo"
	);
};

