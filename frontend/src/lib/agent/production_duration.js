import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Ask the user how many days they are willing to give the vendor or tailor to physically produce the clothing item.',
		'A polite and clear question asking the user how many days they are willing to allow for the vendor or tailor to create the clothing item.'
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user provided the following input:
			"${user_text}"
			
			Check if the input indicates a valid number of days the user is willing to give the vendor or tailor to produce the clothing item. Respond as follows:
			- "status": 
				True if the input specifies a valid number of days.
				False if the input does not specify a valid number or is unclear.
			- "resp": 
				- The number of days (integer) if the input specifies a valid number of days.
				- A polite prompt (string) to ask again for a valid number of days if the input is unclear or invalid.
		`,
		{
			status: {
				description: `
					Indicates whether the user's input specifies a valid number of days:
					- True: If a valid number of days is provided.
					- False: If the input does not specify a valid number or is unclear.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					- The number of days (integer) if valid.
					- A polite follow-up prompt asking for a valid number of days if unclear or invalid (string).
				`,
				oneOf: [
					{ type: 'integer' },
					{ type: 'string' }
				]
			}
		},
		"production_days"
	);
};
