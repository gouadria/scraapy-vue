<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import terms from '@/components/subscriptions/subscriptions.vue'

export default {
  components: {
    navBar,
    footerComponant,
    terms,
  },
  mounted() {
    this.$router.push({
      name: 'subscriptions',
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