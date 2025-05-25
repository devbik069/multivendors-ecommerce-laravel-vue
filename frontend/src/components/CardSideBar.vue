<script setup>
import { useCart } from "@/stores";
import { storeToRefs } from "pinia";
const cart = useCart();
const { cartItems, cartItemsCount, totalPrice } = storeToRefs(cart);

const cartClose = () => {
  cart.toggleCartSidebar();
};

const couponBtn = () => {
  $(".coupon-btn").hide(), $(".coupon-form").css("display", "flex");
};

const deleteCart = (index) => {
  cart.destroy(index);
};

const cartDecrement = (index) => {
  cart.decrement(index);
};
const cartIncrement = (product) => {
  cart.addToCart(product);
};
</script>

<template>
  <div v-show="cart.isOpen">
    <aside class="cart-sidebar active">
      <div class="cart-header">
        <div class="cart-total">
          <i class="fas fa-shopping-basket"></i
          ><span>total item ({{ cartItemsCount }})</span>
        </div>
        <button class="cart-close">
          <i class="icofont-close" @click="cartClose"></i>
        </button>
      </div>
      <ul class="cart-list">
        <li class="cart-item" v-for="(cart, index) in cartItems" :key="index">
          <div class="cart-media">
            <a href="#"
              ><img
                :src="$filters.makeImagePath(cart.thumbnail)"
                alt="product" /></a
            ><button class="cart-delete" @click.prevent="deleteCart(index)">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6>
                <a href="product-single.html">{{ cart.name }}</a>
              </h6>
              <p>Unit Price - {{ $filters.currencySymbol(cart.price) }}</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button
                  class="action-minus"
                  title="Quantity Minus"
                  :disabled="cart.quantity === 1 ? true : false"
                  @click.prevent="cartDecrement(index)"
                >
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  :value="cart.quantity"
                /><button
                  class="action-plus"
                  title="Quantity Plus"
                  @click.prevent="cartIncrement(cart)"
                >
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>{{ $filters.currencySymbol(cart.price * cart.quantity) }}</h6>
            </div>
          </div>
        </li>
      </ul>
      <div class="cart-footer">
        <button class="coupon-btn" @click="couponBtn">
          Do you have a coupon code?
        </button>
        <form class="coupon-form">
          <input type="text" placeholder="Enter your coupon code" /><button
            type="submit"
          >
            <span>apply</span>
          </button>
        </form>
        <router-link :to="{ name: 'checkout' }" class="cart-checkout-btn">
          <span class="checkout-label">Proceed to Checkout</span
          ><span class="checkout-price">{{
            $filters.currencySymbol(totalPrice)
          }}</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>
