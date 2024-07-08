import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/home/DashboardView.vue'
import MenuLayout from '../views/MenuLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuLayout,
      children: [
        {
          path: '',
          name: 'categories',
          component: DashboardView
        },
        {
          path: 'types',
          name: 'types',
          component: () => import('../views/TypesView.vue')
        },
        {
          path: 'elements/:type?/:id?',
          name: 'elements',
          component: () => import('../views/ElementsView.vue')
        },
        {
          path: 'element-detail/:id',
          name: 'element-detail',
          component: () => import('../views/elements/ElementDetailsView.vue')
        }
      ]
    }
  ]
})

export default router
