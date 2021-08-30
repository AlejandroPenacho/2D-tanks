<script lang="ts">
    export let player;

</script>

<style>
    div.main {
        width: 2cm;
        height: 2cm;
        position: absolute;
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
                       rotate({player.angle}deg)">
    <img src="/assets/player.svg" alt="Me" />
    <img src="/assets/gun.svg" alt="Gun" />
</div>