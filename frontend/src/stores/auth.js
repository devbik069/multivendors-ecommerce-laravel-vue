import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    loading: false,
  }),
  persist: {
    paths: ["user"],
  },

  getters: {
    getUser: (state) => {
      return state.user?.data;
    },

    // add getToken getters in your auth.js file
    // getToken: (state) => {
    //   return state.user?.meta?.token;
    // },
  },


  actions: {
    async login(formData) {
      try {
        const res = await axiosInstance.post("/user/login", formData);
        if (res.status == 200) {
          // console.log(res.data);
          this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
          // this.errors = error.response.data.errors;

          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async register(formData) {
      try {
        const res = await axiosInstance.post("/user/register", formData);
        if (res.status === 201) {
          this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async logout() {
      try {
        this.loading = true;
        const res = await axiosInstance.post("/user/logout");
        if (res.status === 200) {
          // console.log(res.data);
          this.user = {};
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.data) {
          // this.errors = error.response.data.errors;
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      } finally {
        this.loading = false;
      }
    },

    async profileUpdate(data) {
      // console.log(data);
      // return;
      this.loading = true;
      try {
        const res = await axiosInstance.post("/user/profile-update", data);
        if (res.status === 200) {
          this.user.data = res.data.data;
        }
      } catch (error) {
        if (error.response) {
        }
      } finally {
        this.loading = false;
      }
    },

    async updatePassword(data) {
      this.loading = true;
      try {
        const res = await axiosInstance.put("/user/password-update", data);
        if (res.status === 200) {
          return new Promise((resolve) => {
            resolve(res);
          });
        }
      } catch (error) {
        if (error.response) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      } finally {
        this.loading = false;
      }
    },

    async imageUpdate(data) {
      this.loading = true;
      try {
        const res = await axiosInstance.post("/user/image-update", data);
        if (res.status === 200) {
          this.user.data = res.data.data;
        }
      } catch (error) {
        if (error.response) {
        }
      } finally {
        this.loading = false;
      }
    },

  },
});
