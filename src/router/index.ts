import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/polartypes',
    name: 'Polartypes',
    component: () => import(/* webpackChunkName: "polartypes" */ '../views/Polartypes.vue'),
  },
  {
    path: '/django-eats',
    name: 'DjangoEats',
    component: () => import(/* webpackChunkName: "djangoeats" */ '../views/DjangoEats.vue'),
  },
  {
    path: '/medium-rare',
    name: 'MediumRare',
    component: () => import(/* webpackChunkName: "mediumrare" */ '../views/MediumRare.vue'),
  },
  {
    path: '/covid-19-dashboard',
    name: 'Covid19Dashboard',
    component: () =>
      import(/* webpackChunkName: "covid19dashboard" */ '../views/Covid19Dashboard.vue'),
  },
  {
    path: '/pathfinder',
    name: 'Pathfinder',
    component: () => import(/* webpackChunkName: "pathfinder" */ '../views/Pathfinder.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
