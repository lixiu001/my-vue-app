<template>
  <div class="chat-container">
    <div class="title">
      <img src="../assets/robot.png" alt="">
      数字人
      <CloseOutlined />
    </div>
    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type === 'SEND' ? 'send' : 'received']">
        <div :class="['mainInfo', msg.type === 'SEND' ? 'send' : 'received']"> {{ msg.text }} </div>
        <div v-if="msg.tipInfo" :class="{
          'tip-info': true,
          'error-bgc': msg.tipInfo.tipIconType === 'ERROR',
          'success-bgc': msg.tipInfo.tipIconType === 'SUCCESS',
          'warning-bgc': msg.tipInfo.tipIconType === 'WARNING',
        }">
          <div v-if="msg.tipInfo.showTipIcon" :class="['info-icon', msg.tipInfo.tipIconType]"></div>
          <div class="info-message" >
            <div class="main-message" :class="{
              'error-tip': msg.tipInfo.tipIconType === 'ERROR',
              'success-tip': msg.tipInfo.tipIconType === 'SUCCESS',
              'warning-tip': msg.tipInfo.tipIconType === 'WARNING',
              'info-tip': msg.tipInfo.tipIconType === 'INFO'
            }">
              {{ msg.tipInfo.mainInfo }}</div>
            <div class=" additional-message">{{ msg.tipInfo.additionalInfo }}</div>
          </div>
        </div>
        <div class="list-link" v-if="msg.displayType === 'LIST'">
          <div class="list-link-item" v-for="(item, index) in msg.list" :key="index">
            {{ item.title }}
          </div>
        </div>
        <div class="execute-link" v-if="msg.displayType === 'EXECUTE_LINK'">
          <div class="link-item" v-for="(item, index) in msg.list" :key="index">
            {{ item.title }}
            <span style="margin-left: 4px;">></span>
          </div>
        </div>
      </div>
    </div>

    <div class="input-container">
      <a-input v-model:value="inputMessage" placeholder="输入消息..." @input="handleInput" @keydown="handleKeydown">
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
import { Message } from '../interface';
import { CloseOutlined } from '@ant-design/icons-vue';
const chatWindow = ref();
const messages = ref<Message[]>([
  {
    text: "你好！紧急发版提交成功!",  // 消息内容
    type: 'RECEIVED'  // 发送或接收
  },
  {
    text: "你好，发版申请被驳回，请您修改！", // 消息内容
    type: 'RECEIVED',  // 发送或接收
    displayType: "LIST",// 展示执行链接   
    list: [
      { title: 'PREBM-STSC240720001', url: '', code: '' },
      { title: 'PREBM-STSC240720001', url: '', code: '' },
      { title: 'PREBM-STSC240720001', url: '', code: '' },
    ]
  },
  {
    text: "你好，发版申请被驳回，请您修改！", // 消息内容
    type: 'RECEIVED',  // 发送或接收
    tipInfo: {
      showTipIcon: false,
      tipIconType: 'INFO', // 提示信息的类型 'SUCCESS' | 'ERROR' | 'WARNING' / 'INFO';
      mainInfo: '驳回原因：发版时间修改！',       // 主要提示信息
    },
  },
  {
    text: "你好，发版申请被驳回，请您修改！", // 消息内容
    type: 'RECEIVED',  // 发送或接收
    tipInfo: {
      showTipIcon: true,
      tipIconType: 'ERROR', // 提示信息的类型 'SUCCESS' | 'ERROR' | 'WARNING' / 'INFO';
      mainInfo: '发版申请被驳回',       // 主要提示信息
      additionalInfo: '驳回原因: SQL执行报错',   // 附加提示信息
    },
    displayType: "EXECUTE_LINK",// 展示执行链接   
    list: [
      { title: '点击修改', url: '', code: '' }
    ]
  },
  {
    text: "你好，发版申请被驳回，请您修改！", // 消息内容
    type: 'RECEIVED',  // 发送或接收
    tipInfo: {
      showTipIcon: true,
      tipIconType: 'SUCCESS', // 提示信息的类型 'SUCCESS' | 'ERROR' | 'WARNING' / 'INFO';
      mainInfo: '验证成功！',       // 主要提示信息
      additionalInfo: '通过原因：符合发版条件',   // 附加提示信息
    },
    displayType: "EXECUTE_LINK",// 展示执行链接   
    list: [
      { title: '查看详情', url: '', code: '' }
    ]
  },
  {
    text: "你好，发版申请被驳回，请您修改！", // 消息内容
    type: 'RECEIVED',  // 发送或接收
    tipInfo: {
      showTipIcon: true,
      tipIconType: 'WARNING', // 提示信息的类型 'SUCCESS' | 'ERROR' | 'WARNING' / 'INFO';
      mainInfo: '验证部分成功！',       // 主要提示信息
      additionalInfo: '失败原因：XXXXXXXXX',   // 附加提示信息
    },
    displayType: "EXECUTE_LINK",// 展示执行链接   
    list: [
      { title: '查看详情', url: '', code: '' }
    ]
  },
  {
    text: "你好！点击链接提交紧急发版",  // 消息内容
    type: 'RECEIVED',  // 发送或接收
    displayType: "LIST",// 展示成清单列表
    list: [
      { title: '紧急发版申请', url: '/emergency-release', agentCode: "", agentVersion: '' }
    ]
  }
]);
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

const handleInput = (event: string) => {
  showOptions.value = event?.target?._value?.includes('@');
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
};

const clickActionMessage = (msg: Message) => {
  sendMessage();
}

const sendMessage = async () => {
  if (inputMessage.value.trim()) {
    messages.value.push({ text: inputMessage.value, type: 'SENT' });
    inputMessage.value = '';
    // 模拟接收到的消息
    setTimeout(() => {
      messages.value.push({
        text: '王艳，检测到您有多个发版申请，请选择需要查询的对象：',
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

  .title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 16px;
    color: #1A2446;
    line-height: 18px;
    position: relative;

    img {
      width: 32px;
      height: 32px;
    }

    .anticon-close {
      position: absolute;
      right: 0px;
      top: 8px;
      width: 14px;
      height: 14px;
      color: #8794AB;
    }

  }

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
      margin-bottom: 16px;
      background: #FFFFFF;
      cursor: pointer;
      border-radius: 3px 9px 9px 3px;
    }

    .mainInfo {
      padding: 12px;
      line-height: 24px;
    }

    .send {
      background-color: blue;
      color: white;
      border-radius: 9px 6px 6px 9px;
    }

    .received {
      color: #1A2446;
    }

    .list-link-item {
      height: 36px;
      margin: 0 12px 4px 12px;
      padding: 12px;
      background: #EFF4FF;
      border-radius: 3px;
      color: #3366FF;
    }

    .list-link-item:last-child {
      margin-bottom: 16px;
    }

    .execute-link {
      padding: 8px;
      line-height: 24px;
      box-shadow: inset 0 1px 0 0 #E8EDF4;
      color: #3366FF;
      text-align: center;
    }

    .tip-info {
      margin: 0px 8px 16px 8px;
      padding: 16px;
      line-height: 24px;
      background: #EFF4FF;
      border-radius: 9px;
      display: flex;
    }

    .error-bgc {
      background: #FEF3EC;
    }

    .success-bgc {
      background: #F4FDE9;
    }

    .warning-bgc {
      background: #FEF9E5;
    }
    

    .info-icon {
      width: 48px;
      height: 48px;
      margin-right: 8px;
    }

    .main-message {
      font-weight: 500;
      line-height: 20px;
    }

    .ERROR {
      background-image: url(/src/assets/tiperror.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: inherit;
    }

    .SUCCESS {
      background-image: url(/src/assets/tipsucess.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: inherit;
    }

    .WARNING {
      background-image: url(/src/assets/tipwarning.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: inherit;
    }

    .additional-message {
      margin-top: 4px;
      font-size: 12px;
      color: #3C4968;
      line-height: 16px;
    }

    .error-tip {
      color: #F04943;
    }

    .success-tip {
      color: #4FC42A;
    }

    .warning-tip {
      color: #F1A300;
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
