<script lang="ts">
    import Player from "/src/svelte/Player.svelte";
    import * as ply from "./../ts/player";
    import { onMount } from "svelte";

    let scene;
    let scene_dim = [10000, 10000];

    let player_list = [
        new ply.Player(['w','d','s','a'], scene_dim),
        new ply.Player(["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"], scene_dim)
    ];

    onMount(()=> {
        scene_dim = [scene.clientWidth, scene.clientHeight];
        player_list = [
            new ply.Player(['w','d','s','a'], scene_dim),
            new ply.Player(["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"], scene_dim)
        ]
    });



    let mouse_position = [0, 0];

    let mousemove_fun = (e) => {
        mouse_position = [e.clientX - e.target.getBoundingClientRect().left, 
                          e.clientY - e.target.getBoundingClientRect().top];
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

    let frame_time = undefined;
    let time_step = undefined;

    function frame(time: number) {
        if (!frame_time) {
            frame_time = time;
        }
        time_step = time - frame_time;
        frame_time = time;

        player_list.forEach((x) => {return x.update_frame(time_step)});
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
    }
</style>

<div class="main" on:mousemove={mousemove_fun} bind:this={scene}>
    {#each player_list as player}
        <Player player={player} mouse_pos={mouse_position}/>
    {/each}
</div>
