<template>
    <div class="grid-containerH">
      <div class="grid-itemH grid-item__icono">
        <img src="./assets/images/iconoBitacoraBlanco.svg" alt="" class="iconoBitacora" />
      </div>
      <div class="grid-itemH">
        <nav class="nav">
          <ul class="nav__ul">
            <li class="nav__li">
              <fa icon="home" class="iconMenu" /><router-link to="/">Inicio</router-link>
            </li>
            <li class="nav__li">
              <fa icon="map-location" class="iconMenu" /><router-link to="/fluvial">Mapa Fluvial</router-link>
            </li>
            <li class="nav__li">
              <fa icon="fa-file-contract" class="iconMenu" /><router-link to="/gestioncontratos"
                >Contratos</router-link
              >
            </li>
            <li class="nav__li">
              <fa icon="fa-gears" class="iconMenu" /><router-link to="/setup">Configuración</router-link>
            </li>
            <li class="nav__li">
              <fa icon="fa-user" class="iconMenu" /><router-link to="/profile">Usuario</router-link>
            </li>
          </ul>
          <ul class="nav__responsive-ul">
            <div class="nav__responsive-button-container">
              <div class="nav__responsive-button"><fa icon="bars" class="nav_responsive-fa" /></div>
            </div>
            <div class="nav__li-container">
              <li class="nav__responsive-li">
                <fa icon="home" size="sm" /><router-link to="/">Inicio</router-link>
              </li>
              <li class="nav__responsive-li">
                <fa icon="map-location" size="sm" /><router-link to="/fluvial"
                  >Mapa Fluvial</router-link
                >
              </li>
              <li class="nav__responsive-li">
                <fa icon="fa-file-contract" size="sm" /><router-link to="/gestioncontratos">Contratos</router-link
                >
              </li>
              <li class="nav__responsive-li">
                <fa icon="fa-gears" size="sm" /><router-link to="/setup">Configuracin</router-link>
              </li>
              <li class="nav__responsive-li"><fa icon="fa-user" size="sm" /><router-link to="/profile">Usuario</router-link></li>
            </div>
          </ul>
        </nav>
      </div>
    </div>
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
