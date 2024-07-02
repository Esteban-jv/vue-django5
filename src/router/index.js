import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/home/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/types',
      name: 'types',
      component: () => import('../views/TypesView.vue')
    }
  ]
})

export default router
