import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/CrmLogin.vue")
  },
  {
    path: "/crm",
    name: "crmprincipal",
    component: () => import("../views/CrmPrincipal.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
