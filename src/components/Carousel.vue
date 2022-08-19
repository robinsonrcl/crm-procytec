<template>
  <button id="botonCarousel" v-show="mostrarMsg"  class="icon-close-carousel2" type="button" @click="newSlide">Inicio</button>
  <Carousel :settings="settings" ref="myCarousel" :wrap-around="true"
  :items-to-scroll="1"
  :slide-to="position"
  :autoplay="5000"
      >
    <Slide v-for="slide in images" :key="slide">
      <div class="icon-close-carousel" @click.prevent="closeModalCarousel"><fa icon="close" size="2x"/></div>
      
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
  setup(props) {
    
    function newSlide() {
      const elemento = document.getElementById("botonCarousel")
      this.mostrarMsg = false
      elemento.hidden = true
      myCarousel.value.slideTo(props.position)
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
    images: [],
    position: Number,
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


