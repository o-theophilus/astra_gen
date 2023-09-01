import { writable } from 'svelte/store';
export const loading = writable(false);
export const module = writable("");
export const portal = writable("");
export const dark = writable(true);
export const size = 1024;