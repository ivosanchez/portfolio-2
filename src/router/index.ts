import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Polartypes from '../views/Polartypes.vue';
import DjangoEats from '../views/DjangoEats.vue';
import MediumRare from '../views/MediumRare.vue';
import Covid19Dashboard from '../views/Covid19Dashboard.vue';
import Pathfinder from '../views/Pathfinder.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/polartypes',
    name: 'Polartypes',
    component: Polartypes,
  },
  {
    path: '/django-eats',
    name: 'DjangoEats',
    component: DjangoEats,
  },
  {
    path: '/medium-rare',
    name: 'MediumRare',
    component: MediumRare,
  },
  {
    path: '/covid-19-dashboard',
    name: 'Covid19Dashboard',
    component: Covid19Dashboard,
  },
  {
    path: '/pathfinder',
    name: 'Pathfinder',
    component: Pathfinder,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
