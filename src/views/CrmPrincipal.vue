<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
  <div class="header">
    <PanelHeader />
  </div>
  <div class="sidebar-left">Sidebar</div>
  <div class="content">Content</div>
  <div class="sidebar-rigth">Sidebar</div>
</div>
</template>

<style lang="css" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "hd hd hd hd   hd   hd   hd   hd   hd"
    "sdl sdl main main main main main sdr sdr";
}
.header {
  grid-area: hd;
  border: 1px;
  border-style: solid;
}
.content {
  grid-area: main;
  border: 1px;
  border-style: solid;
}
.sidebar-left {
  grid-area: sdl;
  border: 1px;
  border-style: solid;
}
.sidebar-rigth {
  grid-area: sdr;
  border: 1px;
  border-style: solid;
}
</style>