import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'; 
import Chat from '../views/Chat.vue'; 
import Robot from '../views/Robot.vue'; 
import ReleaseEmergency from '../views/ReleaseEmergency.vue'; 
import Approval from '../views/Approval.vue'; 
import EditReleaseRequest from '../views/EditReleaseRequest.vue'; 
const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: Login,
  // },
  {
    path: '/',
    name: 'Chat',
    component: Chat,
  },
  // {
  //   path: '/',
  //   name: 'ReleaseEmergency',
  //   component: ReleaseEmergency
  // },
   // {
  //   path: '/',
  //   name: 'ReleaseEmergency',
  //   component: ReleaseEmergency
  // },
  {
    path: '/robot',
    name: 'robot',
    component: Robot,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/edit-release-emergency',
    name: 'EditReleaseRequest',
    component: EditReleaseRequest
  },
  {
    path: '/release-emergency',
    name: 'ReleaseEmergency',
    component: ReleaseEmergency
  },
  {
    path: '/approval',
    name: 'Approval',
    component: Approval
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
