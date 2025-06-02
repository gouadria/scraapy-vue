<script lang="ts">
import { useStore } from 'vuex'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default {
  components: {
    MainBtn
  },
}

// Function to safely add a class to an element, with optional delayed class addition
function safelyAddClass(
  selector: string,
  className: string,
  delay?: number,
  delayedClassName?: string
): void {
  const element = document.querySelector(selector)
  if (element instanceof HTMLElement) {
    element.classList.add(className)

    // Check if a delay and a delayed class name are provided
    if (delay && delayedClassName) {
      setTimeout(() => {
        element.classList.add(delayedClassName)
      }, delay)
    }
  } else {
    console.error(`Element with selector "${selector}" not found.`)
  }
}

// Background City animation initialization
window.addEventListener('load', () => {
  safelyAddClass('.hero-art-city', 'loaded')
  safelyAddClass('.hero-art-mid', 'loaded')
  safelyAddClass('.hero-art-top', 'loaded', 2000, 'animate') // Add 'animate' class after 2 seconds
})
</script>

<template>
  <section class="hero">
    <div class="hero-content max-width hero_mobile">
      <div class="hero-cta">
        <div class="hero-cta-wrapper">
          <div class="hero-cta-text">
            <h1>{{ $t('heroSection.scraapy') }}</h1>
            <h3>
              {{ $t('heroSection.description') }}
            </h3>
          </div>
          <div class="cta-buttons">
            <MainBtn
              type="green"
              @click="$router.push({ name: 'about' })"
            >
              {{ $t('heroSection.knowUs') }}
            </MainBtn>
            <MainBtn
              type="green"
              @click="$router.push({ name: 'marketplace' })"
            >
              {{ $t('heroSection.services') }}
            </MainBtn>
          </div>
        </div>
      </div>

      <div class="new_hero">
        <img src="@/assets/laaaaast.gif" alt="logo" class="hero_logo" />
      </div>
    </div>

    <span class="devider" v-if="false"> </span>
    <div class="sponsors" v-if="false">
      <div class="sponsor-title">
        <h3>{{ $t('heroSection.trustedBy') }}</h3>
      </div>
      <div class="sponsor-names">
        <img src="@/assets/sponsors/sponsor-1.png" alt="sponsor" />
        <img src="@/assets/sponsors/sponsor-2.png" alt="sponsor" />
        <img src="@/assets/sponsors/sponsor-3.png" alt="sponsor" />
        <img src="@/assets/sponsors/sponsor-4.png" alt="sponsor" />
        <!-- <img src="@/assets/sponsors/sponsor-5.png" alt="sponsor" /> -->
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(0deg, #0b3241 0%, #1c80a7 115.59%);
}

.hero-content {
  display: flex;
  width: 100%;
  min-height: 300px;
  margin: 60px 0;
  justify-content: space-between;
}

.hero-cta-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.hero-cta {
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.hero-cta-text {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 514px;
  gap: 10px;
}

.hero-art-background {
  width: 677px;
  height: 477px;
  border-radius: 40px 0px 0px 180px;
  background: rgba(169, 239, 248, 0.6);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  overflow: hidden;
}

html[dir='rtl'] .hero-art-background {
  border-radius: 0px 40px 180px 0px;
}

.hero-cta h1 {
  color: var(--White, #fff);
  font-size: 60px;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: -1.2px;
}

.hero-cta h3 {
  color: var(--Dark-100, #e7e7e7);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.cta-buttons {
  display: flex;
  gap: 14px;
}

.cta-buttons a {
  text-decoration: none;
}

.hero-art {
  position: relative;
}

.hero-art-city {
  height: 256px;
  transition: transform 60s ease;
  transform: translateX(50px);
  z-index: 1;
}

.hero-art-top {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.hero-art-top img {
  transition: all 1s ease-in-out;
  transform: scale(0);
}

.hero-art-top img:nth-child(3),
.hero-art-top img:nth-child(4),
.hero-art-top img:nth-child(5) {
  transform-origin: bottom;
}

.hero-art-top.loaded img {
  transform: scale(1);
}

.hero-art-top img:nth-child(1) {
  transform: translate(49px, 37px) scale(0);
}

.hero-art-top img:nth-child(2) {
  transform: translate(32px, 41px) scale(0);
}

.hero-art-top img:nth-child(3) {
  transform: translate(-64px, -51px) scale(0);
}

.hero-art-top img:nth-child(4) {
  transform: translate(-195px, -2px) scale(0);
}

.hero-art-top img:nth-child(5) {
  transform: translate(-14px, -38px) scale(0);
}

.hero-art-top.loaded img:nth-child(1) {
  transform: translate(49px, -37px) scale(1);
}

.hero-art-top.loaded img:nth-child(2) {
  transform: translate(22px, -61px) scale(1);
}

.hero-art-top.loaded img:nth-child(3) {
  transform: translate(-64px, -51px) scale(1);
}

html[dir='rtl'] .hero-art-top.loaded img:nth-child(3) {
  transform: translate(-114px, -51px) scale(1);
}

.hero-art-top.loaded img:nth-child(4) {
  transform: translate(-195px, -2px) scale(1);
}

.hero-art-top.loaded img:nth-child(5) {
  transform: translate(-14px, -38px) scale(1);
}

html[dir='rtl'] .hero-art-top.loaded img:nth-child(5) {
  transform: translate(29px, -38px) scale(1);
}

.animate {
  transform: rotate(360deg);
}

html[dir='rtl'] .hero-art-mid {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  transform: translate(-50px, 50px);
}
.hero-art-mid {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  transform: translate(-50px, -50px);
}

.hero-art-mid img {
  transition: 1s ease-in-out;
  transform: scale(0);
}

.hero-art-mid.loaded img:nth-child(1) {
  transform: translate(223px, 60px) scale(1);
}

html[dir='rtl'] .hero-art-mid.loaded img:nth-child(1) {
  transform: translate(-260px, 60px) scale(1);
}

.hero-art-mid.loaded img:nth-child(2) {
  transform: translate(120px, 83px) scale(1);
}

.hero-art-mid img:nth-child(1) {
  transform: translate(223px, 95px) scale(0);
}

.hero-art-mid img:nth-child(2) {
  transform: translate(120px, 105px) scale(0);
}

.hero-art-city.loaded {
  transform: translateX(-2000px);
}

html[dir='rtl'] .hero-art-city.loaded {
  transform: translateX(2000px);
}

.hero-art-bot {
  position: absolute;
  z-index: 2;
  transform: translate(-65px, 55px);
}

.devider {
  width: 100%;
  max-width: 1247px;
  height: 1px;
  background: #1a4b5f;
}

.sponsors {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 110px;
}

.sponsor-title {
  max-width: 194px;
}

.sponsor-title h3 {
  color: var(--White, #fff);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.sponsor-names {
  display: flex;
  gap: 40px;
  align-items: flex-end;
}

.sponsor-names img {
  width: auto;
  height: 100%;
}

@media (max-width: 1440px) {
  .hero-content {
    padding: 0 0 0 110px;
  }
  html[dir='rtl'] .hero-content {
    padding: 0 110px 0 0;
  }
}

@media (min-width: 1441px) {
  .hero-art-background {
    border-radius: 40px 40px 10px 180px;
    width: 521px;
    height: 477px;
  }

  .hero-cta {
    align-items: revert;
  }

  .sponsors {
    max-width: 1400px;
    padding: 40px 0;
  }
}
.hero_logo {
  width: 100%;
  padding: 30px;
  border-radius: 2.5rem;
}
.new_hero {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

@media (max-width: 768px) {
  .hero_mobile {
    display: flex;
    flex-direction: column;
  }
  html[dir='rtl'] .hero-content {
    padding: 60px 30px 20px 30px;
    margin: 10px 0;
  }
  html[dir='ltr'] .hero-content {
    padding: 20px 30px;
  }

  .hero-cta h1 {
    font-size: 36px;
    font-weight: 700;
  }
  .hero-cta h3 {
    font-size: 14px;
    font-weight: 400;
  }
  .hero_logo {
    width: 100%;
    padding: 30px;
    border-radius: 2.5rem;
  }
  .sponsors {
    gap: 10px;
    flex-direction: column;
    padding: 20px 20px;
    align-items: flex-start;
  }
  .sponsor-title {
    display: none;
  }
  .sponsor-names {
    flex-wrap: wrap;
  }
  .sponsor-names img {
    width: 16%;
  }
}

@media (min-width: 768px) and (max-width: 1224px) {
  .hero-cta h1 {
    font-size: 38px;
    font-weight: 700;
  }
  html[dir='rtl'] .hero-content[data-v-172873fe] {
    padding: 0 30px 0 0;
  }
  .sponsors {
    padding: 20px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .sponsor-title {
    max-width: 100%;
  }
}
</style>
