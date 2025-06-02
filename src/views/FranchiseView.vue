<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import franchise from '@/components/franchise/franchise.vue'

export default {
  components: {
    navBar,
    footerComponant,
    franchise,
  },
  mounted() {
    this.$router.push({
      name: 'franchise',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <franchise />
  </main>
  <footerComponant />
</template>