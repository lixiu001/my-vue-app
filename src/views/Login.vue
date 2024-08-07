<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useRouter } from 'vue-router';
// import { login } from '../../services/login.js'; 

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const errorMessage = ref<string | null>(null);
const buttonClass = computed(() => {
  console.log(form.username);
  console.log(form.password);

  return form.username && form.password ? 'login-button-active' : 'login-button-inactive';
});

const login = async () => {
  try {
    const response = await fakeLoginRequest(form.username, form.password);
    if (response.success) {
      errorMessage.value = null;
      // localStorage.setItem('userInfo', JSON.stringify(form)); 
      const router = useRouter();
      router.push({ name: 'Chat' });
    } else {
      errorMessage.value = '用户名或密码错误';
    }
  } catch (error) {
    errorMessage.value = '用户名或密码错误';
  }
}

const closeErrorMessage = () => {
  errorMessage.value = null;
}

// 模拟的登陆请求
const fakeLoginRequest = (username: string, password: string) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};
</script>

<template>
   <RouterLink to="/">Go to Home</RouterLink>
   <RouterLink to="/chat">Go to About</RouterLink>
  <div class="login">
    <span class="title">欢迎登陆</span>
    <el-form ref="ruleFormRef" :model="form" status-icon>
      <el-alert class="error-message" v-if="errorMessage" title="用户名或密码错误" type="error" :closable="true" show-icon
        @close="closeErrorMessage" />
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-checkbox label="记住我" v-model="form.remember" />
      </el-form-item>
    </el-form>
    <el-button class="login-button" :class="buttonClass" @click="login()">登陆</el-button>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  .title {
    height: 48px;
    font-weight: 500;
    font-size: 32px;
    color: #1a2446;
    line-height: 48px;
    margin-bottom: 52px;
  }

  .error-message {
    min-width: 350px;
    height: 28px;
    background: #FEF3EC;
    border: 1px solid #F04943;
    border-radius: 3px;
    margin-bottom: 8px;
  }

  .el-form {
    width: 100%;

    .el-form-item:first-child {
      margin-bottom: 32px;
    }
  }

  .el-input {
    min-width: 350px;
    height: 48px;
    border-radius: 3px;
  }

  :deep(.el-input__wrapper) {
    background: #F1F4F8;
  }

  .login-button {
    width: 100%;
    min-width: 350px;
    ;
    height: 48px;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    background: #ADC8FF;
  }

  .login-button-active {
    background-color: blue;
  }

  .login-button-inactive {
    background: #ADC8FF;
  }

  :deep(.el-alert__close-btn) {
    top: 5px;
  }
}
</style>
