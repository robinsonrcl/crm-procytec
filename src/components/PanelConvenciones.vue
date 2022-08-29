<template>
    <div class="container-convenciones">
    <div class="conv-item conv-item-title"><p>COLORES DE ESTADO</p></div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/muestrasColor/colorAmarillo.png')" alt=""></div>
    <div class="conv-item">Repotenciado</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/muestrasColor/colorVerde.png')" alt=""></div>
    <div class="conv-item">Bueno</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/muestrasColor/colorRojo.png')" alt=""></div>
    <div class="conv-item">En mal estado</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/muestrasColor/colorVioleta.png')" alt=""></div>
    <div class="conv-item">Otro</div>
    <div class="conv-item conv-item-title"><p>TIPO DE ESTRUCTURA</p></div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/iconoEstructura/barrasAzud.png')" alt=""></div>
    <div class="conv-item">AZUD</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/iconoEstructura/circuloPlaca.png')" alt=""></div>
    <div class="conv-item">PLACA</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/iconoEstructura/cuadradoBarras.png')" alt=""></div>
    <div class="conv-item">BARRAS</div>
    <div class="conv-item"><img class="imgMuestraColor" :src="require('../assets/images/iconoEstructura/trianguloMuro.png')" alt=""></div>
    <div class="conv-item">MURO</div>
  </div>
</template>

<script>
export default {
  name: "PanelConvenciones",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>