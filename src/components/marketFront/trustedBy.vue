<script lang="ts">
import { defineComponent } from 'vue'
import xCarousel from '@/components/UIElements/xCarousel.vue'
import { useIsMobile } from '@/composables/useIsMobile.ts'

export default defineComponent({
  name: 'trustedBy',
  components: {
    xCarousel
  },
  setup() {
    const { isMobile } = useIsMobile()

    return { isMobile }
  }
})
</script>

<template>
  <div class="trusted-by-wrapper">
    <h1>{{ $t('marketFront.trustedBy') }}</h1>
    <div class="trusted-by-logos">
      <xCarousel :state="isMobile ? 'auto' : 'fade'" gap="48px" justify="center">
        <div class="sponsor-img">
          <img src="@/assets/trusted-by/sponsor-1.png" alt="trusted by logo" />
        </div>
        <div class="sponsor-img">
          <img src="@/assets/trusted-by/sponsor-2.png" alt="trusted by logo" />
        </div>
        <div class="sponsor-img">
          <img src="@/assets/trusted-by/sponsor-3.png" alt="trusted by logo" />
        </div>
        <div class="sponsor-img tall">
          <img src="@/assets/trusted-by/sponsor-4.png" alt="trusted by logo" />
        </div>
        <div class="sponsor-img">
          <img src="@/assets/trusted-by/sponsor-5.png" alt="trusted by logo" />
        </div>
      </xCarousel>
    </div>
  </div>
</template>

<style scoped>
.trusted-by-wrapper {
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border-radius: 12px;
  background: #f6f6f6;
}

.trusted-by-wrapper h1 {
  color: #b0b0b0;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
}

.trusted-by-logos {
  display: flex;
  width: 100%;
  padding: 11px 0;
  align-items: center;
  justify-content: center;
  gap: 48px;
  --carousel-fade-color: #f6f6f6;
  background-color: var(--carousel-fade-color);
}

.sponsor-img {
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.sponsor-img.tall {
  max-width: 100px;
}

.trusted-by-logos img {
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
}

@media (max-width: 1300px) {
  .trusted-by-logos {
    padding-left: 10vw;
  }
}
@media (max-width: 768px) {
  .trusted-by-logos {
    padding-left: revert;
  }
}
</style>
