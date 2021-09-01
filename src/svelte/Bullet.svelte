<script lang="ts">
    export let bullet;
</script>

<style>
    div.main {
        height: 2cm;
        width: 2cm;
        position: absolute;
    }
    img {
        width: 100%;
        height: 100%;
    }
</style>

<div class='main'
     style="transform: translate({bullet.position[0]}px, {bullet.position[1]}px)
            translate(-50%, -50%) 
            rotate({bullet.angle}deg)">
        <img src="/assets/bullet.svg" alt="bullet"/>
</div>