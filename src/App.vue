<template>
  <header>
    <nav class="nav">
      <ul class="nav__ul">
        <li class="nav__li"><i class="fas fa-home"></i><router-link to="/">Inicio</router-link></li>
        <li class="nav__li"><font-awesome-icon icon="MapLocation" /><router-link to="/fluvial">Mapa Fluvial</router-link></li>
        <li class="nav__li"><font-awesome-icons icon="Home" />Gestión contratos</li>
        <li class="nav__li"><i class="fas fa-home"></i>Configuración</li>
        <li class="nav__li"><i class="fas fa-home"></i>Usuario</li>
      </ul>
      <ul class="nav__responsive-ul">
        <div class="nav__responsive-button"></div>
        <div class="nav__li-container">
          <li class="nav__responsive-li"><i class="fas fa-home"></i><router-link to="/">Inicio</router-link></li>
          <li class="nav__responsive-li"><router-link to="/fluvial">Mapa Fluvial</router-link></li>
          <li class="nav__responvive-li">Registro</li>
          <li class="nav__responsive-li">Configuración</li>
          <li class="nav__responsive-li">Usuario</li>
        </div>
      </ul>
    </nav>
  </header>
  <!-- <nav style="margin:0px; padding: 10px 0px 0px 0px;">
    <router-link to="/">Home</router-link> |
    <router-link to="/fluvial">Mapa Fluvial</router-link> |
    <router-link to="/hometest">Home Test</router-link>
  </nav> -->
  <router-view />
</template>

<style>
@import "assets/style.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
