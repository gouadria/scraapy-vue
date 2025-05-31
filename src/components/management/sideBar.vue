<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { usePages } from '@/composables/pages'

export default defineComponent({
  name: 'SideBar',
  props: {
    textColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      toggle: {} as Record<string, boolean>,
      user: this.$userStore.state?.user
    }
  },
  setup() {
    return { isMobile: useIsMobile().isMobile }
  },
  computed: {
    pageSelect() {
      return this.$route.params.page
    },
    subPageSelect() {
      return this.$route.params.subPage
    },
    pages() {
      return usePages()
    }
  },
  methods: {
    handlePageSelect(pageKey: string, subPageKey?: string) {
      const pageHasSubPages = this.pages.some((group) =>
        group.items.some((item) => item.key === pageKey && item.components)
      )
      if (pageHasSubPages && !subPageKey) {
        this.toggle = {
          ...this.toggle,
          [pageKey]: !this.toggle[pageKey]
        }
        return
      }
      this.$router.push({
        name: 'management',
        params: {
          page: pageKey,
          subPage: subPageKey
        }
      })
      this.$emit('handlePageSelect', pageKey, subPageKey)
    }
  },
  mounted() {
    if (this.$route.name !== 'management') return
    let pageSelect = this.pageSelect

    if (!this.pageSelect) {
      pageSelect = this.pages[0].items[0].key
      this.$router.push({
        name: 'management',
        params: {
          page: pageSelect
        }
      })
    }

    const pageHasSubPages = this.pages.some((group) =>
      group.items.some((item) => item.key === this.pageSelect && item.components)
    )

    if (pageHasSubPages && !this.subPageSelect) {
      const pageObj = this.pages.find((group) =>
        group.items.some((item) => item.key === this.pageSelect)
      )
      this.$router.push({
        name: 'management',
        params: {
          page: this.pageSelect,
          subPage: Object.keys(pageObj.items[0].components)[0]
        }
      })
    }
    this.toggle = {
      ...this.toggle,
      [this.pageSelect]: true
    }
  }
})
</script>

<template>
  <div class="sidebar">
    <div v-if="!isMobile" class="sidebar-header">
      <div class="user_image">
        <img :src="user?.image" alt="user image" />
      </div>
      <div class="info">
        <h4 class="sidebar-title">{{ $t('management.hala') }}</h4>
        <h5>{{ user?.name }}</h5>
      </div>
    </div>
    <div class="divider"></div>
    <div class="sidebar_container">
      <div
        :class="isMobile ? 'sidebar-group mobile' : 'sidebar-group'"
        v-for="(group, groupIndex) in pages"
        :key="groupIndex"
      >
        <div
          v-for="(page, pageIndex) in group.items"
          :key="page.key || pageIndex"
          class="sidebar-item-wrapper"
        >
          <!-- :style="{ color: textColor }" -->
          <div
            @click="handlePageSelect(page.key)"
            class="sidebar-item"
            :class="{
              active: $route.params.page === page.key && !page.components,
              burger: isMobile
            }"
          >
            <component
              :class="isMobile ? 'management-sidebar-icon mobile' : 'management-sidebar-icon'"
              :is="page.icon"
            />
            {{ $t(page.title) }}

            <div
              v-if="page.components"
              class="sidebar-item-arrow"
              :class="{ active: toggle[page.key] }"
            >
              <img v-if="!isMobile" src="@/assets/svg-icons/chevron-down.svg?url" />
              <img v-if="isMobile" src="@/assets/svg-icons/burger-menu/chevron-down.svg?url" />
            </div>
          </div>

          <Transition name="slide-down">
            <div v-if="page.components && toggle[page.key]" class="sidebar-sub-items-wrapper">
              <div class="sidebar-sub-items-animated">
                <div
                  v-for="(subPage, subPageKey) in page.components"
                  :key="subPageKey"
                  class="sidebar-item"
                  :style="{ color: textColor }"
                  :class="{
                    active: $route.params.page === page.key && $route.params.subPage === subPageKey
                  }"
                  @click="handlePageSelect(page.key, subPageKey)"
                >
                  <component
                    :class="isMobile ? 'management-sidebar-icon mobile' : 'management-sidebar-icon'"
                    :is="subPage.icon"
                  />
                  {{ $t(subPage.title) }}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.management-sidebar-icon {
  stroke: #fff;
}

.management-sidebar-icon.mobile {
  stroke: #fff;
}

.sidebar {
  background-color: #0C3241;
  color: white;
  display: flex;
  flex-direction: column;
  min-width: 240px;
  border-right: 1px solid #d1d1d1;
  padding-right: 2px;
  position: fixed;
  height: 100vh;
  top: 93px;
  left: 80px;
  width: 250px;
  height: calc(100vh - 93px); /* Adjust height to account for top offset */
  overflow: hidden; /* Prevent sidebar itself from scrolling */
}
html[dir='rtl'] .sidebar {
  border-right: unset;
  padding-right: unset;
  border-left: 1px solid #d1d1d1;
  padding-left: 2px;
}
.sidebar_container {
  display: flex;
  flex-direction: column;
  flex: 1; /* Take remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  overscroll-behavior: contain; /* Prevent scroll chaining */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
}
.sidebar-group {
  display: flex;
  padding: 14px 2px;
  flex-direction: column;
  gap: 12px;
  border-bottom: 0.5px solid var(--Dark-700, #e7e7e7);
}

.sidebar-group.mobile {
  border-bottom: 0.5px solid #4f4f4f;
}

.sidebar-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.sidebar-item.burger {
  padding: 12px;
  gap: 12px;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(21, 179, 119, 0.1);
  transition: all 0.3s ease-in-out;
  z-index: -1;
}

.sidebar-item:hover::before {
  left: 0;
}

html[dir='rtl'] .sidebar-item::before {
  left: 100%;
}

html[dir='rtl'] .sidebar-item:hover::before {
  left: -0%;
}

html[dir='rtl'] .sidebar-item img {
  transform: scaleX(-1);
}

.sidebar-item img {
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;
}

.sidebar-item.active svg {
  /* filter: invert(56%) sepia(35%) saturate(3966%) hue-rotate(120deg) brightness(93%) contrast(84%); */
}

.sidebar-item-arrow.active svg {
  transform: rotate(180deg);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-height: 500px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.sidebar-sub-items-animated {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0px 0px 20px;
}

html[dir='rtl'] .sidebar-sub-items-animated {
  padding: 0;
  padding: 12px 20px 0px 0px;
}

.sidebar-sub-items-animated .sidebar-item {
  padding: 0.4rem 0.8rem;
  font-size: 14px;
}
.sidebar-header {
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 4px 12px 18px 0px;
  border-bottom: 0.8px solid #e7e7e7;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.info h4 {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.info h5 {
  color: #3d3d3d;
  font-size: 18px;
  font-weight: 600;
}
.sidebar-header .user_image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.sidebar-header .user_image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.sidebar-item:hover {
  color: #fff;
}

.sidebar-item.active {
  color: #fff;
  border: 1px solid #1a4b5f;
  background-color: #1a4b5f;
}
</style>
<style>
.sidebar-item svg path {
  stroke: #fff;
}
.mobile-menu .sidebar-group.mobile svg path {
  stroke: #fff;
}
.mobile-menu .sidebar-item.burger {
  color: #fff;
}
</style>
