<script lang="ts">
	import { Settings2Icon } from 'lucide-svelte';
	import {
		Button,
		buttonVariants
	} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { appStateStore } from '../stores';
	import { dialogState } from '$lib/state';

	let userId = $state($appStateStore.steamId || '');

	async function save(e) {
		e.preventDefault();
		$appStateStore.steamId = userId;
		close();
	}

	function close() {
		dialogState.showSettingsDialog = false;
	}
</script>

<Dialog.Root bind:open={dialogState.showSettingsDialog}>
	<Dialog.Trigger class={buttonVariants({ variant: "outline", size: "icon" })} title="Settings">
		<Settings2Icon class="h-4 w-4" />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
			<Dialog.Description>
				<p>
					Please add your Steam ID.
					<a href="/help/add-steamid" class="text-blue-500 hover:underline" onclick={() => close()}>Don't know your Steam ID?</a>
				</p>
			</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={save}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Steam Id</Label>
					<Input id="name" bind:value={userId} class="col-span-3" required />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>