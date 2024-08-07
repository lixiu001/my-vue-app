// src/services/apiService.js
import axios from 'axios';

function getAuthToken() {
  const token = localStorage.getItem('userToken'); // 假设token的键是'userToken'
  return token;
}

const api = axios.create({
  baseURL: 'https://your-api-base-url.com/api',
  // 其他axios配置...
});

// 设置请求拦截器（可选）
api.interceptors.request.use(config => {
  // 在这里处理凭据，比如从localStorage、Vuex或其他地方获取token
  // 假设有一个函数getAuthToken()用于获取token
  const token = getAuthToken(); // 你需要实现这个函数
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // 处理请求错误
  return Promise.reject(error);
});

// 导出axios实例，以便在其他文件中使用
export default api;

// 注意：这里没有实现getAuthToken函数，你需要根据你的应用来实现它