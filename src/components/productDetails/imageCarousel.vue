<script lang="ts">
import { defineComponent } from 'vue'
import { Item, Image } from '@/models/Item'
import { useIsMobile } from '@/composables/useIsMobile.ts'
import xCarousel from '@/components/UIElements/xCarousel.vue'

export default defineComponent({
  name: 'ImageCarousel',
  components: {
    xCarousel
  },
  props: {
    images: {
      type: Array as () => Image[],
      default: () => []
    }
  },
  setup() {
    const { isMobile } = useIsMobile()

    return { isMobile }
  },
  data() {
    return {
      seletedImage: 0
    }
  }
})
</script>
<template>
  <div v-if="!images.length">
    <!-- <img src="https://via.placeholder.com/730x540" alt="placeholder" /> -->
  </div>

  <div class="images-container" v-else>
    <div class="main-image">
      <img :src="images[seletedImage].image" alt="main image" />
    </div>
    <div v-if="!isMobile" class="image-thumbnails">
      <xCarousel state="navs">
        <div
          class="thumbnail-img"
          v-for="(image, index) in images"
          :key="index"
          @click="seletedImage = index"
        >
          <img :src="image.image" alt="thumbnail" />
        </div>
      </xCarousel>
    </div>

    <div v-if="isMobile" class="pagination-line-container">
      <span class="pagination-line"></span>
      <span class="pagination-line"></span>
      <span class="pagination-line"></span>
    </div>
  </div>
</template>
<style scoped>
img {
  border-radius: 12px;
}

.images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 15px;
  width: 100%;
  border-radius: 20px;
  border: 1px solid var(--Dark-100, #e7e7e7);
}

.main-image {
  width: 100%;
  max-width: 730px;
  height: 540px;
}

.main-image img {
  width: 100%;
  height: 100%;
  max-height: 540px;
  object-fit: cover;
}

.image-thumbnails {
  overflow-x: hidden;
  width: 100%;
  max-width: 730px;
  height: fit-content;
}

.thumbnail-img {
  min-width: 171px;
  height: 128px;
  cursor: pointer;
  border-radius: 12px;
}

.thumbnail-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

@media (max-width: 1000px) and (min-width: 769px) {
  .images-container {
    padding: 8px;
    gap: 8px;
  }

  .main-image {
    min-width: 320px;
    width: 100%;
  }

  .main-image img {
    width: 100%;
    height: auto;
    max-height: 199px;
    border-radius: 8px;
  }

  .thumbnail-img {
    height: 55px;
    min-width: 74px;
  }

  .thumbnail-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
}

@media (max-width: 768px) {
  .images-container {
    padding: 0;
    border: none;
    gap: 16px;
  }
  .main-image {
    max-height: 249px;
  }
  .main-image img {
    width: 100%;
    height: auto;
    max-height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }

  .pagination-line-container {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .pagination-line {
    display: inline-block;
    width: 21.3px;
    height: 6px;
    border-radius: 3px;
    background: var(--Blue-900, #1a4b5f);
  }
}
</style>
