import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue'; 
// import Chat from '../views/Chat.vue'; 
// import Detail from '../views/Detail.vue'
const routes = [
  // {
  //   path: '/',
  //   name: 'Chat',
  //   component: Chat,
  // },
  // {
  //   path: '/detail',
  //   name: 'Detail',
  //   component: Detail
  // },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  // {
  //   path: '/axios',
  //   name: 'Axios',
  //   component: () => import('@/views/axios.vue') // 懒加载组件
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
