import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.ts';
import SvgIcon from './components/SvgIcon.vue'
import 'ant-design-vue/dist/reset.css';
import './style.css';
import './assets/iconfont/iconfont.js';

const pinia = createPinia()

const app = createApp(App)
app.component('SvgIcon', SvgIcon);
app.use(pinia)
app.use(router)
app.mount('#app')
