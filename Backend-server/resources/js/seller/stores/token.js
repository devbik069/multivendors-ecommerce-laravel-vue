import { defineStore } from "pinia";
import axiosInstance from "@/admin/services/axiosServices.js";

export const useToken = defineStore("token", {
    state: () => ({
        token: null,
    }),
    persist: true,

    getters: {
        getToken: (state) => {
            return state.token;
        },

        // add getToken getters in your auth.js file
        // getToken: (state) => {
        //   return state.user?.meta?.token;
        // },
    },

    actions: {
        setToken(token) {
         this.token = token;
        },

        removeToken(token) {
         this.$reset();
        },
    },
});
