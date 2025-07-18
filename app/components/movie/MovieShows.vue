<script lang="ts" setup>
import {type Movie, toMovieShowView} from '~/domain/Movie';
import SectionHeading from '~/components/common/SectionHeading.vue';

const props = defineProps<{movie: Movie}>()

const showView = computed(() => props.movie.shows.map(toMovieShowView))
</script>
<template>
  <SectionHeading label="Horaires" />
  <ul class="mb-16">
    <li v-for="show in showView" :key="show.id" class="flex mb-5">
      <p class="text-3xl flex-1">{{show.date}}</p>
      <p class="text-3xl flex-1 text-center font-bold">{{show.time}}</p>
      <p class="text-3xl flex-1 text-right">{{show.dubbing}}</p>
    </li>
  </ul>
</template>