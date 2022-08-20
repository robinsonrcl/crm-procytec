<template>
  <div>
    <div class="modalImg">
      <div v-if="fotos.length > 1" class="modalImgUnico">
        <div class="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>

        <div class="divImgModal" v-for="foto in fotos" :key="foto">
          <div class="modalImg__foto">
            <div class="bgdivimg">
              <img class="img__modal" :src="require(`../assets/photos/${foto.src}`)" alt="" />
            </div>
            <div class="modalImg__desc"><p>{{ foto.etiqueta }}</p></div>
        </div>

        </div>
      </div>
      <div v-else class="modalImgUnico2">
        <div class="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>

        <div class="divImgModal" v-for="foto in fotos" :key="foto">
          <div class="modalImg__foto">
            <div class="bgdivimg">
              <img class="img__modal" :src="require(`../assets/photos/${foto.src}`)" alt="" />
            </div>
            <div class="modalImg__desc"><p>{{ foto.etiqueta }}</p></div>
        </div>

        </div>
      </div>
    </div>
    <div class="container__carousel" v-show="showCarousel">
      <div class="div__carousel">
        <div class="icon-close-carousel" @click.prevent="closeModalCarousel"><fa icon="close" size="2x"/></div>
        <Carousel :images="fotos"  />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue"
// import PersonalCarousel from "../components/PersonalCarousel.vue"
// @click.prevent="showModalCarousel()"

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
  props: {
    fotos: { type: Array }
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