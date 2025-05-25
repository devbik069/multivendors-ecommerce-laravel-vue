import { defineStore } from "pinia";

import axiosInstance from "@/services/axiosServices";
import { useCart, useAddress, useCoupon } from "@/stores";


export const useOrder = defineStore("order", {
    state: () => ({
        orders: [],
        singleOrder: {},
        loading: false,
        page: 1,
        noResult: false,
        recentOrder: false,
    }),

    getters: {
        getOrders: (state) => {
            return state.orders;
        },

        getSingleOrder: (state) => {
            return state.singleOrder;
        },
    },
    actions: {
        async index() {
            this.loading = true;
            try {
                const res = await axiosInstance.get("/user/orders", {
                    params: { page: this.page }
                });

                if (res.status === 200) {
                    if (res.data.data.length) {
                        this.orders.push(...res.data.data);
                    } else {
                        this.noResult = true;
                    }
                }
                this.page++;
            } catch (error) {
                this.noResult = true;

                if (error.response.data) {
                    console.log(error.response.data);
                }
            } finally {
                this.loading = false;
            }
        },

        async place() {
            const cart = useCart();
            const address = useAddress();
            const coupon = useCoupon();
            this.loading = true;
            try {
                const res = await axiosInstance.post("/order-place", {
                    subtotal: cart.totalPrice,
                    discount: coupon.discount,
                    charges: address?.address?.division?.charge,
                    total: coupon.grandTotal,
                    items: cart.cartItems,
                });
                if (res.status === 201) {
                    this.recentOrder = true;
                    // cart.$reset();
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                if (error.response.data) {
                    console.log(error.response.data);
                }
            } finally{
                this.loading = false;
            }
        },

        async dataById(id) {

            this.loading = true;
            try {
                const res = await axiosInstance.get("/user/order/" + id);

                if (res.status === 200) {
                    this.singleOrder = res.data.data;

                    // return new Promise((resolve) => {
                    //   resolve(res.data);
                    // });
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                }
            } finally {
                this.loading = false;
            }
        },

    },
});
