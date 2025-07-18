<script setup lang="ts">
import {LucideFacebook, LucideLink} from 'lucide-vue-next';


</script>

<template>
  <NuxtLink to="/">
    <img src="/mini_logo.png" alt="Logo" class="absolute left-36 top-14 h-14 w-14">
  </NuxtLink>
  <ul class="flex space-y-1 flex-col justify-end text-end font-bold text-xl ">
    <li class="text-zinc-700 hover:text-zinc-950">
      <NuxtLink to="/">Accueil</NuxtLink>
    </li>
    <li class="text-zinc-700 hover:text-zinc-950">
      <NuxtLink to="/a-propos">Le Cinéma</NuxtLink>
    </li>
    <li class="text-zinc-700 hover:text-zinc-950">
      <NuxtLink to="/tarifs">Tarifs</NuxtLink>
    </li>
  </ul>
  <ul class="flex space-y-5 flex-col justify-end w-full font-bold text-xl mt-20">
    <li class="text-zinc-700 hover:text-zinc-950 flex justify-end">
      <a href="https://www.facebook.com/CinemaMontmelianCharlieChaplin" target="_blank" class="flex items-center justify-center rounded-full border p-2 w-12 h-12">
        <LucideFacebook  class="-ml-[1px]"/>
      </a>
    </li>
    <li class="text-zinc-700 hover:text-zinc-950 flex justify-end">
      <a href="https://montmelian.com/cinema-charlie-chaplin/" target="_blank" class="flex items-center justify-center rounded-full border p-2 w-12 h-12">
        <LucideLink />
      </a>
    </li>
  </ul>
</template>