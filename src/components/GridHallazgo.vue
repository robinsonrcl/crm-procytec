<template>
  <div class="container-hallazgo">
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span>Componente:</span></div>
      <div class="cont-hall-title"><span class="container-hallazgo-item-nom-complemento">PLACA</span></div>
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span>Fecha:</span></div>
      <div class="cont-hall-title"><span>2022-12-30</span></div> 
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-observacion">
        Se realizo remosión de barras de sedimento, el punto se encuentra bueno.
      </div>
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span id="subtitulos">Referencia:</span></div>
      <div class="cont-hall-title"><span>Variante</span></div> 
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span id="subtitulos">Zona:</span></div>
      <div class="cont-hall-title"><span>SUR CANALIZADA</span></div>
    </div>
    <div class="container-hallazgo-item" id="hallazgos">
      <div class="cont-hall-title"><span id="subtitulos">Hallazgos:</span></div>
    </div>
    <div class="container-hallazgo-item" id="tramouno">
      <div class="cont-hall-title"><span id="subtitulos">Tramo1:</span></div>
    </div>
    <div class="container-hallazgo-item" id="cont__hallazgo">
      <div>VEGETACIÓN</div>
      <div>EROSION</div>
      <div>FISURAS</div>
    </div>
    <div class="container-hallazgo-item" id="cont-tramo">
      <div>T1. Variante de Caldas - Estación Envigado</div>
      <div id="abscisa">Abscisa:</div>
      <div>K22+234</div>
    </div>
    <div class="container-hallazgo-item" id="cont-hall-fotos">
      <div class="cont-hall-div"><img class="cont-hall-img" :src="require('@/assets/photos/100.jpg')" alt="" /></div>
      <div><img class="cont-hall-img" :src="require('@/assets/photos/100.jpg')" alt="" /></div>
      <div><img class="cont-hall-img" :src="require('@/assets/photos/100.jpg')" alt="" /></div>
      <div><img class="cont-hall-img" :src="require('@/assets/photos/100.jpg')" alt="" /></div>
    </div>
    <div class="container-hallazgo-item" id="cont-hall-foot-1">
      <div class="cont-hall-estado-anterior">Estado diseño anterior:</div> 
      <div class="cont-hall-ejecutado">Ejecutado</div> 
    </div>
    <div class="container-hallazgo-item" id="cont-hall-foot-2">
      <div>Estado componente:</div> 
      <div class="cont-hall-estado"><img class="cont-hall-estado-img" :src="require('@/assets/images/muestrasColor/colorAmarillo.png')" alt="" /></div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "GridHallazgo",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>