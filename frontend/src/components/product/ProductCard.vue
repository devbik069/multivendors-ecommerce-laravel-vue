<script setup>
import { ref } from "vue";
import { ProductPrice } from "@/components/product";
import { useCart, useNotification, useAuth, useWishlist, useModal } from "@/stores";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const auth = useAuth();
const wishlist = useWishlist();
const cart = useCart();
const notify = useNotification();
const modal = useModal();
const price = ref();

function addToCart(product) {
  // let productPrice;
  // if (product.discount) {
  //   const basePrice = product.price;
  //   const discount = product.discount / 100;
  //   const totalPrice = basePrice - basePrice * discount;
  //   productPrice = totalPrice.toFixed();
  // } else {
  //   productPrice = product.price.toString();
  // }
  // price.value = productPrice;

  // cart.addToCart({
  //   id: product.id,
  //   name: product.name,
  //   price: price.value,
  //   thumbnail: product.thumbnail,
  // });
  cart.addToCart(product);
  notify.Success(`${product.name} added to your cart`);
}

// wishlist

const addToWishlist = async (product) => {
  if (auth.user.data) {
    let res = await wishlist.addToWishlist(product);
    // console.log(res);
    if (res.status === 201) {
      notify.Success(`${product.name} Added Your Wishlist`);
    } else {
      notify.Success(`${product.name} Remove From Your Wishlist`);
    }
  } else {
    modal.openModal();
  }
};
</script>

<template>
  <div class="col">
    <div class="product-card">
      <div class="product-media">
        <div class="product-label">
          <label class="label-text new">{{ product.condition }}</label>
          <label class="label-text sale" v-if="product.discount"
            >{{ product.discount }}%</label
          >
        </div>
        <button
          class="product-wish wish"
          @click.prevent="addToWishlist(product)"
        >
          <i
            class="fas fa-spinner fa-spin cs_reed"
            v-if="wishlist.loading === product.id"
          ></i>
          <i class="fas fa-heart" v-else></i></button
        ><router-link
          :to="{ name: 'product.details', params: { slug: product.slug } }"
          class="product-image"
          ><img :src="$filters.makeImagePath(product.thumbnail)" alt="product"
        /></router-link>
      </div>
      <div class="product-content">
        <h6 class="product-name">
          <router-link
            :to="{ name: 'product.details', params: { slug: product.slug } }"
            >{{ product.name }}</router-link
          >
        </h6>

        <ProductPrice :price="product.price" :discount="product.discount" />

        <button
          class="product-add"
          title="Add to Cart"
          @click.prevent="addToCart(product)"
        >
          <i class="fas fa-shopping-basket"></i><span>Add</span>
        </button>
      </div>
    </div>
  </div>
</template>
