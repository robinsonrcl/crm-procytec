<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { ref } from "vue";
import PanelFiltros from "./PanelFiltros.vue"
import PanelAgreement from "./PanelAgreement.vue"
import PanelUsuario from "./PanelUsuario.vue";

const contratoStore = useContratoStore()
const showFiltros = ref(contratoStore.getShowPanelCapas)

</script>

<template>
  <div class="c-lateral">
    <div class="c-lateral__item">
      <a href="" title="Bitacora Fluvial">
        <img src="../../assets/images/bitacoraHead.png" className="imgHead">
      </a>
    </div>
    <div class="c-lateral__item"></div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <a href="" title="Bitacora Fluvial">
        <img src="../../assets/images/bitacoraSubHead.png" className="imgSubHead">
      </a>
    </div>
    <div class="c-lateral__item"></div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      <RouterLink to="/">
        <span className="toolTip"><img src="../../assets/images/iconos/icohome.png" className="imgIcon">
        <span className="tooltiptext">Bienvenido a Bitacora Fluvial</span></span>
      </RouterLink>
    </div>
    <div class="c-lateral__item">
      <PanelFiltros v-if="contratoStore.getShowPanelCapas" />
      <PanelAgreement v-if="contratoStore.getShowPanelAgreement" />
      <PanelUsuario v-if="contratoStore.getShowPanelUsuario" />
    </div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      <span className="toolTip">
        <img src="../../assets/images/iconos/icouser.png" className="imgIcon"
        @click.prevent="contratoStore.setShowPanel('Usuario')">
        <span className="tooltiptext">Usuario</span>
        <span class="iconUsuario" v-if="contratoStore.getShowPanelUsuario"><fa icon="fa-location-arrow fa-2x" /></span>
      </span>
    </div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      <span className="toolTip">
        <img src="../../assets/images/iconos/icolayer.png" className="imgIcon"
        @click.prevent="contratoStore.setShowPanel('Capas')">
        <span className="tooltiptext">Mapa Fluvial</span>
        <span class="iconCapas" v-if="contratoStore.getShowPanelCapas"><fa icon="fa-location-arrow fa-2x" /></span>  
      </span>
    </div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      <span className="toolTip">
        <img src="../../assets/images/iconos/iconAgreement.png" className="imgIcon"
        @click.prevent="contratoStore.setShowPanel('Agreement')">
        <span className="tooltiptext">Gestión Contratos</span>
        <span class="iconAgreement" v-if="contratoStore.getShowPanelAgreement"><fa icon="fa-location-arrow fa-2x" /></span>  
      </span>
    </div>
    <div class="c-lateral__item c-lateral__item-opcion">
      <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      <span className="toolTip"><img src="../../assets/images/iconos/iconSetup.png" className="imgIcon">
        <span className="tooltiptext">Configuración</span>
        <img src="../../assets/images/iconos/separador.png" className="imgSeparador">
      </span>
    </div>
    <div class="c-lateral__item c-lateral__item-opcion"></div>
  </div>
</template>

<style lang="css" scoped>
.iconUsuario {
    color: yellow;
    position: absolute;
    padding: 11px 0 0 7px;
    size: 20px;
    z-index: 100;
  }
  .iconCapas {
    color: yellow;
    position: absolute;
    padding: 0px 0 0 7px;
    size: 20px;
    z-index: 100;
  }
  .iconAgreement {
    color: yellow;
    position: absolute;
    padding: 0px 0 0 7px;
    size: 20px;
    z-index: 100;
  }
  .c-lateral {
    position: absolute;
    display: grid;
    grid-template-columns: 4rem 20rem;
    grid-template-rows: min-content min-content repeat(4, max-content) max-content;
    height: 100%;
    padding: 0%;
    /* background: rgba(197, 197, 198, 0.5); */
    float: left;
    top: 0%;
    z-index: 150;
  }
  .c-lateral__item {
    display: grid;
    /* border: 1px solid white; */
  }
  .c-lateral__item-opcion {
    background-color: var(--bcolor-lateral);
    /* padding: 10px 0 10px; */
  }
  .c-lateral__item:nth-child(6) {
    grid-row: span 6;
  }
  .imgHead {
    width: 16rem;
  }
  .imgSubHead {
    width: 12.5rem;
    margin-top: -3px;
  }
  .imgSeparador {
    width: 4.5rem;
    padding: 6px 0 6px 0;
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
    height: auto;
  }
  .toolTip:hover .tooltiptext {
    visibility: visible;
    /* width: 3rem; */
  }
</style>