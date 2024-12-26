import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { TAppState } from '$lib/types';
import { loadFromStorage } from '$lib/utils';

const KEY = 'app-stores';

// Get the value out of storage on load or a sane default
const stored = loadFromStorage<TAppState>(KEY, { isNewApp: true });

// Set the stored value.
const appStateStore = writable<TAppState>(stored);

// Anytime the store changes, update the local storage value.
if (browser) appStateStore.subscribe((s) => (localStorage[KEY] = JSON.stringify(s)));

export default appStateStore;
