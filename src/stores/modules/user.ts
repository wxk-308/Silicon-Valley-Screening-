import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// import { getLogin, getUserInfo, loginOutUser } from '@/api/user/index'
import type {
  loginFormData,
  ResponseData,
  loginResponseData,
  userInfoReponseData
} from '@/api/user/type'
// import type {
//   loginFormData,
//   loginResponseData,
//   responseUser
// } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

export const useUserStore = defineStore(
  'user',
  () => {
    let token: string | null = GET_TOKEN()
    const username = ref<string>('')
    const avatar = ref<string>('')
    const buttons = ref([''])
    const userLogin = async (data: loginFormData) => {
      const res: loginResponseData = await reqLogin(data)

      if (res.code === 200) {
        token = res.data as string
        SET_TOKEN(res.data as string)
        console.log(token)

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    const userInfo = async () => {
      const res: userInfoReponseData = await reqUserInfo()
      // const res = await reqUserInfo()
      console.log(res)

      if (res.code === 200) {
        username.value = res.data.name
        avatar.value = res.data.avatar
        buttons.value = res.data.buttons
        console.log(buttons.value)

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    const userLogout = async () => {
      //发送退出登录的请求
      const res: any = await reqLogout()
      // const res = await loginOutUser(token as string)

      if (res.code === 200) {
        //清空本地的用户信息
        REMOVE_TOKEN()
        token = ''
        username.value = ''
        avatar.value = ''
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    return { token, username, avatar, userLogin, userInfo, userLogout }
  },
  {
    persist: true
  }
)
