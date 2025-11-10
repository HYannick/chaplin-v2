<script lang="ts" setup>
import type {Movie} from '~/domain/Movie';
import SectionHeading from '~/components/common/SectionHeading.vue';

defineProps<{ movie: Movie }>()
</script>
<template>
  <div class="px-5 md:px-0">
    <SectionHeading label="Galerie"/>
    <div class="grid md:grid-cols-3 md:grid-rows-2 gap-2">
      <!-- Large image spanning 2 columns and 2 rows -->
      <div class="md:col-span-2 md:row-span-2">
        <img :src="movie.imageSet.values[0]" alt="Wonder Woman"
             class="w-full h-full object-cover rounded-lg">
      </div>

      <!-- Small image 1 -->
      <div class="md:col-span-1 md:row-span-1">
        <img :src="movie.imageSet.values[1]" alt="Wonder Woman action"
             class="w-full h-full object-cover rounded-lg">
      </div>

      <!-- Small image 2 -->
      <div class="md:col-span-1 md:row-span-1">
        <img :src="movie.imageSet.values[2]" alt="Dunkirk scene"
             class="w-full h-full object-cover rounded-lg">
      </div>
    </div>
  </div>
</template>