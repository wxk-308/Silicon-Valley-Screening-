import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLogin, getUserInfo, loginOutUser } from '@/api/user/index'
import type {
  loginFormData,
  loginResponseData,
  responseUser
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

export const useUserStore = defineStore(
  'user',
  () => {
    let token: string | null = GET_TOKEN()
    const username = ref<string>('')
    const avatar = ref<string>('')
    const userLogin = async (data: loginFormData) => {
      const res: loginResponseData = await getLogin(data)

      if (res.code === 200) {
        token = res.data.token as string
        SET_TOKEN(res.data.token as string)
        // localStorage.setItem('token', res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
    const userInfo = async () => {
      const res = await getUserInfo()
      if (res.code === 200) {
        username.value = res.data.checkUser.username
        avatar.value = res.data.checkUser.avatar
      }
    }
    const userLogout = async () => {
      //发送退出登录的请求
      const res = await loginOutUser(token as string)

      //清空本地的用户信息
      REMOVE_TOKEN()
      token = ''
      username.value = ''
      avatar.value = ''

      //路由跳转到登录界面
    }
    return { token, username, avatar, userLogin, userInfo, userLogout }
  },
  {
    persist: true
  }
)
