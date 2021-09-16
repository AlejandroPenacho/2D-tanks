<script lang="ts">
    import Map_1 from "./basic_map/basic_map.svelte";
    import Map_2 from "./new_map/new_map.svelte";


    export let ratio;
    export let selected_map: number;
    export let game;
</script>

{#if selected_map === 0}
    <Map_1 game={game} ratio={ratio}/>
{:else if selected_map === 1}
    <Map_2 game={game} ratio={ratio}/>
{/if}