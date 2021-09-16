
<script lang="ts">
   import {Game} from "./../../src/ts/game";
   export let game: Game;
   export let ratio;
   import Tank from "./../../src/svelte/Tank.svelte";
   import Bullet from "./../../src/svelte/Bullet.svelte";
   import Effect from "./../../src/svelte/Effect.svelte";
   import DeadTank from "../../src/svelte/DeadTank.svelte";
</script>

<svg
   width="{199.99999*ratio}"
   height="{150*ratio}"
   viewBox="{game.scenery.vibration.displacement[0]} {game.scenery.vibration.displacement[1]} 199.99999 150"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <rect
     style="opacity:1;fill:#91c169;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
     id="scene"
     width="200.13882"
     height="150.09895"
     x="-0.020740176"
     y="0.066525087" />
  <rect
     style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.47377;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
     id="box"
     width="31.09374"
     height="32.512115"
     x="130.07704"
     y="83.012444" />
  <circle
     style="opacity:0;fill:#000000;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
     id="spawn1"
     cx="1.4677352"
     cy="0.79324073"
     r="6.5230851" />
  <circle
     style="opacity:0;fill:#000000;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
     id="spawn2"
     cx="183.4821"
     cy="136.57034"
     r="6.5230851" />

   {#each game.tanks as tank}
      <Tank player={tank} />
   {/each}
   {#each game.projectiles as bullet}
      <Bullet bullet={bullet} />
   {/each}
   {#each game.effects as effect}
      <Effect effect={effect} />
   {/each}
   {#each game.dead_tanks as dead_tank}
      <DeadTank dead_tank={dead_tank} />
   {/each}
</svg>