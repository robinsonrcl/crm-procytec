<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useUserStore } from "../../stores/UserStore"
import { useContratoStore } from "../../stores/ContratoStore";
import { RouterLink } from "vue-router";

const userStore = useUserStore()
const contratoStore = useContratoStore()

var remainingTime = ref(4)
var showResend = ref(true)
var showMessage = ref("")

function showRemaining() {
  var intervalId = setInterval(function() {
    remainingTime.value =  remainingTime.value - 1
    if(remainingTime.value <= 0){
      clearInterval(intervalId)
      showResend.value = false
    }
  }, 60000)
}

function resendCode() {
  showResend.value = true
  userStore.resendCode()
  remainingTime.value = 4
  showRemaining()
}

onMounted(() => {
  showRemaining()  
})

onUnmounted(() => {
  remainingTime.value = 5
}),

function clickInput(event) {
  event.target.value = ""
}
function changeInput(event) {
  const nextInput = event.target.nextElementSibling
  nextInput?.focus()
}
function  borrarInput() {
  const inputs = document.getElementsByClassName("casilla") as HTMLCollection

  for(let item of inputs){
    item.value = ""
  }
}

function cancelarConfirmarRegistro(){
  showMessage.value="Confirma en otro momento, Sin esto tu servicio estará limitado."  
  setTimeout(() => {
    showMessage.value=""
    userStore.showValidarRegistro = false
  }, 3000);
}
function confirmar() {
  let a = document.getElementById("codigoa").value
  let b = document.getElementById("codigob").value
  let c = document.getElementById("codigoc").value
  let d = document.getElementById("codigod").value
  let e = document.getElementById("codigoe").value
  let f = document.getElementById("codigof").value

  let codigo = a + b + c + d + e + f

  let result = userStore.confirmRegister(codigo)

  const inputs = document.getElementsByClassName("casilla") as HTMLCollection

  for(let item of inputs){
    item.value = ""
  }

  if(result){
    userStore.login("", "")
    userStore.showPanelUser = true
    userStore.showValidarRegistro = false
    contratoStore.showRegister = false;

    RouterLink
  }

}
</script>

<template>
  <div class="container">
    <h3 class="inputs">Confirma tu registro</h3>
    <span class="leyendas">Ingresa el código que hemos enviado
    a tu correo y celular (SMS)</span>
    <div class="inputs">
      <input class="casilla" type="text" size="1" maxlength="1" id="codigoa" 
        @click="clickInput" 
        @input="changeInput"
        autofocus
      />
      <input class="casilla" type="text" size="1" maxlength="1" id="codigob" 
        @click="clickInput" 
        @input="changeInput"
      />
      <input class="casilla" type="text" size="1" maxlength="1" id="codigoc" 
        @click="clickInput" 
        @input="changeInput"
      />
      <input class="casilla" type="text" size="1" maxlength="1" id="codigod" 
        @click="clickInput" 
        @input="changeInput"
      />
      <input class="casilla" type="text" size="1" maxlength="1" id="codigoe" 
        @click="clickInput" 
        @input="changeInput"
      />
      <input class="casilla" type="text" size="1" maxlength="1" id="codigof" 
        @click="clickInput" 
        @input="changeInput"
      />
      <fa icon="fa-trash-can" class="trashCan" @click="borrarInput" />
    </div>
    <span class="leyendas">Tienes {{ remainingTime }} minutos para confirmar tu registro.</span>
    <button class="leyendas resend" :disabled="showResend" @click="resendCode">Reenviar código</button>
    <MySpinner v-show="contratoStore.getShowSpinner" :message-spinner="contratoStore.getMsgSpinner" />

    <div class="botones">
      <button type="button" value="Confirmar" class="buttonConfirmar" @click="confirmar" >Confirmar <fa icon="fa-check" /></button>
      <button type="button" value="Confirmar" class="buttonConfirmar buttonCancelar" @click="cancelarConfirmarRegistro">Cancelar <fa icon="fa-rectangle-xmark" /></button>
      <br><span>{{  showMessage  }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.buttonCancelar {
  background-color: #a6dd08 !important;
}
.leyendas {
  font-size: small;
  justify-self: center;
  padding: 5px;
}
.resend {
  border-radius: 5px;
    background: #ddddd1;
    padding: 0px 10px 0px 10px;
}
.trashCan {
  color: #a6dd08;
  bottom: -16px;
  position: relative;
  left: 5px;
}
.botones {
  justify-self: center;
}
.buttonConfirmar {
  background-color: rgb(233, 240, 240);
  border-radius: 15px;
  padding: 3px  30px;
  margin: 15px  0 0 0;
  justify-self: center;
  box-shadow: rgba(228, 225, 225, 0.16) 0px 2px 4px, rgb(232, 226, 226) 0px 0px 0px 1px;
  margin: 10px;
}
.casilla {
  border-radius: 5px;
  padding: 2px 4px 0px 4px;
  text-align: center;
  font-size: x-large;
  font-weight: 700;
  color:rgb(7, 180, 82)
}
.inputs {
  justify-self: center;
}
.container {
  background-color: rgb(34, 43, 112);
  border-radius: 15px;
  display: grid;
  position: absolute;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  bottom: 0px;
  box-shadow: rgb(202 190 190 / 16%) 0px 1px 4px, rgb(222 216 216) 0px 0px 0px 3px;
  z-index: 200;
  color: white;
  /* top: 0px; */
  left: 0px;
  right: 0px;
  margin-bottom: 100px;
}
</style>