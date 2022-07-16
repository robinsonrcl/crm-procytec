<template>
<div style="position:relative; border: none; height: 120px; width: 200px; box-sizing: border-box;">
  <div style="position: absolute; left:0; top: 0;"><img src="../assets/images/iconoBitacora.svg" alt="" class="iconoBitacora" /></div>
  <div style="position: absolute; right: 15px; top: 22px;"><h2 class="titleBitacorah1">Bitacora</h2></div>
  <div style="position:absolute; right: 15px; bottom: 37px;"><h2 class="titleBitacorah2">Fluvial</h2></div>
</div>
  <h3 class="typefontNSW" style="position:absolute; top: 110px; left: 5px;">Mapa Contratos - Hallazgos y Patologías</h3>
  <MapaGeneral />
</template>

<script>
import MapaGeneral from "../components/MapaGeneral.vue";

export default {
  name: "FluvialView",
  components: { MapaGeneral },
};
</script>
