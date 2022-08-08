import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/fluvial",
    name: "MapaFluvial",
    component: () => import(/* webpackChunkName: "mapaFluvial" */ "../views/MapaFluvialView.vue"
      ),
  },
  {
    path: "/gestioncontratos",
    name: "GestionContratos",
    component: () => import(/* webpackChunkName: "gestionContratos" */ "../views/GestionContratos.vue"),
  },
  {
    path: "/setup",
    name: "SetupSpa",
    component: () => import(/* webpackChunkName: "setupSpa" */ "../views/SetupSpa.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: () => import(/* webpackChunkName: "userProfile" */ "../views/UserProfile.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
