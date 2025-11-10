<template>
  <div>
    <div class="w-full mx-auto">
      <div class="md:flex">
        <div class="flex-[0.5] p-5 md:mt-10">
          <Header />
        </div>
        <div class="min-h-screen flex-[2] md:mt-10 md:p-5">
          <NuxtPage/>
          <Footer />
          <PiniaColadaDevtools  />
        </div>
        <div class="bg-zinc-100 hidden flex-[0.5] md:flex items-end">
          <div class="sticky bottom-0 w-64">
            <img src="/side_bg.png" alt="Side Background">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '~/components/common/Header.vue';
import Footer from '~/components/common/Footer.vue';
import { PiniaColadaDevtools } from '@pinia/colada-devtools'
</script>
<style>
body {
  font-family: "Inconsolata", monospace;
}
</style>