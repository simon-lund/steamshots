import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { TApp } from '$lib/types';
import { loadFromStorage } from '$lib/utils';

const KEY = 'apps';

// Get the value out of storage on load or a sane default.
const stored = loadFromStorage<TApp[]>(KEY, []);

// Set the stored value
const appsStore = writable<TApp[]>(stored);

// Anytime the store changes, update the local storage value.
if (browser) appsStore.subscribe((s) => (localStorage[KEY] = JSON.stringify(s)));

export default appsStore;
