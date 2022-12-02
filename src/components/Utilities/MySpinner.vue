<script setup lang="ts">
import { getImage } from "../../utils/utilidades";

defineProps({
  messageSpinner: String
})

</script>
<template>
  <div class="spinner">
  <img class="imgSpinner" :src="getImage('/images/','loading.gif')" >
  {{ messageSpinner }}
  </div>
</template>

<style lang="css" scoped>
.imgSpinner {
  width: 40px;
}
.spinner, img {
  width: fit-content;
  display: inline-flex;
  padding: 5px;
  align-items: center;
  font-size: larger;
}
</style>