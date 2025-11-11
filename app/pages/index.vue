<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue';
import {toMovieShowView} from '~/domain/Movie';
import BaseCarousel from '~/components/common/BaseCarousel.vue';
import BaseMovieListCarousel from '~/components/common/BaseMovieListCarousel.vue';

import {useQuery} from '@pinia/colada'

import  {createMovieService} from '~/server/services/MovieService'

const service = createMovieService();
const {isDesktop} = useDevice()

const itemsPerView = useState('itemsPerView', () => 2)
const itemsPerPage = useState('itemsPerPage', () => 2)

onMounted(() => {
  itemsPerView.value = isDesktop ? 4 : 2
  itemsPerPage.value = isDesktop ? 3 : 2
})

const {
  error: featuredError,
  data: featured,
  isLoading: featuredIsLoading,
} = useQuery({
  key: ['featured'],
  query: () => service.getFeaturedMovies(),
})
const {data: upcoming, error: upcomingError, isLoading: upcomingIsLoading} =
    useQuery({
      key: ['upcoming'],
      query: () => service.getUpcomingMovies(),
    })

useSeoMeta({
  title: 'Cinéma Charlie Chaplin - Accueil',
  ogTitle: 'Cinéma Charlie Chaplin - Accueil',
  description: 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.',
  ogDescription: 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.',
})
</script>
<template>
  <main>
    <div v-if="featuredError">
      <p class="text-zinc-700">Aucun film disponible</p>
    </div>
    <div v-else-if="featuredIsLoading">
      <p class="text-zinc-700">Loading</p>
    </div>
    <BaseCarousel v-else :movies="featured.slice(0,4)"/>
    <section class="p-2 md:p-0">
      <SectionHeading label="A l'affiche" class="mt-10"/>
      <div v-if="featuredIsLoading">
        Loading..
      </div>
      <div v-else-if="featuredError || featured?.length === 0" class="flex gap-5">
        Aucun film à l'affiche
      </div>
      <div v-else-if="featured" class="flex gap-5">
        <BaseMovieListCarousel
            :items="featured || []"
            :items-per-view="itemsPerView"
            :items-per-page="itemsPerPage"
            :autoplay="false"
            :infinite="true"
            :show-arrows="featured?.length > 4"
            :show-dots="false"
            container-class="max-w-6xl mx-auto"
            item-class="px-2"
        >
          <template #default="{ item: movie }">
            <NuxtLink :to="`/films/${movie.id}`" class="block md:w-64 group">
              <NuxtImg :src="movie.cover" :alt="`Affiche du film${movie.title}`"
                       class="w-full h-72 md:h-96 object-cover rounded-lg group-hover:shadow-xl group-hover:scale-[1.05] transition-all">
                <template #placeholder>
                  <div class="bg-zinc-300 w-full h-full animate-pulse rounded"></div>
                </template>
              </NuxtImg>
              <h3 class="text-lg font-semibold mt-2 line-clamp-1">{{ movie.title }}</h3>
              <ul>
                <li v-for="show in movie.shows" :key="show.id" class="flex justify-between">
                  <span class="text-sm text-zinc-500">{{ toMovieShowView(show).date }}</span>
                  <span class="text-sm text-zinc-500">{{ show.dubbing }}</span>
                </li>
              </ul>
            </NuxtLink>
          </template>
        </BaseMovieListCarousel>
      </div>
    </section>
    <section class="mt-20 p-2 md:p-0">
      <SectionHeading label="Prochainement"/>
      <div v-if="upcomingIsLoading">
        Loading..
      </div>
      <div v-else-if="upcomingError || upcoming?.length === 0 " class="flex gap-5">
        Aucun film prochainement
      </div>
      <div v-else-if="upcoming" class="flex gap-5">
        <BaseMovieListCarousel
            :items="upcoming || []"
            :items-per-view="itemsPerView"
            :items-per-page="itemsPerPage"
            :show-arrows="upcoming?.length > 4"
            :autoplay="false"
            :infinite="true"
            container-class="max-w-6xl mx-auto"
            :show-dots="false"
            item-class="px-2"
        >
          <template #default="{ item: movie }">
            <NuxtLink :to="`/films/${movie.id}`" class="block md:w-64 group">
              <NuxtImg :src="movie.cover" :alt="`Affiche du film${movie.title}`"
                       class="w-full h-72 md:h-96 object-cover rounded-lg group-hover:shadow-xl group-hover:scale-[1.05] transition-all">
                <template #placeholder>
                  <div class="bg-zinc-300 w-full h-full animate-pulse rounded"></div>
                </template>
              </NuxtImg>
              <h3 class="text-lg font-semibold mt-2 line-clamp-1">{{ movie.title }}</h3>
              <ul>
                <li v-for="show in movie.shows" :key="show.id" class="flex justify-between">
                  <span class="text-sm text-zinc-500">{{ toMovieShowView(show).date }}</span>
                  <span class="text-sm text-zinc-500">{{ show.dubbing }}</span>
                </li>
              </ul>
            </NuxtLink>
          </template>
        </BaseMovieListCarousel>
      </div>
    </section>
  </main>
</template>