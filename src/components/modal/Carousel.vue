<script setup>
  import { getImage } from '../../utils/utilidades';

</script>

<template>
  <Carousel ref="carousel" :wrapAround="true" :items-to-scroll="1" :autoplay="3000">

    <Slide v-for="slide in images" :key="slide._id">
      <span class="etiqueta__foto">{{ slide.etiqueta }}</span>
      <div class="carousel__item">
        <img class="img__modal-carousel" :src="getImage(slide.src)" alt="" />
      </div>
    </Slide>

    <template>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: "BasicCarousel",

  computed: {
    newimages() {
        return this.images
    }
  },
  props: {
    images: { type: Array }
  },
   components: {
    Carousel,
    Slide,
    Navigation,
    Pagination
   }
};

</script>

<style lang="css" scoped>
  .etiqueta__foto {
    font-size: 1.2rem;
  }
</style>


