<template>
  <div class="c-bubble">
    <div class="c-bubble-item bubble-title">{{ hallazgo.nombrecontrato }}</div>
    <!-- <div class="c-bubble-item bubble-title"></div> -->
    
    <div class="c-bubble-item" id="div-buble-descripcion">
      <div id="bubbleDescripcion">
        <textarea :value="hallazgo.observacion" name="" id="c-bubble-descripcion" cols="30" rows="3" disabled>
        </textarea> 
      </div>
    </div>
    <div class="c-bubble-item" id="DivBubbleImg">
      <img id="imgBubble" :src="require(`../assets/photos/${hallazgo.fotos[0].url}`)" alt="">
    </div>
    <div class="c-bubble-item bubble-subtitle"><span>Referencia:</span></div>
    <div class="c-bubble-item bubble-subtitle"><span>Zona:</span></div>
    <div class="c-bubble-item">
      <a class="btn-bubble" href="#!" role="button" @click.prevent="enviarShow(hallazgo.fotos)">
        <fa icon="fa-camera" /> Fotos
      </a>
    </div>
    <div class="c-bubble-item">{{ hallazgo.referencia }}</div>
    <div class="c-bubble-item">{{ hallazgo.zona }}</div>
    <div class="c-bubble-item">
      <a class="btn-bubble" href="#!" role="button" @click.prevent="showHistoria">
        <fa icon="fa-history" /> Historia
      </a>
    </div>
    <div class="c-bubble-item bubble-subtitle"><span>Hallazgos:</span></div>
    <div class="c-bubble-item bubble-subtitle"><span>Abscisa:</span></div>
    <div class="c-bubble-item">{{ hallazgo.abscisakm }}</div>
    <div class="c-bubble-item"><fa v-show="hallazgo.hallazgo1" icon="fa-caret-right"/> {{ hallazgo.hallazgo1 }}</div>
    <div class="c-bubble-item"><fa v-show="hallazgo.hallazgo2" icon="fa-caret-right"/> {{ hallazgo.hallazgo2 }}</div>
    <div class="c-bubble-item"><fa v-show="hallazgo.hallazgo3" icon="fa-caret-right"/> {{ hallazgo.hallazgo3 }}</div>
    <div class="c-bubble-item bubble-subtitle"><span>Tramo 1:</span></div>
    <div class="c-bubble-item">{{ hallazgo.tramo1 }}</div>
    
  </div>
</template>

<script>
export default {
  name: "BubbleInfo",
  created() {},
  data() {
    return {
      showHistoriaToggle: false
    };
  },
  props: {
    hallazgo: Object,
    contratonombre: String
  },
  
  methods: {
    showHistoria() {
      this.$emit('showModalHistoria', this.showHistoriaToggle = !this.showHistoriaToggle, this.hallazgo.position)
    },
    enviarShow(fotos) {
      this.$emit('showModal', true, fotos)
    },
  },
};
</script>

<style lang="scss" scoped></style>