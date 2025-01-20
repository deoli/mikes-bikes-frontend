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
    component: () => import('@/views/BlueprintList.vue')
  },
  {
    path: '/blueprint/new',
    component: () => import('@/views/BlueprintForm.vue')
  },
  {
    path: '/blueprint/:id',
    component: () => import('@/views/BlueprintForm.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductList.vue')
  },
  {
    path: '/product/new',
    component: () => import('@/views/ProductForm.vue')
  },
  {
    path: '/product/:id',
    component: () => import('@/views/ProductForm.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
