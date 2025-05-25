import { createApp } from 'vue'
import './style.css'
import './template.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "skeleton-screen-css";


import App from './App.vue'
import router from "./router";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);


app.config.globalProperties.$filters = {
  currencySymbol(value) {
    return "$ " + value.toLocaleString();
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



app.mount("#app");