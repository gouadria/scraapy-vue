<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import categoryCard from '@/components/UIElements/categoryCard.vue'
import xCarousel from '@/components/UIElements/xCarousel.vue'
import DropMenu from '@/components/UIElements/DropMenu.vue'
import type { CategoryGroup } from '@/models/Category'
import Tr from '@/plugins/i18n/translation'
import chevronDown from '@/assets/svg-icons/chevron-down.svg'


export default defineComponent({
  name: 'categoriesComponent',
  components: {
    DropMenu,
    categoryCard,
    xCarousel
  },
  props: {
    categoryGroups: {
      type: Array as () => CategoryGroup[],
      required: true
    }
  },
  watch: {
    categoryGroups: {
      immediate: true,
      handler(newVal) {
        if (newVal?.length) {
          this.selectedCategoryGroup = newVal[0]
        }
      }
    }
  },
  data() {
    return {
      chevronDown: shallowRef(chevronDown),
      show: false,
      selectedCategoryGroup: null as CategoryGroup | null
    }
  },
  methods: {
    onCategoryClick(categoryGroup: CategoryGroup) {
      this.selectedCategoryGroup = categoryGroup;
      consle.log('categoryGroup:', categoryGroup)
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    return { isMobile }
  },
  computed: {
    lang() {
      return Tr.currentLanguage
    }
  }
})
</script>

<template>
  <div class="categories-container">
    <DropMenu :show="show" @update="show = $event" v-if="!isMobile" class="home_categories" :uniqueClass="'categories_dropdown'">
      <template v-slot:trigger>
        <div class="categories-btn-wrapper">
          <div class="burger-btn">
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
          </div>

          <div class="categories-label">
            <p>{{ $t('HomeView.AllCategories') }}</p>
            <div
              class="lang-dropdown-arrow"
              :style="{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }"
            >
              <component class="chevron-down" :is="chevronDown" />
            </div>
          </div>
        </div>
      </template>

      <template v-slot:menu>
        <div class="categories-list-dropdown">
          <div class="main-categories">
            <categoryCard
              v-for="categoryGroup in categoryGroups"
              :key="categoryGroup.id"
              :categoryGroup="categoryGroup"
              small
              @click="onCategoryClick(categoryGroup)"
            />
          </div>
          <div class="sub-categories-container">
            <div class="sub-category-header">
              <h1>
                {{ lang == 'ar' ? selectedCategoryGroup?.name_ar : selectedCategoryGroup?.name }}
              </h1>
            </div>

            <div class="sub-categories-wrapper">
              <div class="sub-categories">
                <h1>{{ $t('HomeView.Subcategories') }}</h1>

                <ul>
                  <li
                    v-for="category in selectedCategoryGroup?.categories"
                    :key="category.id"
                    @click="$router.push({ name: 'search', query: { category: category.id } })"
                  >
                    {{ lang == 'ar' ? category.name_ar : category.name }}
                  </li>
                </ul>
              </div>
              <!-- <div class="top-suppliers"> -->
              <!--   <h1>{{ $t('HomeView.TopRatedSuppliers') }}</h1> -->
              <!---->
              <!--   <ul> -->
              <!--     <li>Supplier 1</li> -->
              <!--     <li>Supplier 2</li> -->
              <!--     <li>Supplier 3</li> -->
              <!--     <li>Supplier 4</li> -->
              <!--     <li>Supplier 5</li> -->
              <!--   </ul> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </template>
    </DropMenu>

    <xCarousel state="fade">
      <categoryCard
        v-for="categoryGroup in categoryGroups"
        :key="categoryGroup.id"
        :categoryGroup="categoryGroup"
        @click="$router.push({ name: 'search', query: { sort: 'relavance', categoryGroup: categoryGroup.id } })"
      />
    </xCarousel>
  </div>
</template>

<style scoped>
.categories-container {
  display: flex;
  padding: 25px 0px 0 0;
  gap: 20px;
  align-items: flex-start;
  position: relative;
  --carousel-fade-color: var(--White, #fff);
  background-color: var(--carousel-fade-color);
}

.categories-dropdown-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.categories-btn-wrapper {
  display: flex;
  width: 165px;
  padding: 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 12px;
  background: var(--Dark-50, #f6f6f6);
  cursor: pointer;
  flex-shrink: 0;
}

.burger-btn {
  display: flex;
  width: 32px;
  height: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.burger-line {
  width: 26px;
  height: 2px;
  background: #0b3241;
}

.burger-line:nth-child(3) {
  width: 18px;
}

.categories-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.categories-label p {
  color: var(--Blue-950, #0b3241);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.categories-dropdown-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 5;
}

.lang-dropdown-arrow {
  transition: transform 0.2s;
}

.categories-list-dropdown {
  background: var(--Dark-50, #f6f6f6);
  border: 1px solid var(--Dark-100, #e7e7e7);
  border-radius: 12px;
  box-shadow: 0px 13px 25.5px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
}

.main-categories {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 15px 20px;
  flex-direction: column;
  border-right: 1px solid var(--Dark-100, #e7e7e7);
  overflow-y: auto;
  max-height: 50vh;
}

.main-categories .category-card {
  flex-direction: row;
  padding: 8px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
  white-space: nowrap;
}

.sub-categories-container {
  display: flex;
  padding: 15px 30px;
  flex-direction: column;
  gap: 15px;
  align-self: stretch;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
}

.sub-category-header {
  padding: 15px 0px;
  border-bottom: 1px solid var(--Dark-100, #e7e7e7);
}

.sub-category-header h1 {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.sub-categories-wrapper {
  display: flex;
  gap: 45px;
}

.sub-categories-wrapper h1 {
  color: var(--Dark-950, #121212);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
}

.sub-categories-wrapper ul {
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  list-style: none;
  white-space: nowrap;
}

.sub-categories-wrapper ul li {
  color: var(--Dark-800, #454545);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}

/* Transition styles */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
  .chevron-down {
  stroke: #3D3D3D;
  stroke-width: 1.5;
}


@media (max-width: 768px) {
  .categories-container {
    padding: 15px 0 20px 0;
  }

}
</style>
<style>
[lang='ar'] .home_categories .dropmenu-content {
  /* right: 0; */
  left: unset;
}
</style>
