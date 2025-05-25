import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";
import { useAuth } from "@/stores";

export const useWishlist = defineStore("wishlist", {
  state: () => ({
    wishlists: [],
    loading: false,
  }),
  actions: {
    async getWishlistData() {
      try {
        const res = await axiosInstance.get("/user/wishlists");
        if (res.status === 200) {
          this.wishlists = res.data;
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

    async addToWishlist(product) {
      this.loading = product.id;
      try {
        const res = await axiosInstance.post("/user/wishlists", {
          product_id: product.id,
        });
        // console.log(res);
        if (res.status) {
          // this.wishlists = res.data;

          const auth = useAuth();

          if (res.status === 201) {
            //attach
            auth.user.meta.wishlists.unshift(product);
          } else {
            // detach
            let index = auth.user.meta.wishlists.findIndex(
              (i) => i.id === product.id
            );
            auth.user.meta.wishlists.splice(index, 1);
          }

          return new Promise((resolve) => {
            resolve(res);
          });
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
