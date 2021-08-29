<script lang="ts">
    export let position: [number, number];
</script>

<style>
    div.main {
        background-color: brown;
        width: 2cm;
        height: 2cm;
        border-radius: 1cm;
    }
</style>

<div class="main"
     style="transform: translate({position[0]}mm, {position[1]}mm)">

</div>