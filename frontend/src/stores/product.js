import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useProduct = defineStore("product", {
  state: () => ({
    products: {},
    sales: [],
    popular: [],
    winter: [],
    feature: [],
    newItem: [],
    product: {},
  }),
  actions: {
    async getProductData(type = "") {
      try {
        const res = await axiosInstance.get("/products?condition=" + type);
        console.log(res);
        if (res.status === 200) {
          if (type === "sale") {
            this.sales = res.data;
          } else if (type === "popular") {
            this.popular = res.data;
          } else if (type === "winter") {
            this.winter = res.data;
          } else if (type === "newItems") {
            this.newItem = res.data;
          } else if (type === "feature") {
            this.feature = res.data;
          } else {
            this.products = res.data;
          }

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

    async productBySlug(slug) {
      try {
        const res = await axiosInstance.get(`/single-product/${slug}`);

        if (res.status === 200) {
          this.product = res.data.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },
  },
});
