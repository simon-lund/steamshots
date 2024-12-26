<script lang="ts">
	import { CopyIcon, ImageOffIcon, Trash2Icon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import format from 'string-template';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { appsStore, appStateStore } from '$lib/stores';
	import type { TApp } from '$lib/types';
	import { Settings2Icon } from 'lucide-svelte';
	import { dialogState } from '$lib/state';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CopyToast from '$lib/components/copy-toast.svelte'
	import {
		APP_HEADER_URL_TEMPLATE,
		APP_PORTRAIT_URL_TEMPLATE,
		STEAM_SCREENSHOTS_PATH_TEMPLATE
	} from '$lib/constants';
	import { Button } from '$lib/components/ui/button';
	import { toSteamID3 } from '$lib/utils.js';

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
		let screenshotsPath = format(STEAM_SCREENSHOTS_PATH_TEMPLATE, {
			steamID3: $appStateStore.steamId ? toSteamID3($appStateStore.steamId) : '<STEAM_ID3>',
			appId: app.id
		});
		navigator.clipboard.writeText(screenshotsPath);
		toast(CopyToast, { appName: app.name });
	}
</script>

{#if !$appStateStore.steamId}
	<div class="mx-auto w-full max-w-screen-2xl px-4 pt-4">
		<Alert.Root>
			<Settings2Icon class="h-4 w-4" />
			<Alert.Title>Add Your Steam ID</Alert.Title>
			<Alert.Description class="space-y-2">
				<p>
					Please add your Steam ID so the app can generate the correct path to the screenshots
					folder of your Steam apps. Your Steam ID is securely stored in your browser and is not
					shared with anyone.
					<a href="/help/add-steamid" class="text-blue-500 hover:underline"
						>Don't know your Steam ID?</a
					>
				</p>
				<Button onclick={() => (dialogState.showSettingsDialog = true)}>Add Steam ID</Button>
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<main class="mx-auto w-full max-w-screen-2xl grow px-4">
	<div class="app-grid">
		{#if $appsStore.length > 0}
			<div
				class="trash-can"
				use:droppable={{ container: 'trash', callbacks: { onDrop: handleDelete } }}
			>
				<Trash2Icon class="h-12 w-12" />
			</div>
		{/if}
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
