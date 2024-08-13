/*Sixte Morio*/
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Single from '../pages/Single.vue';
import CategoryInfo from '../pages/CategoryInfo.vue';
import AIInfo from '../pages/AIInfo.vue';
import UserInfo from '../pages/UserInfo.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/single/:id', component: Single },
  { path: '/category/:id', component: CategoryInfo },
  { path: '/ai/:id', component: AIInfo },
  { path: '/user/:id', component: UserInfo }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
