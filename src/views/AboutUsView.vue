<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import aboutUs from '@/components/about_us/aboutUs.vue'

export default {
  components: {
    navBar,
    footerComponant,
    aboutUs,
  },
  mounted() {
    this.$router.push({
      name: 'about',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <aboutUs />
  </main>
  <footerComponant />
</template>
<style></style>
