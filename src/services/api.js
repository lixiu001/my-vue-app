// src/api/api.js
import axios from 'axios';

// 创建一个axios实例，并设置基础URL
const api = axios.create({
  baseURL: 'https://your-api-base-url.com/api',
  // 可以在这里设置其他axios配置项，如请求头、超时时间等
});

// 封装登录请求
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data; // 返回登录响应的数据
  } catch (error) {
    // 可以在这里处理错误，比如抛出错误或者返回一个错误对象
    throw new Error('登录失败', error);
  }
};

// 封装获取入口类清单请求
export const fetchEntryPointList = async () => {
  try {
    const response = await api.get('/entry-point-list'); // 假设的API端点
    return response.data; // 返回清单数据
  } catch (error) {
    throw new Error('获取入口类清单失败', error);
  }
};

// 你可以继续在这里封装更多的API请求