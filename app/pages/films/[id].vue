<script setup lang="ts">
import MovieShows from '~/components/movie/MovieShows.vue';
const {getMovieById} = useMovies();
const {data: movie} = await getMovieById(useRoute().params.id);
useSeoMeta({
  title: `Cinéma Charlie Chaplin - ${movie?.value?.title || 'Détails du film'}`,
  ogTitle: `Cinéma Charlie Chaplin - ${movie?.value?.title || 'Détails du film'}`,
  ogImage: movie?.value?.cover || '/default-movie-poster.jpg',
  description: `${movie?.value?.description} || 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.'`,
  ogDescription: `${movie?.value?.description} || 'Le cinéma Charlie Chaplin à Montmélian vous accueille pour découvrir les dernières sorties cinématographiques dans une ambiance conviviale.'`,
})
</script>
<template>
  <div v-if="movie">
    <MovieDetailsHero :movie/>
    <MovieShows :movie="movie" />
    <MovieGallery :movie="movie" />
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>