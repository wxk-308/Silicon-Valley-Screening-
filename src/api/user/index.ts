import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData
} from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

export const getLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}
export const getUserInfo = () => {
  return request.get<any, userInfoReponseData>(API.USERINFO_URL)
}
