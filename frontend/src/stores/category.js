import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useCategory = defineStore("category", {
  state: () => ({
    categories: {},
    loading: false,
    navCats: [],
  }),
  actions: {
    async getCategoryData() {
      try {
        const res = await axiosInstance.get("/categories");
        if (res.status === 200) {
          this.categories = res.data;
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

    async navCategory() {
      try {
        const res = await axiosInstance.get("/nav-categories");
        if (res.status === 200) {
          this.navCats = res.data;
        }
      } catch (error) {
        if (error.response.data) {
            console.log(error.response.data);
          }
      }
    },
  },
});
