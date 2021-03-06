import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './components/pages/HomePage.vue';
import ResultPage from './components/pages/ResultPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/result', component: ResultPage }
  ]
});

export default router;
