<script lang="ts">
	import { ImageOffIcon, Trash2Icon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import format from 'string-template';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { appsStore, appStateStore } from '$lib/stores';
	import type { TApp } from '$lib/types';
	import { APP_HEADER_URL_TEMPLATE, APP_PORTRAIT_URL_TEMPLATE, STEAM_SCREENSHOTS_PATH_TEMPLATE } from '$lib/constants';

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
			steamId: $appStateStore.steamId || '<STEAM_ID>',
			appId: app.id,
		});
		navigator.clipboard.writeText(screenshotsPath);
		toast.success(`Path for ${app.name} copied to clipboard`);
	}
</script>

<style>
    .app-grid {
        @apply grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 my-4;
    }

    button {
        @apply h-full cursor-pointer relative rounded-sm shadow-md;
    }

    img {
        @apply h-full aspect-portrait object-cover rounded-sm;
        @apply transition-transform duration-200;
    }

    .placeholder {
        @apply flex flex-col items-center justify-center h-full aspect-portrait rounded-sm bg-zinc-400;
    }

    .trash-can {
        @apply flex h-full w-full bg-zinc-200 items-center justify-center;
        @apply border-2 rounded-sm shadow-md text-red-500 border-red-400 ;
    }
</style>


<main class="grow px-4">
	<div class="app-grid">
		<div class="trash-can" use:droppable={{ container: 'trash', callbacks: { onDrop: handleDelete } }}>
			<Trash2Icon class="h-12 w-12" />
		</div>
		{#each $appsStore as app, index (app.id)}
			{@const portraitUrl = format(APP_PORTRAIT_URL_TEMPLATE, { appId: app.id })}
			{@const headerUrl = format(APP_HEADER_URL_TEMPLATE, { appId: app.id })}
			<div use:droppable={{ container: index.toString(), callbacks: { onDrop: handleReorder } }}>
				<button
					use:draggable={{ container: index.toString(), dragData: app}}
					class="h-full !cursor-pointer relative rounded-sm shadow-md"
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

