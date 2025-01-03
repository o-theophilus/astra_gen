import { _ask, _validate } from './index.js';


export const ask = async () => {
	await _ask(
		'Generate a response to compliment the user on their selection of one of the 4 generated images. Let them know you think they made a great choice and express enthusiasm about proceeding with the next steps.',
		'A response that politely compliments the user on their choice of one of the 4 images, conveys positivity about their decision, and expresses excitement about moving forward.'
	);
};