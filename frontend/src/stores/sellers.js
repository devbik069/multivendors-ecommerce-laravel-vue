import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useSeller = defineStore("seller", {
  state: () => ({
    sellers: [],
    products: {},
  }),
  actions: {
    async index(page, show) {
      try {
        const res = await axiosInstance.get(
          `/sellers?page=${page}&show=${show}`
        );
        // console.log(res);
        if (res.status === 200) {
          this.sellers = res.data;
          // return new Promise((resolve) => {
          //   resolve(res.data);
          // });
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async sellerProductsBySlug(slug, page, show, sort) {
      try {
        const res = await axiosInstance.get(
          `/sellers/products/${slug}?page=${page}&show=${show}&sort=${sort}`
        );
        if (res.status === 200) {
          this.products = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async register(formData) {
      try {
        const res = await axiosInstance.post("/seller/apply", formData);
        if (res.status === 200) {
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },
  },
});
