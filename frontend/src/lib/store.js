import { writable } from 'svelte/store';
export const loading = writable(false);
export const module = writable("");
export const portal = writable("");
export const dark = writable(true);
export const size = 1024;


export let re_prompt = (prompt) => {
    return `
Description: ${prompt}
---------------
from the above text description extract various cloth attributes. 
Examples of attributes to look out for are: fit, gender, size, category, material, pattern, occasion, color, and style.

use this attributes in conjunction with the description generate a beautiful illustration of clothing item, with meticulous attention to detail. 
The background of the images should be plain white. 
The focus should be on presenting the clothing illustration on a white background.

Artwork by rockstar games, artwork of gta 5, cel shading, cel art.
`

};


