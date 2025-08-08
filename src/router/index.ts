import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// Tabs removidas; rotas flat

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/onboarding/pix',
    component: () => import('@/views/PixSetup.vue')
  },
  {
    path: '/bets/:id',
    component: () => import('../views/BetDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
