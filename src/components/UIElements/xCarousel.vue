<template>
  <div class="carousel-wrapper">
    <button
      v-if="state === 'navs'"
      @click="scrollCarouselLeft"
      class="nav-button left"
      aria-label="Scroll Left"
    >
    <img src="@/assets/svg-icons/chevron-left.svg?url" alt="left" /></button>
    <button
      v-if="state === 'navs'"
      @click="scrollCarouselRight"
      class="nav-button right"
      aria-label="Scroll Right"
    >
      <img src="@/assets/svg-icons/chevron-right.svg?url" alt="right" />
    </button>
    <div
      :class="['carousel', { 'carousel-auto': state === 'auto' }]"
      ref="carouselRef"
      @mousedown="handleMouseDown"
      :style="{ '--carousel-gap': gap, '--carousel-justify': justify }"
    >
      <template v-if="state === 'auto'">
        <div class="carousel-item" v-for="(item, index) in itemSlots" :key="index">
          <component :is="item" />
        </div>
      </template>
      <slot v-else></slot>
    </div>
    <div v-if="state === 'fade' && isOverflowingLeft" class="fade fade-left"></div>
    <div v-if="state === 'fade' && isOverflowingRight" class="fade fade-right"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'xCarousel',
  props: {
    state: {
      type: String,
      required: true,
      validator: (value: string) => ['fade', 'navs', 'auto'].includes(value)
    },
    autoScrollInterval: {
      type: Number,
      default: 3000
    },
    gap: {
      type: String,
      default: 'clamp(8px, calc(1.11vw + 4px), 20px)'
    },
    justify: {
      type: String,
      default: 'flex-start'
    }
  },
  setup(props, { slots }) {
    const carouselRef = ref<HTMLElement | null>(null)
    const isOverflowingLeft = ref(false)
    const isOverflowingRight = ref(false)
    const itemSlots = ref<any[]>([])
    
    let isDragging = false
    let wasDragged = false
    const dragThreshold = 5
    let startX = 0
    let scrollLeft = 0

    let autoScrollTimer: number | null = null
    let itemWidth = 0
    let totalItems = 0
    let currentIndex = 0

    const checkOverflow = () => {
      if (carouselRef.value) {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
        const scrollWidth = carouselRef.value.scrollWidth
        const clientWidth = carouselRef.value.clientWidth

        if (isRTL) {
          const scrollPosition =
            carouselRef.value.scrollWidth - carouselRef.value.scrollLeft - clientWidth
          isOverflowingRight.value = scrollPosition > 30
          isOverflowingLeft.value = carouselRef.value.scrollLeft > 30
        } else {
          const scrollPosition = carouselRef.value.scrollLeft + clientWidth
          isOverflowingRight.value = scrollWidth > scrollPosition + 30
          isOverflowingLeft.value = carouselRef.value.scrollLeft > 30
        }
      }
    }

    const getOffset = () => {
      return carouselRef.value?.getBoundingClientRect().left || 0
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (props.state === 'auto') return
      isDragging = true
      wasDragged = false
      startX = e.pageX - getOffset()
      scrollLeft = carouselRef.value?.scrollLeft || 0
      document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - getOffset()
      const walk = x - startX

      if (Math.abs(walk) > dragThreshold) {
        wasDragged = true
      }
      
      if (carouselRef.value) {
        carouselRef.value.scrollLeft = scrollLeft - (walk * 2)
      }
      checkOverflow()
    }

    const handleMouseUp = () => {
      isDragging = false
      document.body.style.userSelect = ''
    }

    const handleClick = (e: MouseEvent) => {
      if (wasDragged) {
        e.preventDefault()
        e.stopPropagation()
        wasDragged = false
      }
    }

    const scrollCarouselLeft = () => {
      if (carouselRef.value) {
        carouselRef.value.scrollBy({ left: -300, behavior: 'smooth' })
        checkOverflow()
      }
    }

    const scrollCarouselRight = () => {
      if (carouselRef.value) {
        carouselRef.value.scrollBy({ left: 300, behavior: 'smooth' })
        checkOverflow()
      }
    }

    const startAutoScroll = () => {
      if (props.state !== 'auto') return
      stopAutoScroll()
      autoScrollTimer = window.setInterval(() => {
        scrollToNextItem()
      }, props.autoScrollInterval)
    }

    const stopAutoScroll = () => {
      if (autoScrollTimer !== null) {
        clearInterval(autoScrollTimer)
        autoScrollTimer = null
      }
    }

    const scrollToNextItem = () => {
      if (!carouselRef.value) return

      const isRTL = getComputedStyle(carouselRef.value).direction === 'rtl'
      currentIndex = (currentIndex + 1) % totalItems

      const scrollPosition = currentIndex * itemWidth

      if (isRTL) {
        const maxScrollLeft = carouselRef.value.scrollWidth - carouselRef.value.clientWidth
        carouselRef.value.scrollTo({
          left: maxScrollLeft - scrollPosition,
          behavior: 'smooth'
        })
      } else {
        carouselRef.value.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        })
      }
    }

    const calculateItemWidth = () => {
      if (!carouselRef.value) return
      const carouselWidth = carouselRef.value.clientWidth
      itemWidth = carouselWidth
      const itemElements = carouselRef.value.querySelectorAll('.carousel-item')
      itemElements.forEach((item: Element) => {
        (item as HTMLElement).style.minWidth = `${itemWidth}px`
      })
    }

    const initializeAutoState = async () => {
      await nextTick() 
      if (props.state === 'auto') {
        const slotContent = slots.default ? slots.default() : []
        itemSlots.value = slotContent
        totalItems = itemSlots.value.length
        currentIndex = 0
        calculateItemWidth()
        startAutoScroll()
      } else {
        stopAutoScroll()
      }
    }

    onMounted(() => {
      window.addEventListener('resize', checkOverflow)
      window.addEventListener('resize', calculateItemWidth)
      checkOverflow()

      if (carouselRef.value) {
        carouselRef.value.addEventListener('mousedown', handleMouseDown)
        carouselRef.value.addEventListener('click', handleClick, true)
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      initializeAutoState()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkOverflow)
      window.removeEventListener('resize', calculateItemWidth)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      if (carouselRef.value) {
        carouselRef.value.removeEventListener('mousedown', handleMouseDown)
        carouselRef.value.removeEventListener('click', handleClick, true)
      }
      stopAutoScroll()
    })

    watch(
      () => props.state,
      () => {
        initializeAutoState()
      }
    )

    return {
      carouselRef,
      isOverflowingLeft,
      isOverflowingRight,
      scrollCarouselLeft,
      scrollCarouselRight,
      itemSlots
    }
  }
})
</script>


<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  overflow-y: visible;
}

.carousel {
  display: flex;
  justify-content: var(--carousel-justify, flex-start);
  gap: var(--carousel-gap, clamp(8px, calc(1.11vw + 4px), 20px));
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  cursor: grab;
  scrollbar-width: none;
}

@media (max-width: 1300px) {
  .carousel {
    justify-content: flex-start;
  }
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel:active {
  cursor: grabbing;
}

.carousel-auto {
  overflow: hidden;
  cursor: default;
  gap: 0;
}

[dir='rtl'] .carousel-auto {
  flex-direction: row-reverse;
}

.carousel-auto .carousel-item {
  display: flex;
  justify-content: center;
  min-width: 100%;
}

.fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  pointer-events: none;
  z-index: 1;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, var(--carousel-fade-color) 20%, rgba(33, 33, 33, 0) 80%);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, var(--carousel-fade-color) 20%, rgba(33, 33, 33, 0) 80%);
}

[dir='rtl'] .fade-left {
  right: 0;
  left: auto;
  background: linear-gradient(to left, var(--carousel-fade-color) 20%, rgba(33, 33, 33, 0) 80%);
}

[dir='rtl'] .fade-right {
  left: 0;
  right: auto;
  background: linear-gradient(to right, var(--carousel-fade-color) 20%, rgba(33, 33, 33, 0) 80%);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 45px;
  height: 45px;
  padding: 10px 12.5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 31.25px;
  border: 1.25px solid var(--Dark-100, #e7e7e7);
  background: var(--White, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  z-index: 2;
  opacity: 0.5;
  transition: all 0.2s;
}

.carousel-wrapper:hover .nav-button {
  opacity: 1;
  border: 2px solid var(--Dark-100, #e7e7e7);
}

.carousel-wrapper:hover .nav-button.left {
  left: 10px;
}

.carousel-wrapper:hover .nav-button.right {
  right: 10px;
}


.nav-button.left {
  left: -30px;
}

.nav-button.right {
  right: -30px;
}
</style>
