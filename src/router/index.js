import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/categories/DashboardView.vue'
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
          components: {
            default: DashboardView,
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Categories list</h1>' }
          }
        },
        {
          path: 'save-category/:id?',
          name: 'category-save',
          components: {
            default: () => import('../views/categories/SaveCategoryView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Categoría</h1>' }
          }
        },
        {
          path: 'types',
          name: 'types',
          components: {
            default: () => import('../views/types/TypesView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Types list</h1>' }
          }
        },
        {
          path: 'save-type/:id?',
          name: 'type-save',
          components: {
            default: () => import('../views/types/SaveTypeView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Type</h1>' }
          }
        },
        {
          path: 'elements/:type?/:id?',
          name: 'elements',
          components: {
            default: () => import('../views/elements/ElementsView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Elements list</h1>' }
          }
        },
        {
          path: 'save-element/:id?',
          name: 'element-save',
          components: {
            default: () => import('../views/elements/ElementFormView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Element</h1>' }
          }
        },
        {
          path: 'element-detail/:id',
          name: 'element-detail',
          components: {
            default: () => import('../views/elements/ElementDetailsView.vue'),
            title: { template: '<h1 class="text-lg text-green-900 font-semibold">Details of element</h1>' }
          }
        }
      ]
    }
  ]
})

export default router
