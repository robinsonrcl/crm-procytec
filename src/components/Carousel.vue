<template>
  <!-- <button id="botonCarousel" v-show="mostrarMsg"  class="icon-close-carousel2" type="button" @click="newSlide">Inicio</button> -->
  <div class="icon-close-carousel" @click.prevent="closeModalCarousel"><fa icon="close" size="2x"/></div>
  <Carousel ref="myCarousel" :wrap-around="true"  :items-to-scroll="1" :autoplay="5000">

    <Slide v-for="slide in images" :key="slide">
      <div class="carousel__item">
        <img class="img__modal-carousel" :src="require(`../assets/photos/${slide.src}`)" alt="" />
      </div>
    </Slide>

    <template #addons="">
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const myCarousel = ref(null)

export default {
  name: "BasicCarousel",
  emits: ["showCarouselModal"],
  setup() {
    
    function newSlide() {
      const elemento = document.getElementById("botonCarousel")
      this.mostrarMsg = false
      elemento.hidden = true
      myCarousel.value.updateSlideWidth()
    }
    const carouselUpdate = () => myCarousel.value.wrapAround(true)
    const carouselNew = () => myCarousel.value.updateSlideWidth(true)

    return {
      myCarousel,
      newSlide,
      carouselUpdate,
      carouselNew
    }
  },
  props: {
    images: { type: Array },
    mostrarBoton: Boolean
  },
   components: {
    Carousel,
    Slide,
    Navigation,
   },
   data() {

    return {
      imagenes: this.images,
      mostrarMsg: this.mostrarBoton
    }
   },
  created() {
    console.log("Arreglo Imagenes: " + this.imagenesCarousel)
  },
  methods: {
    closeModalCarousel() {
      this.$emit('showCarouselModal', false)
    }
  },

  unmounted() {
  console.log("Unmounted")
}

};

</script>


