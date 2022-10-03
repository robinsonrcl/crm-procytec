<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { getImage } from '../../utils/utilidades';

const emit = defineEmits<{
  (e: 'showModalHistoria', value: String): void
}>()

  const contratoStore = useContratoStore()

const props = defineProps<{
  hallazgo: {
    nombrecontrato: string
    observacion: string
    fotos: [{src: string}]
    referencia: string
    zona: string
    abscisakm: string
    hallazgo1: string
    hallazgo2: string
    hallazgo3: string
    tramo1: string
    position: string
  }
  contratonombre: string
}>()

async function showHistoria() {
  contratoStore.setShowHistorico("historico")
  // contratoStore.setCircles([])

  if(contratoStore.getShowHistorico)
    contratoStore.setCircles([ { position: props.hallazgo.position } ])
  else
    contratoStore.setCircles([ { position: { 'lat': 0.0, 'lng': 0.0 } } ])

  await contratoStore.loadPatologia(props.hallazgo.position)
  await contratoStore.getPatologia

  // emit('showModalHistoria', props.hallazgo.position)

}

</script>

<template>
  <div className="c-bubble">
    <div className="c-bubble-item bubble-title">{{ hallazgo.nombrecontrato }}</div>
    <!-- <div class="c-bubble-item bubble-title"></div> -->
    
    <div className="c-bubble-item" id="div-buble-descripcion">
      <div id="bubbleDescripcion">
        <textarea :value="hallazgo.observacion" name="" id="c-bubble-descripcion"  disabled>
        </textarea> 
      </div>
    </div>
    <div  className="c-bubble-item" id="DivBubbleImg">
      <img  id="imgBubble" :src="getImage(`/images/photos/`, hallazgo.fotos[0].src)" alt="">
    </div>
    <div className="c-bubble-item bubble-subtitle"><span>Referencia:</span></div>
    <div className="c-bubble-item bubble-subtitle"><span>Zona:</span></div>
    <div className="c-bubble-item">
      <a v-if="hallazgo.fotos[0].src != 'sinfoto.svg'" className="btn-bubble" href="#!" role="button" @click.prevent="enviarShow(hallazgo.fotos)"><fa icon="fa-camera" /> Fotos ({{ hallazgo.fotos.length }})</a>
      <a v-else className="btn-bubble" href="#!" role="button" @click.prevent=""><fa icon="fa-camera" /> Fotos (0)</a>
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
    <div className="c-bubble-item">{{ hallazgo.abscisakm }}</div>
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
  
  methods: {
    // showHistoria() {
      // this.contratoStore.setShowHistorico("historico")
      // 1.
      // this.contratoStore.loadPatologia(this.hallazgo.position)
      // this.contratoStore.getPatologia

      // this.$emit('showModalHistoria', this.showHistoriaToggle = !this.showHistoriaToggle, this.hallazgo.position)
      // this.$emit('showModalHistoria', this.hallazgo.position)
    // },
    enviarShow(fotos) {
      this.$emit('showModalImagesBubble', true, fotos)
    },
  },
};
</script>

<style lang="scss" scoped></style>