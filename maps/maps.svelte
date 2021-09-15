<script lang="ts">
    import Map_1 from "./basic_map/basic_map.svelte";

    export let selected_map: number;
</script>

{#if selected_map === 1}
    <Map_1 />
{/if}