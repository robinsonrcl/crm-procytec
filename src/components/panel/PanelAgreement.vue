<script setup lang="ts">
import PanelImportCSV from './PanelImportCSV.vue';

</script>

<template>
  <div class="container-agreement">
    <div className="c-filtros-item">
      <div>GESTIÓN DE CONTRATOS</div>
      <hr className="filtros-hr">
    </div>
    <div class="panelImport">
      <span class="textImport">
        IMPORTACIÓN DE ARCHIVO (.csv) <br>
        CON CONTRATOS, CORRIENTES Y HALLAZGOS.<br><br>
      </span>
      <PanelImportCSV />
      <div class="spanDescarga">
        <a href="https://bitacora.s3.amazonaws.com/modeloImportBitacora.csv">
        <fa icon="fa-file-csv" size="2x" /> Descargar modelo</a></div>
    </div>
    <hr className="filtros-hr">
  </div>
</template>

<style lang="scss" scoped>
  .container-agreement {
    position: fixed;
    display: grid;
    z-index: 10;
    background-color: var(--bcolor);
    opacity: 0.99;
    grid-template-columns: 1fr;
    color: #fff;
    padding: 20px;
    gap: 5px;
    height: 100%;
    grid-auto-rows: min-content;
    font-size: small;
    border-radius: 0 10px 10px 0;
    width: 22%;
  }
  .filtros-hr {
  height: 4px;
  background: white;
  margin: 4px 0 4px;
}
.textImport {
  font-weight: 400;
}
.panelImport {
  text-align: -webkit-center;
}
.spanDescarga {
  background-color: white;
    padding: 10px 0 7px;
    margin: 10px;
    // border-radius: 5px;
}
</style>
