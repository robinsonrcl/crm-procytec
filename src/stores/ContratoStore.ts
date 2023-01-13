import { acceptHMRUpdate, defineStore } from "pinia";
import { arePointsNear } from "../utils/utilidades";
import axios from "axios";
import { stringifyQuery } from "vue-router";
import { faThList } from "@fortawesome/free-solid-svg-icons";

let urlApi = import.meta.env.VITE_URL_API;

export const useContratoStore = defineStore("ContratoStore", {
  // state
  state: () => {
    return {
      showSpinner: Boolean(false),
      msgSpinner: "Esperando...",
      showRegister: Boolean(true),
    };
  },

  // getters
  getters: {
    getShowSpinner() {
      return this.showSpinner;
    },
    getMsgSpinner() {
      return this.msgSpinner;
    },
    getShowRegister() {
      return this.showRegister;
    }
  },

  actions: {
    setMessage(message, duration) {
      this.message.hidden = !this.message.hidden;
      this.message.message = message;
      setTimeout(() => {
        this.message.hidden = !this.message.hidden;
      }, duration);
    }
  }
})
