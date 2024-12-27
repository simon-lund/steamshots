<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	import { HelpDialog, AddDialog, SettingsDialog, SearchInput } from '$lib/components';
	import logo from '$lib/assets/logo.png';
	import githubMark from '$lib/assets/github-mark.png';

	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import { searchState } from '$lib/state';

	let { children } = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Steamshots</title>
</svelte:head>

<Toaster />

<div class="flex min-h-screen flex-col">
	<header class="sticky top-0 z-10 bg-white">
		<div class="flex items-center gap-2 order-1">
			<img src={logo} alt="" class="h-10" />
			<span class="text-lg font-bold">Steamshots</span>
		</div>
		<div class="grow max-w-screen-sm order-3 md:order-2 min-w-full md:min-w-fit">
			<SearchInput bind:value={searchState.search} placeholder="Search your library..." />
		</div>
		<div class="flex items-center gap-1 order-2 md:order-3">
			<AddDialog />
			<HelpDialog />
			<SettingsDialog />
			<a
				href="https://github.com/simon-lund/steamshots"
				target="_blank"
				rel="noopener noreferrer"
				title="GitHub repository"
				class="ml-4"
			>
				<img src={githubMark} alt="" class="h-8 cursor-pointer" />
			</a>
		</div>
	</header>

	{@render children()}

	<footer class="flex justify-center px-4 py-2">
		<span class="text-sm text-muted-foreground">Click app cover to copy path to clipboard.</span>
	</footer>
</div>

<style>
	header {
		@apply flex py-2 items-center justify-between border-b px-4 gap-x-8 gap-y-2 flex-wrap;
	}
</style>
