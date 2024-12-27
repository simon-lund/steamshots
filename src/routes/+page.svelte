<script lang="ts">
	import { ImageOffIcon, LayoutGridIcon, Trash2Icon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import format from 'string-template';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { appsStore, settingsStore } from '$lib/stores';
	import type { TApp } from '$lib/types';
	import CopyToast from '$lib/components/copy-toast.svelte';
	import {
		APP_HEADER_URL_TEMPLATE,
		APP_PORTRAIT_URL_TEMPLATE,
		STEAM_SCREENSHOTS_PATH_TEMPLATE
	} from '$lib/constants';
	import { toSteamID3 } from '$lib/utils.js';
	import SteamIDAlert from '$lib/components/SteamIDAlert.svelte';
	import { importApps } from '$lib/stores/apps-store.js';

	function handleReorder(state: DragDropState<TApp>) {
		const { draggedItem, sourceContainer, targetContainer } = state;
		if (!targetContainer || sourceContainer === targetContainer) return; // Prevent self-placement

		$appsStore = $appsStore.filter((card: TApp) => card.id !== draggedItem.id); // Remove the dragged item
		$appsStore.splice(parseInt(targetContainer), 0, draggedItem); // Insert the dragged item at the new position
	}

	function handleDelete(state: DragDropState<TApp>) {
		$appsStore = $appsStore.filter((app: TApp) => app.id !== state.draggedItem.id);
	}

	function copyPath(app: TApp) {
		let steamID3 = '<STEAM_ID3>';

		if ($settingsStore.steamId) {
			try {
				steamID3 = toSteamID3($settingsStore.steamId);
			} catch {
				toast.error('Please check your Steam ID. It seems to be invalid.');
				return;
			}
		}

		let screenshotsPath = format(STEAM_SCREENSHOTS_PATH_TEMPLATE, {
			steamID3,
			appId: app.id
		});
		navigator.clipboard.writeText(screenshotsPath);
		toast(CopyToast, { appName: app.name } as never);
	}
</script>

<SteamIDAlert />

<main class="mx-auto w-full max-w-screen-2xl grow px-4">
	{#if $appsStore.length === 0}
		<div class="mt-24 flex items-center justify-center">
			<div class="flex flex-col items-center gap-4 text-muted-foreground">
				<LayoutGridIcon class="w-6 h-6" />
				<p class="w-72 text-center">
					You don't have any apps yet.<br />
					Click plus or <kbd>Ctrl</kbd> + <kbd>J</kbd> to add apps.
				</p>
				<div class="w-full border-t"></div>
				<p class="w-72 text-center">
					Alternatively, you can import your apps from Steam.
					{#if !$settingsStore.steamId}
						Please set your Steam ID first.
					{/if}
					<button onclick={() => importApps($settingsStore.steamId)} class="!shadow-none text-blue-500 hover:underline">
						Import Steam apps
					</button>
					.
				</p>
			</div>
		</div>
	{:else}
		<div class="app-grid">
			<div
				class="trash-can"
				use:droppable={{ container: 'trash', callbacks: { onDrop: handleDelete } }}
			>
				<Trash2Icon class="h-12 w-12" />
			</div>
			{#each $appsStore as app, index (app.id)}
				{@const portraitUrl = format(APP_PORTRAIT_URL_TEMPLATE, { appId: app.id })}
				{@const headerUrl = format(APP_HEADER_URL_TEMPLATE, { appId: app.id })}
				<div use:droppable={{ container: index.toString(), callbacks: { onDrop: handleReorder } }}>
					<button
						use:draggable={{ container: index.toString(), dragData: app }}
						class="relative h-full !cursor-pointer rounded-sm shadow-md"
						onclick={() => copyPath(app)}
						title={app.name}
					>
						{#await fetch(portraitUrl) then _}
							<img src={portraitUrl} alt={app.name} />
						{:catch __}
							{#await fetch(headerUrl) then _}
								<img src={headerUrl} alt={app.name} />
							{:catch __}
								<div class="placeholder">
									<ImageOffIcon class="rounded-sm text-zinc-800" />
									<span>{app.name}</span>
								</div>
							{/await}
						{/await}
					</button>
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
    .app-grid {
        @apply my-4 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8;
    }

    button {
        @apply relative h-full cursor-pointer rounded-sm shadow-md;
    }

    img {
        @apply aspect-portrait h-full rounded-sm object-cover;
        @apply transition-transform duration-200;
    }

    .placeholder {
        @apply flex aspect-portrait h-full flex-col items-center justify-center rounded-sm bg-zinc-400;
    }

    .trash-can {
        @apply flex h-full w-full items-center justify-center bg-zinc-200;
        @apply rounded-sm border-2 border-red-400 text-red-500 shadow-md;
    }
</style>
