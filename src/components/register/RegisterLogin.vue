<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore";
import { useUserStore } from "../../stores/UserStore"
import { ref, onMounted, onUpdated, onActivated, onDeactivated, getCurrentInstance } from 'vue'
import BaseInput from '../ReusableComponents/BaseInput.vue';
import BaseCheckbox from "../ReusableComponents/BaseCheckbox.vue";
import { useField, useForm } from 'vee-validate'
import { object, string, bool } from 'yup'
import { getImage } from '../../utils/utilidades';
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const contratoStore = useContratoStore()
const login = ref(true)
const register = ref(false)
const selectedTab = ref("login")

//var msgEmailDuplicado = ref(userStore.getMsgEmailDuplicado)
var { msgEmailDuplicado } =  storeToRefs(userStore)

const internalInstance = getCurrentInstance();

onActivated(() => {
    console.log("Register Login: FALSE " + internalInstance?.isDeactivated) // false
})

onDeactivated(() => {
  console.log("Register Login: TRUE " + internalInstance?.isDeactivated) // true
})

const validationSchema = object({
  name: string().required('Nombres y apellidos son requeridos'),
  email: string().email('Por favor ingrese un email valido').required('El email es requerido'),
  phone: string()
    .required('Un número celular es requerido')
    .matches(/^[(][+][0-9]{2}[)][ ][0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Número incompleto"),
  password: string()
    .required('El password es requerido')
    .min(8, 'Password muy corto, se adminten almenos 8 caracteres.')
    .matches(/^[\w\x2A\x2E\x2D]{1,}\w+[\x2A\x2E\x2D]+$/, "Se adminten numeros/letras y almenos un: * . -"),
  terminosdelservicio: bool().oneOf([true], 'Debe aceptar los términos del servicio')
    .required('Debe aceptar los terminos del servicio')
})

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: name } = useField('name')
const { value: email, errorMessage: emailError, handleChange } = useField('email')
const { value: phone } = useField('phone')
const { value: password } = useField('password')
const { value: terminosdelservicio } = useField('terminosdelservicio')

const onSubmit = handleSubmit(values => {
  document.getElementById('registrarme').disabled = true
  userStore.save(values)
})

var user = ref(userStore.getUser)

function registerUser() {
  contratoStore.setMessage("Usuario registrado", 3000);
}

function cancelRegister() {
  // contratoStore.setShowRegister(false)
}

function showPassword(event: any) {
  var inputPassword = document.getElementById("password");

  if(inputPassword.children[1].type === "password"){
    inputPassword.children[1].type = "text"
  }else{
    inputPassword.children[1].type = "password";
  }
}

async function handleEmail(event) {
  const validarEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  const result = validarEmail.test(event.target.value)

  if(result){
    let respuesta = await userStore.validarEmail(event.target.value)
    if(respuesta === "CONFIRMADO"){
      userStore.msgEmailDuplicado = 'Email ya registrado!'
    }else{
      userStore.msgEmailDuplicado = ""
      if(respuesta === "NOCONFIRMADO"){
        userStore.msgEmailDuplicado = "Pendiente Confirmar..."
        userStore.emailWithoutRegister = String(email.value)
        userStore.enviarCode(event.target.value)
        userStore.showValidarRegistro = true
      }
    }
  }
}

</script>
<template>
    <div class="container-register" id="container1">
      <div class="container-title">
        <label class="title" 
          :class="{ activeTab: selectedTab === 'registro' } "
          @click="register = true; login = false; selectedTab = 'registro' ">
          Registro
        </label>
        <label class="title" 
          :class="{ activeTab: selectedTab === 'login' } "
          @click="login = true; register = false; selectedTab = 'login' ">
          Login
        </label>
      </div>
      <div class="container-logo">
        <img :src="getImage('/images/','logoProcyteccrm.svg')" class="logo" />
      </div>
      <!-- <div>No he confirmado mi cuenta!</div> -->
      <div v-if="login" class="divLogin">
        <PanelLoginUser />
      </div>
      <div v-if="register">
        <form class="form" @submit="onSubmit" >
        <fieldset>
           <!-- <legend>Datos basicos</legend> -->
           <BaseInput 
             label="Nombres y apellidos"
             type="text"
             v-model="name"
             :error="errors.name"
             onkeyup="this.value = this.value.toUpperCase()"
             size="30"
           />
          <BaseInput 
            size="30"
            id="email"
            label="Email"
            type="email"
            :error="emailError"
            :modelValue="email"
            @change="handleChange"
            @blur="handleEmail"
          />
          <span>{{ msgEmailDuplicado }}</span>
          <BaseInputTel
            label="Celular"
            type="text"
            v-model="phone"
            :error="errors.phone"
          />
          <fa icon="fa-eye" class="iconEye" @click="showPassword" onmouseover="cursor: pointer" />
          <BaseInput 
            id="password"
            label="Password"
            type="password"
            v-model="password"
            :error="errors.password"
          />
        </fieldset>
        <div class="terminos">
          <BaseCheckbox
            v-model="terminosdelservicio"
            :error="errors.terminosdelservicio"
            label="Acepto los terminos del servicio"
          />
        </div>
        <MySpinner v-show="contratoStore.getShowSpinner" :message-spinner="contratoStore.getMsgSpinner" />
        <div class="buttons-register">
          <BaseButton
            id="registrarme"
            type="submit"
            class="buttonRegister"
            something="else"
            @click="onSubmit"
            >
            <fa icon="fa-user-plus" /> Registrarme
          </BaseButton>
          <button type="button" class="buttonCancel" @click.prevent="cancelRegister">
            <fa icon="fa-rectangle-xmark" /> Cancelar
          </button>
        </div>
      </form>
      </div>
    </div>
</template>

<style lang="css" scoped>
.divLogin {
  display: flex;
  height: fit-content;
}
.iconEye {
  display: inline-flex;
  position: absolute;
  left: 107px;
  color: rgb(255, 255, 255);
  top: auto;
  padding: 6px 0 0 0;
  z-index: 10;
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
  /* padding:10px; */
}
.container-title {
  display: inline-flex;
  height: fit-content;
}
.container-logo {
  display: inline-flex;
  height: fit-content;
}
.title {
  padding: 6px;
  background-color: #6e6e83;
  margin: 7px;
  border-radius: 5px;
  width: -webkit-fill-available;
  border-bottom-style: ridge;
  cursor: pointer;
}
.activeTab {
  background: var(--bcolor);
}
.imgRegister {
  align-self: center;
    justify-self: end;
    border-radius: 15px;
}
.container-ppal-register {
  z-index: 160;
  /* background-color: white; */
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: min-content;
  border-radius: 26px;
}
.container-register {
  background-color: rgb(204 200 255 / 61%);
    display: grid;
    z-index: 160;
    width: -webkit-fit-content;
    /* height: 80%; */
    border-radius: 15px;
    box-shadow: green;
    position: absolute;
    top: 10%;
    left: 0px;
    right: 0px;
    /* bottom: 0px; */
    margin: auto;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    color: white;
    /* height: max-content; */
    padding: 15px;
}

@media screen and (max-width: 1300px) {
  .container-register {
    height: 90%;
  }
}

fieldset {
  background: var(--bcolor);
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

.logo {
  width: 200px;
  display: flex;
  height: fit-content;
}
</style>

