import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
//导入全局样式
import '@/styles/index.scss'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
import gloalComponent from '@/components'
// 完整引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(gloalComponent)
app.mount('#app')
