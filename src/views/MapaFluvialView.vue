<script  setup lang="ts">
import { useContratoStore } from "../stores/ContratoStore.js";
import PanelConvenciones from "../components/panel/PanelConvenciones.vue";
import PanelLogin from "../components/login/PanelLogin.vue"

const contratoStore = useContratoStore()

contratoStore.fill()

function showPaneles(respuesta) {
  contratoStore.setLogin(respuesta)
}

function makeClick() {
  if(contratoStore.getShowPanel)
    contratoStore.setShowPanel("mapa")
}

</script>

<template>
  <div className="map__container">
    <div className="map__body">
      <MapaGeneral 
        @show-modal-mapa-fluvial="showModalImg" 
        @show-modal-historia="showModalHistoricoView" 
        @click="makeClick"
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
      <!-- <div>
        <PanelFilters />
      </div> -->
      <!-- <div>
        <PanelConvenciones />
      </div> -->
      <div>
        <PanelLateral />
      </div>
    </div>
    <div v-else className="class__panellogin">
      <PanelLogin 
        @ingresoseguro="showPaneles" />
    </div>
  </div>
</template>

<script lang="ts">
import MapaGeneral from "@/components/MapaGeneral.vue";
import ModalImagenes from "../components/modal/ModalImagenes.vue";
import ModalHistorico from "../components/modal/ModalHistorico.vue";
import PanelFilters from "../components/panel/PanelFilters.vue";
import PanelLateral from "../components/panel/PanelLateral.vue";

export default {
  name: "MapaFluvial",
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
