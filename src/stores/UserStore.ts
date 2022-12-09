import { acceptHMRUpdate, defineStore } from "pinia";
import axios from "axios";

let urlFluvialApi = import.meta.env.VITE_URL_FLUVIALAPI;

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      user: {
        name: String,
        username: String,
        password: String,
        siwaIdentifier: String,
        email: String,
        profilePicture: String,
        twitterURL: String,
        rol: String,
        phone: String
      }
    };
  },

  getters: {
    getUser() {
      return this.user;
    },
  },

  actions: {
    async saveUser() {

    }
  },
})
