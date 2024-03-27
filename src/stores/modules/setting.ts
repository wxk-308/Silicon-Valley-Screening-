//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayOutSettingStore = defineStore('SettingStore', () => {
  const fold = ref(false)
  const refsh = ref(false)

  return { fold, refsh }
})
