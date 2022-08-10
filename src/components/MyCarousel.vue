<template>
  <MDBCarousel 
    class="mdbcarousel"
    v-model="testCarousel1" 
    ref="testCarousel" 
    :interval="false" 
    :items="images"
    fade 
    innerClass="rounded-5 shadow-4-strong"
    :controls="false" >
    </MDBCarousel>
    <div class="modalIconCerrarCarousel" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
</template>

<script>
  import 'mdb-vue-ui-kit/css/mdb.min.css';
  import { ref } from "vue";
  import {  MDBCarousel } from "mdb-vue-ui-kit";

  export default {
    components: {
      MDBCarousel
    },
    props: {
      images: Array
    },
    setup() {

      // const items = temp
      // [
      //   {
      //     src: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp",
      //     alt: "...",
      //     label: "First slide label",
      //     caption: "Nulla vitae elit libero, a pharetra augue mollis interdum."
      //   },
      //   {
      //     src: "https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp",
      //     alt: "...",
      //     label: "Second slide label",
      //     caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      //   },
      //   {
      //     src: "https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp",
      //     alt: "...",
      //     label: "Third slide label",
      //     caption:
      //       "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
      //   }
      // ];
      const testCarousel1 = ref(0);
      return {
        // items,
        testCarousel1
      };
    },
    methods: {
      cerrarModal() {
      this.$emit('showCarouselModal', false)
    },
    }
  };
</script>

<style lang="scss" scoped></style>