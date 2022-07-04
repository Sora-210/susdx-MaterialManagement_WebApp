import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

import store from '@/store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login'),
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500'),
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    meta: { requiredAuth: true },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/Inference/:cameraName',
        name: 'Inference',
        component: () => import('@/views/infecenre/Inference.vue'),
      },
      {
        path: '/Image/latest',
        name: 'ImageLatest',
        component: () => import('@/views/Camera/Latest.vue'),
      },
      {
        path: '/Image/now',
        name: 'ImageNow',
        component: () => import('@/views/Camera/Now.vue'),
      },
      {
        path: '/Image/old',
        name: 'ImageOld',
        component: () => import('@/views/Camera/Old.vue'),
      },
      {
        path: '/Setting/device',
        name: 'deviceSetting',
        component: () => import('@/views/Setting/Device.vue'),
      },
      {
        path: '/Setting/section',
        name: 'sectionSetting',
        component: () => import('@/views/Setting/Section.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => {
      return record.meta.requiredAuth
    }) &&
    !store.getters.checkJwt
  ) {
    console.log('logincheck false')
    next({ path: '/login', query: { path: to.fullPath } })
  } else {
    next()
  }
})

export default router
