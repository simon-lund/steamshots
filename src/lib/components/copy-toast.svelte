<script lang="ts">
	import { CopyIcon } from 'lucide-svelte';

	export let toast: { appName: string };
</script>

<div class="toast">
	<div class="flex items-center gap-2">
		<CopyIcon class="inline-block h-4 min-h-4 w-4 min-w-4 text-green-500" strokeWidth="3" />
		<span><strong>{toast.appName}</strong> copied to clipboard.</span>
	</div>
	<ul class="list-inside list-decimal text-sm text-muted-foreground">
		<li>
			Open your file explorer (<kbd>&#x229E; Win</kbd> + <kbd>E</kbd>).
		</li>
		<li>
			Paste path in the address bar (<kbd>Ctrl</kbd> + <kbd>V</kbd>).
		</li>
		<li>
			Press <kbd>Enter</kbd>. Enjoy!
		</li>
	</ul>
</div>

<style>
	.toast {
		@apply flex flex-col gap-2;
	}
</style>
