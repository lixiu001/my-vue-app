<template>
  <header class="header">
    <div class="header-title">紧急发版申请</div>
    <CloseOutlined class="close-btn" color="#8794AB" @click="handleCancel" />
  </header>
</template>

<script setup lang="ts"></script>
import { CloseOutlined } from '@ant-design/icons-vue';

<style scoped>
.header {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: inset 0 -1px 1px 0 #E8EDF4;


  .header-title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 18px;
    color: #1a2446;
    line-height: 18px;
  }

  .close-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: none;
    background: none;
    font-size: 16px;
    color: #333;
  }
}
</style>
