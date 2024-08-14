<template>
  <div class="edit-release-request">
    <ReleaseHeader :title="紧急发版" />
    <div class="main">
      <div class="left">
        <ReleaseProgress />
      </div>
      <div class="right">
        <main class="content">
          <ReleaseInfo />
          <ReleaseContent ref="releaseContentRef" />
        </main>
      </div>
    </div>

    <footer class="footer">
      <a-button class="default-button" @click="handleCancel">终止发版</a-button>
      <a-button class="primary-button" @click="handleSubmit">提交</a-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref , createVNode} from 'vue'
import { useRouter } from 'vue-router';
import ReleaseHeader from '../components/ReleaseHeader.vue';
import ReleaseInfo from '../components/ReleaseInfo.vue';
import ReleaseContent from '../components/ReleaseContent.vue';
import ReleaseProgress from '../components/release/ReleaseProgress.vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const releaseContentRef = ref();
const router = useRouter();

const handleCancel = () => {
  // Modal.warning({
  //   title: '确定要终止发版吗？',
  //   content: '一旦终止不可撤回，请谨慎操作。',
  //   cancelText: '取消',
  //   okText: '终止',
  //   onOk() {
  //     router.push('/chat');
  //   },
  // });

  Modal.confirm({
    title: '确定要终止发版吗？',
    icon: createVNode(ExclamationCircleOutlined),
    content: '一旦终止不可撤回，请谨慎操作。',
    cancelText: '取消',
    okText: '确定',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
}

const handleSubmit = () => {
  if (releaseContentRef.value.empty) {
    return
  }
  router.push('/chat');
}

</script>

<style scoped>
.edit-release-request {
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    background: #F7F9FF;
    border-radius: 3px;
    overflow: hidden;
  }

  .left {
    width: 264px;
    height: 100%;
    margin-right: 16px;
    padding: 20px;
    background-color: #7295FF;
    background-image: url(/src/assets/bgc.png);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: auto, cover;
    overflow: auto;
  }

  .right {
    flex: 1;
    overflow: auto;

    .content{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .footer {
    height: 64px;
    background: #FFFFFF;
    box-shadow: 0 -4px 8px 0 #1a24460d;
    display: flex;
    justify-content: center;
    align-items: center;

    .default-button {
      width: auto;
    }
  }
}
</style>