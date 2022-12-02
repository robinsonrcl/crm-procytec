import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import FontAwesome from "./plugins/FontAwesome.js";
import { createPinia } from "pinia"
import VueGoogleCharts from "vue3-googl-chart";
import Spinner from "vue-simple-spinner"
import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"

const store = createPinia()

const app = createApp(App)
.use(Spinner)
.use(VueGoogleCharts)
.use(FontAwesome)
.use(router)
.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBohMnnUQFiW1mEaFAlUYS3kZHhjuFHBj4",
  },
}, )
.use(store)

app.mount("#app");
