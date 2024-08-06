<template>
  <div>
    <h1>消息详情</h1>
    <div v-if="message">
      <p>内容: {{ message.text }}</p>
      <p v-if="message.mainInfo">主要信息: {{ message.mainInfo }}</p>
      <p v-if="message.additionalInfo">附加信息: {{ message.additionalInfo }}</p>
      <!-- 根据需要显示更多内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const message = ref<any>(null)

onMounted(() => {
  if (route.query.message) {
    message.value = JSON.parse(route.query.message as string)
  }
})
</script>
