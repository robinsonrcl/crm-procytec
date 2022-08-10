<template>
  <div>
    <div class="modalImg">
      <div class="modalImgUnico">
        <div class="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>

        <div class="divImgModal" v-for="foto in fotos" :key="foto">
          <div class="modalImg__foto">
            <div>
              <img class="img__modal" :src="require(`../assets/photos/${foto.url}`)" alt="" @click.prevent="showModalCarousel(0)" />
            </div>
            <div class="modalImg__desc"><p>{{ foto.etiqueta }}</p></div>
        </div>

        </div>
      </div>
    </div>
    <div class="container__carousel" v-show="showCarousel">
      <div class="div__carousel">
        <!-- <Carousel :images="fotos" :position="position" :mostrar-boton="true" @show-carousel-modal="showCarouselModal" /> -->
        <!-- <MyCarousel :images="fotos" @show-carousel-modal="showCarouselModal" /> -->
        <FotosCarousel :images="fotos" @show-carousel-modal="showCarouselModal" />
      </div>
    </div>
  </div>
</template>

<script>
// import Carousel from "../components/Carousel.vue"
// import MyCarousel from "../components/MyCarousel.vue";
import FotosCarousel from "../components/FotosCarousel.vue";

export default {
  name: "ModalImagenes",
  components: {
    // Carousel,
    // MyCarousel
    FotosCarousel
},
  data() {
    return {
      showCarousel: false,
      position: Number
    };
  },
  props: {
    fotos: []
  },
  methods: {
    cerrarModal() {
      this.$emit('showModal', false)
    },
    showModalCarousel(pos) {
      this.position = pos
      this.showCarousel = true
    },
    showCarouselModal() {
      this.showCarousel = false
    }
    
  },
};

</script>

<style lang="scss" scoped></style>