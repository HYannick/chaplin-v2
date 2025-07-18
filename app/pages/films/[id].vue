<script setup lang="ts">
import MovieShows from '~/components/movie/MovieShows.vue';
const {getMovieById} = useMovies();
const {data: movie} = await getMovieById(useRoute().params.id);

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