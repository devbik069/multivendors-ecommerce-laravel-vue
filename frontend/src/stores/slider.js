import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useSlider = defineStore("slider", {
  state: () => ({
    sliders: {},
    loading: false,
  }),
  actions: {
    async getSlideData() {
      try {
        const res = await axiosInstance.get("/sliders");
        if (res.status === 200) {
          this.sliders = res.data;
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
  },
});