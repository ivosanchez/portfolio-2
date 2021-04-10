import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { projects } from '../constants/projects';
import { aboutPanels } from '../constants/about';
import { contacts } from '../constants/contacts';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Works',
    component: () => import(/* webpackChunkName: "works" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    props: { aboutPanels },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    props: { contacts },
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
  },
  {
    path: '/:projectName',
    name: 'Project',
    props: { projects },
    component: () => import(/* webpackChunkName: "polartypes" */ '../views/Project.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound404',
    component: () => import(/* webpackChunkName: "polartypes" */ '../views/NotFound404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
