<script setup lang="ts">
import MovieShows from '~/components/movie/MovieShows.vue';
import {useQuery} from '@pinia/colada';
import {createMovieService} from '~/server/services/MovieService';
const service = createMovieService();
const {data: movie, isLoading, error} = useQuery({
  key: ['movie', `movie-${useRoute().params.id}`],
  query: () => service.getMovieById(useRoute().params.id),
})

useSeoMeta({
  title: `Cinéma Charlie Chaplin - ${movie?.value?.title || 'Détails du film'}`,
  ogTitle: `Cinéma Charlie Chaplin - ${movie?.value?.title || 'Détails du film'}`,
  ogImage: movie?.value?.cover || '/default-movie-poster.jpg',
  description: `${movie?.value?.description} || 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.'`,
  ogDescription: `${movie?.value?.description} || 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.'`,
})
</script>
<template>
  <div v-if="isLoading">
    Chargement ...
  </div>
  <div v-else-if="error">
    Erreur lors du chargement du film
  </div>
  <div v-else-if="movie">
    <MovieDetailsHero :movie/>
    <MovieShows :movie="movie" />
    <MovieGallery :movie="movie" />
  </div>
</template>