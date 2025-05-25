import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

import { Index, ShopPage, SingleProduct, CheckOut, OrderDone } from "@/views/pages";
import { SellerList, SellerStore, SellerApply } from "@/views/pages/seller";
import { UserLogin, UserRegister } from "@/views/auth/index.js";
import { MyProfile, MyOrders, MyWishlist, OrderDeatils } from "@/views/user";
import { useAuth } from "@/stores";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    meta: { title: "Home" },
  },
  {
    path: "/auth/login",
    name: "user.login",
    component: UserLogin,
    meta: { title: "Login", guest: true },
  },
  {
    path: "/auth/register",
    name: "user.register",
    component: UserRegister,
    meta: { title: "Register", guest: true },
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopPage,
    meta: { title: "Shop" },
  },
  {
    path: "/seller-list",
    name: "seller.list",
    component: SellerList,
    meta: { title: "Seller List" },
  },
  {
    path: "/seller-store/:slug",
    name: "seller.store",
    component: SellerStore,
    meta: { title: "Seller Store" },
  },
  {
    path: "/seller-apply",
    name: "seller.apply",
    component: SellerApply,
    meta: { title: "Seller Apply" },
  },
  {
    path: "/My-profile",
    name: "user.profile",
    component: MyProfile,
    meta: { title: "My Profile", requiresAuth: true },
  },
  {
    path: "/My-oders",
    name: "user.orders",
    component: MyOrders,
    meta: { title: "My Orders", requiresAuth: true },
  },
  {
    path: "/My-wishlist",
    name: "user.wishlist",
    component: MyWishlist,
    meta: { title: "My Wishlist", requiresAuth: true },
  },
  {
    path: "/product/:slug",
    name: "product.details",
    component: SingleProduct,
    meta: { title: "Single Product" },
  },
  {
    path: "/Checkout",
    name: "checkout",
    component: CheckOut,
    meta: { title: "Checkout", requiresAuth: true },
  },
  {
    path: "/order/:id",
    name: "order.details",
    component: OrderDeatils,
    meta: { title: "order-details", requiresAuth: true },
  },

  {
    path: "/order-success",
    name: "orderdone.page",
    component: OrderDone,
    meta: { title: "order-success", requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

const default_title = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || default_title;
  NProgress.start();
  // check user loggedin
  const loggedIn = useAuth();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.user.meta) {
      next({ name: "user.login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn.user.meta) {
      next({ name: "user.profile" });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
