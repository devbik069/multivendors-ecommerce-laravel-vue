<script setup>
import { ref } from "vue";
import { useCart, useAddress, useCoupon, useOrder } from "@/stores";
import { storeToRefs } from "pinia";
const cart = useCart();
const { cartItems, totalPrice } = storeToRefs(cart);
const { address } = storeToRefs(useAddress());
import { DeliveryAddress } from "@/components";
import { useStatus } from "@/composables/status.js";

const status = useStatus();
const coupon = useCoupon();
const order = useOrder();
const { loading } = storeToRefs(order);
const { couponBtnClass, couponFormClass } = storeToRefs(status);

const couponCode = ref("");

const applyCoupon = () => {
  coupon.apply(couponCode.value);
};

// const couponBtn = () => {
//   // $(this).hide(), $(".coupon-form").css("display", "flex");
// };
import { useRouter } from "vue-router";
const router = useRouter();
const placeOrder = async () => {
  const res = await order.place();
  if(res.data){
    router.push({ name: 'orderdone.page', query: { order_type: true }})
  }
};
</script>
<template>
  <div>
    <section class="inner-section single-banner">
      <div class="container"><h2>Checkout</h2></div>
    </section>
    <section class="inner-section checkout-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12" style="display: none">
            <div class="alert-info">
              <p>
                Returning customer?
                <a
                  href="javascript::void(0)"
                  data-bs-toggle="modal"
                  data-bs-target="#login-modal"
                  >Click here to login</a
                >
              </p>
            </div>
          </div>

          <DeliveryAddress />

          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title"><h4>Your order</h4></div>
              <div class="account-content">
                <div class="table-scroll">
                  <table class="table-list">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cart, index) in cartItems" :key="index">
                        <td class="table-image">
                          <div>
                            <img
                              :src="$filters.makeImagePath(cart.thumbnail)"
                              alt="product"
                            />
                          </div>
                        </td>
                        <td class="table-name">
                          <h6>{{ cart.name }}</h6>
                        </td>
                        <td class="table-price">
                          <h6>{{ $filters.currencySymbol(cart.price) }}</h6>
                        </td>
                        <td class="table-quantity">
                          <h6>{{ cart.quantity }}</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="chekout-coupon">
                  <button
                    @click="status.toggleBtn()"
                    class="coupon-btn"
                    :class="couponBtnClass"
                  >
                    Do you have a coupon code?
                  </button>
                  <form
                    class="coupon-form"
                    :class="couponFormClass"
                    @submit.prevent="applyCoupon"
                  >
                    <input
                      v-model="couponCode"
                      type="text"
                      placeholder="Enter your coupon code"
                    /><button type="submit"><span>apply</span></button>
                  </form>
                </div>
                <div class="checkout-charge">
                  <ul>
                    <li>
                      <span>Sub total</span
                      ><span>{{ $filters.currencySymbol(totalPrice) }}</span>
                    </li>
                    <li>
                      <span>discount</span
                      ><span>{{
                        $filters.currencySymbol(coupon.discount)
                      }}</span>
                    </li>
                    <li v-if="address.division">
                      <span>delivery charge</span
                      ><span>
                        <!-- {{ $filters.currencySymbol(address.division.charge) }} -->
                        {{ $filters.currencySymbol(address?.division?.charge) }}
                      </span>
                    </li>
                    <li>
                      <span>Total<small>(Incl. VAT)</small></span
                      ><span>{{
                        $filters.currencySymbol(coupon.grandTotal)
                      }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="checkout-proced">
            <button
              class="btn btn-inline"
              type="submit"
              :disabled="loading"
              @click.prevent="placeOrder"
            >
              Place Order
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm mr-1"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.coupon_btn_none {
  display: none;
}
.coupon_form_display {
  display: flex;
}
</style>
