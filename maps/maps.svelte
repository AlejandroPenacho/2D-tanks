<script lang="ts">
    import Map_1 from "./basic_map/basic_map.svelte";

    export let selected_map: number;
    export let game;
</script>

{#if selected_map === 1}
    <Map_1 game={game}/>
{/if}