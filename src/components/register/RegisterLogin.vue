<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { getImage } from "../../utils/utilidades";
import { ref } from 'vue'
import BaseInput from '../ReusableComponents/BaseInput.vue';
import BaseSelect from "../ReusableComponents/BaseSelect.vue";
import BaseCheckbox from "../ReusableComponents/BaseCheckbox.vue";

const contratoStore = useContratoStore()

var user = ref(contratoStore.getUser)

const roles = ['Docente','Ing. Hidraulico','Administrativo', 'Personal AMVA']
const terminosdelservicio = ref(false);
const emailing = ref(0);
const emailingGroup = ref([
                        { label: 'UNAL', value: 0},
                        { label: 'AMVA', value: 1},
                        { label: 'Metro de Medellín', value: 2}
                      ]);

function registerUser() {
  contratoStore.setMessage("Usuario registrado", 3000);
}

function cancelRegister() {
  contratoStore.setShowRegister(false)
}

</script>
<template>
  <div class="container-ppal-register">
    <img class="imgRegister" :src="getImage('/images/','rio.png')" />
  
    <div class="container-register">
      <div class="container-title">
        <label class="title">Registro</label>
        <label class="title">Login</label>
      </div>
      <form class="form" @submit.prevent="registerUser">
      <fieldset>
        <legend>Datos basicos</legend>
        <BaseInput 
          :v-model="user.name"
          label="Nombres"
          type="text"
        />
        <BaseInput 
          :v-model="user.username"
          label="Username"
          type="text"
        />
        <BaseInput 
          :v-model="user.email"
          label="Email"
          type="email"
        />
        <BaseInput 
          :v-model="user.password"
          label="Password"
          type="password"
        />
      </fieldset>
      <fieldset>
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
      </fieldset>
        <div>
          <BaseCheckbox
            v-model="terminosdelservicio"
            label="Terminos del servicio"
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
.buttons-register {
  padding: 25px 0 0 0;
  text-align: center;
}
.buttonCancel {
  background-color: rgb(229, 166, 166);
  border-radius: 5px;
  border-bottom-style: double;
}
.buttonRegister  {
  background-color: var(--bcolor);
  border-radius: 5px;
  border-bottom-style: double;
  color: white;
  margin-right: 5px;
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
    background-color: #666797;
    margin: 7px;
    border-radius: 5px;
    width: -webkit-fill-available;
    border-bottom-style: ridge;
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
    padding: 20px;
}
fieldset {
  background-color: #b9b6d6;
    border-radius: 10px;
    padding: 5px;
    margin: 10px 0 0 0;
}

legend {
  /* background-color: rgb(133, 75, 205); */
  color: rgb(75, 63, 63);
  font-weight: 500;
  padding: 5px 10px;
  font-size: medium;
}
</style>