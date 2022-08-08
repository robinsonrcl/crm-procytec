<script  setup>
import { useContratoStore } from "../stores/ContratoStore.js";

const contratoStore = useContratoStore()

useContratoStore()

// contratoStore.fill()

</script>

<template>
  <div class="cont-filtros">
    <div class="c-filtros-item">
      Contratos
    </div>
    <div class="c-filtros-item">
      Corrientes
    </div>
    <div class="c-filtros-item">
      Componentes
    </div>
    <div class="c-filtros-item">
      Estados
    </div>
    <div class="c-filtros-item">
      <select v-model="optionContrato" 
        class="form-control" 
        id="select-contratos" 
        multiple size="3" 
        readonly>
        <option 
          v-for="(contrato, index) in contratoStore.contratos.contrato"
          v-bind:value="{ id: contrato.id, text: contrato.nombre }"
          :key="index"
          @click.prevent="corrientesLocal()">
          {{ contrato.nombre }}
        </option>
      </select>
    </div>
    <div class="c-filtros-item">
      <select v-model="optionCorriente" 
        class="form-control"  
        id="select-corrientes" 
        multiple size="3" 
        readonly>
        <option 
          v-for="(corriente, index) in contratoStore.getCorrientes"
          v-bind:value="{ id: corriente.id, text: corriente.nombre }"
          :key="index"
          @click.prevent="drawPath()">
          {{ corriente.nombre }}
        </option>
      </select>
    </div>
    <div class="c-filtros-item" id="filtros-componentes">
      <div><label><input v-model="chkAzud" @change="selectComponente()" type="checkbox" id="cbox1" value="AZUD"> AZUD</label></div>
      <div><label><input v-model="chkPlaca" @change="selectComponente()" type="checkbox" id="cbox2" value="PLACA"> PLACA</label></div>
      <div><label><input v-model="chkMuro" @change="selectComponente()" type="checkbox" id="cbox3" value="MURO"> MURO</label></div>
      <div><label><input v-model="chkBarras" @change="selectComponente()" type="checkbox" id="cbox4" value="BARRAS"> BARRAS</label></div>
    </div>
    <div class="c-filtros-item" id="filtros-estados">
      <div><label><input v-model="chkRepotenciado" @change="selectEstado()" type="checkbox" id="cbox1-1" value="Repotenciado"> Repotenciado</label></div>
      <div><label><input v-model="chkBueno" @change="selectEstado()" type="checkbox" id="cbox2-2" value="Bueno"> Bueno</label></div>
      <div><label><input v-model="chkCritico" @change="selectEstado()" type="checkbox" id="cbox3-3" value="Critico"> Critico</label></div>
      <div><label><input v-model="chkOtro" @change="selectEstado()" type="checkbox" id="cbox4-4" value="Otro"> Otro</label></div>
    </div>
    <div class="c-filtros-item">
      <div>PANEL DE FILTROS</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PanelFilters",
  created() {},
  data() {
    return {
    };
  },
  props: {},
  methods: {
    drawPath() {
      this.contratoStore.drawCorriente(this.optionContrato, this.optionCorriente)
    },
    corrientesLocal() {
      this.contratoStore.fillCorrientes(this.optionContrato)
      if(document.getElementById("select-corrientes").selectedOptions.length > 1){
        document.getElementById("select-corrientes").selectedOptions = null
      }
    },
    selectComponente() {
      var chkArray = []
      if(this.chkAzud) {
        chkArray.push("AZUD")
      }
      if(this.chkPlaca) {
        chkArray.push("PLACA")
      }
      if(this.chkMuro) {
        chkArray.push("MURO")
      }
      if(this.chkBarras) {
        chkArray.push("BARRAS")
      }

      this.contratoStore.setComponentes(chkArray)
      this.contratoStore.drawHallazgos(this.optionContrato, this.optionCorriente)
    },
    selectEstado() {
      var chkEstado = []
      if(this.chkRepotenciado) {
        chkEstado.push("Repotenciado")
      }
      if(this.chkBueno) {
        chkEstado.push("Bueno")
      }
      if(this.chkCritico) {
        chkEstado.push("Critico")
      }
      if(this.chkOtro) {
        chkEstado.push("Otro")
      }

      this.contratoStore.setEstados(chkEstado)
      this.contratoStore.drawHallazgos(this.optionContrato, this.optionCorriente)
    }
  },
};
</script>

<style lang="scss" scoped></style>