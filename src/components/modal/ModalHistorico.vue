<script setup lang="ts">
import { onMounted } from "vue";
import GridHallazgo from "./GridHallazgo.vue"
import { useContratoStore } from "../../stores/ContratoStore.js";

const contratoStore = useContratoStore()

const props = defineProps<{
    hallazgos: []
}>()

const emit = defineEmits<{
    (e: 'showModal', value: Boolean): void
}>()

function cerrarModal() {
    emit("showModal", false)
}

var mousePosition;
var offset = [0,0];
var div;
var isDown = false;

onMounted(() => {

const div = document.getElementById("patologia") as HTMLDivElement

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
})

</script>
<template>
    <div id="patologia" className="container-historico">
        <div className="hist-item hist-item-title"><p>PATOLOGIA</p>
            <!-- <div className="modalIconCerrarHistorico" @click.prevent="cerrarModal"><fa icon="close" size="2x"/></div> -->
        </div>
        <div v-for="hallazgo in contratoStore.getPatologia" :key="hallazgo.id">
            <GridHallazgo v-bind:hallazgo="hallazgo" />    
        </div>
    </div>
</template>

<style lang="css" scoped>
.container-historico {
  position: absolute;
  z-index: 160;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  top: 0px;
  background-color: var(--bcolor);
  border-radius: 15px 15px 15px 15px;
  width: 28%;
  padding: 5px;
  opacity: 1;
  padding: 0px 0px 10px 0px;
  height: 80%;
  right: 0px;
  align-content: start;
  min-width: min-content;
  max-width: fit-content;
  overflow: scroll;
}
.hist-item {
  display: grid;
  justify-content: start;
  align-items: center;
  padding: 2px;
  font-size: 12px;
  color: #ffffff;
}
.container-historico p {
  margin: 0;
}
.hist-item p {
  text-align: center;
}
.hist-item-title {
  /* height: 20px; */
  align-content: center;
  justify-content: center;
  font-weight: bold;
  background-color: var(--bcolor);
  border-radius: 15px 15px 0px 0px;
  position: sticky;
  top: 0;
  display: inline-flex;
  gap: 20px;
}
</style>