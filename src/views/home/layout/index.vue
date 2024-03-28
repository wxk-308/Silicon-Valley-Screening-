<template>
  <div>layout</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/index'
const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.avatar) {
    await userStore.userInfo()
  }
  // console.log(userStore.avatar)
})
</script>
<style scoped lang="scss"></style>
