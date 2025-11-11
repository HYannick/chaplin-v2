<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue';
import BaseCarousel from '~/components/common/BaseCarousel.vue';
import BaseMovieListCarousel from '~/components/common/BaseMovieListCarousel.vue';

import {useQuery} from '@pinia/colada'

import  {createMovieService} from '~/server/services/MovieService'

const service = createMovieService();

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
    <BaseCarousel v-else :movies="featured"/>
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
            :items="featured"
            :autoplay="false"
            :infinite="true"
            :show-dots="false"
            container-class="max-w-6xl mx-auto"
            item-class="px-2"
        />
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
            :items="upcoming"
            :autoplay="false"
            :infinite="true"
            :show-dots="false"
            container-class="max-w-6xl mx-auto"
            item-class="px-2"
        />
      </div>
    </section>
  </main>
</template>