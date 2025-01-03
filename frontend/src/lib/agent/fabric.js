import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Ask the user if they have the physical fabric ready to make the clothing item based on the generated image.',
		'A clear and polite question asking the user if they have the physical fabric available to create the clothing item from the generated image.'
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user provided the following input:
			"${user_text}"
			
			Check if the input indicates whether the user has the physical fabric to make the clothing item. Respond as follows:
			- "status": 
				True if the input confirms the user either has the physical fabric or does not have it.
				False if the input does not indicate whether the user has the physical fabric or not.
			- "resp": 
				- True (boolean) if the user confirms they have the physical fabric.
				- False (boolean) if the user confirms they do not have the physical fabric.
				- A polite prompt (string) to ask again if the input is unclear.
		`,
		{
			status: {
				description: `
					Indicates if the user's input provided clarity about having the physical fabric:
					- True: If the user confirms they either have the fabric or do not have it.
					- False: If the user did not indicate whether they have the physical fabric or not.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					- True if the user confirms they have the physical fabric (boolean).
					- False if the user confirms they do not have the physical fabric (boolean).
					- A polite follow-up prompt to clarify if the input is unclear (string).
				`,
				oneOf: [
					{ type: 'boolean' },
					{ type: 'string' }
				]
			}
		},
		"has_fabric"
	);
};

