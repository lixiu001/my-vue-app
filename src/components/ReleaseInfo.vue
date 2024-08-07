<template>
  <div class="release-info">
    <div class="title">发版信息</div>
    <a-form :model="formState" name="basic" layout="inline" class="release-info-form">
      <a-form-item label="禅道需求单号：" name="no1" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="formState.no1" placeholder="请输入" clearable />
      </a-form-item>
      <a-form-item label="计划发版本时间：" name="no2" :rules="[{ required: true, message: '' }]">
        <a-date-picker v-model:value="formState.no2" :locale="locale" :show-time="{ defaultValue: dayjs('00:00', 'HH:mm') }"
          format="YYYY-MM-DD HH:mm" placeholder="请选择" :disabled-date="disabledDate" />
      </a-form-item>
      <a-form-item label="发版云区选择：" name="no3" :rules="[{ required: true, message: '' }]">
        <a-checkbox-group v-model:value="formState.no3" name="checkboxgroup" :options="cloudArea" />
      </a-form-item>
      <a-form-item label="发版环境选择：" name="no4" :rules="[{ required: true, message: '' }]">
        <a-radio-group v-model:value="formState.no4" name="radioGroup">
          <a-radio value="1">预生产</a-radio>
          <a-radio value="2">正式区</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs, { Dayjs } from 'dayjs';

const formState = ({
  no1: '',
  no2: '',
  no3: [],
  no4: '',
})
const cloudArea = ref([
  { label: '华为云', value: '1' },
  { label: '微软云', value: '2' }
])

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};

</script>

<style scoped>
.release-info {
  background: #FFFFFF;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 16px;

  .release-info-form {
    padding-left: 14px;
  }

  .title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 16px;
    color: #1A2446;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 16px;
  }

  .ant-form-item {
    margin-bottom: 12px;
  }

  :deep(.ant-form-item .ant-form-item-label >label) {
    color: #3C4968;
  }
  :deep(span) {
      color: #1A2446;
    }
}
</style>