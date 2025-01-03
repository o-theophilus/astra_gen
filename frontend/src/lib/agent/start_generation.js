import { _ask } from './index.js';


export const ask = async () => {
	await _ask(
		'Thank the user for providing the requested information. Let them know they are now ready to proceed with generating their clothing idea.',
		'A polite and engaging message thanking the user for their input and informing them that they are ready for the next step.'
	);
};
