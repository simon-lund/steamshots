<script lang="ts">
	import { Settings2Icon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { appsStore, settingsStore } from '../stores';
	import { dialogState } from '$lib/state';

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
		<div class="space-y-4">
			<div>
				<Label for="name">Steam Id</Label>
				<Input id="name" bind:value={$settingsStore.steamId} class="col-span-3" required placeholder="Your Steam ID" />
				<a
					href="/help/add-steamid"
					class="text-sm text-blue-500 hover:underline"
					onclick={() => close()}
				>
					Don't know your Steam ID?
				</a>
			</div>
			<div class="space-y-2 rounded border border-destructive p-4">
				<p>
					<span class="font-medium text-destructive">Warning:</span> This will remove all your apps.
					This action cannot be undone.
				</p>
				<Button on:click={reset} variant="destructive">Remove All Apps</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
