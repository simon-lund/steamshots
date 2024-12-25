<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { CircleAlertIcon } from 'lucide-svelte';
	import { appStateStore } from '$lib/stores';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { HelpDialog, Search, SettingsDialog } from '$lib/components';
	import logo from '$lib/assets/logo.png';
	import githubMark from '$lib/assets/github-mark.png';

	import { injectAnalytics } from '@vercel/analytics/sveltekit'
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
			<img src={logo} alt="" class="h-10"/>
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
	{#if !$appStateStore.steamId}
		<div class="px-4 pt-4">
			<Alert.Root>
				<CircleAlertIcon class="h-4 w-4" />
				<Alert.Title>Steam ID required</Alert.Title>
				<Alert.Description>
					Add your Steam ID in the settings dialog, so the app can generate the correct path
					to the screenshots folder of your Steam apps.
					See the help dialog for more on how to find your Steam ID.
				</Alert.Description>
			</Alert.Root>
		</div>
	{/if}

	{@render children()}

	<footer class="flex justify-center px-4 py-2">
		<span class="text-sm text-muted-foreground">Click cover to copy path to clipboard.</span>
	</footer>
</div>
