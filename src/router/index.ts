import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { projects } from '../constants/projects';
import { aboutPanels } from '../constants/about';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    props: { aboutPanels },
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
