<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$lib/utils.js';
	import { SearchIcon, XIcon } from 'lucide-svelte';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined;
</script>

<div
	class={cn(
		'flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
>
	<SearchIcon class="text-muted-foreground h-4 w-4"/>
	<input
		type="search"
		bind:value
		{readonly}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
		on:wheel|passive
		{...$$restProps}
		class="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
	/>
	{#if value}
		<button
			type="button"
			on:click={() => (value = '')}
			class="flex items-center justify-center h-6 w-6 rounded-full bg-zinc-200 text-zinc-800 hover:bg-zinc-400 focus-visible:outline-none"
		>
			<XIcon class="h-4 w-4"/>
		</button>
	{/if}
</div>

<style>
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
</style>
