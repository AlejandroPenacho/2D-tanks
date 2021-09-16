
<script lang="ts">
   import {Game} from "./../../src/ts/game";
   export let game: Game;
   export let ratio;
   import Tank from "./../../src/svelte/Tank.svelte";
   import Bullet from "./../../src/svelte/Bullet.svelte";
   import Effect from "./../../src/svelte/Effect.svelte";
</script>

<svg
   width="{300*ratio}"
   height="{200*ratio}"
   viewBox="{game.scenery.vibration.displacement[0]} {game.scenery.vibration.displacement[1]} 300 200"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <rect
     style="fill:#80ff00;stroke:#000000;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke;fill-opacity:1"
     id="rect1035"
     width="300"
     height="200"
     x="0"
     y="0" />
  <rect
     style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
     id="box1"
     width="31.988665"
     height="94.478546"
     x="31.927855"
     y="40.927376"
     ry="0" />
  <rect
     style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.36477;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
     id="box23"
     width="97.407692"
     height="27.761045"
     x="63.916519"
     y="107.64487"
     ry="0" />
  <rect
     style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.81242;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
     id="box3"
     width="16.581385"
     height="95.796867"
     x="219.66428"
     y="42.773502"
     ry="0" />
  <g
     id="g1770"
     style="opacity:0">
    <circle
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
       id="spawn1"
       cx="271.01892"
       cy="44.440346"
       r="14.218322" />
    <circle
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
       id="spawn2"
       cx="32.381557"
       cy="172.26077"
       r="14.218322" />
    <circle
       style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:bevel;paint-order:fill markers stroke"
       id="spawn3"
       cx="103.211"
       cy="74.852608"
       r="14.218322" />
  </g>

   {#each game.tanks as tank}
      <Tank player={tank} />
   {/each}
   {#each game.projectiles as bullet}
      <Bullet bullet={bullet} />
   {/each}
   {#each game.effects as effect}
      <Effect effect={effect} />
   {/each}
</svg>