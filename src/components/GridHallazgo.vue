<template>
  <div class="container-hallazgo">
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span>Componente:</span></div>
      <div class="cont-hall-title"><span class="container-hallazgo-item-nom-complemento">{{ hallazgo.componente }}</span></div>
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span>{{ hallazgo.nombrecontrato }}</span></div> 
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-observacion">
        {{ hallazgo.observacion }}</div>
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span id="subtitulos">Referencia:</span></div>
      <div class="cont-hall-title"><span>{{ hallazgo.referencia }}</span></div> 
    </div>
    <div class="container-hallazgo-item">
      <div class="cont-hall-title"><span id="subtitulos">Zona:</span></div>
      <div class="cont-hall-title"><span>{{ hallazgo.zona }}</span></div>
    </div>
    <div class="container-hallazgo-item" id="hallazgos">
      <div class="cont-hall-title"><span id="subtitulos">Hallazgos:</span></div>
    </div>
    <div class="container-hallazgo-item" id="tramouno">
      <div class="cont-hall-title"><span id="subtitulos">Tramo1:</span></div>
    </div>
    <div class="container-hallazgo-item" id="cont__hallazgo">
      <div><fa v-show="hallazgo.hallazgo1" icon="fa-caret-right"/> {{ hallazgo.hallazgo1 }}</div>
      <div><fa v-show="hallazgo.hallazgo2" icon="fa-caret-right"/> {{ hallazgo.hallazgo2 }}</div>
      <div><fa v-show="hallazgo.hallazgo3" icon="fa-caret-right"/> {{ hallazgo.hallazgo3 }}</div>
    </div>
    <div class="container-hallazgo-item" id="cont-tramo">
      <div>{{ hallazgo.tramo1 }}</div>
      <div id="abscisa">Abscisa:</div>
      <div>{{ hallazgo.abscisakm }}</div>
    </div>
    <div class="container-hallazgo-item" id="cont-hall-fotos">

      <div v-for="foto in hallazgo.fotos" :key="foto">
        <div><img class="cont-hall-img" :src="require(`@/assets/photos/${foto.url}`)" alt="" /></div>
      </div>
      
    </div>
    <div class="container-hallazgo-item" id="cont-hall-foot-1">
      <div class="cont-hall-estado-anterior">Estado diseño:</div> 
      <div class="cont-hall-ejecutado">{{ hallazgo.estadoanterior }}</div> 
    </div>
    <div class="container-hallazgo-item" id="cont-hall-foot-2">
      <div>Estado componente:</div> 
      <div v-if="hallazgo.estado === 'Repotenciado'" class="cont-hall-estado"><img class="cont-hall-estado-img" :src="require('@/assets/images/muestrasColor/colorAmarillo.png')" alt="" /> Repotenciado</div> 
      <div v-if="hallazgo.estado === 'Bueno'" class="cont-hall-estado"><img class="cont-hall-estado-img" :src="require('@/assets/images/muestrasColor/colorVerde.png')" alt="" /> Bueno</div> 
      <div v-if="hallazgo.estado === 'Critico'" class="cont-hall-estado"><img class="cont-hall-estado-img" :src="require('@/assets/images/muestrasColor/colorRojo.png')" alt="" /> Critico</div> 
      <div v-if="hallazgo.estado === 'Otro'" class="cont-hall-estado"><img class="cont-hall-estado-img" :src="require('@/assets/images/muestrasColor/colorVioleta.png')" alt="" /> Otro</div> 
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
  props: {
    hallazgo: []
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>