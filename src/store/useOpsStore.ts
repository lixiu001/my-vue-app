import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOpsStore = defineStore('optionsStore', () => {
  const options = ref();
  const reasons = ref();

  // 从接口获取数据
  const fetchOptions = async () => {
    // try {
    //   const response = await fetch('/api/options');
    //   const data = await response.json();
    //   options.value = data;
    // } catch (error) {
    //   console.error('Failed to fetch options:', error);
    // }
    options.value = [
      { label: '到款认领', id: 'CRR' },
      { label: '智体平台', id: 'AGT' },
    ]
  };

  const fetchReasons = async () => {
    // try {
    //   const response = await fetch('/api/reasons');
    //   const data = await response.json();
    //   reasons.value = data;
    // } catch (error) {
    //   console.error('Failed to fetch reasons:', error);
    // }
    reasons.value = [
      { label: '版本更新', id: '版本更新' },
      { label: '修复bug', id: '修复bug' },
    ]
  };

  return {
    options,
    reasons,
    fetchOptions,
    fetchReasons,
  };
});
