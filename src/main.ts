import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import FontAwesome from "./plugins/FontAwesome.js";
import { createPinia } from "pinia"
import VueGoogleCharts from "vue3-googl-chart";
import Spinner from "vue-simple-spinner"
// import upperFirst from "lodash/upperFirst"
// import camelCase from "lodash/camelCase"
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import FlagIcon from "vue-flag-icon"

const VueTelInputOptions = {
  mode: "international",
  onlyCountries: ['CO', "US", "CA"]
}

const store = createPinia()

const app = createApp(App)
.use(FlagIcon)
.use(VueGoogleCharts)
.use(FontAwesome)
.use(router)
.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBohMnnUQFiW1mEaFAlUYS3kZHhjuFHBj4",
  },
}, )
.use(store)

app.directive('focus', {
  mounted: (el) => el.focus()
})

app.mount("#app");
