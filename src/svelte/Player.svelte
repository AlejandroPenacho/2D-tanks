<script lang="ts">
    export let player;
    export let mouse_pos;

    let angle = 0;

    $: angle = Math.atan2(-(mouse_pos[1]-player.position[1]),mouse_pos[0]-player.position[0]) * 180/Math.PI;
</script>

<style>
    div.main {
        width: 2cm;
        height: 2cm;
        position: relative;
    }
    img {
        height: 100%;
        width: 100%;
        position: absolute;
    }
</style>

<div class="main"
     style="transform: translate(-1cm, -1cm) 
                       translate({player.position[0]}px, {player.position[1]}px) 
                       rotate({-angle}deg)">
    <img src="/assets/player.svg" alt="Me" />
    <img src="/assets/gun.svg" alt="Gun" />
</div>