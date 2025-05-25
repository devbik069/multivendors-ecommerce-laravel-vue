import { defineStore } from "pinia";
import axiosInstance from "@/seller/services/axiosServices.js";
import { useToken } from "@/seller/stores";

export const useAuth = defineStore("auth", {
    state: () => ({
        user: {},
        isLoggedIn: false,
        loading: false,
    }),
    persist: {
        paths: ["user", "isLoggedIn"],
    },

    getters: {
        getUser: (state) => {
            return state.user;
        },

        getAuthStatus: (state) => {
            return state.isLoggedIn;
        },

        // add getToken getters in your auth.js file
        // getToken: (state) => {
        //   return state.user?.meta?.token;
        // },
    },

    actions: {
        async login(formData) {
            // console.log(formData);
            // return;
            try {
                const res = await axiosInstance.post("/seller/login", formData);
                if (res.status == 200) {
                    // // console.log(res.data.data.user);
                    // return;
                    this.setAuthInfo(res.data?.data)
                    return res.data?.data;
                }
            } catch (error) {
                if (error.response.data) {
                    console.log(error.response.data);
                    throw error.response.data.errors;
                }
            }
        },

        setAuthInfo(data) {
            const token = useToken();
            this.user = data?.user;
            token.setToken(data?.token);
            this.isLoggedIn = true;
        },



        async logout() {
            try {
                this.loading = true;
                const res = await axiosInstance.post("/seller/logout");
                if (res.status === 200) {
                    this.removeAuthInfo();
                    return res;
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    throw error.response;
                }
            } finally {
                this.loading = false;
            }
        },

        removeAuthInfo() {
            const token = useToken();
            token.removeToken();
            this.$reset();
        },

    },
});
