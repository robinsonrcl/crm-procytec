/* eslint-disable no-unused-vars */
import 'mdb-vue-ui-kit/css/mdb.min.css'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import FontAwesome from "./plugins/FontAwesome";
import { createPinia } from "pinia"

createApp(App)
  .use(createPinia())
  .use(FontAwesome)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBohMnnUQFiW1mEaFAlUYS3kZHhjuFHBj4",
    },
  })
  .use(router)
  .mount("#app");
