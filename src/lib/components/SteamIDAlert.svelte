<script>
	import { Settings2Icon } from 'lucide-svelte';
	import { dialogState } from '$lib/state';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { settingsStore } from '$lib/stores';

	let steamId = $state('')

	function save(e) {
		e.preventDefault()
		$settingsStore.steamId = steamId
	}
</script>

{#if !$settingsStore.steamId}
	<div class="mx-auto w-full max-w-screen-sm px-4 pt-4">
		<Alert.Root>
			<Settings2Icon class="h-4 w-4" />
			<Alert.Title>Add Your Steam ID</Alert.Title>
			<Alert.Description class="space-y-2">
				<p>
					Please add your Steam ID so the app can generate the correct path to the screenshots
					folder of your Steam apps. Your Steam ID is securely stored in your browser and is not
					shared with anyone.
					<a href="/help/add-steamid" class="text-blue-500 hover:underline">
						Don't know your Steam ID?
					</a>
				</p>
				<form class="flex flex-col md:flex-row gap-2" onsubmit={save}>
					<Input id="name" bind:value={steamId} class="grow" required placeholder="Your Steam ID" />
					<Button type="submit">Add Steam ID</Button>
				</form>
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}
