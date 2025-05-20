<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import materialsTheftPolicy from '@/components/materials_theft_policy/materialsTheftPolicy.vue'

export default {
  components: {
    navBar,
    footerComponant,
    materialsTheftPolicy,
  },
  mounted() {
    this.$router.push({
      name: 'materials_policy',
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
<style></style>
