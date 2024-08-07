import api from './apiService';

function setAuthToken(token) {
  localStorage.setItem('userToken', token); 

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    setAuthToken(response.data.token); // 你需要实现这个函数
    return response.data;
  } catch (error) {
    throw new Error('登录失败', error);
  }
};
