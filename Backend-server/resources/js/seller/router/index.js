import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import { useAuth } from "@/seller/stores";
import Index from "@/seller/pages/Home.vue";
import Login from "@/seller/pages/auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "seller.login",
    component: Login,
    meta: { title: "Login", guest: true },
  },
  {
    path: "/seller/home",
    name: "seller.home",
    component: Index,
    meta: { title: "Home", requiresAuth: true },
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
  const auth = useAuth();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.getAuthStatus) {
      next({ name: "seller.login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth.getAuthStatus) {
      next({ name: "seller.home" });
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
