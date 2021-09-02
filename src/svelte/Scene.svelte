<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";

    import * as ply from "./../ts/player";
    import * as cls from "./../ts/collision";
    import { onMount } from "svelte";

    let scene;
    let scene_dim = [10000, 10000];
    let scene_offset = [0, 0];

    let player_list = [
            new ply.Tank([100,100], {
                up: "w",
                down: "s",
                right: "d",
                left: "a",
                shoot: " "
            }, scene_dim),
            new ply.Tank([800,400], {
                up: "ArrowUp",
                right: "ArrowRight",
                down: "ArrowDown",
                left: "ArrowLeft",
                shoot: "/"
            }, scene_dim)
        ]
    let bullet_list = [];
    let gravity_well_list = [
        new ply.GravityWell([600, 600], 500)
    ];

    let scene_colliders = [];

    onMount(()=> {
        scene_dim = [scene.clientWidth, scene.clientHeight];
        scene_offset = [scene.getBoundingClientRect().left, scene.getBoundingClientRect().top];
        player_list = [
            new ply.Tank( [100,100], {
                up: "w",
                down: "s",
                right: "d",
                left: "a",
                shoot:" "
            }, scene_dim),
            new ply.Tank([800, 400], {
                up: "ArrowUp",
                right: "ArrowRight",
                down: "ArrowDown",
                left: "ArrowLeft",
                shoot: "/"
            }, scene_dim)
        ];
        scene_colliders = [
            new cls.LineCollider(() => [0,0],               () => [scene_dim[0],0],             () => [0,0], () => {}),
            new cls.LineCollider(() => [0,0],               () => [0,scene_dim[1]],             () => [0,0], () => {}),
            new cls.LineCollider(() => [scene_dim[0],0],    () => [0,scene_dim[1]],             () => [0,0], () => {}),
            new cls.LineCollider(() => [0,scene_dim[1]],    () => [scene_dim[0], 0],            () => [0,0], () => {})
        ];
    });


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
                bullet_list.push(player_list[shooter].shoot())
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

        player_list.forEach((x) => {x.update_frame(time_step, key_pressed)});
        bullet_list.forEach((x) => {x.get_gravity_influence(gravity_well_list, time_step);  x.update_frame(time_step, key_pressed)});
        bullet_list = bullet_list.filter((x) => {
            return !((x.position[0] < 0) || (x.position[0] > scene_dim[0]) || (x.position[1] < 0) || (x.position[1] > scene_dim[1]))
        })
        cls.compute_collision(player_list[0].collision_blocks[0], player_list[1].collision_blocks[0]);
        scene_colliders.forEach((x) => {
            cls.compute_collision(x, player_list[0].collision_blocks[0]),
            cls.compute_collision(x, player_list[0].collision_blocks[0])
        });
        player_list = player_list;
        requestAnimationFrame(frame);
    }
</script>

<style>
    div.main {
        background-color: aqua;
        height: 90vh;
        width: 90vw;
        margin: auto;
        position: relative;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: none;
    }
</style>

<div class="main"
     bind:this={scene} 
     on:mousemove={(e) => {
         gravity_well_list[0].position = [e.clientX-scene_offset[0], e.clientY-scene_offset[1]]
         gravity_well_list = gravity_well_list;
         }}>
    {#each player_list as player}
        <Player player={player}/>
    {/each}
    {#each bullet_list as bullet}
        <Bullet bullet={bullet} />
    {/each}
    {#each gravity_well_list as well}
        <div style="height: 1cm; 
                    width: 1cm; 
                    position: absolute;
                    transform: translate({well.position[0]}px, {well.position[1]}px) translate(-50%, -50%);
                    background-color: red;
                    border-radius: 5mm">
        </div>
    {/each}
</div>
