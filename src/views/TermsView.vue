<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import terms from '@/components/terms/terms.vue'

export default {
  components: {
    navBar,
    footerComponant,
    terms,
  },
  mounted() {
    this.$router.push({
      name: 'terms',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <terms />
  </main>
  <footerComponant />
</template>
<style></style>
