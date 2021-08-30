<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";

    import * as ply from "./../ts/player";
    import { onMount } from "svelte";

    let scene;
    let scene_dim = [10000, 10000];
    let scene_offset = [0, 0];

    let player_list = [
        new ply.Player(['w','d','s','a'], scene_dim),
        new ply.Player(["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"], scene_dim)
    ];
    let bullet_list = [];

    onMount(()=> {
        scene_dim = [scene.clientWidth, scene.clientHeight];
        scene_offset = [scene.getBoundingClientRect().left, scene.getBoundingClientRect().top];
        player_list = [
            new ply.Player(['w','d','s','a'], scene_dim),
            new ply.Player(["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"], scene_dim)
        ]
    });



    let mouse_position = [0, 0];

    let mousemove_fun = (e) => {
        mouse_position = [e.clientX - scene_offset[0], 
                          e.clientY - scene_offset[1]
                        ];
        player_list.forEach((player) => {
            player.angle = Math.atan2((mouse_position[1]-player.position[1]),mouse_position[0]-player.position[0]) * 180/Math.PI;
        });
    };



    let key_pressed = {};
    player_list.forEach((player) => {
        player.keys.forEach( (key) => {
            key_pressed[key] = false;
        })
    })

    document.onkeydown = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = true;
            update_speed();
        }
    }

    document.onkeyup = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = false;
            update_speed();
        }
    }

    function update_speed(){
        player_list.forEach((x) => {x.update_speed(key_pressed)});
    }

    requestAnimationFrame(frame);

    function shoot(player_index: number) {
        bullet_list.push(player_list[player_index].shoot());
    }


    let frame_time = undefined;
    let time_step = undefined;

    function frame(time: number) {
        if (!frame_time) {
            frame_time = time;
        }
        time_step = time - frame_time;
        frame_time = time;

        player_list.forEach((x) => {x.update_frame(time_step)});
        bullet_list.forEach((x) => {x.update_frame(time_step)});
        player_list = player_list;
        bullet_list = bullet_list;
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
    }
</style>

<div class="main" on:click={() => {shoot(0)}} on:mousemove={mousemove_fun} bind:this={scene}>
    {#each player_list as player}
        <Player player={player}/>
    {/each}
    {#each bullet_list as bullet}
        <Bullet bullet={bullet} />
    {/each}
</div>
