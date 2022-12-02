<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { getImage, getAbscisa } from '../../utils/utilidades.ts';

const contratoStore = useContratoStore()

const emit = defineEmits<{
  (e: 'showModalHistoria', value: String): void
}>()

const props = defineProps<{
  // hallazgo: {
  //   id: string
  //   nombrecontrato: string
  //   observacion: string
  //   fotos: [{src: string}]
  //   referencia: string
  //   zona: string
  //   abscisakm: string
  //   hallazgo1: string
  //   hallazgo2: string
  //   hallazgo3: string
  //   tramo1: string
  //   position: string
  // }
  hallazgo
  // contratonombre: string
}>()

async function showHistoria() {
  
  // if(contratoStore.getShowHistorico)
    contratoStore.setCircles([ { position: props.hallazgo.position } ])
  // else
    // contratoStore.setCircles([ { position: { 'lat': 0.0, 'lng': 0.0 } } ])

  await contratoStore.loadPatologia(props.hallazgo.position)
  //await contratoStore.getPatologia
  contratoStore.setShowHistorico("historico")

}

function enviarShow(fotos) {
  contratoStore.setShowModalImages("Images")
  contratoStore.setCurrentPhotos(fotos)
}
</script>
<template>
  <div className="c-bubble">
    <div className="c-bubble-item bubble-title">
      {{ hallazgo.consecutivo }} - {{ hallazgo.componente }}
      <!-- <span style="font-size: 0.8rem; font-weight: 400;">(Id:{{ hallazgo.estadoanterior }})</span> -->
    </div>
    <!-- <div class="c-bubble-item bubble-title"></div> -->
    
    <div className="c-bubble-item" id="div-buble-descripcion">
      <div id="bubbleDescripcion">
        <textarea :value="hallazgo.observacion" id="c-bubble-descripcion" disabled></textarea> 
      </div>
    </div>
    <div  className="c-bubble-item" id="DivBubbleImg">
    <div v-if="hallazgo.fotos.length > 0">
      <img  id="imgBubble" :src="getImage('', hallazgo.fotos[0].src)" alt="">
    </div>
    <div v-else >
      <img  id="imgBubble" :src="getImage(`/images/photos/`, 'sinfoto.svg')" alt="">
    </div>
    </div>
    <div className="c-bubble-item bubble-subtitle"><span>Referencia:</span></div>
    <div className="c-bubble-item bubble-subtitle"><span>Zona:</span></div>
    <div className="c-bubble-item">
      <a v-if="hallazgo.fotos.length > 0" 
        className="btn-bubble" href="#!" role="button" 
        @click.prevent="enviarShow(hallazgo.fotos)"
      >
        <fa icon="fa-camera" /> Fotos ({{ hallazgo.fotos.length }})
      </a>
      <a v-else className="btn-bubble" href="#!" role="button" @click.prevent="">
        <fa icon="fa-camera" /> Fotos (0)
      </a>
    </div>
    <div className="c-bubble-item">{{ hallazgo.referencia }}</div>
    <div className="c-bubble-item">{{ hallazgo.zona }}</div>
    <div className="c-bubble-item">
      <a className="btn-bubble" href="#!" role="button" @click.prevent="showHistoria">
        <fa icon="fa-history" /> Historia
      </a>
    </div>
    <div className="c-bubble-item bubble-subtitle"><span>Hallazgos:</span></div>
    <div className="c-bubble-item bubble-subtitle"><span>Abscisa:</span></div>
    <div className="c-bubble-item">{{ getAbscisa(hallazgo.abscisakm) }}</div>
    <div className="c-bubble-item"><fa v-show="hallazgo.hallazgo1" icon="fa-caret-right"/> {{ hallazgo.hallazgo1 }}</div>
    <div className="c-bubble-item"><fa v-show="hallazgo.hallazgo2" icon="fa-caret-right"/> {{ hallazgo.hallazgo2 }}</div>
    <div className="c-bubble-item"><fa v-show="hallazgo.hallazgo3" icon="fa-caret-right"/> {{ hallazgo.hallazgo3 }}</div>
    <div className="c-bubble-item bubble-subtitle"><span>Tramo 1:</span></div>
    <div className="c-bubble-item">{{ hallazgo.tramo1 }}</div>
    
  </div>
</template>

<script lang="ts">

export default {
  name: "BubbleInfo",
  created() {},
  data() {
    return {
      showHistoriaToggle: false
    };
  },
  
};
</script>

<style lang="scss" scoped></style>