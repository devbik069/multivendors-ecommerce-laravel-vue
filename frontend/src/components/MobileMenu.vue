<script setup>
import { useCart, useCategory, useAuth, useNotification } from "@/stores";
import { CategoryDropdown } from "@/components";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
const cart = useCart();
const auth = useAuth();
const router = useRouter();
const navData = useCategory();
const { navCats } = storeToRefs(navData);
const { cartItemsCount } = storeToRefs(cart);
const notify = useNotification();
const { user } = storeToRefs(auth);

onMounted(() => {
  navData.navCategory();
});

const userLogout = async () => {
  const res = await auth.logout();
  if (res.status) {
    CateClose();
    router.push({ name: "index" });
    notify.Info("Logout Success");
  }
};

function menuClose() {
  $("body").css("overflow", "inherit"),
    $(".nav-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
}

function cartBtn() {
  cart.toggleCartSidebar();
}

function cateBtn() {
  $("body").css("overflow", "hidden"),
    $(".category-sidebar").addClass("active");
}

function CateClose() {
  $("body").css("overflow", "inherit"),
    $(".category-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
}
</script>
<template>
  <div>
    <aside class="category-sidebar">
      <div class="category-header">
        <h4 class="category-title">
          <i class="fas fa-align-left"></i><span>categories</span>
        </h4>
        <button class="category-close" @click="CateClose">
          <i class="icofont-close"></i>
        </button>
      </div>
      <ul class="category-list">
        <CategoryDropdown
          v-for="(cat, index) in navCats?.data"
          :key="index"
          :category="cat.name"
        >
          <li v-for="(subcat, i) in cat.subcategories" :key="i">
            <a href="">{{ subcat.name }} </a>
          </li>
        </CategoryDropdown>
      </ul>
      <div class="category-footer">
        <p>All Rights Reserved by <a href="#">W3Coders</a></p>
      </div>
    </aside>

    <aside class="nav-sidebar">
      <div class="nav-header">
        <RouterLink to="/"
          ><img src="@/assets/images/logo.png" alt="logo" /></RouterLink
        ><button class="nav-close">
          <i class="icofont-close" @click="menuClose"></i>
        </button>
      </div>
      <div class="nav-content">
        <ul class="nav-list">
          <li>
            <RouterLink to="/" class="nav-link"
              ><i class="icofont-home"></i>Home</RouterLink
            >
          </li>

          <li>
            <RouterLink :to="{ name: 'shop' }" class="nav-link"
              ><i class="icofont-basket"></i>Shop Page</RouterLink
            >
          </li>

          <li>
            <a class="nav-link" href="contact.html"
              ><i class="icofont-contacts"></i>contact us</a
            >
          </li>

          <li v-if="auth.user.data">
            <a class="nav-link" @click="userLogout" role="button" tabindex="0"
              ><i class="icofont-logout"></i>logout</a
            >
          </li>
        </ul>
        <div class="nav-info-group">
          <div class="nav-info">
            <i class="icofont-ui-touch-phone"></i>
            <p><small>call us</small><span>(+880) 183 8288 389</span></p>
          </div>
          <div class="nav-info">
            <i class="icofont-ui-email"></i>
            <p><small>email us</small><span>support@greeny.com</span></p>
          </div>
        </div>
      </div>
    </aside>
    <!-- mobile footer menu  -->
    <div class="mobile-menu">
      <a
        href="/"
        class="active router-link-exact-active"
        title="Home Page"
        aria-current="page"
        ><i class="fas fa-home"></i><span>Home</span></a
      >
      <button class="cate-btn" @click="cateBtn" title="Category List">
        <i class="fas fa-list"></i><span>category</span>
      </button>
      <button class="cart-btn" @click="cartBtn" title="Cartlist">
        <i class="fas fa-shopping-basket"></i><span>Cart</span
        ><sup>{{ cartItemsCount }}</sup>
      </button>

      <RouterLink
        v-if="auth.user.data"
        :to="{ name: 'user.wishlist' }"
        title="Wishlist"
      >
        <i class="fas fa-heart"></i><span>Wishlist</span
        ><sup>{{ user.meta.wishlists.length }}</sup>
      </RouterLink>

      <RouterLink :to="{ name: 'user.login' }" class="" title="My Account"
        ><i class="fas fa-user"></i><span>My Account</span></RouterLink
      >
    </div>
  </div>
</template>
