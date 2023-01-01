<script setup lang="ts">
import { getImage } from '../../utils/utilidades';


</script>

<template>
  <div class="container-header">
    <div class="item"><img :src="getImage('/images/','logoConecta.svg')" class="logo" /></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<style lang="css" scoped>
.logo {
  width: 200px;
}
.container-header {
  display: grid;
  grid-template-columns: repeat(6 1fr);
}
.item {
  display: grid;
}
</style>