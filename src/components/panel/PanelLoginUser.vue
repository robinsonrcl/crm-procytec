<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string} from 'yup'
import { useUserStore } from "../../stores/UserStore"
import { useContratoStore } from "../../stores/ContratoStore";
import router from '../../router';

const userStore = useUserStore()
const contratoStore = useContratoStore()

const validationSchema = object({
  username: string().email('Por favor ingrese un username valido (email)').required('El username es requerido'),
  password: string()
    .required('El password es requerido')
    .min(8, 'Password muy corto, se adminten almenos 8 caracteres.')
    .matches(/^[\w\x2A\x2E\x2D]{1,}\w+[\x2A\x2E\x2D]+$/, "Recuerda: Números/Letras y un caracter espcial")
})

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: username, errorMessage: usernameError, handleChange } = useField('username')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async values => {
  if(await userStore.login(values.username, values.password)){
    userStore.readUser(values.username)
    userStore.showPanelUser = true
    router.push('/crm')
  }
})

async function restorePassword() {
  contratoStore.msgSpinner = " Un momento por favor...";
  contratoStore.showSpinner = true;

  const rpt = await userStore.sendCodeRestorePassword(username.value)

  contratoStore.showSpinner = false

  if(rpt != "Not Found"){
    userStore.showRestorePassword = true
  }else{
    contratoStore.msgSpinner = " Por favor ingrese un email valido.";
    contratoStore.showSpinner = true;

    window.setTimeout(function () {
      contratoStore.showSpinner = false;
    }, 1000);
  }
}

</script>
<template>
  
  <div class="container">
  <ModalRestorePassword v-show="userStore.getShowRestorePassword" :email="username" />
  <form class="form" @submit="onSubmit" >
    <hr style="margin:3px 3px 10px">
    <div style="text-align: left">
      <BaseInput 
        id="username"
        label="Username"
        type="email"
        :error="usernameError"
        :modelValue="username"
        @change="handleChange"
      />
    </div>
    <div style="text-align: left">
      <BaseInput 
        id="password"
        label="Password"
        type="password"
        :v-model="password"
        v-model="password"
        :error="errors.password"
      />
    </div>
    <hr>
    <div class="divRecordar">
      <input type="button" class="recondarPassword" @click="restorePassword" value="Olvido el password?"/>
    </div>
    <MySpinner v-show="contratoStore.getShowSpinner" :message-spinner="contratoStore.getMsgSpinner" />
    <div class="buttons-register">
          <BaseButton
            type="submit"
            class="buttonRegister"
            something="else"
            @click="onSubmit"
            >
            LOGIN
          </BaseButton>
        </div>
  </form>
  
  </div>
  
</template>

<style lang="css" scoped>
.divRecordar {
  text-align: left;
  font-size: smaller;
  padding-bottom: 10px;
}
.recondarPassword {
  color:white;
  background-color: transparent;
  border:none;
  padding: 0px;
}
.container {
  z-index: 300;
    position:initial;
    display: flow-root;
    background: var(--bcolor);
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    /* width: auto; */
    color: white
}
.buttonRegister  {
  background-color: rgb(235 235 224 / 90%);
    border-radius: 5px;
    border-bottom-style: double;
    margin-right: 5px;
    padding: 5px 25px;
    width: -webkit-fill-available;
}
</style>