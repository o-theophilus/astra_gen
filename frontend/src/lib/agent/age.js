import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'generate a question to prompt user to type their age',
		'a question to prompt the user for their age',
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user has provided the following input:
			"${user_text}"

			Please check if the input contains the users age. Respond as follows:
			- "status": 
			True if a age is detected,
				False if no age is found.
			- "resp": 
				The extracted age if detected,
				or a different polite prompt to ask for their age again.
		`,
		{
			status: {
				description: `
					Whether an age was detected in the input:
					- True: An age was found.
					- False: No age was detected.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					The extracted age if a age is detected,
					or a different polite prompt to ask for their age again.
					`,
				type: 'integer'
			}
		},
		"age"

	);
}