<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import heroSection from '@/components/landing/heroSection.vue'
import landingSection1 from '@/components/landing/landingSection1.vue'
import landingSection2 from '@/components/landing/landingSection2.vue'
import landingSection3 from '@/components/landing/landingSection3.vue'

export default {
  components: {
    navBar,
    heroSection,
    footerComponant,
    landingSection1,
    landingSection2,
    landingSection3,
  },
  mounted() {
    this.$router.push({
      name: 'home',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <heroSection />
    <landingSection1 />
    <landingSection2 />
    <landingSection3 />
  </main>
  <footerComponant />
</template>
<style></style>
