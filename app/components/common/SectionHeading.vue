<script lang="ts" setup>
defineProps<{label: string}>()
</script>
<template>
  <h2 class="text-5xl font-bold mb-10 relative">
    {{ label }}
    <span class="absolute w-56 h-5 bg-zinc-200 -bottom-2 left-2 -z-10"></span>
  </h2>
</template>