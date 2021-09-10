<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";

    import * as tnk from "./../ts/tank";
    import * as gm from "./../ts/game";
    import * as scn from "./../ts/scene";

    let view_port = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    let scene_dimensions = [200, 150];
    let ratio = Math.min(view_port[0]/scene_dimensions[0], view_port[1]/scene_dimensions[1]);

    
    let scene_dim = [508, 285.75];


    let player_list = [
            new tnk.Tank([50,50], {
                up: "w",
                down: "s",
                right: "d",
                left: "a",
                shoot: " "
            }, scene_dim),
            new tnk.Tank([100,50], {
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
                let [canShoot, projectile] = game.tanks[shooter].shoot();
                if (canShoot){
                    game.projectiles.push(projectile);
                }
                e.preventDefault();
            }
        }

        if (e.key === "o"){
            console.log(game.tanks[0].state.position)
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
    width="{200*ratio}"
    height="{150*ratio}"
    viewBox="0 0 200 150"
    version="1.1"
    id="svg5"
    xmlns="http://www.w3.org/2000/svg">
   <defs
      id="defs2" />
   <rect
      style="opacity:1;fill:#91c169;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
      id="rect2885"
      width="200.13882"
      height="150.09895"
      x="-0.020740176"
      y="0.066525087" />
   <rect
      style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.47377;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
      id="rect3231"
      width="31.09374"
      height="32.512115"
      x="130.07704"
      y="83.012444" />
    {#each game.tanks as tank}
        <Player player={tank} />
    {/each}
    {#each game.projectiles as bullet}
        <Bullet bullet={bullet} />
    {/each}
 </svg>
</div>
