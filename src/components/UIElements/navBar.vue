<script lang="ts">
import { defineComponent } from 'vue'
import { useIsMobile } from '@/composables/useIsMobile'
import langDropdown from '@/components/UIElements/langDropdown.vue'
import profileDropdown from '@/components/UIElements/profileDropdown.vue'
import inputField from '@/components/UIElements/inputField.vue'
import MobileMenu from '@/components/UIElements/MobileMenu.vue'

export default defineComponent({
  components: {
    langDropdown,
    profileDropdown,
    inputField,
    MobileMenu
  },
  data() {
    return {
      isMenuOpen: false,
      searchQuery: '',
      isScrolled: false,
      rates: [
        {
          name: 'Aluminum',
          rate: '1.00/KG'
        },
        {
          name: 'Copper',
          rate: '2.00/KG'
        },
        {
          name: 'Gold',
          rate: '3.00/KG'
        },
        {
          name: 'Silver',
          rate: '4.00/KG'
        },
        {
          name: 'Platinum',
          rate: '5.00/KG'
        },
        {
          name: 'Palladium',
          rate: '6.00/KG'
        },
        {
          name: 'Rhodium',
          rate: '7.00/KG'
        },
        {
          name: 'Iridium',
          rate: '8.00/KG'
        },
        {
          name: 'Ruthenium',
          rate: '9.00/KG'
        },
        {
          name: 'Osmium',
          rate: '10.00/KG'
        },
        {
          name: 'Rhenium',
          rate: '11.00/KG'
        },
        {
          name: 'Indium',
          rate: '12.00/KG'
        },
        {
          name: 'Gallium',
          rate: '13.00/KG'
        },
        {
          name: 'Germanium',
          rate: '14.00/KG'
        },
        {
          name: 'Bismuth',
          rate: '15.00/KG'
        },
        {
          name: 'Antimony',
          rate: '16.00/KG'
        },
        {
          name: 'Tellurium',
          rate: '17.00/KG'
        },
        {
          name: 'Polonium',
          rate: '18.00/KG'
        },
        {
          name: 'Astatine',
          rate: '19.00/KG'
        },
        {
          name: 'Tennessine',
          rate: '20.00/KG'
        }
      ]
    }
  },
  methods: {
    switchLanguage() {
      const languages = this.$i18n.availableLocales
      const currentIndex = languages.indexOf(this.$i18n.locale)
      const nextIndex = (currentIndex + 1) % languages.length
      const newLang = languages[nextIndex]
      this.$i18n.locale = newLang
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    onFilterChange(newValue) {
      const foundOption = this.marketPlaceFilters.find(
        (filter) => filter.value === newValue
      );
      if (foundOption && foundOption.route) {
        this.$router.push(foundOption.route);
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    activeTab(): string {
      return (this.$route.query.tab as string) || 'product'
    },
    marketPlaceFilters() {
      return [
        {
          label: this.$t('burger.marketPlace'),
          value: 'product',
          route: { name: 'marketplace', query: { tab: 'product' } }
        },
        {
          label: this.$t('burger.rental'),
          value: 'rental',
          route: { name: 'marketplace', query: { tab: 'rental' } }
        },
        {
          label: this.$t('burger.services'),
          value: 'service',
          route: { name: 'marketplace', query: { tab: 'service' } }
        },
        {
          label: this.$t('burger.sell_scrap'),
          value: 'selling_scrap',
          route: { name: 'ScrapSelect', query: { tab: 'selling_scrap' } }
        }
      ]
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    return { isMobile }
  }
})
</script>
<template>
  <div class="daliy-rates-container" v-if="false">
    <h1>{{ $t('dailyRate.h1') }}</h1>

    <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="2" height="20" viewBox="0 0 2 20" fill="none">
        <path
          d="M0.499999 19.5C0.499999 19.7761 0.723857 20 0.999999 20C1.27614 20 1.5 19.7761 1.5 19.5L0.499999 19.5ZM0.5 0.5L0.499999 19.5L1.5 19.5L1.5 0.5L0.5 0.5Z"
          fill="#195B71"
        />
      </svg>
    </span>

    <div class="daily-rates-list-wrapper">
      <!-- Duplicate the list for smooth, seamless scrolling -->
      <div class="daily-rates-list">
        <div class="daily-rate" v-for="rate in rates" :key="rate.name">
          <h1>{{ rate.name }}:</h1>
          <p>SAR {{ rate.rate }}</p>
        </div>

        <!-- Duplicate the content to create the infinite loop effect -->
        <div class="daily-rate" v-for="rate in rates" :key="'duplicate-' + rate.name">
          <h1>{{ rate.name }}:</h1>
          <p>SAR {{ rate.rate }}</p>
        </div>
      </div>
    </div>
  </div>

  <div :class="['nav-container', { mobile: isMobile, 'menu-open': isMenuOpen, 'scroll-active': isScrolled }]">
    <div class="nav-logo">

      <div  class="logo-container">
        <div class="logo-icon" @click="$router.push({ name: 'home' })">
          <img src="@/assets/svg-icons/logo-sqaure.svg?url" alt="logo" />
        </div>

        <div v-if="!isMobile" class="logo-name-container" @click="$router.push({ name: 'home' })">
          <div v-if="this.$i18n.locale === 'en'" class="logo-name">
            <img src="@/assets/svg-icons/logo-name.svg?url" alt="logo" />
          </div>

          <div v-if="this.$i18n.locale === 'ar'" class="logo-name">
            <img src="@/assets/svg-icons/logo-name-ar.svg?url" alt="logo" />
          </div>
        </div>

        <div v-if="isMobile" class="marketPlace-filters">
          <inputField
            type="dropdown"
            :value="activeTab"
            :placeholder="$t('burger.marketPlace')"
            :options="marketPlaceFilters"
            class="logo-dropdown"
            @update="onFilterChange"
          />
        </div>
      </div>

      <div v-if="!isMobile" class="links">
        <router-link :to="{ name: 'marketplace', query: { tab: 'product' } }" class="link" :class="{ active: activeTab === 'product' }">
          {{ $t('burger.marketPlace') }}
        </router-link>
        <router-link :to="{ name: 'marketplace', query: { tab: 'rental' } }" class="link" :class="{ active: activeTab === 'rental' }">
          {{ $t('burger.rental') }}
        </router-link>
        <router-link :to="{ name: 'marketplace', query: { tab: 'service' } }"  class="link" :class="{ active: activeTab === 'service' }">
          {{ $t('burger.services') }}
        </router-link>
        <router-link :to="{ name: 'ScrapSelect', query: { tab: 'selling_scrap' } }"  class="link" :class="{ active: activeTab === 'selling_scrap' }">
          {{ $t('burger.sell_scrap') }}
        </router-link>
      </div>
    </div>
    <div class="nav-content">
      <inputField
        v-if="!isMobile"
        type="search"
        :placeholder="$t('nav.search')"
        :value="searchQuery"
        @update="searchQuery = $event"
        @submit="$router.push({ name: 'search', query: { query: $event } })"
      />

      <div class="cart-btn-wrapper" @click="$router.push({ name: 'checkout' })">
        <img class="cart-btn" src="@/assets/svg-icons/cart.svg?url" alt="cart" v-if="!isMenuOpen" />
        <img class="cart-btn" src="@/assets/svg-icons/cart-white.svg?url" alt="cart" v-else />
      </div>

      <div
        v-if="isMobile"
        class="cart-btn-wrapper"
        role="button"
        tabindex="0"
        @click="switchLanguage"
        @keydown.enter="switchLanguage"
      >
        <img
          class="cart-btn"
          src="@/assets/svg-icons/burger-menu/lang.svg?url"
          alt="Switch Language"
          v-if="!isMenuOpen"
        />
        <img
          class="cart-btn"
          src="@/assets/svg-icons/burger-menu/lang-white.svg?url"
          alt="Switch Language"
          v-else
        />
      </div>

      <profileDropdown v-if="!isMobile" />
      <langDropdown v-if="!isMobile" />
      <MobileMenu v-if="isMobile" @menu-toggle="isMenuOpen = $event" />
    </div>
  </div>
</template>


<style scoped>
.daliy-rates-container {
  display: flex;
  min-height: 36px;
  padding: 8px 0px 8px 80px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  background: var(--Blue-950, #0b3241);
  overflow: hidden;
  /* Hide any overflowing content */
  position: relative;
}

[lang='ar'] .daliy-rates-container {
  padding: 8px 80px 8px 0px;
}

.daliy-rates-container h1 {
  color: var(--White, #fff);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
}

.daily-rates-list-wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
  /* Ensure the container hides the overflow */
  position: relative;
}

.daily-rates-list {
  display: flex;
  gap: 20px;
  white-space: nowrap;
  animation: scroll-ltr 40s linear infinite;
  /* Default for LTR */
}

[lang='ar'] .daily-rates-list {
  animation: scroll-rtl 40s linear infinite;
  /* Adjust for RTL */
}

.daily-rate {
  display: flex;
  gap: 4px;
}

.daily-rate h1 {
  color: var(--Blue-50, #edfdfe);
  font-size: 14px;
  font-weight: 400;
}

.daily-rate p {
  color: var(--Green-400, #39ce91);
  font-size: 14px;
  font-weight: 400;
}

/* Define the seamless scrolling animation for LTR */
@keyframes scroll-ltr {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* Define the seamless scrolling animation for RTL */
@keyframes scroll-rtl {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(50%);
  }
}

@media (max-width: 768px) {
  .daliy-rates-container {
    padding: 5px 20px;
  }

  [lang='ar'] .daliy-rates-container {
    padding: 5px 20px;
  }
  .logo-icon {
    width: 39px;
    height: 39px;
  }
}

.nav-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: var(--White, #fff);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 80px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #e7e7e7;
  backdrop-filter: blur(7px);
  gap: 10px;
}

.nav-container.scroll-active .link.active {
  margin-bottom: revert;

}

.nav-container.menu-open {
  background-color: var(--Blue-950, #0b3241);
}

.nav-container.mobile {
  padding: 14px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 14px;
}



.nav-logo {
  display: flex;
  gap: 40px;
  align-items: center;
}


.nav-logo .links {
  display: flex;
}

.link {
  color: var(--Blue-950, #0b3241);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 20px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--Dark-100, #E7E7E7);
  background-color: var(--Dark-50, #F6F6F6);
  white-space: nowrap;
}
:deep(.trigger-btn) {
  border: none;
  box-shadow: none;
  min-height: revert;
  min-width: revert;
  padding: revert;
  background-color: revert;
}

:deep(.trigger-btn span) {
  color: var(--Dark-950, #121212);
  font-size: 14px;
  font-weight: 600;
  line-height: 28px;
}
.nav-container.menu-open :deep(.trigger-btn span ) {
  color: #fff;
}

:deep(.dropdown-arrow) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
}


.nav-container.menu-open :deep(.chevron-down) {
  stroke: #fff;
}

.nav-logo .link.active {
  font-weight: 700;
  background-color: var(--White, #fff);
  border-bottom: none;
  margin-bottom: -1px;
    border-right: 1px solid var(--Dark-100, #E7E7E7);
  border-left: 1px solid var(--Dark-100, #E7E7E7);
    transition: background-color 0.3s ease;

}

.nav-logo .link {
  color: #121212;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 20px;
}


.nav-logo img {
  max-height: 100%;
}

.nav-content {
  display: flex;
  gap: 20px;
  align-items: center;
}

.cart-btn-wrapper {
  display: flex;
}

.cart-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
