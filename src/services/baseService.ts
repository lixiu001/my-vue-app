
import apiClient from './apiClient';
import { LoginParams } from '../interface';
export const login = async (params: LoginParams,rememberMe: boolean) => {
  try {
    const response = await apiClient.post('/login', params);
    const { token } = response.data;
    if (token) {
      if (rememberMe) {
        localStorage.setItem('token', token); 
      } else {
        sessionStorage.setItem('token', token);
      }
    }
    return response.data.response;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};