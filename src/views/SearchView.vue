<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile.ts'
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'
import inputField from '@/components/UIElements/inputField.vue'
import type { Item } from '@/models/Item'
import searchControls from '@/components/search/searchControls.vue'
import gridLayout from '@/components/UIElements/gridLayout.vue'

export default defineComponent({
  components: {
    navBar,
    footerComponant,
    inputField,
    searchControls,
    gridLayout
  },
  data() {
    return {
      items: [] as Item[]
    }
  },
  watch: {
    $route() {
      this.fetchApi()
    }
  },
  methods: {
    async fetchApi() {
      const params = this.$route.query
      await this.$axios
        .get('/api/inventory/items/', { params: params })
        .then((response: any) => {
          this.items = Array.isArray(response.data.results) ? response.data.results : []
        })
        .catch((error: any) => {
          console.log(error)
          console.error('Failed to fetch items')
          this.items = []
        })
    }
  },
  mounted() {
    this.fetchApi()
  },
  setup() {
    const { isMobile } = useIsMobile()

    return { isMobile }
  }
})
</script>
<template>
  <navBar />

  <main class="max-width padded">
    <inputField v-if="isMobile" type="search" :placeholder="$t('nav.search')" />
    <searchControls />

    <gridLayout :items="items" />
  </main>

  <footerComponant />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: var(--carousel-gap, clamp(10px, calc(1.11vw + 4px), 50px));
  margin: 10px auto;
}
</style>
