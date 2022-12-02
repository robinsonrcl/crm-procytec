<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore";
import { onMounted } from "vue";
import { ref } from 'vue';
// import { GChart } from 'vue-google-charts'
const contratoStore = useContratoStore()

var mousePosition;
var offset = [0,0];
var div;
var isDown = false;

onMounted(() => {

const div = document.getElementById("chartLocal") as HTMLDivElement

div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);
});

</script>

<template>
  <div class="container" id="chartLocal" >
    
    <div class="chart">
      <span class="spanDashboard">Dashboard</span>
      <GChart
        type="PieChart"
        :data=contratoStore.getChartGeneral
        :options= "{
          title: 'Componentes x tipo',
          width:250,
          height: 150,
        }"
      />
      <GChart
        type="PieChart"
        :data=contratoStore.getChartEstados
        :options= "{
          title: 'Hallazgos x Estados',
          width:250,
          height: 150,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {
    // GChart
  }
}
</script>


<style lang="css" scoped>
.container {
  background-color: rgba(100,100,100,0.8);
    display: grid;
    position: fixed;
    bottom: 0;
    right: 0px;
    z-index: 200;
    margin: 0 70px 10px;
    border-radius: 15px;
    color: white;
    padding: 10px;
    height: fit-content;
    width: fit-content;
}
.chart {
  display: flex;
}
.spanDashboard {
  writing-mode: vertical-rl;
}
</style>