import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/fluvial",
    name: "mapaFluvial",
    component: () =>
      import(
        /* webpackChunkName: "mapaFluvial" */ "../views/MapaFluvialView.vue"
      ),
  },
  {
    path: "/hometest",
    name: "homeTest",
    component: () => import(/* webpackChunkName: "homeTest" */ "../views/HomeTest.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
