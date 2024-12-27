import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { TSettings } from '$lib/types';
import { loadFromStorage } from '$lib/utils';

const KEY = 'app-stores';

// Get the value out of storage on load or a sane default
const stored = loadFromStorage<TSettings>(KEY, { isNewApp: true });

// Set the stored value.
const settingsStore = writable<TSettings>(stored);

// Anytime the store changes, update the local storage value.
if (browser) settingsStore.subscribe((s) => (localStorage[KEY] = JSON.stringify(s)));

export default settingsStore;
