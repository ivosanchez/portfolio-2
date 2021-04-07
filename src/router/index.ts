import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { projects } from '../constants/projects';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "home" */ '../views/About.vue'),
  },
  {
    path: '/:projectName',
    name: 'Project',
    props: { projects },
    component: () => import(/* webpackChunkName: "polartypes" */ '../views/Project.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
