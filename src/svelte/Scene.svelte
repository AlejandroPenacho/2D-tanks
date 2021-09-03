<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";

    import * as ply from "./../ts/player";
    import * as gm from "./../ts/game";
    import * as scn from "./../ts/scene";

    let scene;
    let scene_dim = [508, 285.75];
    let scene_offset = [0, 0];

    let player_list = [
            new ply.Tank([100,100], {
                up: "w",
                down: "s",
                right: "d",
                left: "a",
                shoot: " "
            }, scene_dim),
            new ply.Tank([300,200], {
                up: "ArrowUp",
                right: "ArrowRight",
                down: "ArrowDown",
                left: "ArrowLeft",
                shoot: "/"
            }, scene_dim)
        ]
    //let gravity_well_list = [
    //    new ply.GravityWell([600, 600], 500)
    //];

    let game = new gm.Game(new scn.Scene, player_list);


    let key_pressed = new Map();
    let shoot_keys = [];
    player_list.forEach((player) => {
        key_pressed[player.keys.up] = false;
        key_pressed[player.keys.down] = false;
        key_pressed[player.keys.right] = false;
        key_pressed[player.keys.left] = false;
        shoot_keys.push(player.keys.shoot);
    });

    document.onkeydown = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = true;
            let shooter = shoot_keys.indexOf(e.key);
            if (shooter !== -1) {
                game.projectiles.push(player_list[shooter].shoot())
                e.preventDefault();

            }
        }
    }

    document.onkeyup = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = false;
        }
    }

    requestAnimationFrame(frame);


    let frame_time = undefined;
    let time_step = undefined;

    function frame(time: number) {
        if (!frame_time) {
            frame_time = time;
        }
        time_step = time - frame_time;
        frame_time = time;

        game.get_frame(time_step, key_pressed);
        game = game;

        requestAnimationFrame(frame);
    }
</script>

<style>
    div.main {
        height: 90vh;
        width: 90vw;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
</style>

<div class="main">
    <svg
    width="{1920*0.5}"
    height="{1080*0.5}"
    viewBox="0 0 508 285.75"
    version="1.1"
    id="svg5"
    xmlns="http://www.w3.org/2000/svg">
    <defs
      id="defs2" />
   <g
      id="layer1">
     <rect
        style="opacity:1;fill:#755e74;fill-opacity:1;stroke:#000000;stroke-width:4.257;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
        id="rect846"
        width="507.45544"
        height="285.15356"
        x="0.36762181"
        y="0.60322702" />
     <rect
        style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:4.257;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
        id="rect2174"
        width="57.877335"
        height="60.396374"
        x="363.45953"
        y="152.77066" />

    {#each game.tanks as tank}
        <Player player={tank} />
    {/each}
    {#each game.projectiles as bullet}
        <Bullet bullet={bullet} />
    {/each}
   </g>
 </svg>
</div>
