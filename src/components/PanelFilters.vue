<script  setup>
import { useContratoStore } from "../stores/ContratoStore.js";
import { ref } from 'vue'

const contratoStore = useContratoStore()

      var optionContrato = ref([])
      var optionCorriente = []
      var chkAzud = Boolean
      var chkPlaca = Boolean
      var chkMuro = Boolean
      var chkBarras = Boolean
      var chkBueno = Boolean
      var chkRepotenciado = Boolean
      var chkCritico = Boolean
      var chkOtro = Boolean

  function corrientesLocal() {
    contratoStore.fillCorrientes(optionContrato.value)
    if(document.getElementById("select-corrientes").selectedOptions.length > 1){
      document.getElementById("select-corrientes").selectedOptions = null
    }
  }

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
import { mapActions, mapState } from "pinia";

export default {
  name: "PanelFilters",
  created() {},

    computed: {
    ...mapState(useContratoStore, ["getCorrientes"])
  },

  methods: {
    ...mapActions(useContratoStore, [
        "fillCorrientes",
        "setComponentes",
        "drawCorriente",
        "drawHallazgos",
        "setEstados"
        ]),
    drawPath() {
      this.drawCorriente(optionContrato, this.optionCorriente)
    },

    selectComponente() {
      var chkArray = []
      if(this.chkAzud === true) {
        chkArray.push("AZUD")
      }
      if(this.chkPlaca === true) {
        chkArray.push("PLACA")
      }
      if(this.chkMuro === true) {
        chkArray.push("MURO")
      }
      if(this.chkBarras === true) {
        chkArray.push("BARRAS")
      }

      this.setComponentes(chkArray)
      this.drawHallazgos(this.optionContrato, this.optionCorriente)
    },
    selectEstado() {
      var chkEstado = []
      if(this.chkRepotenciado === true) {
        chkEstado.push("Repotenciado")
      }
      if(this.chkBueno === true) {
        chkEstado.push("Bueno")
      }
      if(this.chkCritico === true) {
        chkEstado.push("Critico")
      }
      if(this.chkOtro === true) {
        chkEstado.push("Otro")
      }

      this.setEstados(chkEstado)
      this.drawHallazgos(this.optionContrato, this.optionCorriente)
    }
  },
};
</script>

<style lang="scss" scoped></style>