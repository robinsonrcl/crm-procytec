import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MapaFluvial",
    component: () => import("../views/MapaFluvialView.vue"),
  },
  {
    path: "/fluvial",
    name: "MapaFluvial",
    component: () => import("../views/MapaFluvialView.vue"),
  },
  {
    path: "/gestioncontratos",
    name: "GestionContratos",
    component: () => import("../views/GestionContratos.vue"),
  },
  {
    path: "/setup",
    name: "SetupSpa",
    component: () => import("../views/SetupSpa.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
