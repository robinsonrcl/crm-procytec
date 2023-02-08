import { createRouter, createWebHashHistory } from "vue-router";
import axios from "axios";

let urlGateway = import.meta.env.VITE_URL_GATEWAY;

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/CrmLogin.vue")
  },
  {
    path: "/crm",
    name: "crmprincipal",
    component: () => import("../views/CrmPrincipal.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/lista",
    name: "crmlista",
    component: () => import("../views/CrmLista.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/email",
    name: "Email",
    component: () => import("../views/TemplateEmail.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem("calls")
  const userId = localStorage.getItem("users")
  var hasAccess = false

  await axios({
    method: 'get',
    url: urlGateway + '/api/users/check/access-crmprincipal/' + userId,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })
    .then((response) => {
      hasAccess = response.data.hasAccess
    })
    .catch((error) => {
      console.log(error)
    })

  if(to.matched.some(record => record.meta.requiresAuth) && !hasAccess) {
    return '/'
  }
})

export default router;
