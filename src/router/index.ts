import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ABOUT_PANELS, CONTACT } from '../data';
import { PROJECTS } from '../data/projects';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Works',
    props: { PROJECTS },
    component: () => import(/* webpackChunkName: "works" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    props: { ABOUT_PANELS },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    props: { CONTACT },
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
  },
  {
    path: '/:projectName',
    name: 'Project',
    props: { PROJECTS },
    component: () => import(/* webpackChunkName: "polartypes" */ '../views/Project.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound404',
    component: () => import(/* webpackChunkName: "notFound404" */ '../views/NotFound404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
