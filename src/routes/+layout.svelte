<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	import { HelpDialog, Search, SettingsDialog } from '$lib/components';
	import logo from '$lib/assets/logo.png';
	import githubMark from '$lib/assets/github-mark.png';

	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';

	let { children } = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<style>
    header {
        @apply flex justify-between items-center h-16 px-4 border-b;
    }
</style>

<svelte:head>
	<title>Steamshots</title>
</svelte:head>

<Toaster />

<div class="min-h-screen flex flex-col">
	<header class="sticky top-0 z-10 bg-white">
		<div class="flex items-center gap-2">
			<img src={logo} alt="" class="h-10" />
			<span class="font-bold text-lg">Steamshots</span>
		</div>
		<div class="flex items-center gap-2">
			<Search />
			<HelpDialog />
			<SettingsDialog />
			<a
				href="https://github.com/simon-lund/steamshots"
				target="_blank" rel="noopener noreferrer"
				title="GitHub repository"
				class="ml-4"
			>
				<img src={githubMark} alt="" class="h-8 cursor-pointer" />
			</a>
		</div>
	</header>

	{@render children()}

	<footer class="flex justify-center px-4 py-2">
		<span class="text-sm text-muted-foreground">Click cover to copy path to clipboard.</span>
	</footer>
</div>
