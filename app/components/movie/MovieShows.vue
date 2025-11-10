<script lang="ts" setup>
import {type Movie, toMovieShowView} from '~/domain/Movie';
import SectionHeading from '~/components/common/SectionHeading.vue';

const props = defineProps<{movie: Movie}>()

const showView = computed(() => props.movie.shows.map(toMovieShowView))
</script>
<template>
  <div class="px-5 md:px-0">
    <SectionHeading label="Horaires" />
    <ul class="mb-16">
      <li v-for="show in showView" :key="show.id" class="flex flex-col md:flex-row mb-5">
        <p class="text-3xl flex-1">{{show.date}}</p>
        <div class="flex flex-1">
          <p class="text-3xl flex-1 font-bold">{{show.time}}</p>
          <p class="text-3xl md:flex-1">{{show.dubbing}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>