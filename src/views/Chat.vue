<template>
  <div class="chat-container">
    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type === 'sent' ? 'sent' : 'received']">
        {{ msg.text }}
      </div>
    </div>

    <div class="input-container">
      <el-popover placement="top" :width="200" trigger="click" popper-class="tip-popover">
        <template #reference>
          <el-input v-model="inputMessage" placeholder="输入消息..." @input="handleInput" @keydown="handleKeydown">
            <template #append>
              <i class="el-icon-s-promotion" @click="sendMessage" style="cursor: pointer;"></i>
            </template>
          </el-input>
        </template>
        <div v-for="option in options" :key="option" :label="option" @click="selectOption(option)"> {{ option }} </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';

interface LinkMetadata {
  [key: string]: any;       // 可以存储任何额外的链接元数据
}

interface Message {
  text: string;  // 消息内容
  type: 'sent' | 'received';  // 发送或接收
  showInfo?: boolean;         // 是否显示提示信息
  infoType?: 'success' | 'error' | 'warning'; // 提示信息的类型
  mainInfo?: string;          // 主要提示信息
  additionalInfo?: string;    // 附加提示信息
  hasActionButton?: boolean;  // 是否存在执行按钮
  actionButtonText?: string;  // 执行按钮的文本
  link?: {
    url?: string;              // 链接的 URL
    text?: string;             // 链接的文本
    metadata?: LinkMetadata;  // 额外的链接元数据
  };
}

const chatWindow = ref(null);
const messages = ref([]);
const inputMessage = ref('');
const showOptions = ref(false);
const options = ref(['预生产紧急发版', '正式区紧急发版']);

const handleInput = (target: string) => {
  if (target.includes('@')) {
    showOptions.value = true;
  } else {
    showOptions.value = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

const sendMessage = async () => {
  if (inputMessage.value.trim()) {
    messages.value.push({ text: inputMessage.value, type: 'sent' });
    inputMessage.value = '';
    // 模拟接收到的消息
    setTimeout(() => {
      messages.value.push({ text: '收到: ' + inputMessage.value, type: 'received' });
    }, 1000);
    // Ensure DOM updates before scrolling
    await nextTick();
    // Scroll to bottom
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  } else {
    ElMessage.error('消息不能为空');
  }
};

const selectOption = (option: string) => {
  const atIndex = inputMessage.value.lastIndexOf('@');
  if (atIndex !== -1) {
    inputMessage.value = inputMessage.value.substring(0, atIndex) + option;
    showOptions.value = false;
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
      width: 50px;
      height: 50px;
      background-image: url('../assets/robot.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

:deep(.tip-popover) {
  background-color: red;
}
</style>
