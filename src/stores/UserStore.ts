import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue"
import { useContratoStore } from "../stores/ContratoStore.js";
import { useField, useForm } from 'vee-validate'
import { object, string,  bool } from 'yup'

const contratoStore = useContratoStore()

let urlFluvialGateway = import.meta.env.VITE_URL_GATEWAY;

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      showLogin: Boolean(false),
      showPanelUser: Boolean(false),
      msgEmailDuplicado: String(''),
      showValidarRegistro: Boolean(false),
      user: ''
    };
  },

  getters: {
    getShowLogin() {
      return this.showLogin
    },
    getShowPanelUser() {
      return this.showPanelUser
    },
    getMsgEmailDuplicado() {
      return this.msgEmailDuplicado
    },
    getUser() {
      return this.user;
    },
    getShowValidarRegistro() {
      return this.showValidarRegistro
    }
  },

  actions: {
    async login(username, password){

      if(isEmpty(username)){
        username = this.user.username
        password = this.user.password
      }
      contratoStore.msgSpinner = "Autenticando..."
      contratoStore.showSpinner = true;

      var basicAuth = 'Basic ' + btoa(username + ':' + password)
      var result = false

      await axios.post(urlFluvialGateway + '/api/users/login', {} , 
        { headers: { 'Authorization': basicAuth} })
      .then((response) => {
        const accessToken = response.data.tokenString
        const userToken = response.data.userID;

        localStorage.setItem("calls", response.data.tokenString)
        localStorage.setItem("user", response.data.userID)
        
        result = true

        contratoStore.msgSpinner = "Autenticación exitosa.";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)

        
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error de autenticación, por favor revise.";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });

      return result
    },
    async readUser(username) {
      contratoStore.msgSpinner = "Autenticando..."
      contratoStore.showSpinner = true;

      await axios.get(urlFluvialGateway + '/api/users/getuser/' + username)
      .then((response) => {
        this.user = response.data

        let fecha = new Date(Date.parse(response.data.birthday)).toISOString()
        this.user.birthday = fecha.substring(0,10)
        contratoStore.showSpinner = false;
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0,30) + "...";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });
    },
    async validarEmail(email: string): Promise<Boolean> {
      var respuesta: Boolean = false

      await axios
        .get(urlFluvialGateway + "/api/users/validaremail/" + email)
        .then((response) => {
          respuesta = response.data.respuesta
        })
        .catch(() => {
          
        })
        .then(() => {});

        return respuesta
    },
    async resendCode() {

      contratoStore.msgSpinner = "Enviando código..."
      contratoStore.showSpinner = true;

      await axios.get(urlFluvialGateway + '/api/users/resendcode/' + this.user.id)
      .then((response) => {
        contratoStore.showSpinner = false;
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0,30) + "...";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });
    },
    async loadFile(fileload: FormData): Promise<string> {
      return await axios({
        method: 'post',
        url: urlFluvialGateway + '/api/users/upload',
        data: fileload,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer 69dDLdEZ\/KN5tZ3hha+Mnhr7O9HzcMWlyjFaOeaWwsk=',
        },
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async confirmRegister(codigo) {
      contratoStore.msgSpinner = "Confirmando registro."
      contratoStore.showSpinner = true;

      await axios.get(urlFluvialGateway + '/api/users/confirmregister/' + this.user.id + '/' + codigo)
      .then((response) => {
        let msg: string
        if(response.data.respuesta){
          msg = "Confirmación exitosa!"
        }else{
          msg = "Código no corresponde!"
        }
        contratoStore.msgSpinner = msg
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
          if(response.data){
            return true
          }else{
            return false
          }
        }, 2000)
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0,30) + "...";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });
    },
    async updateUser(values) {
      const phone = String(values.phone)
      var phoneNumber: String = phone.substring(phone.indexOf(")")+1)
      phoneNumber = phoneNumber.trim()

      var phoneCountry: String = phone.substring(0,phone.indexOf(")") + 1)
      phoneCountry  = phoneCountry.trim()

      const updateUser = {
        id: this.user.id,
        name: values.name,
        username: this.user.username,
        password: '',
        siwaIdentifier: "",
        email: '',
        profilePicture: "",
        twitterURL: values.twitterURL,
        rol: values.rol,
        phone: phoneNumber,
        phonecountry: phoneCountry,
        terminosdelservicio: true,
        codigoconfirmacion: "",
        birthday: values.birthday,
        gustos: values.gustos,
        address: values.direccioncasa,
        landline: values.telefonofijo
      }

      contratoStore.msgSpinner = "Actualizando..."
      contratoStore.showSpinner = true;

      await axios.post(urlFluvialGateway + '/api/users/update', updateUser)
      .then((response) => {
        this.user = response.data

        let fecha = new Date(Date.parse(response.data.birthday)).toISOString()
        this.user.birthday = fecha.substring(0,10)

        window.setTimeout(() => {
          contratoStore.showSpinner = false;
        }, 700)
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0,30) + "...";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });
    },
    async save(values) {

      if(this.msgEmailDuplicado!=""){
        return
      }
      
      const phone = String(values.phone)
      
      var phoneNumber: String = phone.substring(phone.indexOf(")") + 1)
      // phoneNumber = phoneNumber.replaceAll("-","")
      phoneNumber = phoneNumber.trim()

      var phoneCountry: String = phone.substring(0,phone.indexOf(")") + 1)
      phoneCountry  = phoneCountry.trim()

      // var expression = /[()+]/gm
      // phoneCountry = phoneCountry.replaceAll(expression,"")
      
      const newUser = {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: values.name,
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
        landline: ""
      }

      this.user = newUser

      contratoStore.msgSpinner = "Creando usuario..."
      contratoStore.showSpinner = true;

      await axios.post(urlFluvialGateway + '/api/users', newUser)
      .then((response) => {
        contratoStore.msgSpinner = "Creado " + response.data.name +  "!";
        this.user.id = response.data.id

        window.setTimeout(() => {
          contratoStore.showSpinner = false;
          // contratoStore.showRegister = false;
          this.showValidarRegistro = true;
        }, 2000)
      })
      .catch((error) => {
        contratoStore.msgSpinner = "Error: " + error.response.data.reason.substring(0,30) + "...";
        window.setTimeout(function() {
          contratoStore.showSpinner = false;
        }, 2000)
      })
      .then(() => {

      });
    }
  },
})

interface UserInfo {
  name: ''
  birthday: string
  password: string
  twitterURL: string
  rol: string
  terminosdelservicio: boolean
  phone: string
  gustos: string
  direccioncasa: string
  telefonofijo: string
  username: string
}