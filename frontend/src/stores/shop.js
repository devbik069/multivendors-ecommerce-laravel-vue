import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";

export const useShop = defineStore("shop", {
    state: () => ({
        products: [],
        sidebars: [],
    }),
    actions: {
        async getShopData(page, show, condition, brand, cat, price_range, search, sort) {
            try {
                // const res = await axiosInstance.get(`/shop-products?page=${page}&show=${show}&condition=${condition}`);
                const res = await axiosInstance.get("/shop-products", {
                    params: {
                        page,
                        show,
                        condition,
                        brand: brand,
                        category: cat,
                        price_range: price_range,
                        search: search.length >= 3 ? search : "",
                        sort: sort,
                    }
                });
                // console.log(res);
                if (res.status === 200) {
                    this.products = res.data;
                }
            } catch (error) {
                if (error.response.data) {
                    console.log(error.response.data);
                }
            }
        },

        async sideBareData() {
            try {
                const res = await axiosInstance.get("shop-sidebar");
                // console.log(res);
                if (res.status === 200) {
                    this.sidebars = res.data;
                }
            } catch (error) {
                if (error.response.data) {
                    console.log(error.response.data);
                }
            }
        },
    },
});
