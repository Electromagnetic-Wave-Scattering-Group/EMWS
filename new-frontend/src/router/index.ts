import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/theory',
      name: 'theory',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/TheoryView.vue')
    },
    {
      path: '/compositionapi',
      name: 'compositionapi',
      component: () => import('@/views/CompositionAPIView.vue')
    },
    {
      path: '/optionsapi',
      name: 'optionsapi',
      component: () => import('@/views/OptionAPIView.vue')
    },
    // come up with new emws route
    {
      path: '/emws',
      name: 'emws',
      component: () => import('@/views/SignalView.vue')
    },
    {
      path: '/structure',
      name: 'structure',
      component: () => import('@/views/StructureView.vue')
    },
  ]
})

export default router