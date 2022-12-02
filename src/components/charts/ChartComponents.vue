<template>
  <div class="divCharts"> 
    <div><PieChart :chartData="testData" class="gChart" :options="options" width="250" height="150"/></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PieChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: 'ChartComponts',
  components: { PieChart },
  setup() {
    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'left',
        },
        title: {
          display: true,
          text: 'Componentes x Estructura',
        },
      },
    });

    return { testData, options };
  },
});
</script>

<style lang="css">
.gChart {
  /* background-color: rgb(255, 255, 255); */
    /* display: grid !important; */
    position: fixed !important;
    bottom: 0;
    left: 0px;
    z-index: 200;
    margin: 0 70px 10px;
    border-radius: 15px;
    /* color: rgb(0, 0, 0) !important; */
    padding: 10px;
    /* height: fit-content !important;
    width: fit-content !important; */
    background-color: white;
}
.divCharts {
  display:inline;
}
</style>