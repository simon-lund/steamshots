<script>
	import { STEAM_SCREENSHOTS_PATH_TEMPLATE } from '$lib/constants';
	import steamId from '$lib/assets/steam-id.png';
	import format from 'string-template';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { ArrowLeftIcon } from 'lucide-svelte';

	let examplePath = format(STEAM_SCREENSHOTS_PATH_TEMPLATE, { steamId: '<STEAM_ID3>', appId: '<APP_ID>' });
</script>

<div class="max-w-screen-md w-full px-4 pt-8 pb-16 mx-auto">
	<a href="/" class={buttonVariants({})}>
		<ArrowLeftIcon class="h-4 w-4" />
		Back
	</a>
</div>
<article class="grow max-w-screen-md w-full px-4 mx-auto prose mb-32">
	<h1>Add Your Steam ID</h1>
	<h2>Steam ID</h2>
	<p>
		Your Steam ID is a unique identifier that is used to identify your account on Steam.
		A variant of the Steam ID (Steam ID3) is also used in the path to the screenshots folder of your Steam app which looks like this:
		<code>{examplePath}</code>.
		Hence, you need to add your Steam ID in the settings dialog, so the app can generate the correct path to the
		screenshots folder with the Steam ID3 automatically derived from your Steam ID.
		If you don't add it, a placeholder will be added instead of the Steam ID in a copied path.
	</p>

		<h2>How to find your Steam ID</h2>
		<p>
			Open the Steam client and click on your name in the top right corner, which opens a dropdown.
			From there, click on the menu item <span class="font-medium">Account details</span> which will open a new window.
			Your Steam ID is displayed at the top of the page as shown in the screenshot below.
		</p>

		<img src={steamId} alt="Steam ID" class="w-full" />

		<p>
			Copy the Steam ID and paste it into the settings dialog of this app.
			You can find the settings dialog by clicking on the settings icon in the top right corner of the app.
		</p>
	</article>
