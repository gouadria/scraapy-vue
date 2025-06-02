<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import materialsTheftPolicy from '@/components/return_refund_policy/returnRefundPolicy.vue'

export default {
  components: {
    navBar,
    footerComponant,
    materialsTheftPolicy,
  },
  mounted() {
    this.$router.push({
      name: 'return_policy',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <materialsTheftPolicy />
  </main>
  <footerComponant />
</template>