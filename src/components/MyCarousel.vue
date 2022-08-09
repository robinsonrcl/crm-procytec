<template>
  <MDBCarousel v-model="testCarousel1" :items="items1" ref="testCarousel" :interval="false" fade innerClass="rounded-5 shadow-4-strong"/>

  <MDBBtn @click.stop="$refs.testCarousel.prev()" color="primary" size="sm">Prev</MDBBtn>
  <MDBBtn @click.stop="$refs.testCarousel.next()" color="primary" size="sm">Next</MDBBtn>
  <MDBBtn @click.stop="testCarousel1 = 0" color="primary" size="sm">0</MDBBtn>
  <MDBBtn @click.stop="testCarousel1 = 1" color="primary" size="sm">1</MDBBtn>
  <MDBBtn @click.stop="testCarousel1 = 2" color="primary" size="sm">2</MDBBtn>
</template>

<script>
  import 'mdb-vue-ui-kit/css/mdb.min.css';
  import { ref } from "vue";
  import {  MDBCarousel, MDBBtn } from "mdb-vue-ui-kit";

  export default {
    components: {
      MDBCarousel,
      MDBBtn
    },
    setup() {
      const items1 = [
        {
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp",
          alt: "...",
          label: "First slide label",
          caption: "Nulla vitae elit libero, a pharetra augue mollis interdum."
        },
        {
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp",
          alt: "...",
          label: "Second slide label",
          caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp",
          alt: "...",
          label: "Third slide label",
          caption:
            "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
        }
      ];
      const testCarousel1 = ref(0);
      return {
        items1,
        testCarousel1
      };
    }
  };
</script>

<style lang="scss" scoped></style>