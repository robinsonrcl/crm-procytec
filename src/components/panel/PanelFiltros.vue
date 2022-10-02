<script  setup lang="ts">
  import { useContratoStore } from "../../stores/ContratoStore.js";
  import { ref } from 'vue'
  import { getImage } from "../../utils/utilidades";
  
  const contratoStore = useContratoStore()
  
  var optionContrato = ref(contratoStore.getOptionContrato)
  var optionCorriente = ref(contratoStore.getOptionCorriente)
  var optionEstructura = ref([])
  var optionEstado = ref()
  var chkAzud = ref()
  var chkPlaca = ref()
  var chkMuro = ref()
  var chkBarras = ref()
  var chkBueno = ref()
  var chkRepotenciado = ref()
  var chkCritico = ref()
  var chkOtro = ref()
  
  function updateOptionEstado() {
    contratoStore.setOptionCorriente(optionCorriente.value)
  }

  function updateOptionCorriente() {
    contratoStore.setOptionCorriente(optionCorriente.value)
  }

  function updateOptionContrato() {
    contratoStore.setOptionContrato(optionContrato.value)
  }

  function corrientesLocal() {
    contratoStore.fillCorrientes(optionContrato.value)

    var element = document.getElementById("select-corrientes") as HTMLSelectElement | null

    if(element != null && element.selectedOptions.length > 1){
      // document.getElementById("select-corrientes").selectedOptions = null
      console.log("Select -> " + element)
    }
  }
  
  function drawPath() {
    contratoStore.drawCorriente(optionContrato.value, optionCorriente.value)
  }
  
  async function selectComponente() {
    let chkArray = contratoStore.getEstructuras.filter(function(estructura) {
      return estructura.completed
    })
    let chkEstado = contratoStore.getEstados.filter(function(estado) {
      return estado.completed
    })

    contratoStore.setComponentes(chkArray)

    if(chkArray.length > 0 && chkEstado.length > 0) {
      await contratoStore.drawHallazgos(optionContrato.value, optionCorriente.value)
    }
  }
    
  async function selectEstado() {
    let chkArray = contratoStore.getEstructuras.filter(function(estructura) {
      return estructura.completed
    })
    let chkEstado = contratoStore.getEstados.filter(function(estado) {
      return estado.completed
    })

    contratoStore.setEstados(chkEstado)
    
    if(chkArray.length > 0 && chkEstado.length > 0) {
      await contratoStore.drawHallazgos(optionContrato.value, optionCorriente.value)
    }
  }
  
</script>
  
<template>
  <div className="cont-filtros">
    <div className="c-filtros-item">
      <div>PANEL DE FILTROS</div>
      <hr className="filtros-hr">
    </div>
    <div className="c-filtros-item">
      Contratos
    </div>
    <div className="c-filtros-item">
      Corrientes
    </div>
    <div className="c-filtros-item">
      <select v-model="optionContrato"
        class="form-control" 
        id="select-contratos" 
        multiple size="3"
        @change="updateOptionContrato"
        readonly>
        <option 
          v-for="(contrato, index) in contratoStore.contratos.contrato"
          v-bind:value="{id: contrato.id,  text: contrato.nombre}"
          :key="index"
          @click.prevent="corrientesLocal()">
          {{ contrato.nombre }}
        </option>
      </select>
    </div>
    <div className="c-filtros-item">
      <select v-model="optionCorriente" 
        class="form-control"  
        id="select-corrientes" 
        multiple size="3" 
        @change="updateOptionCorriente"
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
    <div className="c-filtros-item">
      Componentes
    </div>
    <div className="c-filtros-item">
      Estados
    </div>
    <div className="c-filtros-item" id="filtros-componentes">
      <div className="c-filtros-item__estructuras">
        <div 
          v-for="(estructura) in contratoStore.getEstructuras" 
          :key="estructura.id"
        >
          <img className="imgMuestraEstructura" :src="getImage(`../../src/assets/images/iconoEstructura/`, estructura.src)" alt="" />
          <input type="checkbox" v-model="estructura.completed" @change="selectComponente"> {{ estructura.name }}
        </div>
      </div>
    </div>
    <div className="c-filtros-item" id="filtros-estados">
      <div 
        v-for="(estado) in contratoStore.getEstados" 
        :key="estado.id"
      >
        <img className="imgMuestraColor" :src="getImage(`../../src/assets/images/muestrasColor/`, estado.src)" alt="" />
        <input type="checkbox" v-model="estado.completed" @change="selectEstado"> {{ estado.name }}
      </div>
    </div>
    <div  className="c-filtros-item">
      <hr className="filtros-hr">
      <div v-if="(contratoStore.getCountHallazgos > 0)">({{ contratoStore.getCountHallazgos }}) Hallazgos encontrados</div>
    </div>
    <div className="c-filtros-item">
      <!-- <div>PANEL DE FILTROS</div> -->
    </div>
  </div>
</template>
  
<script lang="ts">
  import { mapActions, mapState } from "pinia";
  
  export default {
    name: "PanelFiltros",
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
  
<style lang="css" scoped>
  .cont-filtros {
    position: fixed;
    display: inline-grid;
    left: 84px;
    z-index: 10;
    background-color: var(--bcolor);
    opacity: 0.99;
    grid-template-columns: repeat(2, 1fr);
    max-width: 20%;
    color: #fff;
    padding: 10px;
    gap: 5px;
    margin-top: -10px;
    height: 100%;
    top: 134px;
    grid-auto-rows: min-content;
    font-size: medium;
  }
  .c-filtros-item:nth-child(1) {
    grid-column: 1 / span 2;
  }
  .c-filtros-item:nth-last-child(2) {
    grid-column: 1 / span 2;
    font-weight: 400;
    color: yellow;
  }
  .c-filtros-item:nth-last-child(1) {
    grid-column: 1 / span 2;
    background-color: var(--bcolor-title);
  }
  .imgMuestraEstructura {
    width: 32px;
    padding: 0px 4px 4px 0px;
    margin-right: 4px;
  }
  .imgMuestraColor {
    width: 32px;
    padding: 0px 4px 4px 0px;
    margin-right: 4px;
  }
  #filtros-componentes {
  place-items: flex-start;
  font-size: var(--fontSizeFilter);
  text-align: left;
  padding-left: 10px;
}
#filtros-estados {
  place-items: flex-start;
  font-size: var(--fontSizeFilter);
  padding-right: 7px;
  height: 125px;
  overflow-y: scroll;
  width: 160px;
  background: var(--bcolor-filtros-2);
  padding: 5px 0px 0px 7px;
  border-radius: 10px;
}
.c-filtros-item {
  display: grid;
  padding-right: 4px;
}
.filtros-hr {
  height: 4px;
  background: white;
  margin: 0 0 4px;
}
.c-filtros-item__estructuras {
  height: 125px;
  overflow-y: scroll;
  width: 160px;
  background: var(--bcolor-filtros-2);
  padding: 5px 0px 0px 7px;
  border-radius: 10px;
}
</style>