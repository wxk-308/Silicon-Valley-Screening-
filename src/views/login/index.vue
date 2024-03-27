<template>
    <div class="login_container">
        <el-row>
            <!-- xs用于控制在屏幕小于768的时候，右侧占满 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="UserFilled" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button :loading="loading" type="primary" class="login_btn" size="default"
                            @click="handelLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

let loginForm = ref({
    username: 'admin',
    password: '111111'
})
// 控制按钮加载效果
let loading = ref(false)
const loginForms = ref()

//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号长度至少五位'))
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码长度至少六位'))
    }
}
const rules = {
    username: [{ trigger: 'change', validator: validatorUserName }],
    password: [{ trigger: 'change', validator: validatorPassword }]
}
const handelLogin = async () => {
    await loginForms.value.validate()
    loading.value = true // 按钮开始加载

    //发送登录请求
    //成功->首页展示数据
    //失败->提示相应错误信息
    try {
        await userStore.userLogin(loginForm.value)
        router.push('/')

        ElMessage({
            message: '欢迎回来',
            type: 'success'
        })
    } catch (error) {
        ElMessage({
            message: (error as Error).message,
            type: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover; //使背景图覆盖整个背景区域

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
