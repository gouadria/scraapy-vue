<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import qualityHealthSafetyPolicy from '@/components/quality_health_safety_policy/qualityHealthSafetyPolicy.vue'

export default {
  components: {
    navBar,
    footerComponant,
    qualityHealthSafetyPolicy,
  },
  mounted() {
    this.$router.push({
      name: 'qhs',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <qualityHealthSafetyPolicy />
  </main>
  <footerComponant />
</template>
