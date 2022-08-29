<template>
  <div class="panelLogin">
  <form>
    <MDBRow class="mb-4">
      <MDBCol>
        <img :src="require('../assets/images/iconoBitacora.svg')" alt="">
        <div style="padding: 15px">
          <span class="tituloLogin">Credenciales de Acceso</span>
        </div>
      </MDBCol>
    </MDBRow>
    <!-- Email input -->
    <MDBInput
      type="email"
      label="Email address"
      id="form1Email"
      v-model="email"
      wrapperClass="mb-4"
      autofocus
    />
    <!-- Password input -->
    <MDBInput
      type="password"
      label="Password"
      id="form1Password"
      v-model="password"
      wrapperClass="mb-4"
    />
    <!-- 2 column grid layout for inline styling -->
    <!-- <MDBRow class="mb-4">
      <MDBCol class="d-flex justify-content-center">
        <MDBCheckbox
          label="Remember me"
          id="form1LoginCheck"
          v-model="form1LoginCheck"
          wrapperClass="mb-3 mb-md-0"
        />
      </MDBCol>
      <MDBCol>
        <a href="#!">Forgot password?</a>
      </MDBCol>
    </MDBRow> -->
    <!-- Submit button -->

    <MDBRow class="mb-4">
      <MDBCol>
        <span>{{ mensaje }}</span>
      </MDBCol>
    </MDBRow>

    <MDBBtn color="primary" block @click.prevent="ingresar"> Sign in </MDBBtn>
  </form>
  </div>
</template>

<script>
  import {
    // MDBRow,
    // MDBCol,
    MDBInput,
    // MDBCheckbox,
    MDBBtn,
  } from "mdb-vue-ui-kit";
  import { ref } from "vue";
  export default {
    components: {
      // MDBRow,
      // MDBCol,
      MDBInput,
      // MDBCheckbox,
      MDBBtn,
    },
    setup() {
      const form1Email = ref("");
      const form1Password = ref("");
      const form1LoginCheck = ref(true);

      return {
        form1Email,
        form1Password,
        form1LoginCheck,
      };
    },
    data() {
      return {
        mensaje: "",
        error: false
      }
    },
    methods: {
      ingresar() {
        if(this.email === "marta@bitacora.com" && this.password === "132456") {
          this.$emit("ingresoseguro", true)
        }else{
          this.mensaje = "Usuario o contraseña incorrecto"
          this.error = true
        }
      }
    }
  };
</script>

<style lang="scss" scoped></style>