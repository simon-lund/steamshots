<script lang="ts">
	import { CopyIcon } from 'lucide-svelte';

	export let toast: { appName: string };

</script>

<style>
		.toast {
				@apply flex flex-col gap-2;
		}
    kbd {
        @apply bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100;
    }
</style>

<div class="toast">
	<div class="flex gap-2 items-center">
		<CopyIcon class="min-h-4 h-4 min-w-4 w-4 inline-block text-green-500" strokeWidth="3" />
		<span><strong>{toast.appName}</strong> copied to clipboard.</span>
	</div>
	<ul class="text-muted-foreground text-sm list-decimal list-inside">
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
