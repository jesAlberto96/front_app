import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/OrcList.vue'),
    },
    {
      path: '/orc/create',
      name: 'OrcCreate',
      component: () => import('@/views/OrcCreate.vue'),
    },
    {
      path: '/orc/detail/:id',
      name: 'OrcDetail',
      component: () => import('@/views/OrcDetail.vue'),
      props: true
    },
  ]
})

export default router
