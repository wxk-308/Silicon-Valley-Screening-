import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/stores/index'
import { useUserStore } from '@/stores/index'
import { GET_TOKEN } from '@/utils/token'

const userStore = useUserStore(pinia)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  next()
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
