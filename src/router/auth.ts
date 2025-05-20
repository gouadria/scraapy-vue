export default [
  {
      path: '/auth/login',
      name: 'login',
      meta: { noAuth: true },
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/auth/otp',
      name: 'otp',
      meta: { noAuth: true },
      component: () => import('@/views/auth/OtpView.vue'),
    },
    {
      path: '/auth/google/callback',
      name: 'googleCallback',
      meta: { noAuth: true },
      component: () => import('@/views/auth/GoogleCallbackView.vue')
    },
    {
      path: '/auth/forgot-password',
      name: 'forgotPassword',
      meta: { noAuth: true },
      component: () => import('@/views/auth/ForgotPasswordView.vue')
    },
    {
      path: '/auth/password/reset/confirm/:uid/:token',
      name: 'resetPassword',
      meta: { noAuth: true },
      component: () => import('@/views/auth/ResetPasswordView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      meta: { noAuth: true },
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/auth/activate/:id/:token',
      name: 'activate',
      meta: { noAuth: true },
      component: () => import('@/views/auth/ActivateView.vue')
    },
    {
      path: '/auth/register/business',
      name: 'registerBusiness',
      meta: { requiresAuth: true, requiresBusiness: true },
      component: () => import('@/views/auth/RegisterBusinessView.vue')
    },
]
