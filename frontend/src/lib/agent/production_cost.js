import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Ask the user how much in dollars they are willing to pay for the production of the clothing item.',
		'A polite and clear question asking the user to specify the amount in dollars they are willing to pay for producing the clothing item.'
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			The user provided the following input:
			"${user_text}"
			
			Check if the input specifies a valid amount in dollars that the user is willing to pay for the clothing item production. Respond as follows:
			- "status": 
				True if the input specifies a valid dollar amount.
				False if the input does not specify a valid amount or is unclear.
			- "resp": 
				- The dollar amount (number) if the input specifies a valid amount.
				- A polite prompt (string) to ask again for a valid dollar amount if the input is unclear or invalid.
		`,
		{
			status: {
				description: `
					Indicates whether the user's input specifies a valid dollar amount:
					- True: If a valid dollar amount is provided.
					- False: If the input does not specify a valid amount or is unclear.
				`,
				type: 'boolean'
			},
			resp: {
				description: `
					- The dollar amount (number) if valid.
					- A polite follow-up prompt asking for a valid dollar amount if unclear or invalid (string).
				`,
				oneOf: [
					{ type: 'number' },
					{ type: 'string' }
				]
			}
		},
		"production_cost"
	);
};
