<script  setup>
import { useContratoStore } from "@/stores/ContratoStore";

const contratoStore = useContratoStore()

contratoStore.fill()

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
          @click.prevent="fillCorrientes()">
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
      <div><label><input type="checkbox" id="cbox1" value="first_checkbox"> Repotenciado</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> Bueno</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> En mal estado</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> Otro</label></div>
    </div>
    <div class="c-filtros-item">
      <div>PANEL DE FILTROS</div>
    </div>
    <!-- <div class="c-filtros-item">2</div>
    <div class="c-filtros-item">3</div>
    <div class="c-filtros-item">4</div> -->
  </div>
</template>

<script>

export default {
  name: "PanelFilters",
  created() {},
  data() {
    return {
      selected: [],
        options: [
          { item: 'A', name: 'Option A' },
          { item: 'B', name: 'Option B' },
          { item: 'D', name: 'Option C', notEnabled: true },
          { item: { d: 1 }, name: 'Option D' }
        ]
      // optionContrato: String
    };
  },
  props: {},
  methods: {
    drawPath() {
      this.contratoStore.drawCorriente(this.optionContrato, this.optionCorriente)
    },
    fillCorrientes() {
      this.contratoStore.fillCorrientes(this.optionContrato)
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

      this.contratoStore.drawHallazgos(chkArray, this.optionContrato, this.optionCorriente)
    }
  },
};
</script>

<style lang="scss" scoped></style>