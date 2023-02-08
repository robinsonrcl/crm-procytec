<script setup lang="ts">
import { useUserStore } from "../stores/UserStore"
const userStore = useUserStore()

</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div v-show="userStore.getShowMessageGeneral" class="messageGeneral">
        <span class="styleMessage">{{ userStore.getMessageUser }}</span>
      </div>
      <PanelHeader />
    </div>
    <div class="content">
      <ViewList />
    </div>
  </div>
</template>

<style lang="css" scoped>
.styleMessage {
  background-color: white;
  color: gray;
  padding: 5px 20px;
  border-radius: 5px;
}
@keyframes slidein {
  0% {
    height: 0px;
  }

  50%  {
    height: 30px;
  }

  100% {
    height: 60px;
  }
}
@keyframes slidein2 {
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
.messageGeneral {
  display: flow-root;
  width: -webkit-fill-available;
  background-color: #262262;
  height: fit-content;
  padding: 10px;
  animation-name: slidein2;
  animation-duration: 1s;
}
.wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: grid;
}
.header {
  border: 0.2px;
  /* border-style: solid; */
  position: absolute;
  width: -webkit-fill-available;
  z-index: 400;
  height: 50px;
  width: 100%;
}
.content {
  background-color: white;
  position: absolute;
  height: 100%;
  display: flex;
  width: -webkit-fill-available;
  margin-top: 55px;
  justify-content: center;
}
</style>