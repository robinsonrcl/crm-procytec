import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";

let urlERP = import.meta.env.VITE_URL_ERP;
let urlGateway = import.meta.env.VITE_URL_GATEWAY;

export const useContactoStore = defineStore("ContactoStore", {
  state: () => {
    return {
      contactos: ''
    };
  },

  getters: {
    getContactos() {
      return this.contactos;
    },
  },

  actions: {
    async fillContactos() {
      await axios
        .get(urlGateway + "/api/customers/get/1/100", {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer keyoUKzx95CHh7Gnd3vl/xRDnVum04FPjfqcd7UeJYI=",
          }
        })
        .then((response) => {
          this.contactos = response.data.results;
        })
        .catch((error) => {
          console.log(
            "Error: " + error.response.data.reason.substring(0, 30) + "..."
          );
        })
        .then(() => {});
    },
  }
});
