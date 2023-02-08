<script setup lang="ts">
  import { ref } from "vue";
  import router from "../../router";
  import { useUserStore } from "../../stores/UserStore"
  import { getImage } from '../../utils/utilidades';
  
  const userStore = useUserStore()
  const user = ref(userStore.getUser)
  const showMenuUser = ref(false)
  const isActiveSetup = ref(false)
  const isActiveLogout = ref(false)

  function menuUser() {
    showMenuUser.value = !showMenuUser.value
  }
  function logout() {
    userStore.logout()
    router.push('/')
  }
  function overSetup() {
    isActiveSetup.value = !isActiveSetup.value
  }
  function overLogout() {
    isActiveLogout.value = !isActiveLogout.value
  }

</script>

<template>
  <div class="container-header">
    <div class="item"><img :src="getImage('/images/','logoConecta.svg')" class="logo" /></div>
    <div class="item">
      <div class="contactos">
        <div>Contactos ⬇︎</div>
        <ul class="contactos-list">
          <li>Contactos</li>
          <li>Empresas</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="contactos">
        <div>Negocios ⬇︎</div>
        <ul class="contactos-list">
          <li>Contactos</li>
          <li>Empresas</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="contactos">
        <div>Product/Servicios ⬇︎</div>
        <ul class="contactos-list">
          <li>Contactos</li>
          <li>Empresas</li>
        </ul>
      </div>
    </div>
    <div class="item"></div>
    <div class="item">
      <div class="celdaUser">
        <div class="menuUser">
          <img @click="menuUser" :src="getImage('/images/','user.png')" class="imgHeader" />
          <span class="userHeader" @click.prevent="menuUser">{{ user.name }}</span>
        </div>
        <div v-if="showMenuUser" class="optionsUser">
          <ul class="listaUsers">
            <li @mouseover="overSetup" @mouseleave="overSetup" :class="{ selected: isActiveSetup}">Setup</li>
            <li @mouseover="overLogout" @mouseleave="overLogout" :class="{ selected: isActiveLogout}" @click.prevent="logout">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.selected {
  background-color: rgb(82, 76, 76);
}
.listaUsers {
  text-align: left;
  list-style-type: disclosure-closed;
  cursor: pointer;
}
.optionsUser {
  background: #323265;
  /* width: fit-content; */
  border-radius: 0  0 5px 5px;
  color:white;
}
.menuUser {
  /* background-color: white; */
  width: fit-content;
  border-radius: 0  0 5px 5px;
  text-align: right;
  cursor: pointer;
}
.celdaUser {
  text-align: right;
    display: grid;
    justify-content: end;
    height: 50px;
}
.userHeader {
  color:white;
  padding: 0 25px 0 10px;
}
.imgHeader {
  width: 50px;
}
.contactos-list {
  margin: 10px;
  display: none;
}
.contactos {
  padding: 5px;
    font-size: smaller;
    height: 61px;
    color: white;
    display: flex;
    align-items: center;
    justify-content:center;
    width: -webkit-fill-available;
    /* text-decoration: underline; */
}
.contactos:hover {
  background-color: #324665;
}
.logo {
  width: 200px;
}
.container-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 3fr;
  align-items: center;
  background: #323265;
  z-index: 300;
  position: sticky;
}
.item {
  display: grid;
}
</style>