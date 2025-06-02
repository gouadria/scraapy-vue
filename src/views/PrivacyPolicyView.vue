<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import privacyPolicy from '@/components/privacy_policy/privacyPolicy.vue'

export default {
  components: {
    navBar,
    footerComponant,
    privacyPolicy,
  },
  mounted() {
    this.$router.push({
      name: 'privacy_policy',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <privacyPolicy />
  </main>
  <footerComponant />
</template>