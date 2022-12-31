<script setup lang="ts">
import { useContratoStore } from "../../stores/ContratoStore.js";
import { useUserStore } from "../../stores/UserStore";
import { getImage } from '../../utils/utilidades';

const contratoStore = useContratoStore();
const userStore = useUserStore()

function register() {
  contratoStore.setShowPanel('Usuario')
  contratoStore.setShowRegister(true);
}
function profile() {
  contratoStore.setShowPanel("Usuario")
  userStore.showPanelUser = true
}
function inicioSesion() {
  userStore.showLogin = true
}
</script>

<template>
  <div class="container-usuario">
    <div className="c-filtros-item">
      <div>USUARIO</div>
      <hr className="filtros-hr">
    </div>
    <div class="opcionesUsuario">
      <div>
        <a href="" @click.prevent="profile()">Mi perfil</a>
      </div>
      <hr className="filtros-hr">
      <div>
        <a href="" @click.prevent="register()">Registrarse</a>
      </div>
      <hr className="filtros-hr">
      <div>
        <a href="" @click.prevent="inicioSesion()">Inicio de sesion</a>
      </div>
      <hr className="filtros-hr">
      <div>
        Recordar contraseña<br>
      </div>
      <hr className="filtros-hr">
      <div class="logout">
        Logout<br>
      </div>
      <hr className="filtros-hr">
    </div>
  </div>
</template>

<style lang="scss" scoped>
a:link {
  color: rgb(229, 215, 215);
}

/* visited link */
a:visited {
  color: rgb(226, 233, 9);
}

/* mouse over link */
a:hover {
  color: rgb(229, 215, 215);
}

/* selected link */
a:active {
  color: rgb(229, 215, 215);
}

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
