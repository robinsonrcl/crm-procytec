<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";

const contratoStore = useContratoStore()

</script>


<template>
  <div id="modalMessage" v-if="contratoStore.getMessage.hidden" class="slideDiv">
    {{ contratoStore.getMessage.message }}
  </div>
</template>

<style lang="css" scoped>
.slideDiv {
  /* transition: all 3.5s; */
  animation-duration: 3.5s;
  animation-name: slidein;
}
@keyframes slidein {
  from {
    background-color: rgb(203, 199, 239);
    font-size: 1rem;
    margin-left: 100%;
    width: 300%
  }

  to {
    background-color : #262262;
      font-size: 1.5rem;
      color: white;
    margin-left: 0%;
    width: 100%;
  }
}

  /* @keyframes changeColor {
  20% {
      background-color: rgb(203, 199, 239);
      font-size: 1rem;
    }
  50%  {
      background-color: rgb(91, 126, 214);
      font-size: 1.3rem;    
    }
  80%  {
      background-color : #262262;
      font-size: 1.5rem;
      color: white;
    }
  }
  .showAlert {
    background-color: antiquewhite;
    font-size: large;
    color: black;
    animation-name: changeColor;
    animation-duration: 4s;
  } */
.h1 {
  text-align: center;
  font-size: large;
}
</style>