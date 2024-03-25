import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLogin, getUserInfo } from '@/api/user/index'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
export const useUserStore = defineStore(
  'user',
  () => {
    let token: string | null = GET_TOKEN()
    // let token: string | null = localStorage.getItem('token')
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
    return { token, userLogin }
  },
  {
    persist: true
  }
)
