<template>
<div class="d-flex flex-column align-content-start">
  <div class="p-2"><img src="../assets/images/iconoBitacora.svg" alt="" class="iconoBitacora"></div>
  <div class="p-2">
    <h1 class="titleBitacorah1">Bitacora</h1>
    <h2 class="titleBitacorah2">Fluvial</h2>
  </div>
  <div class="p-2"><h3>Mapa Contratos - Hallazgos y Patologías</h3></div>
</div>
  <div class="d-flex align-items-center justify-content-center">
    <div class="p-2">
      <MapaGeneral />
    </div>
  </div>
</template>

<script>
import MapaGeneral from "../components/MapaGeneral.vue";

export default {
  name: "FluvialView",
  components: { MapaGeneral },
};
</script>
