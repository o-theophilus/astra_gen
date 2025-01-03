import { writable } from 'svelte/store';
export const loading = writable(false);
export const module = writable("");
export const portal = writable("");
export const dark = writable(true);
export const size = 1024;


export let prompt_engine = (prompt, texture_info = "") => {
    const texture_note = texture_info ? `
    * the material used to make the cloth should be as stated below:
    -------------------------------
    ${texture_info}
    -------------------------------
    ` : "";
    return `
Description: ${prompt}
---------------
From the above text description, extract various clothing attributes. Examples of attributes to look out for are: fit, gender, size, category, material, pattern, occasion, color, and style.

Using these attributes, generate a beautiful illustration of the clothing item with meticulous attention to detail. The illustration should:
* Have a plain white background.
* Focus on presenting the clothing illustration clearly.
* Be styled after Rockstar Games' GTA 5 artwork, incorporating cel shading and a polished, detailed aesthetic.
* Highlight the item's fit and intricate details while ensuring it can be realistically produced using standard techniques.
* don't add any aesthetics on the white background
* the full clothing item should be in view
${texture_note}
`;
};


export let old_prompt_engine = (prompt) => {
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


