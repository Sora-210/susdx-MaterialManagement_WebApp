import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

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
    children: [
      {
        path: '/',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
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
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
