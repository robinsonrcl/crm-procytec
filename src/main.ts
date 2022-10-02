import 'mdb-vue-ui-kit/css/mdb.min.css'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import FontAwesome from "./plugins/FontAwesome.js";
import { createPinia } from "pinia"

const store = createPinia()

createApp(App)
.use(FontAwesome)
.use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBohMnnUQFiW1mEaFAlUYS3kZHhjuFHBj4",
    },
  }, )
  .use(store)
  .mount("#app");
