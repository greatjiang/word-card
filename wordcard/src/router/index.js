import { createRouter, createWebHistory } from 'vue-router'
import LearnView from '../views/LearnView.vue'

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
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/operation',
      name: 'WordsOperation',
      component: () => import('../views/WordsOperation.vue')
    }
  ]
})

export default router
