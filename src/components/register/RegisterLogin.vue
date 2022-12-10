<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore";
import { useUserStore } from "../../stores/UserStore"
import { getImage } from "../../utils/utilidades";
import { ref } from 'vue'
import BaseInput from '../ReusableComponents/BaseInput.vue';
import BaseCheckbox from "../ReusableComponents/BaseCheckbox.vue";

const userStore = useUserStore()
const contratoStore = useContratoStore()

var user = ref(userStore.getUser)

function registerUser() {
  contratoStore.setMessage("Usuario registrado", 3000);
}

function cancelRegister() {
  contratoStore.setShowRegister(false)
}

function validatePhone(event) {
  if(event.target.value.length != 15){
    contratoStore.setMessage("Por favor revise el número de teléfono", 3000);
    return
  }
  
}

function showPassword(event) {
  var inputPassword = document.getElementById("password");

  if(inputPassword.children[1].type === "password"){
    inputPassword.children[1].type = "text"
  }else{
    inputPassword.children[1].type = "password";
  }
}

</script>
<template>
  <div class="container-ppal-register">
    <img class="imgRegister" :src="getImage('/images/','rio.png')" />
  
    <div class="container-register">
      <div class="container-title">
        <label class="title">Registro</label>
        <label class="title login">Login</label>
      </div>
      <form class="form" @submit.prevent="registerUser">
      <fieldset>
        <!-- <legend>Datos basicos</legend> -->
        <BaseInput 
          :v-model="user.name"
          label="Nombres y apellidos"
          type="text"
        />
        <BaseInput 
          :v-model="user.email"
          label="Email"
          type="email"
        />
        <BaseInputTel
          :v-model="user.phone" 
          label="Celular"
          type="tel"
        />
        <vue-tel-input v-model="phone"></vue-tel-input>
        <BaseInput 
          :v-model="user.password"
          label="Password"
          type="password"
          id="password"
        />
        <fa icon="fa-eye" class="iconEye" @click="showPassword" onmouseover="cursor: pointer" />
      </fieldset>
      <!-- <fieldset>
        <legend>Datos opcionales</legend>
        <BaseSelect
          :options="roles"
          v-model="user.rol"
          label="Seleccione un rol"
        />
        <BaseRadioGroup
          v-model="emailing"
          name="acuerdo"
          :options="emailingGroup"
        />
      </fieldset> -->
        <div class="terminos">
          <BaseCheckbox
            v-model="terminosdelservicio"
            label="Acepto los terminos del servicio"
          />
        </div>
        <div class="buttons-register">
          <button type="submit" class="buttonRegister">
            <fa icon="fa-user-plus" /> Registrarme
          </button>
          <button type="button" class="buttonCancel" @click.prevent="cancelRegister">
            <fa icon="fa-rectangle-xmark" /> Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.iconEye {
  display: flex;
    position: relative;
    top: -35px;
    left: 145px;
    color: black;
}
.phone {
  color: black;
}
.terminos {
  font-size: small;
  padding: 10px 0 0 0;
  text-align: center;
}
.buttons-register {
  padding: 7px 0 0 0;
  text-align: center;
}
.buttonCancel {
  background-color: rgb(229, 166, 166);
  border-radius: 5px;
  border-bottom-style: double;
  padding: 5px;
}
.buttonRegister  {
  background-color: var(--bcolor);
  border-radius: 5px;
  border-bottom-style: double;
  color: white;
  margin-right: 5px;
  padding: 5px;
}
.form {
  text-align: left;
  padding:10px;
}
.container-title {
  display: inline-flex;
  height: fit-content;
}
.title {
  padding: 6px;
  background-color: #474779;
  margin: 7px;
  border-radius: 5px;
  width: -webkit-fill-available;
  border-bottom-style: ridge;
  
}
.login {
  opacity: 0.6;
}
.imgRegister {
  align-self: center;
    justify-self: end;
    border-radius: 15px;
}
.container-ppal-register {
  z-index: 160;
  background-color: white;
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  border-radius: 26px;
}
.container-register {
  background-color: rgb(38 34 98 / 61%);
    display: grid;
    z-index: 160;
    width: 60%;
    height: 80%;
    border-radius: 15px;
    box-shadow: green;
    position: absolute;
    top: 0;
    left: -30px;
    /* right: 0; */
    bottom: 0;
    margin: auto;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    color: white;
    height: fit-content;
    padding: 15px;
}
fieldset {
  background-color: #b9b6d6;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0 0 0;
}

legend {
  /* background-color: rgb(133, 75, 205); */
  color: rgb(75, 63, 63);
  font-weight: 500;
  padding: 5px 10px;
  font-size: medium;
}

div {
  margin-bottom: 10px;
  position: relative;
}

input[type="number"] {
  width: 100px;
}

input + span {
  padding-right: 30px;
}

input:invalid + span::after {
  position: absolute;
  content: "✖";
  padding-left: 5px;
  color: #8b0000;
}

input:valid + span::after {
  position: absolute;
  content: "✓";
  padding-left: 5px;
  color: #009000;
}
</style>