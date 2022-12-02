import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faMapLocation, 
    faHome, 
    faGears, 
    faUser, 
    faFileContract, 
    faBars, 
    faClose,
    faCheck,
    faCamera,
    faHistory,
    faCaretRight,
    faDisplay,
    faGaugeHigh,
    faLocationArrow,
    faFileCsv,
    faUserPlus,
    faRectangleXmark
    } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faMapLocation, 
    faHome, 
    faGears, 
    faUser, 
    faFileContract, 
    faBars, 
    faClose,
    faCheck,
    faCamera,
    faHistory,
    faCaretRight,
    faDisplay,
    faGaugeHigh,
    faLocationArrow,
    faFileCsv,
    faUserPlus,
    faRectangleXmark
    )

export default (app) => {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('fa', FontAwesomeIcon)
}
