import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapLocation, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMapLocation, faHome)

export default (app) => {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('fa', FontAwesomeIcon)
}
