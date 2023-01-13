import { createApp, watch } from "vue";
import App from "./App.vue";
import FontAwesome from "./plugins/FontAwesome.js";
import { createPinia } from "pinia"
import 'vue3-tel-input/dist/vue3-tel-input.css'
import FlagIcon from "vue-flag-icon"
import router from "./router";

const store = createPinia()

if(localStorage.getItem("state")){
  store.state.value = JSON.parse(localStorage.getItem("state"))
}

watch(
  store.state,
  (state) => {
    localStorage.setItem("state", JSON.stringify(state))
  },
  { deep: true }
)

const app = createApp(App)
.use(store)
.use(FlagIcon)
.use(FontAwesome)
.use(router)

app.directive('focus', {
  mounted: (el) => el.focus()
})

app.mount("#app");


