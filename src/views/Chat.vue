<template>
  <div class="chat-container">
    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type === 'sent' ? 'sent' : 'received']">
        <div class="mainInfo"> {{ msg.text }} </div>
        <div v-if="msg.showInfo" class="info">
          <div v-if="msg.infoType" :class="['info-icon', msg.infoType]"></div>
          <div class="info-message">
            <div class="main-message">{{ msg.mainInfo }}</div>
            <div class="additional-message">{{ msg.additionalInfo }}</div>
          </div>
        </div>
        <div v-if="msg.hasActionButton" class="message-actions" @click="clickActionMessage(msg)">
          {{ msg.actionButtonText }} >
        </div>
      </div>
    </div>

    <div class="input-container">
      <a-input v-model:value="inputMessage" placeholder="输入消息..."  @input="handleInput">
        <template #suffix>
          <i class="el-icon-s-promotion" style="cursor: pointer;"></i>
        </template>
      </a-input>
      <template v-if="showOptions">
        <ul class="enter-list">
          <li v-for="(item, index) in options" :key="index" @click="navigateTo(item.url)">
            {{ item.title }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '../interface/chat';

const chatWindow = ref();
const messages = ref<Message[]>([]);
const inputMessage = ref('');
const showOptions = ref(false);
const options = ref([
  { title: '紧急发版申请', url: '/release-emergency' },
  { title: '发版申请进度查询', url: '/release-progress' }
]);
const router = useRouter();
const navigateTo = (url: string) => {
  router.push(url);
};

const handleInput = (target: string) => {
  showOptions.value = target?.includes('@');
};

const clickActionMessage = (msg: Message) => {
  console.log(msg);
  // router.push({ name: 'Detail', query: { message: JSON.stringify(msg) } })
}

const sendMessage = async () => {
  if (inputMessage.value.trim()) {
    messages.value.push({ text: inputMessage.value, type: 'sent' });
    inputMessage.value = '';
    // 模拟接收到的消息
    setTimeout(() => {
      messages.value.push({
        text: '收到: ' + inputMessage.value,
        type: 'received',
        showInfo: true,         // 是否显示提示信息
        infoType: 'success', // 'success' | 'error' | 'warning';
        mainInfo: '发布失败！',      // 主要提示信息
        additionalInfo: '失败原因: XXXXX',
        hasActionButton: true,
        actionButtonText: '查看详情',
        link: {
          url: '',            // 链接的 URL
          text: '',           // 链接的文本
          metadata: {},
        }
      });
    }, 1000);
    await nextTick();
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  } else {
    console.error('消息不能为空');
  }
};
</script>

<style scoped lang="less">
.chat-container {
  width: 360px;
  height: 100%;
  background: #F7F9FF;
  border: 1px solid #ADC8FF;
  box-shadow: 0 8px 32px 0 #00239a2e;
  border-radius: 8px;
  filter: blur(0);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .chat-window {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    padding-right: 12px;

    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    .message {
      padding: 12px;
      margin-bottom: 8px;
      background: #FFFFFF;
      border-radius: 3px 9px 9px 9px;
      cursor: pointer;
    }

    .sent {
      background-color: blue;
      color: white;
      align-self: flex-end;
    }

    .received {
      background-color: white;
      color: black;
      align-self: flex-start;
    }
  }



  .input-container {
    display: flex;
    align-items: center;
    bottom: 16px;
    width: -webkit-fill-available;
    margin-right: 20px;
    position: relative;

    .enter-list {
      position: absolute;
      background: #fff;
      height: 50px;
      bottom: 45px;
      font-family: PingFangSC-Regular;
      color: #8794AB;
      padding: 8px;
      cursor: pointer;
      li {
        font-size: 13px;
        margin-bottom: 8px;
      }
    }

    :deep(.el-input__wrapper) {
      box-shadow: 0 1px 0 0 #dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset, 1px 0 0 0 #dcdfe6 inset;
    }

    .el-input-group {
      height: 40px;
    }

    :deep(.el-input-group__append) {
      background-color: #fff;
    }

    .el-icon-s-promotion {
      width: 24px;
      height: 40px;
      background-image: url('../assets/send.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

:deep(.tip-popover) {
  background-color: red;
}
</style>
