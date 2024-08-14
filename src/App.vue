<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
// // 发送消息
// window.electron.ipcRenderer.send('login-success');
// // 监听消息
// window.electron.ipcRenderer.on('some-reply', (data) => {
//   console.log('Received data:', data);
// });
// // 移除监听
// window.electron.ipcRenderer.off('some-reply', yourCallbackFunction);
// // 异步请求数据
// const result = await window.electron.ipcRenderer.invoke('some-request', requestData);
// console.log('Received result:', result);

</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<style></style>
