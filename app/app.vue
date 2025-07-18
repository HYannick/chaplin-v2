<template>
  <div>
    <div class="w-full mx-auto">
      <div class="flex">
        <div class="flex-[0.5] p-5 mt-10">
          <Header />
        </div>
        <div class="min-h-screen flex-[2] mt-10 p-5">
          <NuxtPage/>
          <Footer />
        </div>
        <div class="bg-zinc-100 flex-[0.5] flex items-end">
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
</script>
<style>
body {
  font-family: "Inconsolata", monospace;
}
</style>