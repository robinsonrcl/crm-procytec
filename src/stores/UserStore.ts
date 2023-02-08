import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";
import { useContratoStore } from "../stores/ContratoStore.js";
import { isEmpty } from "lodash";

const contratoStore = useContratoStore();

let urlGateway = import.meta.env.VITE_URL_GATEWAY;

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      emailWithoutRegister: "",
      roles: "",
      showLogin: Boolean(false),
      showPanelUser: Boolean(false),
      msgEmailDuplicado: String(""),
      showValidarRegistro: Boolean(false),
      user: "",
      showRestorePassword: Boolean(false),
      showMessageGeneral: Boolean(false),
      messageUser: "",
    };
  },

  getters: {
    getMessageUser() {
      return this.messageUser;
    },
    getShowMessageGeneral() {
      return this.showMessageGeneral;
    },
    getRoles() {
      return this.roles;
    },
    loggedIn(state) {
      return !!state.user;
    },
    getShowRestorePassword() {
      return this.showRestorePassword;
    },
    getShowLogin() {
      return this.showLogin;
    },
    getShowPanelUser() {
      return this.showPanelUser;
    },
    getMsgEmailDuplicado() {
      return this.msgEmailDuplicado;
    },
    getUser() {
      return this.user;
    },
    getShowValidarRegistro() {
      return this.showValidarRegistro;
    },
  },

  actions: {
    checkRol(permisoFind) {
      var permisos;
      const roles = this.roles;

      roles.forEach((element) => {
        if (element.id === this.user.roles.id) {
          permisos = element.permissions;
        }
      });

      var permisosCheck = permisos.filter(function (permiso) {
        return permisoFind === permiso.name;
      });
      if (permisosCheck.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    async fillRoles() {
      await axios
        .get(urlGateway + "/api/roles/getAll")
        .then((response) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(
            "Error: " + error.response.data.reason.substring(0, 30) + "..."
          );
        })
        .then(() => {});
    },
    logout() {
      localStorage.removeItem("calls");
      localStorage.removeItem("users");
      this.user = "";
    },
    async setNewPassword(values) {
      const newPassword = {
        email: values.email,
        password: values.password,
        code: values.code,
      };

      let respuesta = "";

      await axios
        .post(urlGateway + "/api/users/setnewpwd", newPassword)
        .then((response) => {
          if (response.status == 207) {
            respuesta = "CODIGONOCORRESPONDE";
          } else {
            respuesta = "EXITOSO";
          }
        })
        .catch((error) => {
          respuesta =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
        })
        .then(() => {});

      return respuesta;
    },
    async sendCodeRestorePassword(email) {
      var respuesta: string = "";

      await axios
        .get(urlGateway + "/api/users/coderestorepwd/" + email)
        .then((response) => {
          respuesta = response.data
        })
        .catch((error) => {
          respuesta = error.response.statusText
        })
        .then(() => {});

      return respuesta;
    },
    async login(username, password) {
      if (isEmpty(username)) {
        username = this.user.username;
        password = this.user.password;
      }
      contratoStore.msgSpinner = "Autenticando...";
      contratoStore.showSpinner = true;

      var basicAuth = "Basic " + btoa(username + ":" + password);
      var result = false;

      await axios
        .post(urlGateway + "/api/users/login",{},{ headers: { Authorization: basicAuth } })
        .then((response) => {
          var msg: string;

          if (response.data.value != "NOCONFIRMADO") {
            localStorage.setItem("calls", response.data.value);
            localStorage.setItem("users", response.data.user.id);

            result = true;
            msg = "Autenticación exitosa.";
          } else {
            msg = "Usuario sin confirmar!";
            result = false;
          }
          contratoStore.msgSpinner = msg;
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error de autenticación, por favor revise.";
        })
        .then(() => {
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        });

      return result;
    },
    async readUser(username) {
      contratoStore.msgSpinner = "Autenticando...";
      contratoStore.showSpinner = true;

      await axios
        .get(urlGateway + "/api/users/getuser/" + username)
        .then((response) => {
          this.user = response.data;

          localStorage.setItem("userId", this.user.id);

          let fecha = new Date(
            Date.parse(response.data.birthday)
          ).toISOString();
          this.user.birthday = fecha.substring(0, 10);
          contratoStore.showSpinner = false;
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        })
        .then(() => {});
    },
    async validarEmail(email: string): Promise<String> {
      var respuesta: String = "";

      await axios
        .get(urlGateway + "/api/users/validaremail/" + email)
        .then((response) => {
          respuesta = response.data.respuesta;
        })
        .catch((error) => {
          console.log(
            "Error: " + error.response.data.reason.substring(0, 30) + "..."
          );
        })
        .then(() => {});

      return respuesta;
    },
    async enviarCode(email) {
      contratoStore.msgSpinner = "Enviando código...";
      contratoStore.showSpinner = true;

      await axios
        .get(urlGateway + "/api/users/enviarcode/" + email)
        .then((response) => {
          contratoStore.showSpinner = false;
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        })
        .then(() => {});
    },
    async resendCode() {
      contratoStore.msgSpinner = "Enviando código...";
      contratoStore.showSpinner = true;

      await axios
        .get(urlGateway + "/api/users/resendcode/" + this.user.id)
        .then((response) => {
          contratoStore.showSpinner = false;
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        })
        .then(() => {});
    },
    async loadFile(fileload: FormData): Promise<string> {
      return await axios({
        method: "post",
        url: urlGateway + "/api/users/upload",
        data: fileload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer 69dDLdEZ/KN5tZ3hha+Mnhr7O9HzcMWlyjFaOeaWwsk=",
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    async confirmRegister(codigo): Promise<string> {
      contratoStore.msgSpinner = "Confirmando registro.";
      contratoStore.showSpinner = true;
      let respuesta = "";
      let id = "";
      var usuarioCorreo: string;

      if (isEmpty(this.user.username)) {
        usuarioCorreo = this.emailWithoutRegister
      } else {
        usuarioCorreo = this.user.username.toString()
      }      

      await axios
        .get(urlGateway + "/api/users/confirmregister/" + usuarioCorreo + "/" + codigo)
        .then((response) => {
          let msg: string;
          respuesta = response.data.respuesta;
          if (respuesta === "CONFIRMADO") {
            msg = "Confirmación exitosa!";
          } else {
            if (respuesta === "CODIGOERRONEO") {
              msg = "Código no corresponde!";
            } else {
              msg = "Usuario no existe";
            }
          }
          contratoStore.msgSpinner = msg;
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        })
        .then(() => {});

      return respuesta;
    },
    async updateUser(values) {
      const phone = String(values.phone);
      var phoneNumber: String = phone.substring(phone.indexOf(")") + 1);
      phoneNumber = phoneNumber.trim();

      var phoneCountry: String = phone.substring(0, phone.indexOf(")") + 1);
      phoneCountry = phoneCountry.trim();

      const Rol = {
        id: this.user.roles.id,
        name: this.user.roles.name,
        status: this.user.roles.status,
      };
      const updateUser = {
        id: this.user.id,
        name: values.name.toUpperCase(),
        username: this.user.username,
        password: "",
        siwaIdentifier: "",
        email: "",
        profilePicture: "",
        twitterURL: values.twitterURL,
        rol: values.rol,
        phone: phoneNumber,
        phonecountry: phoneCountry,
        terminosdelservicio: true,
        codigoconfirmacion: "",
        birthday: values.birthday,
        gustos: values.gustos.toUpperCase(),
        address: values.direccioncasa.toUpperCase(),
        landline: values.telefonofijo,
        roles: values.roles,
      };

      contratoStore.msgSpinner = "Actualizando...";
      contratoStore.showSpinner = true;

      await axios
        .post(urlGateway + "/api/users/update", updateUser)
        .then((response) => {
          this.user = response.data;

          let fecha = new Date(
            Date.parse(response.data.birthday)
          ).toISOString();
          this.user.birthday = fecha.substring(0, 10);
        })
        .catch((error) => {
          contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0, 30) + "...";
        })
        .then(() => {
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        });
    },
    async save(values) {
      if (this.msgEmailDuplicado != "") {
        return;
      }
      const phone = String(values.phone);

      var phoneNumber: String = phone.substring(phone.indexOf(")") + 1);
      phoneNumber = phoneNumber.trim();

      var phoneCountry: String = phone.substring(0, phone.indexOf(")") + 1);
      phoneCountry = phoneCountry.trim();

      const newUser = {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: values.name.toUpperCase(),
        username: values.email,
        password: values.password,
        siwaIdentifier: "",
        email: values.email,
        profilePicture: "",
        twitterURL: "",
        rol: "usuariofinal",
        phone: phoneNumber,
        phonecountry: phoneCountry,
        terminosdelservicio: true,
        codigoconfirmacion: "",
        birthday: "1900-01-01",
        address: "",
        gustos: "",
        landline: "",
      };

      contratoStore.msgSpinner = "Creando usuario...";
      contratoStore.showSpinner = true;

      await axios
        .post(urlGateway + "/api/users", newUser)
        .then((response) => {
          contratoStore.msgSpinner = "Creado " + response.data.name + "!";
          this.user = response.data;
          this.user.username = values.email
          this.user.password = values.password
          this.user.birthday = "1900-01-01"

          localStorage.setItem("users", response.data.id)

          window.setTimeout(() => {
            contratoStore.showSpinner = false;
            this.showValidarRegistro = true;
          }, 2000);
        })
        .catch((error) => {
          contratoStore.msgSpinner =
            "Error: " + error.response.data.reason.substring(0, 30) + "...";
        })
        .then(() => {
          window.setTimeout(function () {
            contratoStore.showSpinner = false;
          }, 2000);
        });
    },
  },
});

interface UserInfo {
  id: "";
  name: "";
  birthday: string;
  twitterURL: string;
  rol: string;
  terminosdelservicio: boolean;
  phone: string;
  gustos: string;
  direccioncasa: string;
  telefonofijo: string;
  username: string;
}
