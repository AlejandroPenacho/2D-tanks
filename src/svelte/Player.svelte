<script lang="ts">
    export let player;

</script>


<svg
   width="10"
   height="10"
   transform="translate({player.state.position[0]-5}, {player.state.position[1]-5}) rotate({player.state.angle}, 5,5)"
   viewBox="0 0 100 100"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <g
     id="layer1">
    <rect
       style="fill:#a11515;fill-opacity:1;stroke-width:4.66528;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
       id="rect934-3"
       width="99.60498"
       height="51.825569"
       x="0.22578681"
       y="24.09931" />
    <rect
       style="opacity:1;fill:#ff0000;stroke-width:3.63813;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
       id="rect934"
       width="99.60498"
       height="31.516951"
       x="0.22578135"
       y="34.25362" />
   <rect
      style="fill:#7bff00;stroke-width:3.63813;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke;fill-opacity:1"
      id="rect934-6"
      width="{99.60498*player.state.health/100}"
      height="31.516951"
      x="0.22578049"
      y="34.253616"/>
    <g
       id="g2264"
       transform="matrix(-0.64767373,0,0,-1,98.747466,134.26228)">
      <ellipse
         style="opacity:1;fill:#000000;stroke-width:0.698025;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
         id="path1011"
         cx="79.505013"
         cy="83.71196"
         rx="12.056511"
         ry="6.6418471" />
      <rect
         style="opacity:1;fill:#000000;stroke-width:0.665001;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
         id="rect987"
         width="67.227356"
         height="13.225172"
         x="12.702818"
         y="77.151474"
         ry="0.54323983" />
      <rect
         style="opacity:1;fill:#943232;fill-opacity:1;stroke-width:0.676648;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke"
         id="rect1115"
         width="78.226486"
         height="4.4820099"
         x="12.747277"
         y="81.625122"
         ry="0.54323983" />
    </g>
    <text
    xml:space="preserve"
    style="font-style:normal;font-weight:normal;font-size:400px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:10"
    x="37.467072"
    y="-5.0355473"
    id="text11807"
    transform="rotate(90)"><tspan
      id="tspan11805"
      style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:40px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:10"
      x="37.467072"
      y="-5.0355473">{player.ammo}</tspan></text>
  </g>
</svg>
