import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.ts';
import 'ant-design-vue/dist/reset.css';
import './style.css';

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
