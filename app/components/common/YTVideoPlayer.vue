<script setup lang="ts">
const props = defineProps<
    {
        link: string,
        placeholder?: string
    }>()

const emit = defineEmits(['isPlaying'])
const isLoaded = ref(false)
const isPlaying = ref(false)
const video = ref()
async function play() {
  await video.value.player.playVideo()
}
function stateChange(event) {
  isPlaying.value = event.data === 1
  if (isPlaying.value) {
    emit('isPlaying', true)
  } else {
    emit('isPlaying', false)
  }
}

const videoId = computed((): string => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/;
  const match = props.link.match(regex);
  return match ? match[1] : '';
});
</script>

<template>
    <div class="flex items-center justify-center h-full">
      <ScriptYouTubePlayer
          ref="video"
          :video-id="videoId"
          @ready="isLoaded = true"
          @state-change="stateChange"
          :root-attrs="{
            style: {
              aspectRatio: 1,
              height: '100%',
            }
          }"
      >
        <template #placeholder>
          <img :src="placeholder" :alt="placeholder" class="absolute top-0 left-0 w-full h-full object-cover object-top rounded" />
        </template>
        <template #awaitingLoad>
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[48px] w-[68px]">
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00" /><path d="M 45,24 27,14 27,34" fill="#fff" /></svg>
          </div>
        </template>
      </ScriptYouTubePlayer>
    </div>
</template>
