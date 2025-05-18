<script lang="ts">
import { defineComponent } from 'vue'
import DropMenu from '@/components/UIElements/DropMenu.vue'

export default defineComponent({
  name: 'profileDropdown',
  components: {
    DropMenu
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    async logout() {
      await this.$userStore
        .dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(() => {
          console.error('Failed to logout')
        })
    }
  }
})
</script>

<template>
  <DropMenu :show="show" @update="show = $event">
    <template v-slot:trigger>
      <div class="profile-trigger avatar-wrapper">
        <img src="@/assets/svg-icons/profile-menu/profile.svg?url" alt="Profile" />
      </div>
    </template>

    <template v-slot:menu>
      <div class="profile-content" v-if="$userStore.getters.isAuthenticated">
        <div class="header">
          <div class="header-avatar avatar-wrapper">
            <img
              v-if="$userStore.state.user?.image"
              :src="$userStore.state.user.image"
              alt="Profile"
            />
            <img v-else src="@/assets/svg-icons/profile-menu/profile.svg?url" alt="Profile" />
          </div>
          <div class="header-info">
            <div class="header-name">
              {{ $userStore.state.user?.name }}
            </div>
            <div class="header-email">
              {{ $userStore.state.user?.email }}
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div
          class="drop-item"
          v-if="$userStore.getters.hasBusinessProfile"
          @click="
            $router.push({
              name: 'management',
              params: {
                page: 'MyListings',
                subPage: 'sell-product'
              }
            })
          "
        >
          <div class="drop-item-icon">
            <img src="@/assets/svg-icons/profile-menu/edit-users.svg?url" alt="Profile" />
          </div>
          <div class="drop-item-label">{{ $t('profileDropdown.myListings') }}</div>
        </div>

        <div
          class="drop-item"
          v-if="$userStore.getters.isStaff"
          @click="
            $router.push({
              name: 'management',
              params: {
                page: 'vendor-approval'
              }
            })
          "
        >
          <div class="drop-item-icon">
            <img src="@/assets/svg-icons/profile-menu/addresses.svg?url" alt="Profile" />
          </div>
          <div class="drop-item-label">{{ $t('profileDropdown.approvals') }}</div>
        </div>

        <div class="divider"></div>

        <div
          class="drop-item"
          v-if="$userStore.getters.hasBusinessProfile"
          @click="
            $router.push({
              name: 'management',
              params: {
                page: 'Selling',
                subPage: 'products-sold'
              }
            })
          "
        >
          <div class="drop-item-icon">
            <img src="@/assets/svg-icons/profile-menu/sell-history.svg?url" alt="Profile" />
          </div>
          <div class="drop-item-label">{{ $t('profileDropdown.sellingHistory') }}</div>
        </div>

        <div
          class="drop-item"
          v-if="$userStore.getters.hasBusinessProfile"
          @click="
            $router.push({
              name: 'management',
              params: {
                page: 'Purchasing',
                subPage: 'products-bought'
              }
            })
          "
        >
          <div class="drop-item-icon">
            <img src="@/assets/svg-icons/profile-menu/purchase-history.svg?url" alt="Profile" />
          </div>
          <div class="drop-item-label">{{ $t('profileDropdown.buyingHistory') }}</div>
        </div>

        <div class="divider"></div>

        <div class="drop-item" @click="logout">
          <div class="drop-item-icon">
            <img src="@/assets/svg-icons/profile-menu/logout.svg?url" alt="Profile" />
          </div>
          <div class="drop-item-label logout">{{ $t('nav.logout') }}</div>
        </div>
      </div>
      <div class="profile-content" v-else>
        <div class="drop-item" @click="$router.push({ name: 'login' })">
          <div class="drop-item-label">{{ $t('auth.login') }}</div>
        </div>
      </div>
    </template>
  </DropMenu>
</template>

<style scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 50%; */
}

.profile-trigger {
  cursor: pointer;
  max-width: 60px;
  height: 30px;
  border-radius: 50%;
}

.profile-content {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow:
    0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
}

.header {
  display: flex;
  padding: 12px 16px;
  gap: 12px;
  align-items: center;
}

.header .header-avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.header-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 18px;
}

.header-name {
  font-weight: 600;
  color: var(--Gray-700, #344054);
}

.header-email {
  font-weight: 400;
  color: var(--Gray-600, #475467);
}

.divider {
  height: 1px;
  background-color: var(--Gray-200, #eaecf0);
}

.drop-item {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  padding: 9px 16px;
}

.drop-item-icon {
  width: 16px;
  height: 16px;
}

.drop-item-icon img {
  width: 100%;
  height: 100%;
}

.drop-item-label {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--Dark-700, #4f4f4f);
}

.drop-item-label.logout {
  color: var(--error);
}
</style>
