<template>
  <div class="emergency-release-container">
    <ReleaseHeader :title="紧急发版申请" />
    <main class="main-content">
      <ReleaseInfo />
      <ReleaseContent ref="releaseContentRef" />
    </main>
    <footer class="footer">
      <a-button class="default-button" @click="handleCancel">取消</a-button>
      <a-button class="primary-button" @click="handleSubmit">提交</a-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import ReleaseHeader from '../components/ReleaseHeader.vue';
import ReleaseInfo from '../components/ReleaseInfo.vue';
import ReleaseContent from '../components/ReleaseContent.vue';
const releaseContentRef = ref();
const router = useRouter();

const handleCancel = () => {
  router.push('/chat');
}

const handleSubmit = () => {
  if(releaseContentRef.value.empty){
    return
  }
  router.push('/chat');
}

</script>

<style scoped>
.emergency-release-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F7F9FF;

  .main-content {
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .footer {
    height: 64px;
    background: #FFFFFF;
    box-shadow: 0 -4px 8px 0 #1a24460d;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :depp(.el-form-item__label) {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #3C4968 !important;
  }
}
</style>