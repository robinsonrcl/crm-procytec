<script setup lang="ts">
import { getImage } from '../utils/utilidades';
import { useUserStore } from "../stores/UserStore"

const userStore = useUserStore()

</script>

<template>
  <div>
    <img :src="getImage('/images/','logoConecta.svg')" class="logo" />
    <RegisterLogin />
    <ModalConfirmRegister v-show="userStore.getShowValidarRegistro" />
  </div>
</template>

<style lang="css" scoped>
.logo {
  width: 300px;
  display: flex;
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>