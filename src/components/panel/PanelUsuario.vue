<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { getImage } from '../../utils/utilidades';

const contratoStore = useContratoStore();

function register() {
  contratoStore.setShowPanel('Usuario')
  contratoStore.setShowRegister(true);
}
</script>

<template>
  <div class="container-usuario">
    <div className="c-filtros-item">
      <div>USUARIO</div>
      <hr className="filtros-hr">
    </div>
    <div class="opcionesUsuario">
      <div style="text-align:center">
      Registrarse<br>
      <div class="botonRegistro">
        <div><img class="img__register" :src="getImage(`/images/`, `register.png`)" alt="Registrarse con Email" @click.prevent="register()" /></div>
      </div>
    </div>
    <hr className="filtros-hr">
    <div style="text-align:center">
      Inicio de sesión<br>
      <div class="botonRegistro">
        <div><img class="img__google" :src="getImage(`/images/`, `google.png`)" alt="Registrarse con Google" /></div>
        <div><img class="img__email" :src="getImage(`/images/`, `email.png`)" alt="Registrarse con Email" /></div>
      </div>
    </div>
    <hr className="filtros-hr">
    <div style="text-align:center">
      Recordar contraseña<br>
      <div class="botonRegistro">
        <div><img class="img__forgot-password" :src="getImage(`/images/`, `forgot-password.png`)" alt="Registrarse con Email" /></div>
      </div>
    </div>
    <hr className="filtros-hr">
    <div class="logout">
      Logout<br>
      <div class="botonRegistro">
        <div><img class="img__shutdown" :src="getImage(`/images/`, `shutdown.png`)" alt="Registrarse con Email" /></div>
      </div>
    </div>
    <hr className="filtros-hr">
  </div>
  </div>
</template>

<style lang="scss" scoped>
.logout {
  background-color: green;
  border-radius: 10px;
  text-align: center;
}
.img__shutdown {
  width: 40px;
  padding: 2px;
  margin: 0 0 5px;
}
.img__forgot-password {
  width: 40px;
  padding: 2px;
}
.botonRegistro {
  // border-bottom: inset;
  display: inline-flex;
}
.img__email {
  width: 40px;
  padding: 2px;
}
.img__register {
  width: 55px;
  padding: 2px;
}
.img__google {
  width: 165px;
  padding: 3px;
}
.opcionesUsuario {
  text-align: left;
}
  .container-usuario {
    position: fixed;
    display: grid;
    z-index: 10;
    background-color: var(--bcolor);
    opacity: 0.99;
    grid-template-columns: 1fr;
    color: #fff;
    padding: 20px;
    gap: 5px;
    height: 100%;
    grid-auto-rows: min-content;
    font-size: small;
    border-radius: 0 10px 10px 0;
    width: 22%;
  }
  .filtros-hr {
  height: 2px;
  background: white;
  margin: 4px 0 4px;
}
.textImport {
  font-weight: 400;
}
.panelImport {
  text-align: -webkit-center;
}
.spanDescarga {
  background-color: white;
    padding: 2px;
    margin: 10px;
}
</style>
