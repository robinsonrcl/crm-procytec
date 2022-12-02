<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { getImage } from "../../utils/utilidades";

const contratoStore = useContratoStore()

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
      <div v-if="contratoStore.getCurrentPhotos.length > 1" className="modalImgUnico">
        <div className="divImgModal" v-for="foto in contratoStore.getCurrentPhotos" :key="foto.id">
          <div className="modalImg__foto">
            <div className="modalImg__desc2">{{ foto.etiqueta }}</div>
            <div className="bgdivimg">
              <img className="img__modal" :src="getImage('', foto.src)" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div v-else className="modalImgUnico2">
        <div className="divImgModal" v-for="foto in contratoStore.getCurrentPhotos" :key="foto.id">
          <div className="modalImg__foto">
            <div className="modalImg__desc">{{ foto.etiqueta }}</div>
            <div className="bgdivimg">
              <img className="img__modal" :src="getImage('', foto.src)" alt="" />
            </div>
          </div>
        </div>
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

<style lang="css" scoped>
  .modalImg__desc {
    font-size: 1.2rem;
    background-color: #928787;
    color: white;
    display: grid;
    position: fixed;
    padding: 5px 10px 3px 10px;
    border-radius: 15px;
    margin: 10px;
  }
  .modalImg__desc2 {
    font-size: 1.2rem;
    background-color: #928787;
    color: white;
    display: grid;
    padding: 5px 10px 3px 10px;
    border-radius: 15px;
    margin: 10px;
  }
</style>