import '../bootstrap';
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "skeleton-screen-css";
import router from '@/seller/router';
import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router);
app.use(ElementPlus);
app.use(pinia);

app.config.globalProperties.$filters = {
    currencySymbol(value) {
      return "৳ " + value.toLocaleString();
    },
    makeImagePath(img) {
      return import.meta.env.VITE_API_URL + "/" + img;
    },
    textShort(text, size) {
      if (!text) return "";
      text = text.toString();
  
      if (text.length <= size) {
        return text;
      }
      return text.substr(0, size) + ".....";
    },
  };
  
app.mount('#app')