<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import Bullet from "/src/svelte/Bullet.svelte";

    import * as ply from "./../ts/player";
    import { onMount } from "svelte";

    let scene;
    let scene_dim = [10000, 10000];
    let scene_offset = [0, 0];

    let player_list = [
            new ply.Tank({
                up: "w",
                down: "s",
                right: "d",
                left: "a"
            }, scene_dim),
            new ply.Tank({
                up: "ArrowUp",
                right: "ArrowRight",
                down: "ArrowDown",
                left: "ArrowLeft"
            }, scene_dim)
        ]
    let bullet_list = [];

    onMount(()=> {
        scene_dim = [scene.clientWidth, scene.clientHeight];
        scene_offset = [scene.getBoundingClientRect().left, scene.getBoundingClientRect().top];
        player_list = [
            new ply.Tank({
                up: "w",
                down: "s",
                right: "d",
                left: "a"
            }, scene_dim),
//            new ply.Tank({
//                up: "ArrowUp",
 //               right: "ArrowRight",
//                down: "ArrowDown",
//                left: "ArrowLeft"
//            }, scene_dim)
        ]
    });


    let key_pressed = new Map();
    player_list.forEach((player) => {
        key_pressed[player.keys.up] = false;
        key_pressed[player.keys.down] = false;
        key_pressed[player.keys.right] = false;
        key_pressed[player.keys.left] = false;
    })

    document.onkeydown = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = true;
        }
    }

    document.onkeyup = (e) => {
        if (!e.repeat) {
            key_pressed[e.key] = false;
        }
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

        player_list.forEach((x) => {x.update_frame(time_step, key_pressed)});
        bullet_list.forEach((x) => {x.update_frame(time_step, key_pressed)});
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

<div class="main" on:click={() => {shoot(0)}} bind:this={scene}>
    {#each player_list as player}
        <Player player={player}/>
    {/each}
    {#each bullet_list as bullet}
        <Bullet bullet={bullet} />
    {/each}
</div>
