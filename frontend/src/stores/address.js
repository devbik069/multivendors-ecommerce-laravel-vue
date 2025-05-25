import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useAddress = defineStore("address", {
  state: () => ({
    divisions: [],
    districts: [],
    address: {},
  }),

  actions: {
    async getDivisions() {
      try {
        const res = await axiosInstance.get("/user/divisions");

        if (res.status === 200) {
          this.divisions = res.data.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async districtById(id) {
      try {
        const res = await axiosInstance.get(`/user/district/${id}`);

        if (res.status === 200) {
          this.districts = res.data.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async storeAddress(form) {
      try {
        const res = await axiosInstance.post("/user/address/store", form);

        if (res.status === 201) {
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        return new Promise((reject) => {
          reject(error.response.data.errors);
        });
      }
    },

    async getUserAddress() {
      try {
        const res = await axiosInstance.get(`/user/address`);

        if (res.status === 200) {
          this.address = res.data.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
        }
      }
    },
  },
});
