<template>
  <navBar />
  <div
    class="profile-message"
    v-if="
      $userStore.getters.hasBusinessProfile &&
      $userStore.state.user?.business_profile?.status === 'pending'
    "
  >
    <div class="approval-title">
      {{ $t('profile.welcomeMessage') }} <span>{{ $t('listings.scraapy') }}!</span>
    </div>
    <div class="approval-content">
      <div class="spinner">
        <img src="@/assets/svg-icons/loading.svg?url" />
      </div>
      <div class="approval-message">
        <div class="message-title">{{ $t('profile.pendingApprovalTitle') }}</div>
        <div class="message-content">
          {{ $t('listings.pendingApproval') }}
        </div>
      </div>
    </div>
  </div>

  <div
    class="profile-message"
    v-else-if="
      $userStore.getters.hasBusinessProfile &&
      $userStore.state.user?.business_profile?.status === 'rejected'
    "
  >
    <div class="approval-title">
      {{ $t('profile.welcomeMessage') }} <span>{{ $t('listings.scraapy') }}!</span>
    </div>
    <div class="approval-content">
      <div class="approval-message">
        <div class="message-title">{{ $t('profile.rejectedProfileTitle') }}</div>
        <div class="message-content">
          {{ $t('listings.rejectedVendorRequest') }}
        </div>
      </div>
    </div>
  </div>

  <div class="management-page" v-else>
    <div class="content">
      <sideBar v-if="!isMobile" />
      <div class="main">
        <div
          class="banner"
          v-if="$userStore.getters.hasBusinessProfile && !$userStore.state.user?.image"
        >
          <div class="banner-img">
            <img src="@/assets/svg-icons/alert.svg?url" alt="alert icon" />
          </div>
          <div class="banner-content" @click="redirectSettings">
            {{ $t('listings.uploadLogo') }}
          </div>
        </div>

        <component :is="getPageComponent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navBar from '@/components/UIElements/navBar.vue'
import sideBar from '@/components/management/sideBar.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { usePages } from '@/composables/pages'

export default defineComponent({
  name: 'ManagementPage',
  components: {
    navBar,
    sideBar
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
    getPageComponent() {
      if (!this.pageSelect) return

      const pages = usePages()
      if (!pages) return

      // get the page within 2 layers
      const page = pages
        .find((page) => {
          return page.items.some((item) => item.key === this.pageSelect)
        })
        ?.items.find((item) => item.key === this.pageSelect)

      if (this.subPageSelect) {
        return page?.components[this.subPageSelect]?.component
      }

      return page?.component
    }
  },
  methods: {
    redirectSettings() {
      this.$router.push({
        name: 'management',
        params: {
          page: 'Account',
          subPage: 'settings'
        }
      })
    }
  }
})
</script>

<style scoped>
.profile-message {
  display: flex;
  flex-direction: column;
  padding-inline: 80px;
}

.approval-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  padding-block: 30px;
}

.approval-title span {
  color: #15b377;
  font-weight: 600;
}

.approval-content {
  display: flex;
  gap: 20px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner img {
  width: 57px;
  height: 57px;
  animation: spin 10s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.not-approved-message {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.message-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}

.message-content {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.banner {
  display: flex;
  padding: 25px 30px;
  align-items: center;
  gap: 15px;
  border-radius: 12px;
  border: 2px solid #f79009;
  background: #d2f9e3;
  margin-bottom: 10px;
}

.banner-img {
  width: 30px;
  height: 30px;
}

.banner-img img {
  width: 100%;
  height: 100%;
  filter: invert(63%) sepia(73%) saturate(2903%) hue-rotate(359deg) brightness(102%) contrast(94%);
}

.banner-content {
  color: #084c37;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  cursor: pointer;
}

.management-page {
  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
  /* padding-inline: 5rem; */
  /* padding-block: 3rem; */
  padding: 28px 80px 0;
  height: 100%;
}

.banner-content:hover {
  text-decoration: underline;
}

.title {
  font-size: 24px;
  font-weight: 500;
}

.content {
  display: flex;
  gap: 2rem;
  overflow-y: auto;
  height: 100%;
}

/* .content :deep(.sidebar) {
  position: fixed;
  height: 100vh;
  top: 93px;
  left: 80px;
  width: 250px;
  overflow-y: auto;
} */

html[dir='rtl'] .content :deep(.sidebar) {
  right: 80px;
  left: auto;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin-block: 1rem;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 300px;
}

html[dir='rtl'] .main {
  margin-left: auto;
  margin-right: 330px;
}

@media (max-width: 768px) {
  .main {
    margin-left: revert;
    margin-right: revert;
  }

  html[dir='rtl'] .main {
    margin-left: revert;
    margin-right: revert;
  }

  .management-page {
    padding-inline: 2rem;
    gap: 2rem;
  }

  .content {
    flex-direction: column;
  }

  .banner {
    padding: 25px 20px;
  }

  .sidebar {
    gap: 0.5rem;
  }

  button {
    font-size: 14px;
  }

  .title {
    font-size: 20px;
  }

  .content {
    gap: 1rem;
  }
}
</style>
