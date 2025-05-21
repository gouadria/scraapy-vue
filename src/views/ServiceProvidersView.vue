<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import serviceProviders from '@/components/service_providers/serviceProviders.vue'

export default {
  components: {
    navBar,
    footerComponant,
    serviceProviders,
  },
  mounted() {
    this.$router.push({
      name: 'service_providers',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <serviceProviders />
  </main>
  <footerComponant />
</template>
<style></style>
