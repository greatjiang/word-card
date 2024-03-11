import { createRouter, createWebHistory } from 'vue-router'
import LearnView from '../views/LearnView.vue'
import AddView from '../views/AddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Learn',
      component: LearnView
    },
    {
      path: '/add',
      name: 'AddView',
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddView.vue')
    }
  ]
})

export default router
