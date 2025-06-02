<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import becomeOurPartner from '@/components/become_our_partner/becomeOurPartner.vue'

export default {
  components: {
    navBar,
    footerComponant,
    becomeOurPartner,
  },
  mounted() {
    this.$router.push({
      name: 'partner',
    })
  },
}
</script>
<template>
  <navBar />
  <main>
    <becomeOurPartner />
  </main>
  <footerComponant />
</template>