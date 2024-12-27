<script lang="ts">
	import { Settings2Icon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { appsStore, settingsStore } from '../stores';
	import { dialogState } from '$lib/state';
	import { importApps } from '$lib/stores/apps-store.js';

	function close() {
		dialogState.showSettingsDialog = false;
	}

	function reset() {
		$appsStore = [];
	}
</script>

<Dialog.Root bind:open={dialogState.showSettingsDialog}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })} title="Settings">
		<Settings2Icon class="h-4 w-4" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
			<Dialog.Description>Manage your settings here.</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-8">
			<div>
				<h2 class="text-lg font-medium">Steam ID</h2>
				<p class="text-muted-foreground text-sm mb-2">
					The Steam ID is used to generate the correct path to the screenshots folder of your Steam apps.
					Your Steam ID is securely stored in your browser and is not shared with anyone.
					<a
						href="/help/add-steamid"
						class="text-sm text-blue-500 hover:underline"
						onclick={() => close()}
					>
						Don't know your Steam ID?
					</a>
				</p>
				<Label for="name">Steam Id</Label>
				<Input id="name" bind:value={$settingsStore.steamId} class="col-span-3" required placeholder="Your Steam ID" />
			</div>
			<div>
				<h2 class="text-lg font-medium">App Management</h2>
				<div class="space-y-2 mb-6">
					<p class="text-muted-foreground text-sm">
						Here you can import all your apps from Steam. This will merge your current apps with the imported ones.
					</p>
					<Button on:click={() => importApps($settingsStore.steamId)} class="w-full">Import Apps</Button>
				</div>
				<div class="space-y-2 rounded border border-destructive p-4">
					<p>
						<span class="font-medium text-destructive">Warning:</span> This will remove all your apps.
						This action cannot be undone.
					</p>
					<div class="flex justify-end">
						<Button on:click={reset} variant="destructive">Remove All Apps</Button>
					</div>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
