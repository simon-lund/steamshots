import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { TApp } from '$lib/types';
import { loadFromStorage } from '$lib/utils';
import toast from 'svelte-french-toast';

const KEY = 'apps';

// Get the value out of storage on load or a sane default.
const stored = loadFromStorage<TApp[]>(KEY, []);

// Set the stored value
const appsStore = writable<TApp[]>(stored);

// Anytime the store changes, update the local storage value.
if (browser) appsStore.subscribe((s) => (localStorage[KEY] = JSON.stringify(s)));

export default appsStore;


export async function importApps(steamId?: string) {
	if (!steamId) {
		toast.error('Steam ID is required.');
		return;
	}

	const res = await fetch(`/api/import?steamId=${steamId}`);
	if (!res.ok) {
		toast.error('Failed to fetch apps. Please check your Steam ID and try again.');
		return;
	}

	const importedApps: TApp[] = await res.json();
	console.log(importedApps);

	// Merge the new apps with the existing ones
	appsStore.update((apps) => {
		const existingIds = apps.map((a) => a.id);
		const newApps = importedApps.filter((a) => !existingIds.includes(a.id));
		return [...apps, ...
			newApps];
	});

	toast.success('Apps imported successfully');
}