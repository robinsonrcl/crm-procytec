<script setup lang="ts">
  import { MDBInput, MDBBtn } from "mdb-vue-ui-kit";
  import { ref } from "vue"

  const emit = defineEmits<{
    (e: 'ingresoseguro', value: Boolean): void
  }>()

  const email = ref("");
  const password = ref("");
  const mensaje = ref("");

  function ingresar() {
    if(email.value === "marta@bitacora.com" && password.value === "132456") {
      emit("ingresoseguro", true)
    }else{
      mensaje.value = "Usuario o contraseña incorrecto"
    }
  }

</script>

<template>
  <div className="panelLogin">
  <form>
    <MDBRow class="mb-4">
      <MDBCol>
        <img src="../../assets/images/iconoBitacora.svg" alt="">
        <div style="padding: 15px">
          <span className="tituloLogin">Credenciales de Acceso</span>
        </div>
      </MDBCol>
    </MDBRow>
    <MDBInput
      type="email"
      label="Email address"
      id="form1Email"
      v-model="email"
      wrapperClass="mb-4"
      autofocus
    />
    <MDBInput
      type="password"
      label="Password"
      id="form1Password"
      v-model="password"
      wrapperClass="mb-4"
    />

    <MDBRow class="mb-4">
      <MDBCol>
        <span>{{ mensaje }}</span>
      </MDBCol>
    </MDBRow>

    <MDBBtn color="primary" block @click.prevent="ingresar"> Sign in </MDBBtn>
  </form>
  </div>
</template>

<style lang="scss" scoped></style>