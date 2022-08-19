<template>
  <Carousel ref="carousel" :wrapAround="true" :items-to-scroll="1" :autoplay="5000">

    <Slide v-for="slide in newimages" :key="slide">
      <div class="carousel__item">
        <img class="img__modal-carousel" :src="require(`../assets/photos/${slide.src}`)" alt="" />
      </div>
    </Slide>

    <template #addons="">
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
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
});

</script>


