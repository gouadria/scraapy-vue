<script lang="ts">
import { defineComponent } from 'vue'
import DropMenu from '@/components/UIElements/DropMenu.vue'
import sideBar from '@/components/management/sideBar.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'

export default defineComponent({
  name: 'MobileMenu',
  components: {
    DropMenu,
    sideBar,
    MainBtn
  },
  data() {
    return {
      show: false,
      totalOffsetHeight: 0
    }
  },

  methods: {
    handlePageSelect(pageKey: string, subPageKey?: string) {
      // Close burger menu
      this.show = false
    },

    updateShow(val: boolean) {
      document.body.style.overflow = val ? 'auto' : 'hidden'
      this.show = val
    },

    switchLanguage() {
      const languages = this.$i18n.availableLocales
      const currentIndex = languages.indexOf(this.$i18n.locale)
      const nextIndex = (currentIndex + 1) % languages.length
      const newLang = languages[nextIndex]
      this.$i18n.locale = newLang
    },

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
  },
  watch: {
    show(val) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      this.$emit('menu-toggle', val)
    }
  }
})
</script>

<template>
  <DropMenu :show="show" @update="show = $event" fullScreen>
    <!-- Trigger slot -->
    <template v-slot:trigger>
      <div class="menu-trigger" :class="{ open: show }">
        <div class="burger-lines">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
      </div>
    </template>

    <!-- Menu slot -->
    <template v-slot:menu>
      <div class="mobile-menu" :style="{ top: totalOffsetHeight + 'px' }">
        <div class="mobile-menu-content">
          <div v-if="this.$userStore.getters.isAuthenticated" class="user-welcome">
            <div class="user-info-wrapper">
              <div class="user-img-wrapper">
                <img :src="$userStore.state.user?.image" :alt="$t('settings.businessLogoAlt')"
                  v-if="$userStore.state.user?.image" />
                <img src="@/assets/svg-icons/profile-menu/profile.svg?url" :alt="$t('settings.businessLogoAlt')"
                  v-else />
              </div>
              <div class="user-name">
                <span> Hala! </span>
                <h1>
                  {{ $userStore.state.user?.name }}
                </h1>
              </div>
            </div>
            <div class="logout" @click="logout">
              <span> {{ $t('nav.logout') }} </span>
              <img src="@/assets/svg-icons/burger-menu/logout.svg?url" />
            </div>
          </div>
          <div v-if="!this.$userStore.getters.isAuthenticated" class="guest-container">
            <div class="guest-welcome">
              <h1>
                {{ $t('welcome.hala') }}
              </h1>
              <span>
                {{ $t('welcome.welcomeMessage') }}
              </span>
            </div>

            <div class="guest-options">
              <MainBtn type="green" @click="$router.push({ name: 'login' })
                ">
                {{ $t('burger.login') }}
              </MainBtn>
              <MainBtn type="white" @click="$router.push({ name: 'register' })">
                {{ $t('burger.signup') }}
              </MainBtn>
            </div>
          </div>
        </div>

        <sideBar v-if="this.$userStore.getters.isAuthenticated" :textColor="'#fff'"
          @handlePageSelect="handlePageSelect" />
      </div>
    </template>
  </DropMenu>
</template>

<style scoped>
.menu-trigger {
  display: flex;
  cursor: pointer;
}

.burger-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.line {
  width: 24px;
  height: 2px;
  background: var(--Dark-800, #454545);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.menu-trigger.open .line1 {
  transform: translateY(7px) rotate(45deg);
  background: var(--White, #fff);
}

.menu-trigger.open .line2 {
  opacity: 0;
}

.menu-trigger.open .line3 {
  transform: translateY(-7px) rotate(-45deg);
  background: var(--White, #fff);
}

.mobile-menu {
  background: var(--Blue-950, #0b3241);
  padding: 32px 20px 40px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  height: 100%;
  overflow: auto;
}

html[dir="rtl"] .mobile-menu :deep(.sidebar),
.mobile-menu :deep(.sidebar),
.mobile-menu :deep(.divider) {
  border: none;
  padding: 0;
}

.mobile-menu :deep(.user-img-wrapper) {
  background-color: revert;
}

.mobile-menu :deep(.user-welcome) {
  padding: 0 0 18px 0;
  border-bottom: 0.5px solid var(--Dark-700, #4F4F4F);
}




.mobile-menu-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.mobile-menu-item {
  min-width: 100%;
  display: flex;
  padding: 24px 0px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid rgba(231, 231, 231, 0.1);
  cursor: pointer;
}

.mobile-menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-menu-item span {
  color: var(--White, #fff);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.user-welcome {
  display: flex;
  padding: 4px 12px 18px 0px;
  border-bottom: 0.5px solid var(--Dark-700, #4f4f4f);
  justify-content: space-between;
  align-items: flex-end;
}

.user-info-wrapper {
  gap: 12px;
  display: flex;
}

.user-img-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--Dark-950, #e7e7e7);
}

.user-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name span {
  color: var(--Dark-400, #888);
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.user-name h1 {
  color: var(--White, #fff);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.logout {
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
}

.logout span {
  color: var(--Dark-300, #b0b0b0);
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

html[dir='rtl'] .logout img {
  transform: rotateY(180deg);
}

.guest-welcome {
  display: flex;
  padding: 0 0 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-bottom: 0.5px solid var(--Dark-700, #4F4F4F);
}

.guest-welcome h1 {
  color: var(--White, #FFF);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.guest-welcome span {
  color: var(--Dark-200, #D1D1D1);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}

.guest-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
}
</style>
