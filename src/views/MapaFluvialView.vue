<script  setup lang="ts">
import { useContratoStore } from "../stores/ContratoStore.js";
import PanelLogin from "../components/login/PanelLogin.vue";
import RegisterLogin from "../components/register/RegisterLogin.vue";
// import PanelImportCSV from "../components/panel/PanelImportCSV.vue";
// import ChartComponents from "../components/charts/ChartComponents.vue";
// import PanelDashboard from "../components/panel/PanelDashboard.vue";

const contratoStore = useContratoStore()

contratoStore.fill()

function showPaneles(respuesta) {
  contratoStore.setLogin(respuesta)
}

function makeClick() {
  if(contratoStore.getShowModalImages){
    contratoStore.setShowModalImages("Images")
  } else {
    if(contratoStore.getShowPanelCapas) {
      contratoStore.setShowPanel("Capas")
    } else {
      if(contratoStore.getShowPanelAgreement) {
        contratoStore.setShowPanel("Agreement")
      } else {
        if(contratoStore.getShowPanelUsuario) {
          contratoStore.setShowPanel("Usuario")
        }
      }
    }
  }
}
</script>
<template>
  <div className="map__container">
    <div className="map__body">
      <ModalMessages />
      <MapaGeneral 
        @show-modal-mapa-fluvial="showModalImg" 
        @show-modal-historia="showModalHistoricoView" 
        @click="makeClick"
      />
    </div>
    <div>
      <ModalImagenes 
        v-show=contratoStore.getShowModalImages
        @show-modal-images="showModalImgDos"
        @click="makeClick"
        :fotos="fotos"
      />
    </div>
    <div>
      <ModalHistorico 
        @show-modal="showModalHistoricoView"
        v-if="contratoStore.getShowHistorico"    
        v-bind:hallazgos="hallazgos"
      />
    </div>
    <div v-if=contratoStore.getLogin>
      <div>
        <PanelLateral />
      </div>
    </div>
    <div v-else className="class__panellogin">
      <PanelLogin 
        @ingresoseguro="showPaneles" />
    </div>
    <div >
      <PanelDashboard v-if="contratoStore.getShowDashboard" />
    </div>
    <div>
      <RegisterLogin  v-show="contratoStore.getShowRegister" />
    </div>
  </div>
</template>

<script lang="ts">
import MapaGeneral from "@/components/MapaGeneral.vue";
import ModalImagenes from "../components/modal/ModalImagenes.vue";
import ModalHistorico from "../components/modal/ModalHistorico.vue";
import PanelLateral from "../components/panel/PanelLateral.vue";
import ModalMessages from "../components/modal/ModalMessages.vue";
import PanelDashboard from "../components/panel/PanelDashboard.vue";

export default {
  name: "MapaFluvial",
  components: { 
    MapaGeneral, 
    ModalImagenes, 
    ModalHistorico,
    ModalMessages
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

