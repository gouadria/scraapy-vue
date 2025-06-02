<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import career from '@/components/career/career.vue'

export default {
  components: {
    navBar,
    footerComponant,
    career,
  },
  mounted() {
    this.$router.push({
      name: 'career',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <career />
  </main>
  <footerComponant />
</template>