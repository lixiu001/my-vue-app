<template>
  <div class="release-info">
    <div class="title">发版信息</div>
    <a-form :model="formData" name="basic" layout="inline" class="release-info-form">
      <a-form-item v-if="formData.no4 === '2'" label="预生产发版单号：" name="no1" :rules="[{ required: isEdit, message: '' }]">
        <a-input style="width: 200px" v-if="isEdit" v-model:value="formData.no1" placeholder="请输入" clearable />
        <span v-else>{{ formData.no0 }}</span>
      </a-form-item>
      <a-form-item v-if="formData.no4 === '1'"  label="禅道需求单号：" name="no1" :rules="[{ required: isEdit, message: '' }]">
        <a-input style="width: 200px" v-if="isEdit" v-model:value="formData.no1" placeholder="请输入" clearable />
        <span v-else>{{ formData.no1 }}</span>
      </a-form-item>
      <a-form-item label="计划发版本时间：" name="no2" :rules="[{ required: isEdit, message: '' }]">
        <a-date-picker style="width: 200px"  v-if="isEdit" v-model:value="formData.no2" :locale="locale" :show-time="{ defaultValue: dayjs('00:00', 'HH:mm') }"
          format="YYYY-MM-DD HH:mm" placeholder="请选择" :disabled-date="disabledDate" />
        <span v-else>{{ formData.no2 }}</span>
      </a-form-item>
      <a-form-item label="发版云区选择：" name="no3" :rules="[{ required: isEdit, message: '' }]">
        <a-checkbox-group style="width: 200px"  v-if="isEdit" v-model:value="formData.no3" name="checkboxgroup" :options="cloudArea" />
        <span v-else>{{ environmentText }}</span>
      </a-form-item>
      <a-form-item label="发版环境选择：" name="no4" :rules="[{ required: isEdit, message: '' }]">
        <a-radio-group style="width: 200px"  v-if="isEdit" v-model:value="formData.no4" name="radioGroup">
          <a-radio value="1">预生产</a-radio>
          <a-radio value="2">正式区</a-radio>
        </a-radio-group>
        <span v-else>{{ formData.no4 === '1' ? '预生产' : '正式区' }}</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive, computed } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs, { Dayjs } from 'dayjs';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({
      no0: '134',
      no1: '134',
      no2: '',
      no3: ['1'],
      no4: '1',
    }),
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
});
const formData = reactive(props.formData);
const cloudArea = ref([
  { label: '华为云', value: '1' },
  { label: '微软云', value: '2' }
])
const environmentText = computed(() => {
  const no3 = formData.no3;
  const environments = [];
  if (no3.includes('1')) environments.push('华为云');
  if (no3.includes('2')) environments.push('微软云');
  return environments.join(' ');
});



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

    span {
      margin-right: 32px;
    }
  }
  :deep(.ant-form-item){
    width: 350px;
  }

  :deep(.ant-form-item .ant-form-item-label >label) {
    color: #3C4968;
    width: 130px;
    margin-right: 8px;
    overflow: hidden;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: end;
  }

  :deep(span) {
    color: #1A2446;
  }
}
</style>