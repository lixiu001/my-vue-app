import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue'; 
import Chat from '../views/Chat.vue'; 
const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat,
  },
  // {
  //   path: '/',
  //   name: 'login',
  //   component: Login,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
