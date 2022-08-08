<template>
  <div>
    <div class="modalImg">
      <div class="modalImgUnico">
        <div class="modalIconCerrar" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/100.jpg')" alt=""
          @click.prevent="showModalCarousel(0)" /></div>
          <div class="modalImg__desc"><p>Foto  100</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/200.jpg')" alt="" 
          @click.prevent="showModalCarousel(1)" /></div>
          <div class="modalImg__desc"><p>Foto  200</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/300.jpg')" alt="" key="" 
          @click.prevent="showModalCarousel(2)" /></div>
          <div class="modalImg__desc"><p>Foto  300</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/400.jpg')" alt="" 
          @click.prevent="showModalCarousel(3)" /></div>
          <div class="modalImg__desc"><p>Foto  400</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/500.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  500</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/100.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  100</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/200.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  200</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/300.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  300</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/400.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  400</p></div>
        </div>
        <div class="modalImg__foto">
          <div><img class="img__modal" :src="require('../assets/photos/500.jpg')" alt="" /></div>
          <div class="modalImg__desc"><p>Foto  500</p></div>
        </div>
      </div>
    </div>
    <div class="container__carousel" v-show="showCarousel">
      <div class="div__carousel">
        <Carousel :images="imagenes" :position="position" :mostrar-boton="true" @show-carousel-modal="showCarouselModal" />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue"

export default {
  name: "ModalImagenes",
  components: {
    Carousel
  },
  data() {
    return {
      showCarousel: false,
      position: Number,
      imagenes: [
        { 
          id: 1,
          url: require('../assets/photos/100.jpg'),
          descripcion: "Foto 100" 
        }, 
        { 
          id: 2,
          url: require('../assets/photos/200.jpg'),
          descripcion: "Foto 200" 
        },
        { 
          id: 3,
          url: require('../assets/photos/300.jpg'),
          descripcion: "Foto 300" 
        },
        { 
          id: 4,
          url: require('../assets/photos/400.jpg'),
          descripcion: "Foto 400" 
        },
        { 
          id: 5,
          url: require('../assets/photos/500.jpg'),
          descripcion: "Foto 500" 
        },
        { 
          id: 6,
          url: require('../assets/photos/100.jpg'),
          descripcion: "Foto 600" 
        },
        { 
          id: 7,
          url: require('../assets/photos/200.jpg'),
          descripcion: "Foto 700" 
        },
        { 
          id: 8,
          url: require('../assets/photos/300.jpg'),
          descripcion: "Foto 800" 
        },
      ]
    };
  },
  props: {},
  methods: {
    cerrarModal () {
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