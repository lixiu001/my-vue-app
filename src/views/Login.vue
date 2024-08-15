<template>
  <div class="login">
    <span class="title">欢迎登陆</span>
    <a-form ref="ruleFormRef" :model="formState" name="basic" autocomplete="off">
      <a-alert class="error-message" v-if="showErrorMessage" message="用户名或密码错误" type="error" show-icon closable
        @close="closeErrorMessage" />
      <a-form-item name="userNname">
        <a-input v-model:value="formState.userName" placeholder="用户名" />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="formState.password" placeholder="密码" />
      </a-form-item>
      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button class="login-button" type="primary" :class="buttonClass" @click="loginUser()">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { login } from '../services/baseService';
const router = useRouter();
const active = ref(false);
const formState = reactive({
  userName: 'liyxb@digiwin.com',
  password: 'Liyanxiu000000',
  remember: false,
  tenantId: ''
})
const showErrorMessage = ref(false);
const buttonClass = computed(() => {
  return formState.userName && formState.password ? 'login-button-active' : 'login-button-inactive';
});

const loginUser = async () => {
  showErrorMessage.value = false;
  if (!formState.userName || !formState.password) {
    message.error('请填写用户名或密码!');
    return;
  }
  if (!active.value) {
    active.value = true;
    const params = {
      userName: formState.userName,
      password: formState.password,
      tenantId: formState.tenantId,
    }
    const result = await login(params, formState.remember);
    showErrorMessage.value = result.code !== '0' 
    if (result.code === '0') {
      ipcRenderer.send('login-success')
    }
  }
  active.value = false;
}

const closeErrorMessage = () => {
  showErrorMessage.value = false;
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  padding: 0px 44px;

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

  .ant-form {
    width: 100%;

    .ant-form-item:first-child {
      margin-bottom: 32px;
    }

    .ant-input-affix-wrapper {
      background: #F1F4F8;
      border-radius: 3px;
      height: 48px;

      .ant-input {
        background: #F1F4F8;
      }
    }

    .ant-input {
      min-width: 350px;
      height: 48px;
      background: #F1F4F8;
      border-radius: 3px;
    }
  }

  :deep(.ant-input-affix-wrapper >input.ant-input) {
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
}
</style>
