import { _ask } from './index.js';


export const ask = async () => {
	await _ask(
		'generate a welcome greeting to the user to this platform',
		'a greeting to welcome the user to this platform',
	);
};
