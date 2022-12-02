<script  setup lang="ts">
  import { useContratoStore } from "../../stores/ContratoStore.js";
  import { ref } from 'vue'
  import { getImage } from "../../utils/utilidades";
  
  const contratoStore = useContratoStore()
  
  var optionContrato = ref(contratoStore.getOptionContrato)
  const optionCorriente = ref(contratoStore.optionCorriente)
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

  async function callDrawHallazgos() {
    await contratoStore.drawHallazgos(optionCorriente.value)
  }

  function clickContrato() {
    contratoStore.fillCorrientes(optionContrato.value)
    contratoStore.setFalseEstructuras('')
    contratoStore.setFalseEstados('')
    contratoStore.setHallazgos()
    contratoStore.componentes = []
    contratoStore.estados = []
    optionCorriente.value = []
    contratoStore.drawCorriente(optionContrato.value, optionCorriente.value)
    callDrawHallazgos()
  }
  
  function clickCorriente() {
    contratoStore.drawCorriente(optionContrato.value, optionCorriente.value)

    callDrawHallazgos()
  }
  
  function changeShowDashboard() {
    contratoStore.showDashboard = !contratoStore.showDashboard;
  }
  
  async function selectComponente() {
    if(optionContrato.value.length == 0){
      contratoStore.setMessage("Por favor seleccione un contrato.", 3500);
      contratoStore.setFalseEstructuras('');
      return
    }
    if(optionCorriente.value.length == 0){
      contratoStore.setMessage("Por favor seleccione una corriente.", 3500);
      contratoStore.setFalseEstructuras('');
      return
    }

    let chkEstucturas = contratoStore.getEstructuras.filter(function(estructura) {
      return estructura.estado
    })

    contratoStore.setComponentes(chkEstucturas)

    callDrawHallazgos()
  }
    
  async function selectEstado() {
    if(optionContrato.value.length == 0){
      contratoStore.setMessage("Por favor seleccione un contrato.", 5000);
      contratoStore.setFalseEstados();
      return
    }
    if(optionCorriente.value.length == 0){
      contratoStore.setMessage("Por favor seleccione una corriente.", 5000);
      contratoStore.setFalseEstados();
      return
    }

    let chkEstado = contratoStore.getEstados.filter(function(estado) {
      return estado.estado
    })

    contratoStore.setEstados(chkEstado)
    
    callDrawHallazgos()
  }
  
</script>
  
<template>
  <div className="cont-filtros">
    <div className="c-filtros-item">
      <div>PANEL DE FILTROS</div>
      <hr className="filtros-hr">
    </div>
    <div className="c-filtros-item styleDashboard">
      <div class="displayDashboard"><fa icon="fa-gauge-high" class="styleGauge" size="2x" /></div>
      <div>Mostrar Dashboard</div>
      <div><input type="checkbox" class="checkStyle" v-model="contratoStore.getShowDashboard"  @change="changeShowDashboard" ></div>
    </div>
    <div className="c-filtros-item">
      Contratos
    </div>
    <div className="c-filtros-item">
       
      <select v-model="optionContrato"
        class="form-control" 
        id="select-contratos" 
        multiple size="3"
        @change="updateOptionContrato"  
        readonly>
        <option 
          v-for="(contrato, index) in contratoStore.getContratos"
          v-bind:value="{id: contrato.id,  text: contrato.nombre}"
          :key="index"
          @click.prevent="clickContrato()">
          {{ contrato.nombre }}
        </option>
      </select>
    </div>
    <div className="c-filtros-item">
      Corrientes
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
          @click.prevent="clickCorriente()">
          {{ corriente.nombre }}
        </option>
      </select>
    </div>
    <div className="c-filtros-item">
      Componentes
    </div>
    <div className="c-filtros-item" id="filtros-componentes">
      <div className="c-filtros-item__estructuras">
        <div 
          v-for="(estructura) in contratoStore.getEstructuras" 
          :key="estructura.id"
        >
          <img className="imgMuestraEstructura" :src="getImage(`/images/iconoEstructura/`, estructura.icono)" alt="" />
          <input type="checkbox" v-model="estructura.estado" @change="selectComponente"> {{ estructura.nombre }}
        </div>
      </div>
    </div>
    <div className="c-filtros-item">
      Estados
    </div>
    <div className="c-filtros-item" id="filtros-estados">
      <div 
        v-for="(estado) in contratoStore.getEstados" 
        :key="estado.id"
      >
        <img className="imgMuestraColor" :src="getImage(`/images/muestrasColor/`, estado.icono)" alt="" />
        <input type="checkbox" v-model="estado.estado" @change="selectEstado"> {{ estado.nombre }}
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
  .imgMuestraEstructura {
    width: 38px;
    padding: 0px 4px 4px 0px;
    margin-right: 4px;
  }
  .imgMuestraColor {
    width: 30px;
    padding: 0px 4px 4px 0px;
    margin-right: 4px;
  }
  #filtros-componentes {
  place-items: flex-start;
  font-size: var(--fontSizeFilter);
  text-align: left;
  /* padding-left: 10px; */
}
#filtros-estados {
  place-items: flex-start;
  font-size: var(--fontSizeFilter);
  padding-right: 7px;
  height: 125px;
  overflow-y: scroll;
  /* width: 160px; */
  background: var(--bcolor-filtros-2);
  padding: 10px 10px 10px 10px;
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
  /* width: 200px; */
  background: var(--bcolor-filtros-2);
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
}
.styleDashboard {
  background-color: green;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
}
.displayDashboard {
  /* background-color: blue; */
}
.checkStyle {
  /* Doble-tamaño Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari y Chrome */
  -o-transform: scale(2); /* Opera */
  padding: 10px;
  margin: 12px;
}
.styleGauge {
  margin: 10px;
  vertical-align: bottom;
}
</style>