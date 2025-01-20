import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blueprints',
    name: 'blueprints',
    component: () => import('@/views/BlueprintView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
