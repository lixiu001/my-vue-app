import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.ts';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css';

const pinia = createPinia()
createApp(App)
  .use(pinia)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
