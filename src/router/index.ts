import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from './auth'
import User from '@/store/User'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PortfolioView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutUsView.vue')
    },
    {
      path: '/partner',
      name: 'partner',
      component: () => import('@/views/BecomeOurPartnerView.vue')
    },
    {
      path: '/career',
      name: 'career',
      component: () => import('@/views/CareerView.vue')
    },
    {
      path: '/materials_policy',
      name: 'materials_policy',
      component: () => import('@/views/MaterialsTheftPolicyView.vue')
    },
    {
      path: '/return_policy',
      name: 'return_policy',
      component: () => import('@/views/ReturnRefundPolicyView.vue')
    },
    {
      path: '/privacy_policy',
      name: 'privacy_policy',
      component: () => import('@/views/PrivacyPolicyView.vue')
    },
    {
      path: '/service_providers',
      name: 'service_providers',
      component: () => import('@/views/ServiceProvidersView.vue')
    },
    {
      path: '/qhs',
      name: 'qhs',
      component: () => import('@/views/QualityHealthSafetyPolicyView.vue')
    },
    {
      path: '/franchise',
      name: 'franchise',
      component: () => import('@/views/FranchiseView.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue')
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => import('@/views/SubscriptionsView.vue')
    },
    {
      path: '/demolition_works',
      name: 'demolition_works',
      component: () => import('@/views/DemolitionWorksView.vue')
    },
    {
      path: '/scrap-item/:categoryName',
      name: 'ScrapItem',
      component: () => import('@/views/selling_scrap/ScrapItem.vue')
    },
    {
      path: '/scrap-category',
      name: 'ScrapCategory',
      component: () => import('@/views/selling_scrap/Scrap_category.vue')
    },
    {
      path: '/scrap-select',
      name: 'ScrapSelect',
      component: () => import('@/views/selling_scrap/ScrapSelect.vue'),
    },
    {
      path: '/scrap-phone',
      name: 'ScrapPhone',
      component: () => import('@/views/selling_scrap/ScrapPhone.vue')
    },
    {
      path: '/sell-scrap',
      name: 'SellScrap',
      component: () => import('@/views/selling_scrap/SellScrapView.vue')
    },
    {
      path: '/otp',
      name: 'xOtpverified',
      component: () => import('@/views/selling_scrap/xOtpverified.vue')
    },
    {
      path: '/location-picker',
      name: 'LocationPicker',
      component: () => import('@/views/selling_scrap/LocationPickerPage.vue')
    },
    {
      path: '/info-bank',
      name: 'InfoBank',
      component: () => import('@/views/selling_scrap/infoBank.vue')
    },
    {
      path: '/sell-scrap-confirmation',
      name: 'SellScrapConfirmation',
      component: () => import('@/views/selling_scrap/sellScrapconfirmation.vue')
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: () => import('@/views/selling_scrap/ConfirmationScreen.vue')
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/management/:page?/:subPage?',
      name: 'management',
      meta: { requiresAuth: true },
      component: () => import('@/views/ManagementView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/payment/callback/',
      name: 'payment-callback',
      component: () => import('../views/utils/PaymentCallbackView.vue')
    }
  ].concat([...AuthRoutes]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach(async (to, from) => {
  // Start loading
  store.dispatch('loading/startLoading')
  // redirect to registerBusiness if business profile is not complete
  if (User.getters.isBusiness && !User.getters.hasBusinessProfile) {
    if (to.name === 'registerBusiness') return true
    return { name: 'registerBusiness' }
  }

  // redirect to home if page requires non-authenticated user
  if (to.meta.noAuth && User.getters.isAuthenticated) {
    if (to.name === 'home') return true
    return { name: 'home' }
  }

  // redirect to login if page requires authentication
  if (to.meta.requiresAuth && !User.getters.isAuthenticated) {
    if (to.name === 'login') return true
    return { name: 'login' }
  }

  // redirect to home if user is not a business
  if (to.meta.requiresBusiness && !User.getters.hasBusinessProfile) {
    if (to.name === 'home') return true
    return { name: 'home' }
  }

  // redirect to home if user is not staff
  if (to.meta.requiresStaff && !User.getters.isStaff) {
    if (to.name === 'home') return true
    return { name: 'home' }
  }
  return true
})
router.afterEach(async () => {
  await store.dispatch('loading/stopLoading')
})
export default router
