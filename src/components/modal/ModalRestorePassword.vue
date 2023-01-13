<script setup lang="ts">
  import { ref } from "vue"
  import { useUserStore } from "../../stores/UserStore"
  import { useContratoStore } from "../../stores/ContratoStore";
  import { useField, useForm } from 'vee-validate'
  import { object, string } from 'yup'
  
  const props = defineProps<{
    email
  }>()

  const userStore = useUserStore()
  const contratoStore = useContratoStore()

  const validationSchema = object({
  password: string()
    .required('El password es requerido')
    .min(8, 'Password muy corto, se adminten almenos 8 caracteres.')
    .matches(/^[\w\x2A\x2E\x2D]{1,}\w+[\x2A\x2E\x2D]+$/, "Se adminten numeros/letras y almenos un: * . -")
  })

  const { handleSubmit, errors } = useForm({
    validationSchema
  })

  const { value: password } = useField('password')

  const onSubmitPWD = handleSubmit(async values => {
    let a1 = document.getElementById("codigo1").value
    let b2 = document.getElementById("codigo2").value
    let c3 = document.getElementById("codigo3").value
    let d4 = document.getElementById("codigo4").value
    let e5 = document.getElementById("codigo5").value
    let f6 = document.getElementById("codigo6").value

    let codigo = a1 + b2 + c3 + d4 + e5 + f6

    const newPassword = {
        email: props.email,
        password: values.password,
        code: codigo
      }

    contratoStore.msgSpinner = "Asignando password..."
    contratoStore.showSpinner = true;

    let result = await userStore.setNewPassword(newPassword)

    const inputs = document.getElementsByClassName("casillaPWD") as HTMLCollection

    for(let item of inputs){
      item.value = ""
    }

    if(result === "CODIGONOCORRESPONDE"){
      contratoStore.msgSpinner = "Codigo no corresonde!"
      window.setTimeout(() => {
          contratoStore.showSpinner = false;
        }, 1000)
    }else{
      if(result === "EXITOSO") {
        contratoStore.msgSpinner = "Cambio exitoso."
        window.setTimeout(() => {
          contratoStore.showSpinner = false;
          userStore.showRestorePassword = false
        }, 1000)
      }else{
        contratoStore.msgSpinner = "Se ha producido un error."
        window.setTimeout(() => {
          contratoStore.showSpinner = false;
          userStore.showRestorePassword = false
        }, 1000)
      }
    }
  })

  var showMessage = ref("")

  function clickInputPWD(event) {
    event.target.value = ""
  }
  function changeInputPWD(event) {
    const nextInput = event.target.nextElementSibling
    nextInput?.focus()
  }
  function  borrarInputPWD() {
    const inputs = document.getElementsByClassName("casillaPWD") as HTMLCollection

    for(let item of inputs){
      item.value = ""
    }
  }
  function cancelChangePassword(){
    userStore.showRestorePassword = false
  }
  async function confirmar() {


  }
  function showPassword(event: any) {
    var inputPassword = document.getElementById("passwordRestore") as HTMLInputElement ;

    if(inputPassword.children[1].type === "password"){
      inputPassword.children[1].type = "text"
    }else{
      inputPassword.children[1].type = "password";
    }
  }
</script>

<template>
  <div class="container-password">
    <h3 class="inputs">Recupera tu contraseña</h3>
    <span class="leyendas">Ingresa el código que hemos enviado
    a tu correo y tu nueva contraseña.</span>
    <div class="inputs">
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo1" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
        autofocus
      />
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo2" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
      />
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo3" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
      />
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo4" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
      />
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo5" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
      />
      <input class="casillaPWD" type="text" size="1" maxlength="1" id="codigo6" 
        @click="clickInputPWD" 
        @input="changeInputPWD"
        value=""
      />
      <fa icon="fa-trash-can" class="trashCanPWD" @click="borrarInputPWD" />
      <br/>
      <fieldset class="fieldset">
        <fa icon="fa-eye" class="iconEye" @click="showPassword" onmouseover="cursor: pointer" />
        <BaseInput 
          id="passwordRestore"
          label="Password"
          type="password"
          v-model="password"
          :error="errors.password"
        />
      </fieldset>
    </div>
    
    <MySpinner v-show="contratoStore.getShowSpinner" :message-spinner="contratoStore.getMsgSpinner" />

    <div class="botonesPWD">
      <button type="button" value="Confirmar" class="buttonConfirmarPWD" @click="onSubmitPWD" >Asignar nueva contraseña <fa icon="fa-check" /></button>
      <button type="button" value="Confirmar" class="buttonConfirmarPWD buttonCancelarPWD" @click="cancelChangePassword">Cancelar <fa icon="fa-rectangle-xmark" /></button>
      <br><span>{{  showMessage  }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fieldset {
  display: flex;
    position: relative;
    text-align: start;
    padding: 10px;
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
.buttonCancelarPWD {
  background-color: #a6dd08 !important;
}
.leyendas {
  font-size: small;
  justify-self: center;
  padding: 5px;
}
.trashCanPWD {
  color: #a6dd08;
  bottom: -16px;
  position: relative;
  left: 5px;
}
.botonesPWD {
  justify-self: center;
}
.buttonConfirmarPWD {
  background-color: rgb(233, 240, 240);
  border-radius: 15px;
  padding: 3px  30px;
  margin: 15px  0 0 0;
  justify-self: center;
  box-shadow: rgba(228, 225, 225, 0.16) 0px 2px 4px, rgb(232, 226, 226) 0px 0px 0px 1px;
  margin: 10px;
}
.casillaPWD {
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
.container-password {
  background-color: rgb(34, 43, 112);
  border-radius: 15px;
  display: grid;
  position: fixed;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: fit-content;
  width: fit-content;
  padding: 10px;
  bottom: 0px;
  box-shadow: rgb(202 190 190 / 16%) 0px 1px 4px, rgb(222 216 216) 0px 0px 0px 3px;
  z-index: 400;
  color: white;
  top: 50%; right: 50%;
  transform: translate(50%,-50%);
  margin-bottom: 100px;
}
</style>