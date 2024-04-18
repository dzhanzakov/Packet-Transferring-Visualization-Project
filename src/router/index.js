import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '@/pages/AdminPage/AdminPage.vue'
import UserPage from '@/pages/UserPage/UserPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: AdminPage
    },
    {
      path: '/user-page',
      name: 'user',
      component: UserPage
    }
  ]
})

export default router
