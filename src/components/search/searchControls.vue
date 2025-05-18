<script lang="ts">
import DropDown from '@/components/UIElements/DropDown.vue'
import { useIsMobile } from '@/composables/useIsMobile'

// import { useI18n } from 'vue-i18n'
export default {
  components: {
    DropDown
  },
  data() {
    return {
      sort: [],
      filters: {},
      filterKeys: [] as string[],
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.query as string
    },
    cleanTags() {
      let ignore_tags = ['sort']
      if (!this.$route.query || !this.filters) return []
      if (!Object.keys(this.filters).length) return []

      const tags = Object.entries(this.$route.query)
        .filter(([key, value]) => !ignore_tags.includes(key) && value !== '')
        .map(([key, value]) => {
          if (key === 'query') {
            return { name: key, value, label: value }
          } else if (Array.isArray(value) || value.includes(',')) {
            const values = typeof value === 'string' ? value.split(',') : value
            return values.map((v) => ({
              name: key,
              value: v,
              label: this.filters[key]?.options?.find((f) => f.value.toString() === v)?.label || v
            }))
          } else {
            return {
              name: key,
              value,
              label:
                this.$i18n.locale === 'ar'
                  ? this.filters[key]?.options?.find((f) => f.value.toString() === value)?.label_ar || value
                  : this.filters[key]?.options?.find((f) => f.value.toString() === value)?.label || value
            }
          }
        })
      return tags.flat()
    },
    sortOptions(){
      const  options = this.sort.map((option) => ({
        value: option.value,
        label: this.$i18n.locale === 'ar' ? option.label_ar : option.label
      }))
      return options
    },

    filterOptions() {
      let options = {}

      for (const key in this.filters) {
        options[key] = {
          options: [],
          label: this.$i18n.locale === 'ar' ? this.filters[key].label_ar : this.filters[key].label
        }

        let filterOptions = this.filters[key].options
        // filter category based on selected type
        if (this.filters[key].label === 'Category' && this.$route.query.type) {
          filterOptions = this.filters[key].options.filter((option) => option.type === this.$route.query.type)
        }

        // Map the filter options to the new structure
        options[key].options = filterOptions.map((option) => ({
          value: option.value,
          label: this.$i18n.locale === 'ar' ? option.label_ar : option.label
        }))
      }
      return options
    }
  },
  methods: {
    addQuery(name, value) {
      const searchParams = new URLSearchParams(this.$route.query)
      if (name === 'sort') {
        searchParams.set(name, value)
      } else if (searchParams.has(name)) {
        const values = searchParams.get(name)
        if (values.includes(',')) {
          const newValues = values.split(',')
          if (newValues.includes(value)) {
            return
          }
          newValues.push(value)
          searchParams.delete(name)
          searchParams.set(name, newValues)
        } else {
          if (values === value) {
            return
          }
          searchParams.delete(name)
          searchParams.set(name, [values, value])
        }
      } else {
        searchParams.set(name, value)
      }
      this.$router.push({ query: { ...Object.fromEntries(searchParams) } })
    },
    removeTag(name, value) {
      const searchParams = new URLSearchParams(this.$route.query)
      const values = searchParams.get(name)
      if (values && values.includes(',')) {
        const newValues = values.split(',').filter((v) => v !== value)
        if (newValues.length) {
          searchParams.delete(name)
          searchParams.set(name, newValues)
        } else {
          searchParams.delete(name)
        }
      } else {
        searchParams.delete(name)
      }
      this.$router.push({ query: { ...Object.fromEntries(searchParams) } })
    },
    async fetchApi() {
      await this.$axios
        .get('/api/inventory/items/filter/')
        .then((response:any) => {
          this.sort = response.data.message.sort.options
          this.filters = response.data.message.filters
          this.filterKeys = Object.keys(this.filters)
        })
        .catch((error: any) => {
          console.log(error)
          console.error('Failed to fetch filters')
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
}
</script>

<template>
  <div class="container">
    <div class="header-container">
      <div>
        <h1 v-if="searchQuery">
          {{ $t('SearchPage.resultsFor') }}
          "<b>{{ searchQuery }}</b
          >"
        </h1>
      </div>

      <div class="sort-by">
        <p v-if="!isMobile">{{ $t('SearchPage.Sortby') }}</p>
        <img v-if="isMobile" src="@/assets/svg-icons/sort.svg?url" alt="Sort" />
        <DropDown
          v-if="sort && sortOptions"
          :options="sortOptions"
          @update:modelValue="addQuery('sort', $event)"
          :modelValue="$route.query.sort"
        />
      </div>
    </div>

    <div class="filter-container">
      <p>{{ $t('SearchPage.FilterResults') }}</p>

      <div class="filter-dropdowns" v-if="filters">
        <DropDown
          v-for="(value, name, index) in filterOptions"
          :key="index"
          :options="value.options"
          @update:modelValue="addQuery(name, $event)"
          :placeholder="value.label"
          ephemeral
        />
      </div>
      <div class="filter-tags">
        <div class="tag" v-for="(item, index) in cleanTags" :key="index">
          <div class="tag-label">{{ item.label }}</div>
          <div class="close-img" @click="removeTag(item.name, item.value)">
            <img src="@/assets/svg-icons/close.svg?url" alt="Close" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--carousel-gap, clamp(10px, calc(1.11vw + 4px), 30px));
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-container h1 {
  color: var(--Dark-700, #4f4f4f);
  font-size: clamp(0.75rem, 0.5rem + 1.1111vw, 1.5rem);
  font-weight: 400;
  line-height: 32px;
}

.header-container h1 b {
  font-weight: 700;
}

.sort-by {
  display: flex;
  align-items: center;
  gap: 15px;
  white-space: nowrap;
}

.filter-container {
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  border-radius: 12px;
  background: var(--Dark-50, #f6f6f6);
}

.filter-dropdowns {
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
}

.filter-tags {
  display: flex;
  gap: 20px;
}

.tag {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  width: 200px;
  border: 1px solid var(--Dark-200, #d1d1d1);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.tag-label {
  color: var(--Dark-900, #3d3d3d);
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
}

.close-img {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.close-img img {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .header-container {
    gap: 8px;
  }

  .sort-by {
    gap: 8px;
  }

  .filter-container {
    gap: 8px;
    padding: 6px 20px;
  }

  .filter-dropdowns {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>
