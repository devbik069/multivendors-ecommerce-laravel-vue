import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosServices";
import { useNotification, useCart, useAddress } from "@/stores";

export const useCoupon = defineStore("coupon", {
  state: () => ({
    data: {},
  }),

  getters: {
    //coupon discount
    discount: (state) => {
      const cart = useCart();
      if (state.data.type === "fixed") {
        return state.data.value;
      } else if (state.data.type === "percent") {
        return parseInt((state.data.value / 100) * cart.totalPrice);
      } else {
        return 0;
      }
    },

    ///grandtotal

    grandTotal: (state) => {
      const cart = useCart();
      const add = useAddress();

      var charge = 0;
      if (add.address?.division) {
        charge += add.address?.division?.charge;
      }
      return parseInt(cart.totalPrice + charge - state.discount);
    },
  },

  actions: {
    async apply(couponCode) {
      try {
        const res = await axiosInstance.post("/user/apply-coupon", {
          code: couponCode,
        });

        if (res.status === 200) {
          this.data = res.data.data;
          const noty = useNotification();
          noty.Success("Coupon Applied");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            const noty = useNotification();
            noty.Error("Coupon is not valid");
            this.data = {};
          }
        }
      }
    },
  },
});
