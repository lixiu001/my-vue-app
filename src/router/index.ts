import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'; 
import ReleaseEmergency from '../views/ReleaseEmergency.vue'; 
import ReleaseProgress from '../views/ReleaseProgress.vue'; 
import Chat from '../views/Chat.vue'; 
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/release-emergency',
    name: 'ReleaseEmergency',
    component: ReleaseEmergency
  },
  {
    path: '/release-progress',
    name: 'ReleaseProgress',
    component: ReleaseProgress
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
