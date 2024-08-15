import axios from 'axios';

const apiClient = axios.create({
  baseURL:'http://192.168.7.175:32621/restful/standard/interactive/',
  timeout: 10000, 
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('未授权，请重新登录');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;