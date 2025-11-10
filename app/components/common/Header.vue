<script setup lang="ts">
import {LucideFacebook, LucideClapperboard, LucideTheater, LucideCoins, LucideLink} from 'lucide-vue-next';

const menuOptions = [
{icon: LucideClapperboard, label: 'Accueil', link: '/'},
{icon: LucideTheater, label: 'Le Cinéma', link: '/a-propos'},
{icon: LucideCoins, label: 'Tarifs', link: '/tarifs'},
]
</script>

<template>
  <div class="flex gap-5 items-center">
    <NuxtLink to="/" class="flex md:absolute left-36 top-14 h-14 w-14">
      <img src="/mini_logo.png" alt="Logo" class="w-full h-full object-cover">
    </NuxtLink>
    <h1 class="md:hidden text-2xl font-bold relative">Cinema Chaplin
      <span class="absolute w-56 h-5 bg-zinc-200 -bottom-2 left-2 -z-10"></span>
    </h1>
  </div>

  <div class="fixed bottom-0 left-0 right-0 z-40 w-full py-2 px-10 md:py-10 md:px-0 bg-white md:bg-transparent md:relative">
    <ul class="flex justify-between text-end font-bold text-xl items-center md:space-y-1 md:flex-col md:justify-end md:items-end">
      <li class="text-zinc-700 hover:text-zinc-950" v-for="(option, index) in menuOptions" :key="index">
        <NuxtLink :to="option.link" class="flex flex-col items-center justify-center md:justify-end md:items-end">
          <component :is="option.icon" class="md:hidden"/>
          <span class="text-sm md:text-lg mt-2 md:mt-0">{{ option.label }}</span>
        </NuxtLink>
      </li>
    </ul>
    <ul class="hidden md:block flex space-y-5 flex-col justify-end w-full font-bold text-xl mt-20">
      <li class="text-zinc-700 hover:text-zinc-950 flex justify-end">
        <a href="https://www.facebook.com/CinemaMontmelianCharlieChaplin" target="_blank"
           class="flex items-center justify-center rounded-full border p-2 w-12 h-12">
          <LucideFacebook class="-ml-[1px]"/>
        </a>
      </li>
      <li class="text-zinc-700 hover:text-zinc-950 flex justify-end">
        <a href="https://montmelian.com/cinema-charlie-chaplin/" target="_blank"
           class="flex items-center justify-center rounded-full border p-2 w-12 h-12">
          <LucideLink/>
        </a>
      </li>
    </ul>
  </div>
</template>