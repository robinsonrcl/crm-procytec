<script  setup>
import { useContratoStore } from "../stores/ContratoStore.js";
import { ref } from 'vue'

const contratoStore = useContratoStore()

      var optionContrato = ref([])
      var optionCorriente = ref([])
      var chkAzud = ref(Boolean)
      var chkPlaca = ref(Boolean)
      var chkMuro = ref(Boolean)
      var chkBarras = ref(Boolean)
      var chkBueno = ref(Boolean)
      var chkRepotenciado = ref(Boolean)
      var chkCritico = ref(Boolean)
      var chkOtro = ref(Boolean)

  function corrientesLocal() {
    contratoStore.fillCorrientes(optionContrato.value)
    if(document.getElementById("select-corrientes").selectedOptions.length > 1){
      document.getElementById("select-corrientes").selectedOptions = null
    }
  }

  function drawPath() {
    contratoStore.drawCorriente(optionContrato.value, optionCorriente.value)
  }

  function fillComponentes() {
    var chkArray = []
      if(chkAzud.value === true) {
        chkArray.push("AZUD")
      }
      if(chkPlaca.value === true) {
        chkArray.push("PLACA")
      }
      if(chkMuro.value === true) {
        chkArray.push("MURO")
      }
      if(chkBarras.value === true) {
        chkArray.push("BARRAS")
      }

      return chkArray
  }

  function fillEstado() {
    var chkEstado = []
    if(chkRepotenciado.value === true) {
      chkEstado.push("Repotenciado")
    }
    if(chkBueno.value === true) {
      chkEstado.push("Bueno")
    }
    if(chkCritico.value === true) {
      chkEstado.push("Critico")
    }
    if(chkOtro.value === true) {
      chkEstado.push("Otro")
    }

    return chkEstado
  }

  async function selectComponente() {
    let chkArray = fillComponentes()
    let chkEstado = fillEstado()

    contratoStore.setComponentes(chkArray)

    if(chkArray.length > 0 && chkEstado.length > 0) {
      await contratoStore.drawHallazgos(optionContrato.value, optionCorriente.value)
    }
    
  }
    
  async function selectEstado() {
    let chkEstado = fillEstado()
    let chkArray = fillComponentes()

    contratoStore.setEstados(chkEstado)
    
    if(chkArray.length > 0 && chkEstado.length > 0) {
      await contratoStore.drawHallazgos(optionContrato.value, optionCorriente.value)
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
    <div  class="c-filtros-item">
      <div v-if="(contratoStore.getCountHallazgos > 0)">({{ contratoStore.getCountHallazgos }}) Hallazgos encontrados</div>
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
  },
};
</script>

<style lang="scss" scoped></style>