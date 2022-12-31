<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import axios from 'axios';
import { ref } from "vue";
import MySpinner from "../Utilities/MySpinner.vue"
import { setTimeout } from "timers/promises";
const contratoStore = useContratoStore()
  
const showSpinner = ref(false)
const msgSpinner = ref("")
const urlFluvialApi = import.meta.env.VITE_URL_FLUVIALAPI;

async function uploadFile(event) {
  const inputFile = document.getElementById("inputFile") as HTMLInputElement;
  var registros = 0;

  if(inputFile.value.length == 0){
    contratoStore.setMessage("Por favor seleccione un archivo a importar", 3500);
    return
  }

  const target = inputFile.files[0];
  const formData = new FormData();
  formData.append('file', target);
  
  const headers = { 'Content-Type': 'multipart/form-data' };

  msgSpinner.value = "Importando..."
  showSpinner.value = true;

  await axios.post(urlFluvialApi + '/api/loadcsvunal', formData, { headers })
    .then((response) => {
      registros = response.data.rows;
      let msg = "Procesado: " + response.data.filename + " # registros: " + response.data.rows + " Status: OK"
      contratoStore.fill();
      contratoStore.setMessage(msg, 5500);
    })
    .catch((error) => {
      contratoStore.setMessage("ERROR: " + error, 3500);
    })
    .then(() => {
      msgSpinner.value = "Registros importados: " + registros;
      window.setTimeout(function() {
        showSpinner.value = false;
      }, 4000)

      inputFile.value = "";
    });
}
</script>
<template>
  <div class="container">
    <div style="padding:0 0 10px">Seleccione el archivo y haz click en 'Upload' para iniciar la carga</div>
    <div style="text-align: left;">
      <input type="file" id="inputFile" class="buttonLoad">
      <button @click="uploadFile($event)" class="buttonLoad">Upload</button>
    </div>
    <MySpinner v-show="showSpinner" :message-spinner="msgSpinner" />
  </div>
</template>

<style lang="css" scoped>
.buttonLoad {
  font-size: xx-small;
}
.container {
  background-color: rgb(27 40 30 / 90%);
    display: grid;
    position: inherit;
    margin: 0 5px 5px 5px;
    border-radius: 15px;
    color: white;
    padding: 10px;
    height: auto;
    width: fit-content;
    text-align-last: center;
}
</style>