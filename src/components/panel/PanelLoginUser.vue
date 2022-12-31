<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string} from 'yup'
import { useUserStore } from "../../stores/UserStore"
import { useContratoStore } from "../../stores/ContratoStore";

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
  // userStore.user.username = values.username
  // userStore.user.password = values.password

  if(await userStore.login(values.username, values.password)){
    userStore.readUser(values.username)
    userStore.showLogin = false
  }
})

</script>
<template>
  <div class="container">
  <div class="mb-4">
    <img class="iconoBitacora" src="../../assets/images/iconoBitacora.svg" alt="">
  </div>
  <form class="form" @submit="onSubmit" >
    <hr style="margin:3px">
    <div>LOGIN</div>
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
      <input type="button" class="recondarPassword" @click="onSubmit" value="Olvido el password?"/>
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
    position: absolute;
    display: grid;
    background: var(--bcolor);
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    width: auto;
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