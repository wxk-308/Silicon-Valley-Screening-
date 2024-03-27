//用户登录接口携带参数类型
export interface loginFormData {
  username: string
  password: string
}
interface dataType {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

export interface responseUser {
  checkUser: {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
  }
}
export interface userInfoReponseData {
  code: number
  data: responseUser
}
export interface loginOutResponseData {
  code: number
  data: {
    message: string
  }
}
