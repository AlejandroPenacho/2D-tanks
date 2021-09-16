<script lang="ts">
    import Tank from "/src/svelte/Tank.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";
    import Effect from "./Effect.svelte";
    import AllMaps from "./../../maps/maps.svelte";

    import * as tnk from "./../ts/tank";
    import * as gm from "./../ts/game";
    import * as scn from "./../ts/scene";
    import * as maps from "./../../maps/maps";

    let map_chosen = 1;

    let scene = maps.all_maps[map_chosen];

    let view_port = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    let scene_dimensions = maps.all_maps[map_chosen].dimensions;
    let ratio = Math.min(view_port[0]/scene_dimensions[0], view_port[1]/scene_dimensions[1]);



    let player_list = [
            new tnk.Tank(scene.spawn_points[0], {
                up: "w",
                down: "s",
                right: "d",
                left: "a",
                shoot: " "
            }),
            new tnk.Tank(scene.spawn_points[1], {
               up: "ArrowUp",
               right: "ArrowRight",
               down: "ArrowDown",
               left: "ArrowLeft",
               shoot: "/"
           })
        ]
    //let gravity_well_list = [
    //    new ply.GravityWell([600, 600], 500)
    //];

    let game = new gm.Game(maps.all_maps[map_chosen], 
        player_list);


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
                    game.scenery.start_vibration();
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
        time_step = (time - frame_time)/1000;
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
    <AllMaps selected_map={map_chosen} ratio={ratio} game={game}/>
</div>
