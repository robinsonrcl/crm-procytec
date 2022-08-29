<script  setup>
import { useContratoStore } from "../stores/ContratoStore.js";
import PanelConvenciones from "../components/PanelConvenciones.vue";
import PanelLogin from "../components/PanelLogin.vue"

const contratoStore = useContratoStore()

contratoStore.fill()

</script>

<template>
  <div class="map__container">
    <div class="map__body">
      <MapaGeneral 
        @show-modal-mapa-fluvial="showModalImg" 
        @show-modal-historia="showModalHistoricoView" 
      />
    </div>
    <div>
      <ModalImagenes 
        v-show=showModalImage 
        @show-modal-images="showModalImgDos" 
        :fotos="fotos"
      />
    </div>
    <div>
      <ModalHistorico 
        v-show=showModalHistorico 
        @show-modal="showModalHistoricoView"
        v-bind:hallazgos="hallazgos"
      />
    </div>
    <div v-if=contratoStore.getLogin>
      <div>
        <PanelFilters />
      </div>
      <div>
        <PanelConvenciones />
      </div>
    </div>
    <div v-else class="class__panellogin">
      <PanelLogin 
        @ingresoseguro="showPaneles" />
    </div>
  </div>
</template>

<script>
import MapaGeneral from "../components/MapaGeneral.vue";
import ModalImagenes from "../components/ModalImagenes.vue";
import ModalHistorico from "../components/ModalHistorico.vue";
import PanelFilters from "../components/PanelFilters.vue";


export default {
  name: "FluvialView",
  components: { 
    MapaGeneral, 
    ModalImagenes, 
    ModalHistorico,
    PanelFilters
  },

  data() {
    return {
      showModalImage: false,
      showModalHistorico: false,
      hallazgos: [],
      fotos: [],
      login: false
    }
  },

  methods: {
    showPaneles(respuesta) {
      // this.login = respuesta
      this.contratoStore.setLogin(respuesta)
    },
    showModalImg(newValue, fotos) {
      this.fotos = fotos
      this.showModalImage = newValue
    },
    showModalImgDos(newValue) {
      this.showModalImage = newValue
    },
    showModalHistoricoView(show, hallazgos) {
      this.showModalHistorico = show
      this.hallazgos = hallazgos
    }

  }
};
</script>
