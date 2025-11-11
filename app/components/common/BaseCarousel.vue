<template>
  <section class="bg-zinc-900 h-[350px] w-full overflow-hidden relative md:h-[600px] md:rounded-lg"
           @touchstart="handleTouchStart"
           @touchmove="handleTouchMove"
           @touchend="handleTouchEnd">
    <div class="relative w-full h-full">
      <div
          v-for="(movie, index) in movieList"
          :key="movie.id || index"
          class="absolute inset-0 transition-opacity duration-700 ease-in-out"
          :class="index === currentIndex ? 'opacity-100' : 'opacity-0'"
      >
        <NuxtImg
            :src="movie.imageSet.values[0]"
            class="w-full h-full object-cover object-top rounded opacity-60"
            :alt="movie.title"
        >
          <template #placeholder>
            <div class="bg-zinc-300 w-full h-full animate-pulse rounded"></div>
          </template>
        </NuxtImg>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 p-8 h-92 flex flex-col justify-end">
      <h1 class="text-white text-2xl md:text-5xl font-bold transition-opacity duration-300 md:mb-5">
        {{ movies[currentIndex]?.title }}
      </h1>
      <p class="hidden md:block text-zinc-100 mt-2 transition-opacity duration-300">
        {{ movies[currentIndex]?.description }}
      </p>
      <NuxtLink class="text-2xl py-1 px-3 text-bold max-w-[300px] font-bold mt-5 relative z-20 text-zinc-900 bg-zinc-50
      hover:bg-zinc-600 hover:text-zinc-50 transition-all duration-200" :to="`/films/${movies[currentIndex]?.id}`">
         Voir la fiche
      </NuxtLink>
    </div>

    <button
        aria-label="Previous item"
        @click="previousSlide"
        class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        :disabled="movies.length <= 1"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <button
        aria-label="Next item"
        @click="nextSlide"
        class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        :disabled="movies.length <= 1"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
          aria-label="Next item"
          v-for="(_, index) in movieList"
          :key="index"
          @click="goToSlide(index)"
          class="w-10 h-1 rounded-full transition-all duration-200"
          :class="index === currentIndex ? 'bg-white' : 'bg-white/50'"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type {Movie} from '~/domain/Movie';
import {ref} from 'vue';

const props = withDefaults(defineProps<{
  movies: Movie[];
  autoplay?: boolean;
  interval?: number;
}>(), {
  autoplay: false,
  interval: 5000,
  movies: () => [],
})

const currentIndex = ref(0)
const MAX_COUNT = 4;
let autoplayTimer = null;

const movieList = computed(() => props.movies.slice(0,MAX_COUNT));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % MAX_COUNT
}

const previousSlide = () => {
  currentIndex.value = currentIndex.value === 0
      ? MAX_COUNT
      : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  if (props.autoplay && props.movies.length > 1) {
    autoplayTimer = setInterval(nextSlide, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

watch(() => props.autoplay, (newVal) => {
  if (newVal) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

const touchStartX = ref(0)
const touchEndX = ref(0)
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  stopAutoplay()
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50

  if (Math.abs(diff) > minSwipeDistance) {
    if (diff > 0) {
      nextSlide()
    } else {
      previousSlide()
    }
  }

  if (props.autoplay) {
    startAutoplay()
  }
}
</script>