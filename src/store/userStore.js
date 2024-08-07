import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // 初始时没有用户信息
  }),
  actions: {
    login(credentials) {
      return new Promise((resolve, reject) => {
        // 假设这是你的登录请求函数
        fakeLoginRequest(credentials)
          .then(response => {
            if (response.success) {
              // 更新用户信息
              this.user = response.user;
              resolve();
            } else {
              reject('登录失败');
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout() {
      // 清除用户信息
      this.user = null;
    },
  },
});

// 假设的登录请求函数（在实际应用中，你应该从API获取这个）
function fakeLoginRequest(credentials) {
  return new Promise((resolve, reject) => {
    // 模拟异步请求
    setTimeout(() => {
      if (credentials.username === 'user' && credentials.password === 'pass') {
        resolve({ success: true, user: { id: 1, name: 'John Doe' } });
      } else {
        reject('用户名或密码错误');
      }
    }, 1000);
  });
}