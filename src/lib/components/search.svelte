<script lang="ts">
    import {onMount} from "svelte";
    import {CheckCheckIcon, ImageOffIcon, LoaderIcon, PlusIcon} from "lucide-svelte";
    import {appsStore} from "../stores";
    import format from "string-template";
    import * as Command from "$lib/components/ui/command/index.js";
    import {Button} from "$lib/components/ui/button";
    import {APP_HEADER_URL_TEMPLATE} from "$lib/constants";
    import _ from "lodash";
    import type {TSearchResult} from "$lib/types";

    const {debounce} = _;

    let searchResults = $state<TSearchResult[]>([])
    let loading = $state(false)
    let open = $state(false)

    // Search logic
    let search = $state("")
    const searchFn = debounce((query) => {
        if (query.length < 2) {
            return
        }

        loading = true
        fetch(`/api/search?q=${search}`)
            .then(response => response.json())
            .then(data => {
                searchResults = data
                loading = false
            })
    }, 500)
    $effect(() => searchFn(search));

    function add(result: TSearchResult) {
        // Remove app if clicked again
        if ($appsStore.find(app => app.id === result.item.appid)) {
            appsStore.update((apps) =>
                apps.filter(app => app.id !== result.item.appid)
            );
        } else {
            appsStore.update((apps) =>
                [...apps, {
                    id: result.item.appid,
                    name: result.item.name,
                }]
            );
        }
    }

    onMount(() => {
        searchResults = []

        function handleKeydown(e: KeyboardEvent) {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                open = !open;
            }
        }

        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

<Button variant="outline" size="icon" onclick={() => open = !open} title="Add (ctrl+j)">
    <PlusIcon class="h-4 w-4"/>
</Button>

<Command.Dialog bind:open shouldFilter={false}>
    <Command.Input placeholder="Type to search..." bind:value={search}/>
    <Command.List>
        {#if loading}
            <Command.Loading>
                <div class="flex px-4 gap-2 justify-center items-center py-6 text-sm">
                    <LoaderIcon class="h-4 w-4 animate-spin"/>
                    <span>Loading...</span>
                </div>
            </Command.Loading>
        {:else if searchResults.length === 0}
            <Command.Empty>No results found.</Command.Empty>
        {/if}
        {#each searchResults as result}
            {@const headerUrl = format(APP_HEADER_URL_TEMPLATE, {appId: result.item.appid})}
            <Command.Item onSelect={() => add(result)}>
                <div class="flex h-16 w-full justify-between">
                    <div class="flex gap-4">
                        {#await fetch(headerUrl) then _}
                            <img src={headerUrl} alt={result.item.name} class="h-full rounded-sm"/>
                        {:catch __}
                            <div class="flex items-center justify-center h-[64px] w-[136.93px] rounded-sm bg-zinc-400">
                                <ImageOffIcon class="rounded-sm text-zinc-800"/>
                            </div>
                        {/await}
                        <div class="flex flex-col justify-center">
                            <span class="font-bold">{result.item.name}</span>
                            <span class="text-muted-foreground text-xs">App ID: {result.item.appid}</span>
                        </div>
                    </div>
                    {#if $appsStore.find(app => app.id === result.item.appid)}
                        <div class="flex items-center justify-center pr-4" title="Already added">
                            <CheckCheckIcon class="h-6 w-6 text-primary"/>
                        </div>
                    {/if}
                </div>
            </Command.Item>
        {/each}
    </Command.List>
</Command.Dialog>




