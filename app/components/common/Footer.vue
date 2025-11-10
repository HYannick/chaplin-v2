<template>
  <div class="bg-zinc-200 mb-24 md:h-[400px] relative rounded-lg mt-20 overflow-hidden">
    <div class="bg-zinc-100 p-10 rounded md:absolute md:top-1/2 md:right-10 md:-translate-y-1/2 z-20">
       <h3 class="text-3xl">Cinéma Charlie Chaplin</h3>
      <p class="text-zinc-400">Espace François Mitterrand</p>
      <p>Place Centenaire</p>
      <p>73800 Montmélian</p>
      <p>Mail: cinemachaplin@gmail.com</p>
      <p>Tel: 04 79 84 74 59</p>
    </div>
    <LMap
        class="hidden md:block relative z-10"
        ref="map"
        :zoom="16"
        :center="[45.5006853, 6.0477747]"
        :use-global-leaflet="false"
    >
      <LMarker
          :lat-lng="[45.5006853, 6.0477747]"/>
      <LTileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
      />
    </LMap>
  </div>
  <p>Crafted by <a href="https://ayho.dev" class="underline" target="_blank">Ayho</a> for Cinema Chaplin Montmelian</p>
</template>
<script setup lang="ts">
</script>