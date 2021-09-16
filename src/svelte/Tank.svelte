<script lang="ts">

   import Cannon from "./Cannon.svelte";

    export let player;

</script>


<svg
   width="10"
   height="10"
   transform="translate({player.state.position[0]-5}, {player.state.position[1]-5}) rotate({player.state.angle}, 5,5)"
   viewBox="0 0 10 10"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
   <defs
   id="defs2">
  <clipPath
     clipPathUnits="userSpaceOnUse"
     id="clipPath1526">
    <path
       id="path1528"
       style="fill:#000000;fill-opacity:0.47553;stroke:#000000;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
       d="m 0.47453442,2.3126598 v 1.019576 H 0.03063381 v 3.325895 H 0.47453442 V 7.6777069 H 9.5380638 V 6.6581308 H 9.981964 V 3.3322358 H 9.5380638 v -1.019576 z" />
  </clipPath>
  <filter
     style="color-interpolation-filters:sRGB"
     id="filter1531"
     x="-0.017989474"
     y="-0.018133324"
     width="1.0359789"
     height="1.0362666">
    <feGaussianBlur
       stdDeviation="0.096255706"
       id="feGaussianBlur1533" />
  </filter>
</defs>
<g
   id="layer1">
  <g
     id="g3388"
     style="stroke:#000000;stroke-width:0.1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1">
    <rect
       style="fill:#6c1100;fill-opacity:1;stroke:#000000;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
       id="rect910"
       width="9.0635061"
       height="5.3654895"
       x="0.47459996"
       y="2.3122754"
       ry="0" />
    <g
       id="g4231">
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 8.0053485,7.6565586 V 2.2810252"
         id="path3423-6-3-2" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 8.7771237,7.6361823 V 2.2606489"
         id="path3423-7-5-6" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 7.256052,7.645974 V 2.2704406"
         id="path3423-5-6" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 6.4842768,7.6663503 V 2.2908169"
         id="path3423-6-3-7" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 5.7349803,7.6557657 V 2.2802323"
         id="path3423-7-1" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 4.9632051,7.676142 V 2.3006086"
         id="path3423-6-9" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 4.2139086,7.6655574 V 2.290024"
         id="path3423-7-5" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 3.4421334,7.6859337 V 2.3104003"
         id="path3423-6-3" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 2.6928369,7.6753491 V 2.2998157"
         id="path3423-7" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 1.9210617,7.6957254 V 2.320192"
         id="path3423-6" />
      <path
         style="fill:none;stroke:#000000;stroke-width:0.1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 1.1717652,7.6851408 V 2.3096074"
         id="path3423" />
    </g>
  </g>
  <rect
     style="display:inline;fill:#140be1;fill-opacity:1;stroke:#000000;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
     id="rect910-3"
     width="9.9512215"
     height="3.3255694"
     x="0.030742705"
     y="3.3322358"
     ry="0" />
  <g
     id="g3388-3"
     style="stroke:#000000;stroke-width:0.1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     transform="translate(1.1650075,-6.135557)" />

  <Cannon />

  <g
  id="g1498"
  clip-path="url(#clipPath1526)">
  {#each player.damaged_points as mark}
    <path
      style="opacity:0.818874;fill:#ff0010;fill-opacity:0.967658;stroke:none;stroke-width:0.377953;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke;filter:url(#filter1531)"
      id="path4342"
      d="m 19.358104,22.134354 1.406723,2.686743 -2.580726,-1.592895 0.10168,3.031027 -1.634023,-2.554884 -1.223503,2.774978 -0.363681,-3.010846 -2.306356,1.96931 0.978692,-2.870474 -2.932406,0.773597 2.127223,-2.161569 -2.9776585,-0.575337 2.8544315,-1.024539 -2.433148,-1.810318 3.016285,0.315413 -1.406724,-2.686743 2.580726,1.592895 -0.101679,-3.031027 1.634023,2.554884 1.223502,-2.774978 0.363682,3.010846 2.306355,-1.96931 -0.978691,2.870474 2.932406,-0.773597 -2.127223,2.161569 2.977658,0.575337 -2.854431,1.024539 2.433148,1.810318 z"
      transform="matrix(0.32521578,0,0,0.32521578,{mark[0]},{mark[1]})"/>
   {/each}
   </g>
</g>
</svg>
