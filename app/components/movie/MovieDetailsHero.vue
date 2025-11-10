<script lang="ts" setup>
import YTVideoPlayer from '~/components/common/YTVideoPlayer.vue';
import type {Movie} from '~/domain/Movie';
defineProps<{ movie: Movie }>()
const contentDisplayed = ref(true);

const toggleContent = (isPlaying: boolean) => {
  contentDisplayed.value = !isPlaying;
}
</script>
<template>
  <div class="w-full h-[300px] md:h-[600px] md:rounded-lg overflow-hidden relative">
    <YTVideoPlayer :link="movie.trailer" :placeholder="movie.imageSet.values[2]" @is-playing="toggleContent($event)" />
    <div
        class="absolute bottom-0 left-0 right-0 transition-all bg-gradient-to-t from-zinc-900 p-8 h-26 flex flex-col justify-end"
        :class="contentDisplayed ? 'opacity-100 scale-1' : 'opacity-0 scale-0'"
    />
  </div>
  <div class="flex flex-col items-center md:flex-row md:items-start justify-between transition-all gap-5 p-5" :class="contentDisplayed ? '-translate-y-24 opacity-100' : '-translate-y-0 opacity-40'">
    <div class="overflow-hidden rounded-lg">
      <img :src="movie.cover" :alt="`affiche du film ${movie.title}`" class="w-52 h-72 object-cover rounded-lg">
    </div>
    <div class="md:flex-1">
      <div>
        <h1 class="text-center md:text-start text-4xl font-bold mb-2" :class="contentDisplayed && $device.isDesktop ? 'text-zinc-50': 'text-zinc-900'">{{ movie.title }}</h1>
        <p class="flex justify-center text-center md:text-start md:justify-start gap-5" :class="contentDisplayed && $device.isDesktop  ? 'text-zinc-50': 'text-zinc-900'">
          <span>{{ movie.duration }}</span> |
          <span>{{ movie.genres.values.join(' | ') }}</span>
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-5 mt-5">
        <div class="order-2 md:order-1 flex-1">
          <h2 class="text-2xl text-zinc-600 font-bold mb-5">Synopsis</h2>
          <p class="flex-1">{{ movie.description }}</p>
        </div>
        <div class="order-1 md:order-2 flex-[0.5] md:border-l-[1px] border-zinc-200">
          <h2 class="text-2xl text-zinc-600 font-bold md:mb-5 md:pl-5">Details</h2>
          <hr class="hidden md:block"/>
          <div class="md:pl-5 pt-5">
            <p><span class="font-bold">De</span> : {{ movie.authors.join(', ') }}</p>
            <p><span class="font-bold">Avec</span> : {{ movie.actors.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>