import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'generate a question to prompt user to type their fullname',
		'a question to prompt the user for their fullname',
	);
};


export const validate = async (user_text) => {
	await _validate(
		`
			   The user has provided the following input:
			   "${user_text}"
   
			   Please check if the input contains a name. Respond as follows:
			   - "status": 
				   True if a name is detected,
				   False if no name is found.
			   - "resp": 
				   The extracted name if detected,
				   or a different polite prompt to ask for their fullname again.
	    `,
		{
			status: {
				description: `
				   Whether a name was detected in the input:
				   - True: A name was found.
				   - False: No name was detected.
			   `,
				type: 'boolean'
			},
			resp: {
				description: `
			   The extracted name if a name is detected,
			   or a different polite prompt to ask for their name again.
			   `,
				type: 'string'
			}
		},
		"name"
	);
}

