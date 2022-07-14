import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";

// createApp(App).use(router).mount("#app");

createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBohMnnUQFiW1mEaFAlUYS3kZHhjuFHBj4",
    },
  })
  .use(router)
  .mount("#app");
