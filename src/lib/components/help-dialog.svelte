<script lang="ts">
	import {
		buttonVariants
	} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { appStateStore } from '../stores';
	import { onMount } from 'svelte';

	let open = $state(false);

	onMount(() => {
		if ($appStateStore.isNewApp) {
			open = true;
			$appStateStore.isNewApp = false;
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: "outline", size: "icon" })} title="Help">
		?
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[625px] max-h-screen overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Help</Dialog.Title>
			<Dialog.Description>
				Notes and instructions on how to use this app.
			</Dialog.Description>
		</Dialog.Header>
		<article class="prose-sm">
			<h2>Welcome</h2>
			<p>
				Welcome to Steamshots, a simple app to help you find your Steam screenshots.
				This app is not affiliated with Steam or Valve Corporation.
			</p>
			<h2>Why this app?</h2>
			<p>
				This app is a replacement for the Steam screenshot button, which was removed for unknown reasons.
				The problem is that steam screenshots are stored by app ID, which makes it hard to find the screenshots you want.
				While it is not as convenient as the built-in feature, it is better than nothing.
			</p>
			<h2>How to use?</h2>
			<ul class="list-disc">
				<li>
					<strong>Search:</strong>
					Open the app search dialog by clicking the plus icon in the top right corner (or press ctrl + j).
					Search for the apps you want and click on them to add them to the list.
				</li>
				<li>
					<strong>Manage:</strong>
					Once you have added an app, you can drag and drop it to reorder the list or delete it by dragging it to the trash can icon.
				</li>
				<li>
					<strong>Copy path:</strong>
					Click on an app to copy the path to the screenshots folder. You can then paste it into the search bar of your file explorer.
					Hit enter and you will be taken directly to the folder where the screenshots are stored.
				</li>
			</ul>
			<h2>Privacy</h2>
			<p>
				This app does not collect any personal data.
				Your Steam ID is stored locally in your browser and is not shared with anyone.
				However, we do use Vercel Analytics to collect anonymous data about how the app is used.
			</p>
			<h2>Feedback</h2>
			<p>
				If you have any feedback or suggestions, please create an
				<a href="https://github.com/simon-lund/steamshots/issues/new" class="text-blue-500 hover:underline"
					 target="_blank" rel="noopener noreferrer">issue on GitHub</a>.
		</article>
	</Dialog.Content>
</Dialog.Root>