<script lang="ts">
    import {
        buttonVariants
    } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import {appStateStore} from "../stores";
    import {onMount} from "svelte";

    let open = $state(false);

    onMount(() => {
        if ($appStateStore.isNewApp) {
            open = true;
            $appStateStore.isNewApp = false;
        }
    });
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger class={buttonVariants({ variant: "outline", size: "icon" })} title="Help">
        ?
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[625px] max-h-screen overflow-y-auto">
        <Dialog.Header>
            <Dialog.Title>Help</Dialog.Title>
            <Dialog.Description>
                Notes and instructions on how to use this app.
            </Dialog.Description>
        </Dialog.Header>
        <article class="prose-sm">
            <h2>Welcome</h2>
            <p>
                Welcome to Steamshots, a simple app to help you find your Steam screenshots.
                This app is not affiliated with Steam or Valve Corporation.
            </p>
            <h2>Why this app?</h2>
            <p>
                This app is a replacement for the Steam screenshot button, which was removed for unknown reasons.
                While it is not as convenient as the built-in feature, it is better than nothing.
            </p>
            <p>
                The problem is that steam screenshots are stored in a folder that is hard to find.
                Especially since the folder is named after the app id, which is not easy to remember.
            </p>
            <h2>Steam ID</h2>
            <p>
                You need to add your Steam ID in the settings dialog, so the app can generate the correct path to the screenshots folder.
                You can find your Steam ID by clicking on your name in the Steam client, which opens a dropdown.
                Click on "Account details" and you will find your Steam ID below the title "Account ...".
                Your Steam ID is only stored locally in your browser, we do not collect personal data.
            </p>
            <h2>How to use?</h2>
            <p>
                Open the app search dialog by clicking the plus icon in the top right corner.
                Search for the apps you want and click on them to add them to the list
                (Clicking on them again will remove them, if you accidentally added them).
            </p>
            <p>
                Once you have added the apps you want, you can click on them to copy the path to the screenshots folder.
                Drag and drop the apps to reorder them as you like.
                To delete an app, drag it to the trash can icon which will appear at the bottom of the screen when you start dragging.
            </p>
            <h2>Keyboard shortcuts</h2>
            <p>
                <kbd class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span class="text-xs">ctrl</span>
                    +
                    <span class="text-xs">J</span>
                </kbd>
                to open the search dialog.
            </p>
        </article>
    </Dialog.Content>
</Dialog.Root>