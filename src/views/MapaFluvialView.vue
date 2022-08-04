<template>
  <div class="map__container">
    <div class="map__body">
      <MapaGeneral 
        @show-modal="showModalImg" 
        @show-modal-historia="showModalHistoricoView" 
      />
    </div>
    <div>
      <ModalImagenes 
        v-show=showModalImage 
        @show-modal="showModalImg" 
      />
    </div>
    <div>
      <ModalHistorico 
        v-show=showModalHistorico 
        @show-modal="showModalHistoricoView"
        v-bind:hallazgos="hallazgos"
      />
    </div>
    <div>
      <PanelFilters />
    </div>
  </div>
  <div class="container-convenciones">
    <div class="conv-item conv-item-title"><p>COLORES DE ESTADO</p></div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/muestrasColor/colorAmarillo.png')" alt=""></div>
    <div class="conv-item">Repotenciado</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/muestrasColor/colorVerde.png')" alt=""></div>
    <div class="conv-item">Bueno</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/muestrasColor/colorRojo.png')" alt=""></div>
    <div class="conv-item">En mal estado</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/muestrasColor/colorVioleta.png')" alt=""></div>
    <div class="conv-item">Otro</div>
    <div class="conv-item conv-item-title"><p>TIPO DE ESTRUCTURA</p></div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/iconoEstructura/barrasAzud.png')" alt=""></div>
    <div class="conv-item">AZUD</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/iconoEstructura/circuloPlaca.png')" alt=""></div>
    <div class="conv-item">PLACA</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/iconoEstructura/cuadradoBarras.png')" alt=""></div>
    <div class="conv-item">BARRAS</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('@/assets/images/iconoEstructura/trianguloMuro.png')" alt=""></div>
    <div class="conv-item">MURO</div>
  </div>
</template>

<script>
import MapaGeneral from "../components/MapaGeneral.vue";
import ModalImagenes from "../components/ModalImagenes.vue";
import ModalHistorico from "@/components/ModalHistorico.vue";
import PanelFilters from "@/components/PanelFilters.vue";

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
      hallazgos: []
    }
  },

  methods: {
    showModalImg(newValue) {
      this.showModalImage = newValue
    },
    showModalHistoricoView(show, hallazgos) {
      this.showModalHistorico = show
      this.hallazgos = hallazgos
    }

  }
};
</script>
