import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import { useAuth } from "@/admin/stores";
import Index from "@/admin/pages/Home.vue";
import Login from "@/admin/pages/auth/Login.vue";
import FileUpload from "@/admin/pages/file-manager/Upload.vue";
import Files from "@/admin/pages/file-manager/Files.vue";
import BrandIndex from "@/admin/pages/brand/Index.vue";

const routes = [
  {
    path: "/admin/home",
    name: "admin.home",
    component: Index,
    meta: { title: "Home", requiresAuth: true },
  },
  {
    path: "/admin/login",
    name: "login",
    component: Login,
    meta: { title: "Login", guest: true },
  },
  {
    path: "/admin/file-upload",
    name: "file.upload",
    component: FileUpload,
    meta: { title: "File-Upload", requiresAuth: true },
  },
  {
    path: "/admin/files",
    name: "file.index",
    component: Files,
    meta: { title: "Files", requiresAuth: true },
  },
  {
    path: "/admin/brands",
    name: "admin.brand.index",
    component: BrandIndex,
    meta: { title: "Brand-List", requiresAuth: true },
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
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth.getAuthStatus) {
      next({ name: "admin.home" });
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
