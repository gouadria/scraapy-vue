<template>
  <div class="document_container" v-auto-animate>
    <div class="component_nav">
      <div class="nav_controls">
        <dropDownComponent
          :options="options"
          @option-selected="handleOptionSelected"
          class="doc_dropdown_menu"
          :isArowIcon="true"
        >
          <template #button-content>
            {{ selectedOption?.label }}
          </template>
        </dropDownComponent>

        <button class="filter_button" @click="showFilter">
          <img src="@/assets/documents_svg/filter-icon.svg?url" alt="filter" />
        </button>
      </div>

      <div class="doc_filter">
        <inputField
          type="search"
          :placeholder="$t('nav.search')"
          :value="searchQuery"
          @update="searchQuery = $event"
          @keyup.enter="handleSearch"
          @input="handleSearch"
        />
        <!-- <button class="filter_button" @click="showFilter">
          <img src="@/assets/documents_svg/filter-icon.svg" alt="filter" />
        </button> -->
      </div>

      <Transition name="slide">
        <div v-show="filtershow" class="filter_section">
          <FilterComponent @filter="handleFilterChange" :towInputDate="true" />
        </div>
      </Transition>
    </div>

    <!-- Document List Section -->
    <div class="list_doc_container" @scroll="handleScroll" ref="documentListScroll">
      <DocumentList
        :listData="listData"
        @selectDoc="handleSelectDoc"
        :viewVersions="showReleaseHistory"
        :loading="loading"
        @scroll="handleScroll"
        ref="documentListScroll"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FilterComponent from '@/components/UIElements/FilterComponent.vue'
import inputField from '../UIElements/inputField.vue'
import dropDownComponent from '../UIElements/dropDownComponent.vue'
import DocumentList from '@/components/Documents/DocumentList.vue'

interface Option {
  value: string
  label: string
}

export default defineComponent({
  name: 'SidebarLayout',
  components: {
    DocumentList,
    inputField,
    FilterComponent,
    dropDownComponent
  },
  props: {
    options: {
      type: Array as () => Option[],
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      default: 'create_invoice'
    },
    listData: {
      type: Array,
      required: true
    },
    selectedOption: {
      type: Object as () => Option,
      default: () => ({})
    },
    showReleaseHistory: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filtershow: false,
      searchQuery: '',
      documentListScroll: null as HTMLElement | null
    }
  },
  methods: {
    showFilter() {
      this.filtershow = !this.filtershow
    },
    handleOptionSelected(option: Option) {
      this.$emit('option-selected', option)
    },
    handleSearch(query: string) {
      this.$emit('search', this.searchQuery)
      console.log(this.searchQuery)
    },
    handleSelectDoc(doc: any) {
      this.$emit('select-doc', doc)
    },
    handleFilterChange(filters: any) {
      this.$emit('filter-change', filters)
      console.log('Filters:', filters)
    },
    handleScroll(event: Event) {
      const container = event.target as HTMLElement
      const { scrollTop, scrollHeight, clientHeight } = container

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        this.$emit('handleLoadMoreDocuments')
      }
    },
    documentsSearch() {
      console.log('Search query:', this.searchQuery)
    },
    testSelectedOption() {
      console.log('Selected Option:', this.selectedOption)
    }
  },
  mounted() {
    if (this.documentListScroll) {
      this.documentListScroll.addEventListener('scroll', this.handleScroll)
    }
    console.log('listData listData:', this.options)
  },
  unmounted() {
    if (this.documentListScroll) {
      this.documentListScroll.removeEventListener('scroll', this.handleScroll)
    }
  }
})
</script>

<style scoped>
.document_container {
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 1px solid#EAECF0;
  min-height: 100%;
  gap: 16px;
}

html[dir='rtl'] .document_container {
  border-right: unset;
  border-left: 1px solid #eaecf0;
}

.list_doc_container {
  display: flex;
  overflow-y: scroll;
  max-height: 77vh;
  flex-direction: column;
}

.nav_controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  padding: 20px 16px;
}
.doc_filter {
  display: flex;
  width: 100%;
  padding: 0px 12px 12px 12px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.list_view_padding {
  padding-top: 20px;
}
.filter_section {
  padding: 0 16px;
}
.filter_button {
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  border: 1px solid #f6f6f6;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.doc_dropdown_menu .dropdown_menu {
  min-width: 160px;
  left: unset;
  right: 10px;
  top: 120%;
}
html[dir='ltr'] .doc_dropdown_menu .dropdown_menu {
  left: 10px;
  right: unset;
  top: 120%;
}
.doc_dropdown_menu .dropdown_menu ul li:hover {
  background: #f9fafb;
}
.filter_section .filter_container .tow_row {
  flex-wrap: nowrap;
}
.filter_section .tow_row .filter_form {
  min-width: 48%;
  width: 100%;
}
/* Custom scrollbar styles */
.list_doc_container::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.list_doc_container::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the track */
  border-radius: 4px; /* Rounded corners for the track */
}

.list_doc_container::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners for the thumb */
}

.list_doc_container::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color of the thumb on hover */
}
@media (max-width: 1200px) {
  .document_container {
    width: 100% !important;
    height: 100%;
  }
}
</style>
