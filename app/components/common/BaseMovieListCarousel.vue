<template>
  <div class="relative w-full overflow-hidden pt-5" :class="containerClass">
    <div
        ref="carouselRef"
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * itemWidth}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
      <div
          v-for="(item, index) in items"
          :key="getItemKey(item, index)"
          class="flex-shrink-0"
          :style="{ width: `${itemWidth}%` }"
          :class="itemClass"
      >
        <slot :item="item" :index="index" :isActive="index === currentIndex" />
      </div>
    </div>

    <button
        v-if="showArrows && canGoPrevious"
        @click="previous"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        :class="arrowClass"
        aria-label="Previous item"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>

    <button
        v-if="showArrows && canGoNext"
        @click="next"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        :class="arrowClass"
        aria-label="Next item"
    >
      <ChevronRight class="w-5 h-5" />
    </button>

    <div
        v-if="showDots"
        class="flex justify-center mt-4 space-x-2"
        :class="dotsContainerClass"
    >
      <button
          v-for="(_, index) in totalPages"
          :key="index"
          @click="goToPage(index)"
          class="w-2 h-2 rounded-full transition-all duration-200"
          :class="[
          index === currentPage ? 'bg-blue-500' : 'bg-gray-300',
          dotClass
        ]"
          :aria-label="`Go to page ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {ChevronLeft, ChevronRight} from 'lucide-vue-next';
import type {Movie} from '~/domain/Movie';

interface CarouselProps {
  items: Movie[]
  showArrows?: boolean
  showDots?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  infinite?: boolean
  containerClass?: string
  itemClass?: string
  arrowClass?: string
  dotClass?: string
  dotsContainerClass?: string
  keyExtractor?: (item: any, index: number) => string | number
}

const props = withDefaults(defineProps<CarouselProps>(), {
  showArrows: true,
  showDots: true,
  autoplay: false,
  autoplayInterval: 3000,
  infinite: true,
  containerClass: '',
  itemClass: '',
  arrowClass: '',
  dotClass: '',
  dotsContainerClass: '',
  keyExtractor: (item: any, index: number) => item.id || index
})

const emit = defineEmits<{
  change: [currentIndex: number]
  pageChange: [currentPage: number]
}>()

const carouselRef = ref<HTMLElement>()
const currentIndex = ref(0)
const isTransitioning = ref(false)
const autoplayTimer = ref<NodeJS.Timeout>()
const touchStartX = ref(0)
const touchEndX = ref(0)

const {isDesktop} = useDevice()

const itemsPerView = ref(2);
const itemsPerPage =ref(2);

const itemWidth = computed(() => 100 / itemsPerView.value)
const totalItems = computed(() => props.items.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const currentPage = computed(() => Math.floor(currentIndex.value / itemsPerPage.value))
const maxIndex = computed(() => totalItems.value - itemsPerView.value)

const canGoPrevious = computed(() =>
    props.infinite || currentIndex.value > 0
)

const canGoNext = computed(() =>
    props.infinite || currentIndex.value < maxIndex.value
)

const getItemKey = (item: any, index: number) => {
  return props.keyExtractor(item, index)
}

const goToIndex = (index: number) => {
  if (isTransitioning.value) return

  let newIndex = index

  if (!props.infinite) {
    newIndex = Math.max(0, Math.min(maxIndex.value, index))
  } else {
    if (index < 0) {
      newIndex = totalItems.value - 1
    } else if (index >= totalItems.value) {
      newIndex = 0
    }
  }

  if (newIndex !== currentIndex.value) {
    currentIndex.value = newIndex
    emit('change', newIndex)
    emit('pageChange', currentPage.value)
  }
}

const goToPage = (page: number) => {
  const index = page * props.itemsPerPage
  goToIndex(index)
}

const next = () => {
  goToIndex(currentIndex.value + props.itemsPerPage)
}

const previous = () => {
  goToIndex(currentIndex.value - props.itemsPerPage)
}

const startAutoplay = () => {
  if (!props.autoplay) return

  autoplayTimer.value = setInterval(() => {
    if (canGoNext.value) {
      next()
    } else if (props.infinite) {
      goToIndex(0)
    }
  }, props.autoplayInterval)
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = undefined
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  stopAutoplay()
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50

  if (Math.abs(diff) > minSwipeDistance) {
    if (diff > 0) {
      next()
    } else {
      previous()
    }
  }

  if (props.autoplay) {
    startAutoplay()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      previous()
      break
    case 'ArrowRight':
      e.preventDefault()
      next()
      break
  }
}

watch(() => props.items, () => {
  if (currentIndex.value >= totalItems.value) {
    goToIndex(0)
  }
})

onMounted(() => {
  itemsPerView.value = isDesktop ? 4 : 2
  itemsPerPage.value = isDesktop ? 3 : 2
  if (props.autoplay) {
    startAutoplay()
  }

  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({
  next,
  previous,
  goToIndex,
  goToPage,
  currentIndex: readonly(currentIndex),
  currentPage: readonly(currentPage)
})
</script>