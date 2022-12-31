<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useUserStore } from "../../stores/UserStore"
import { useContratoStore } from "../../stores/ContratoStore";
import { useField, useForm } from 'vee-validate'
import { object, string,  bool } from 'yup'
import { storeToRefs } from "pinia";

const file = ref<File | null>()
const userStore = useUserStore()
const contratoStore = useContratoStore()

var { user } = storeToRefs(userStore)

const validationSchema = object({
  name: string().required('Nombres y apellidos son requeridos'),
  twitterURL: string().required('Usuario de twitter es requerido'),
  rol: string().required('Se require un rol para el usuario'),
  terminosdelservicio: bool().oneOf([true], 'Debe aceptar los términos del servicio'),
  phone: string()
    .required('Un número celular es requerido')
    .matches(/^[(][+][0-9]{2}[)][ ][0-9]{3}-[0-9]{3}-[0-9]{4}$/, 
    "Número incompleto"),
  birthday: string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Selecciona una fecha'),
  telefonofijo: string(),

  gustos: string(),
  direccioncasa: string()
})

const { handleSubmit, errors } = useForm({
  validationSchema
})

const { value: name } = useField('name')
const { value: twitterURL } = useField('twitterURL')
const { value: rol } = useField('rol')
const { value: terminosdelservicio } = useField('terminosdelservicio')
const { value: phone } = useField('phone')
const { value: birthday } = useField('birthday')
const { value: gustos } = useField('gustos')
const { value: direccioncasa } = useField('direccioncasa')
const { value: telefonofijo } = useField('telefonofijo')

const phone2 = user.value.phonecountry + ' ' +  user.value.phone

name.value = user.value.name
twitterURL.value = user.value.twitterURL
rol.value = user.value.rol
terminosdelservicio.value  = user.value.terminosdelservicio
phone.value = phone2
birthday.value = user.value.birthday
gustos.value = user.value.gustos
direccioncasa.value = user.value.address
telefonofijo.value = user.value.landline

watchEffect(() => {
  const phone2 = user.value.phonecountry + ' ' +  user.value.phone
  name.value = user.value.name
  phone.value = phone2 //userStore.user.phone
  twitterURL.value = user.value.twitterURL
  birthday.value = user.value.birthday
  rol.value = user.value.rol
  gustos.value = user.value.gustos
  direccioncasa.value = user.value.address
  telefonofijo.value = user.value.landline
  terminosdelservicio.value = user.value.terminosdelservicio
})
    
function descartar() {
  userStore.showPanelUser = false
}
const onSubmit = handleSubmit(values => {
  userStore.updateUser(values)
})

function validate(event, tecla) {
  const len = event.target.value.length;
  var prevVal = event.target.value;
  const largoTotal = event.target.value.length

  const regexp = new RegExp('[A-Z]','gi');
  const result = prevVal.match(regexp);
  
  if(result?.length > 0){
    errors.value.birthday = "Solo se adminten números"
    event.target.value = prevVal.substring(0, prevVal.length-1)
    setTimeout(function() {
      errors.value.birthday = ""
    }, 1500)
    return;
  }

  if(largoTotal >= 13){
    prevVal = prevVal.substring(0,prevVal.length - 1);
  }else{
    switch (len) {
      case  3:
        prevVal = event.target.value + "-";
        break;
      case 7:
        prevVal = event.target.value + "-";
        break;
      default:
      break;
    }
  }
  
  event.target.value = prevVal;
}
function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement
  if (target && target.files)
    file.value = target.files[0]
}
async function saveImage() {
  if (file.value) {
    try {
      const fileload = new FormData()

      fileload.append('file', file.value)
      fileload.append('idUser', user.value.id)

      userStore.loadFile(fileload)
        .then((value) => {
          const urlFile: string = value
          // eslint-disable-next-line vue/no-mutating-props
          props.rubrica.urlFile = urlFile
        })
    }
    catch (error) {
      console.error(error)
      file.value = null
    }
    finally {
      messageAlert.value = 'Archivo cargado exitosamente!'
      showAlert.value = true
      setTimeout(() => showAlert.value = false, 3000)
    }
  }
}
</script>

<template>
  <form class="form" @submit="onSubmit" >
  <div class="container">
  <div class="subcontainer">
    <div class="container-item photo">
      <div>
        <img src="images/Robinson.jpeg" class="profilePicture" />
      </div>
      <div class="fileUpload">
        <input
          type="file"
          accept="image/*"
          capture
          style="width:250px;"
          @change="onFileChanged($event)"
        />
        <div
          style="font-size:x-large;" 
          @click.prevent="saveImage()" 
        ><fa icon="fa-file-arrow-up" /></div>
      </div>
    </div>
    <div class="container-item">
      <div class="subtitulos">Datos adicionales</div>
      <div>
        <label style="font-size: smaller;">Fecha nacimiento</label><br>
        <input 
          type="date"
          v-model="birthday"
          pattern="\d{4}-\d{2}-\d{2}"
        />
        <p>{{  errors.birthday }}</p>
      </div>
      <div>
      <label style="font-size: smaller;">Gustos (separar con coma)</label><br>
        <textarea
          type="textarea"
          placeholder="Gustos"
          v-model="gustos"
          onkeyup="this.value = this.value.toUpperCase()"
          size="30"
        />
      </div>
      <div>
        <BaseInput
          label="Dirección residencia"
          type="text"
          v-model="direccioncasa"
          :error="errors.direccioncasa"
          onkeyup="this.value = this.value.toUpperCase()"
          size="30"
        />
      </div>
      
      <div>
        <BaseInput
          label="Teléfono fijo"
          type="text"
          v-model="telefonofijo"
          :error="errors.telefonofijo"
          @input="validate($event, 'normal')"
          size="30"
        />
      </div>
      <hr>
    </div>
    <div class="container-item">
      <div class="name">
        <BaseInput
          label="Nombres y apellidos"
          type="text"
          v-model="name"
          :error="errors.name"
          onkeyup="this.value = this.value.toUpperCase()"
          size="30"
        />
      </div>
      <br>
      <div class="datosbasicos">
        <div class="subtitulos">Datos básicos</div>
        <div class="div-username">
          Username:<br><span class="username">{{ user?.username }}</span>
        </div>
        <div>
          <BaseInput
            label="Celular (+##) ###-###-####"
            v-model="phone"
            :error="errors.phone"
          />
        </div>
        <div>
          <BaseInput
             label="Twitter"
             type="text"
             v-model="twitterURL"
             :error="errors.twitterURL"
             size="30"
           />
        </div>
        <div>
          <BaseInput
             label="Rol"
             type="text"
             v-model="rol"
             :error="errors.rol"
             size="30"
           />
        </div>
        <div>
          <BaseCheckbox  
            v-model="terminosdelservicio"
            label="Terminos del servicio"
            :error="errors.terminosdelservicio"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="container-item">
      <div class="datosEmpresa">
        <div class="subtitulos">Datos de empresa</div>
        <div>Empresa:</div>
        <div>Dirección:</div>
        <div>Contacto:</div>
        <div>Teléfono:</div>
        <img src="images/company.png" class="imageCompany" />
      </div>
    </div>
    <div class="container-item" style="padding-top: 10px;">.</div>
    
  </div>
  <div class="positionButtons">
    <MySpinner v-show="contratoStore.getShowSpinner" :message-spinner="contratoStore.getMsgSpinner" />
      <div class="subtitulos botones">
        <button class="updatePerfil" @click="onSubmit">Actualizar</button>
        <button class="updatePerfil" @click="descartar">Descartar</button>
      </div>
    </div>
  </div>
  
  </form>
</template>

<style lang="css" scoped>
.fileUpload {
  display: -webkit-inline-box;
    padding: 0 15px 0 15px;
    -webkit-box-align: center;
    font-size: smaller;
    border-style: groove;
    margin-top: 10px;
}
.botones {
  padding: 10px;
}
.close {
  position: absolute;
  display: inline-flex;
  top:100px;
  width: 25px;
  z-index: 400;
}
.div-username {
  border: 1px;
  background-color: rgb(213, 201, 242);
  border-radius: 5px;
  padding: 5px;
  margin: 5px 10px 0 0;
}
.username {
  font-weight: 600;
}
.imageCompany {
  width: 110px;
  object-fit:contain;
}
.datosEmpresa {
  text-align: left;
}
.updatePerfil {
  border-radius: 15px;
  background-color: transparent;
  padding: 2px 35px;
  margin: 0 10px 0 10px;
  border-style: solid;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px, rgba(0, 0, 0, 0.12) 0px -2px 3px, rgba(0, 0, 0, 0.12) 0px 2px 3px, rgba(0, 0, 0, 0.17) 0px 2px 3px, rgba(0, 0, 0, 0.09) 0px -3px 3px;
}
.name {
  font-weight: 700;
  padding: 10px 0px 0px 0px;
}
.datosbasicos {
  text-align: left;
}
.subtitulos {
  font-size: smaller;
  color: blue;
  font-weight: 600;
}
.container-item:nth-child(2) {
  align-self: start;
  text-align: left;
  width: -webkit-fill-available;
}
.container-item:nth-child(3) {
  width: -webkit-fill-available;
}
.container-item:nth-child(4) {
  width: -webkit-fill-available;
  align-self: baseline;
}
.container-item:nth-child(5) {
  width: -webkit-fill-available;
  grid-column: span 2;
}
.profilePicture {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  -webkit-mask-image: url("images/circulo.svg");
  mask-image: url("images/circulo.svg");
  
}
.positionButtons {
  background-color: #ccccdb;
  position: fixed;
  bottom: 0;
  right: 0;
  width: -webkit-fill-available;
}
.subcontainer {
  display:grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  overflow: auto;
  width: min-content;
  height: 100%;
}
.container {
  position: absolute;
  display: grid;
  z-index: 300;
  height: 80%;
  width: min-content;
  left: 0;
  right: 0;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-color: rgb(250, 250, 250);
  border-style: double;
  border-radius: 5px;
  align-content: baseline;
  padding: 20px;
  /* overflow: auto; */
}
.container-item {
  display: grid;
}
</style>