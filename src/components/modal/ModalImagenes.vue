<script setup lang="ts">
  import { getImage } from "../../utils/utilidades";

  const props = defineProps<{
    fotos: [{
      id: string
      etiqueta: string
      src: string
    }]
  }>()

</script>

<template>
  <div>
    <div className="modalImg">
      <div v-if="fotos.length > 1" className="modalImgUnico">
        <div className="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>

        <div className="divImgModal" v-for="foto in fotos" :key="foto.id">
          <div className="modalImg__foto">
            <div className="bgdivimg">
              <img className="img__modal" :src="getImage(`/images/photos/`, foto.src)" alt="" />
            </div>
            <div className="modalImg__desc"><p>{{ foto.etiqueta }}</p></div>
        </div>

        </div>
      </div>
      <div v-else className="modalImgUnico2">
        <div className="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>

        <div className="divImgModal" v-for="foto in fotos" :key="foto.id">
          <div className="modalImg__foto">
            <div className="bgdivimg">
              <img className="img__modal" :src="getImage(`/images/photos/`, foto.src)" alt="" />
            </div>
            <div className="modalImg__desc"><p>{{ foto.etiqueta }}</p></div>
        </div>

        </div>
      </div>
    </div>
    <div className="container__carousel" v-show="showCarousel">
      <div className="div__carousel">
        <div className="icon-close-carousel" @click.prevent="closeModalCarousel"><fa icon="close" size="2x"/></div>
        <Carousel :images="fotos"  />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Carousel from "./Carousel.vue"

export default {
  name: "ModalImagenes",
  components: {
    Carousel,
},
  data() {
    return {
      showCarousel: false,
      position: Number
    };
  },
  
  methods: {
    cerrarModal() {
      this.$emit('showModalImages', false)
    },
    showModalCarousel() {
      this.showCarousel = true
    },
    showCarouselModal() {
      this.showCarousel = false
    },
    closeModalCarousel() {
      this.showCarousel = false
    }
    
  },
};

</script>

<style lang="scss" scoped></style>