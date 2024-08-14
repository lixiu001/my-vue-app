<template>
  <div class="release-progress ">
    <p class="title">发版进度</p>
    <div v-for="(item, index) in versionData" :key="index" class="item">
      <div class="circle"></div>
      <div class="item-title">{{ item.title }}</div>
      <div class="sub-info">
        <p v-if="item.type === 'approve'">审批人：{{ item.approverName }}</p>
        <p v-if="item.type === 'approve'">审批时间：{{ item.approvalTime }}</p>
        <p v-if="item.status === 'rejected'">驳回原因：{{ item.rejectionReason }}</p>
        <p v-if="item.type === 'add'">申请人：{{ item.applicant }}</p>
        <p v-if="item.type === 'add'">申请时间：{{ item.applyTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const versionData = ref([
  {
    title: '总经理驳回',
    approverName: '李兵', // 审批人
    approvalTime: '2024-01-02 12:00:09', // 审批时间
    rejectionReason: '选择发版时间不当，避开客户生产时间。',// 驳回原因
    status: 'rejected', // 新增状态字段
    type: 'approve', // 新增类型字段，用于区分不同的审批类型
  },
  {
    title: 'SM审批通过',
    approverName: '丁丽',
    approvalTime: '2024-01-02 12:00:09',
    status: 'approved', // 新增状态字段
    type: 'approve', // 新增类型字段
  },
  {
    title: '新增发版申请',
    applicant: '研发王艳',
    applyTime: '2024-01-01 12:00:09',
    status: 'add', // 空状态，表示这是一个新的发版申请
    type: 'add', // 新增类型字段
  }
]);
</script>

<style scoped>
.release-progress {
  width: 100%;
  height: 100%;

  .title {
    height: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 16px;

  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    position: absolute;
    background: hsl(225, 100%, 72%);
    position: absolute;
    top: 0px;
    left: -7px;
  }

  .circle:hover{
    background: #fff;
  }


  .item {
    padding-left: 14px;
    border-left: 1px dashed #fff;
    position: relative;

    .item-title {
      height: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0;
    }

    .sub-info {
      margin-top: 8px;

      p {
        margin-bottom: 4px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 12px;
        color: #f8f9fb;
        letter-spacing: 0;
        line-height: 16px;
      }

      p:last-child {
        padding-bottom: 20px;
      }

    }
  }

  .item:last-child {
    border-left: none;
  }
}
</style>