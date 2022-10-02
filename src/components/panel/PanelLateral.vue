<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { ref } from "vue";
import PanelFiltros from "./PanelFiltros.vue"

const contratoStore = useContratoStore()
const showFiltros = ref(contratoStore.getShowPanel)
//ref(false)

// showFiltros.value = contratoStore.getShowPanel

</script>

<template>
  <div id="menu_dviv" className="panel_menu">
    <a href="" title="Bitacora Fluvial">
      <img src="../../assets/images/bitacoraHead.png" className="imgHead">
    </a>
    <a href="" title="Bitacora Fluvial">
      <img src="../../assets/images/bitacoraSubHead.png" className="imgSubHead">
    </a>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
    <br>
    <RouterLink to="/">
        <span className="toolTip"><img src="../../assets/images/iconos/icohome.png" className="imgIcon">
        <span className="tooltiptext">Ir a inicio</span></span>
    </RouterLink>
    <br>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
    <br>
      <span className="toolTip"><img src="../../assets/images/iconos/icouser.png" className="imgIcon">
      <span className="tooltiptext">Usuario</span></span>
    <br>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
    <br>
      <span className="toolTip">
        <img src="../../assets/images/iconos/icolayer.png" className="imgIcon"
        @click.prevent="contratoStore.setShowPanel('panel')">
        <span className="tooltiptext">Mapa Fluvial</span>
      </span>
      <PanelFiltros v-if="contratoStore.getShowPanel" />
    <br>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
    <br>
    <a href="" title="User">
      <span className="toolTip"><img src="../../assets/images/iconos/iconAgreement.png" className="imgIcon">
      <span className="tooltiptext">Gestión Contratos</span></span>
    </a>
    <br>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
    <br>
    <a href="" title="User">
      <span className="toolTip"><img src="../../assets/images/iconos/iconSetup.png" className="imgIcon">
      <span className="tooltiptext">Configuración</span></span>
    </a>
    <br>
    <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
  </div>
</template>

<style lang="css" scoped>
  .panel_menu {
    display: block;
    height: 100% !important;
    width: 5%;
    min-width: 55px;
    padding: 0%;
    background: rgb(38,34,98);
    float: left;
    position: absolute;
    top: 0px;
    z-index: 150;
  }
  .imgHead {
    width: 16rem;
  }
  .imgSubHead {
    width: 12.5rem;
    margin-top: -3px;
  }
  .imgSeparador {
    width: 38px;
  }
  .tooltiptext {
    visibility: hidden;
    width: 140px;
    background: rgb(38,34,98);
    /* opacity: 0.8; */
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    margin-left: 32px;
    /* Position the tooltip */
    position: absolute;
    z-index: 160;
  }
  .imgIcon {
    width: 1.8rem;
  }
  /* .imgIcon2 {
    width: 1.8rem;
  } */
  .toolTip:hover .tooltiptext {
    visibility: visible;
    /* width: 3rem; */
  }
</style>