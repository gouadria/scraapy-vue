<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import demolitionWorks from '@/components/demolition_works/demolitionWorks.vue'

export default {
  components: {
    navBar,
    footerComponant,
    demolitionWorks,
  },
  mounted() {
    this.$router.push({
      name: 'demolition_works',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <demolitionWorks />
  </main>
  <footerComponant />
</template>
