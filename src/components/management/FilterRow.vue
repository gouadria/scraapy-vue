<script lang="ts">
import { defineComponent } from 'vue'
import inputField from '@/components/UIElements/inputField.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import dropDownComponent from '@/components/UIElements/dropDownComponent.vue'

interface Option {
  value: string
  label: string
}

export default defineComponent({
  name: 'FilterRow',
  components: {
    inputField,
    MainBtn,
    dropDownComponent
  },
  data() {
    return {
      searchTimeout: null as any,
      selectedSort: null as Option | null,
      selectedFilter: null as Option | null,
      sortOptions: [
        { value: 'latest', label: this.$t('sortOptions.latest') },
        { value: 'oldest', label: this.$t('sortOptions.oldest') }
      ] as Option[],
      filterOptions: [
        { value: '', label: this.$t('filterOptions.All') },
        { value: 'pending', label: this.$t('filterOptions.Pending') },
        { value: 'paid', label: this.$t('filterOptions.paid') },
        { value: 'notpaid', label: this.$t('filterOptions.notpaid') }
      ] as Option[]
    }
  },
  methods: {
    handleSearch(value: String) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(() => {
        let getParams = new URLSearchParams(window.location.search)
        if (getParams.has('page')) {
          getParams.delete('page')
        }
        getParams.set('search', value)
        this.$router.push({ query: Object.fromEntries(getParams) })
      }, 300)
    },
    handleSortOrder(option: Option) {
      this.selectedSort = option
      let getParams = new URLSearchParams(window.location.search)
      if (getParams.has('page')) {
        getParams.delete('page')
      }
      getParams.set('sort', option.value)
      this.$router.push({ query: Object.fromEntries(getParams) })
    },
    handleFilterOrder(option: Option) {
      this.selectedFilter = option
      let getParams = new URLSearchParams(window.location.search)
      if (getParams.has('page')) {
        getParams.delete('page')
      }
      getParams.set('filter', option.value)
      this.$router.push({ query: Object.fromEntries(getParams) })
    }
  }

  // Optionally initialize selections from URL params when component loads

  // created() {
  //   const params = new URLSearchParams(window.location.search)
  //   const sortValue = params.get('sort')
  //   const filterValue = params.get('filter')

  //   if (sortValue) {
  //     this.selectedSort = this.sortOptions.find((opt) => opt.value === sortValue) || null
  //   }
  //   if (filterValue) {
  //     this.selectedFilter = this.filterOptions.find((opt) => opt.value === filterValue) || null
  //   }
  // }
})
</script>

<template>
  <div class="filter_search">
    <inputField type="search" :placeholder="$t('nav.search')" @update="handleSearch" />

    <!-- Sort Dropdown -->
    <MainBtn type="white">
      <dropDownComponent
        class="doc_dropdown_menu"
        :options="sortOptions"
        @option-selected="handleSortOrder"
      >
        <template #button-content>
          <div class="button_text">
            <img src="@/assets/svg-icons/Selling/filter-lines.svg?url" alt="sort icon" />
            {{ selectedSort ? selectedSort.label : $t('Selling.SortBy') }}
          </div>
        </template>
      </dropDownComponent>
    </MainBtn>

    <!-- Filter Dropdown -->
    <MainBtn type="white">
      <dropDownComponent
        class="doc_dropdown_menu"
        :options="filterOptions"
        @option-selected="handleFilterOrder"
      >
        <template #button-content>
          <div class="button_text">
            <img src="@/assets/svg-icons/Selling/switch-vertical-01.svg?url" alt="filter icon" />
            {{ selectedFilter ? selectedFilter.label : $t('Selling.FilterBy') }}
          </div>
        </template>
      </dropDownComponent>
    </MainBtn>
  </div>
</template>

<style scoped>
.filter_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}
.button_text {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
