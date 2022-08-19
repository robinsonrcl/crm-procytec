<script setup>
  import { MDBCarousel } from "mdb-vue-ui-kit"
  import 'mdb-vue-ui-kit/css/mdb.min.css';
  import { ref, defineProps, toRef } from "vue";

  const props = defineProps({ images: [] })

  const carousel1 = ref(0);
  var label = ref([])

  if(props.images.length > 0){
    label = toRef(props.images)
  }

      const items1 = [
        {
          src: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp",
          alt: "...",
          label: "First slide label",
          caption: label.value[0]
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
    

</script>

<template>
  <MDBCarousel v-model="carousel1" :items="items1" fade innerClass="rounded-5 shadow-4-strong"/>
  <div class="modalIconCerrarCarousel" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
</template>

<script>

  export default {

    methods: {
      cerrarModal() {
      this.$emit('showCarouselModal', false)
    },
    }
  };
</script>

<style lang="scss" scoped></style>