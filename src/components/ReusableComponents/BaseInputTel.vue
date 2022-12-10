<script setup lang="ts">
import { ref } from 'vue';
import { UniqueID } from '../../utils/utilidades'
import paises from '../Utilities/paises'

// const emit = defineEmits(
//   ['update:modelValueSelect']
// )

defineProps({
  label:{
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

var newValue = ref('(+57) ')
var newFlag = ref('🇨🇴')
var valueCode = ref("")
var largoDialCode = ref(0)
var msg = ref("")
var mostrarPaises = ref(Boolean(false))

const uuid = UniqueID().getID().toString

function showPaises() {
  mostrarPaises.value = !mostrarPaises.value;
}

let prevVal = "";
function validate(event, tecla) {
  const len = event.target.value.length;
  prevVal = event.target.value;
  const largoTotal = (len - largoDialCode.value - 1)

  if(largoDialCode.value === 0){
    event.target.value = "";
    msg.value = "Por favor selecciona el país"
    
    setTimeout(function() {
      msg.value = ""
    }, 1500)

    return;
  }

  // /[(][+][0-9]{2}[)][ ][0-9]{3}-[0-9]{3}-[0-9]{4}/gi

  const regexp = new RegExp('[A-Z]','gi');
  const result = prevVal.match(regexp);
  
  if(result?.length > 0){
    msg.value = "Solo se adminten números"
    setTimeout(function() {
      msg.value = ""
    }, 1500)

    return;
  }

  if(valueCode.value !== prevVal.substring(0,valueCode.value.length)){
    event.target.value = valueCode.value;
    prevVal = valueCode.value;
  }

  if(len < largoDialCode.value) {
    prevVal = newValue.value;
  }else{
    if(largoTotal >= 11){
      prevVal = prevVal.substring(0,prevVal.length - 1);
    }else{
      switch (len) {
        case (largoDialCode.value + 2):
          prevVal = event.target.value + "-";
          break;
        case (largoDialCode.value + 6):
          prevVal = event.target.value + "-";
          break;
        default:
          break;
      }
    }
  }
  
  event.target.value = prevVal;
}

function selectPais(flag, code) {
  newValue.value = "(+" + code + ") ";
  newFlag.value = flag;
  mostrarPaises.value = false;

  valueCode.value = newValue.value;

  largoDialCode.value = newValue.value.length + 1;
}

</script>
<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <div><label :for="uuid" v-if="label" class="label">{{ label }}</label></div>
  <input 
    type="text" 
    size="4" 
    :value="newFlag" 
    @click="showPaises"
    class="inputFlag"
  />
  <ul class="listaPaises" v-show="mostrarPaises">
    <li v-for="pais in paises" v-bind:key="pais.dialCode">
      <input 
        type="text" 
        :value="(pais.flag + ' ' + pais.name  + ' (+' + pais.dialCode + ')')" 
        @click="selectPais(pais.flag, pais.dialCode)" 
        size="25"
      />
    </li>
  </ul>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :id="uuid"
    :value="newValue"
    type="tel"
    @input="validate($event, 'normal')"
  >
  <br/>
  <span>{{ msg }}</span>
  </div>
</template>

<style lang="css" scoped>
.field {
  border-radius: 5px !important;
}
.label {
  font-size: small;
}
.inputNew {
  border-radius: 5px !important;
}
.listaPaises {
  background-color: #1d0d55;
  height: 160px;
  border-radius: 5px;
  overflow: auto;
  position: fixed;
  z-index: 10;
  padding: 3px;
}
.inputFlag {
  border-radius: 5px !important;
  background-color: rgb(231, 237, 242);
  text-align: center;
}
</style>
