<script lang="ts">
   import {Projectile, ProjState} from "./../ts/projectile";
    export let bullet: Projectile;
</script>


<svg
   width="10"
   height="10"
   viewBox="0 0 100 100"
   transform="translate({bullet.position[0]-5}, {bullet.position[1]-5}) rotate({bullet.angle}, 5,5)"
   version="1.1"
   id="svg5"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs2">
    <linearGradient
       id="linearGradient1709">
      <stop
         style="stop-color:#ff0000;stop-opacity:1;"
         offset="0"
         id="stop1717" />
      <stop
         style="stop-color:#fdff00;stop-opacity:1"
         offset="1"
         id="stop1719" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1318">
      <path
         id="path1320"
         style="opacity:1;fill:#ff0000;stroke:#000000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
         d="m 68.244928,43.426805 a 9.3042641,5.0018928 0 0 0 -0.132292,0.0026 v -0.0016 H 28.972909 v 9.981819 H 67.44291 a 9.3042641,5.0018928 0 0 0 0.802018,0.02066 9.3042641,5.0018928 0 0 0 9.304343,-5.001763 9.3042641,5.0018928 0 0 0 -9.304343,-5.001763 z" />
    </clipPath>
    <linearGradient
       xlink:href="#linearGradient1709"
       id="linearGradient1715"
       x1="34.555626"
       y1="49.230976"
       x2="80.611694"
       y2="48.699127"
       gradientUnits="userSpaceOnUse" />
    <filter
       style="color-interpolation-filters:sRGB"
       id="filter3036"
       x="-0.17555166"
       y="-0.85246553"
       width="1.3511033"
       height="2.7049311">
      <feGaussianBlur
         stdDeviation="3.5531922"
         id="feGaussianBlur3038" />
    </filter>
  </defs>
  <g
     id="layer1">
    <path
       id="flame"
       style="mix-blend-mode:normal;fill:url(#linearGradient1715);fill-opacity:{(bullet.state === ProjState.Alive)? 1: 0};stroke:none;stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke;filter:url(#filter3036)"
       d="m 68.37722,43.424221 a 9.3042641,5.0018928 0 0 0 -0.132292,0.0026 v -0.0016 H 29.105201 v 9.981819 h 38.470001 a 9.3042641,5.0018928 0 0 0 0.802018,0.02066 9.3042641,5.0018928 0 0 0 9.304343,-5.001763 9.3042641,5.0018928 0 0 0 -9.304343,-5.001763 z"
       clip-path="none"
       transform="matrix(1.5325491,0,0,1.4485257,-40.582153,-21.906842)" />
    <g
       id="g1497"
       style="stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1">
      <path
         id="path1414-3"
         style="fill:#ff6262;fill-opacity:1;stroke:#000000;stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
         d="m 68.37722,43.424221 a 9.3042641,5.0018928 0 0 0 -0.132292,0.0026 v -0.0016 H 29.105201 v 9.981819 h 38.470001 a 9.3042641,5.0018928 0 0 0 0.802018,0.02066 9.3042641,5.0018928 0 0 0 9.304343,-5.001763 9.3042641,5.0018928 0 0 0 -9.304343,-5.001763 z"
         clip-path="url(#clipPath1318)" />
      <path
         style="fill:#453a3a;fill-opacity:1;stroke:#000000;stroke-width:0.258348px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 32.490401,52.942462 4.415916,-8.995974 h 2.598564 l -3.916464,8.928406 z"
         id="path4901" />
      <path
         style="fill:#453a3a;fill-opacity:1;stroke:#000000;stroke-width:0.258348px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 39.191827,52.986782 4.415916,-8.995974 h 2.598564 l -3.916464,8.928406 z"
         id="path4901-1" />
      <path
         style="fill:#453a3a;fill-opacity:1;stroke:#000000;stroke-width:0.258348px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 45.730335,52.872481 4.415916,-8.995974 h 2.598564 l -3.916464,8.928406 z"
         id="path4901-2" />
      <path
         style="fill:#453a3a;fill-opacity:1;stroke:#000000;stroke-width:0.258348px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 52.259188,52.964952 4.415916,-8.995974 h 2.598564 l -3.916464,8.928406 z"
         id="path4901-7" />
      <path
         style="fill:#453a3a;fill-opacity:1;stroke:#000000;stroke-width:0.258348px;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 58.50199,52.88251 4.415916,-8.995974 h 2.598564 l -3.916464,8.928406 z"
         id="path4901-0" />
    </g>
  </g>
</svg>