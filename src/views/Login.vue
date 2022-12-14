<template>
  <div class="login-content">
    <div class="login-box">
      <div class="login-box-left">
        <h1>这里可以放一些标题内容</h1>
      </div>
      <div class="login-box-right">
        <h2 class="login-box-right-title">欢迎回来</h2>
        <div class="login-box-right-box">
          <span class="login-box-right-box-text"></span>
          <span>账号密码登录</span>
          <span class="login-box-right-box-text"></span>
        </div>
        <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <template #prefix>
                <el-icon>
                  <component is="user" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              show-password
              placeholder="密码"
            >
              <template #prefix>
                <el-icon>
                  <component is="lock" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row class="w-250px">
              <el-col :span="14" class="mr-3">
                <el-input v-model="loginForm.code" placeholder="验证码">
                  <template #prefix>
                    <el-icon>
                      <component is="key" />
                    </el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="8" class="flex justify-center items-center">
                <el-image
                  :src="parameter.imgUrl"
                  style="cursor: pointer; margin-top: 3px"
                  title="点击切换验证码"
                  @click="initCaptcha"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="parameter.loading"
              @click="loginHandler(ruleFormRef)"
            >
              <span v-if="!parameter.loading">登 录</span>
              <span v-else>登 陆 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <span>© 2018-2022 He Tong Xue Apache License 2.0</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRoute, useRouter } from 'vue-router'
import { getCaptcha, login } from '../api'
import { getTokenTime, setToken, setTokenTime } from '../utils/auth'
import { EXPIRE_TIME, Settings } from '../../settings'
import { expires } from '../utils/date'
import { TimeUnit } from '../enums/TimeUnit'
import { decrypt, encrypt } from '../utils/jsencrypt'
import { encryptMD5 } from '../hook/encryptMD5'
import { session } from '../utils/storage'

// 实例化
const cookie = useCookies()
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()

// 参数定义
const parameter = reactive({
  loading: false,
  imgUrl: '',
  redirect: ''
})

// 登陆表单
const loginForm = reactive({
  username: 'admin',
  password: '123456',
  code: '',
  rememberMe: false
})

// 验证规则
const rules = reactive<FormRules>({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

// 获取图片验证码
const initCaptcha = async () => {
  const { data } = await getCaptcha()
  parameter.imgUrl = data.data
}

// 登陆处理
const loginHandler = async (formEl: FormInstance | undefined) => {
  if (formEl) {
    await formEl.validate(async (valid) => {
      if (valid) {
        const { data } = await login({
          username: loginForm.username,
          password: encryptMD5(loginForm.password),
          code: loginForm.code,
          rememberMe: loginForm.rememberMe
        })
        switch (data.code as number) {
          case 200: {
            // rememberMeHandler(loginForm.rememberMe)
            setToken(data.data.token)
            setTokenTime(new Date().getTime() + data.data.expireTime)
            ElMessage.success('登陆成功')
            await router.push(parameter.redirect || '/')
            break
          }
          case 5000:
            ElMessage.error('验证码错误')
            loginForm.code = ''
            await initCaptcha()
            break
          case 5001:
            ElMessage.error('验证码过期')
            loginForm.code = ''
            await initCaptcha()
            break
          case 5002:
            ElMessage.error('验证码不能为空')
            loginForm.code = ''
            await initCaptcha()
            break
          case 400:
            ElMessage.error(
              data.message.length > 0 ? data.message : '用户名或密码错误'
            )
            loginForm.code = ''
            loginForm.password = ''
            await initCaptcha()
            break
          default:
            ElMessage.warning('发生异常')
        }
      } else {
        ElMessage.warning('数据不合法')
      }
    })
  }
}

// 勾选记住我处理
const rememberMeHandler = (status: boolean) => {
  if (status) {
    cookie.set(
      Settings.USER_INFO_KEY,
      encrypt(
        JSON.stringify({
          username: loginForm.username,
          password: encrypt(loginForm.password)
        })
      ),
      { expires: new Date(EXPIRE_TIME) }
    )
  }
}

// 判断cookie中是否有数据 实现自动登录
const isRememberMeHandler = () => {
  if (cookie.get(Settings.USER_INFO_KEY)) {
    const user: any = decrypt(cookie.get(Settings.USER_INFO_KEY))
    loginForm.username = user.username
    loginForm.password = decrypt(user.password)
    loginForm.rememberMe = true
  }
}

// 监听图片验证码切换
watch(
  () => parameter.imgUrl,
  () => (loginForm.code = '')
)

// 监听跳转期待页面
watch(
  () => route,
  () => (parameter.redirect = route.query && (route.query.redirect as string)),
  { immediate: true }
)

// 启动时处理
onMounted(() => {
  initCaptcha()
  // isRememberMeHandler()
})
</script>

<style scoped lang="scss">
@mixin d-flex {
  @apply flex justify-center items-center;
}

.login-content {
  @apply h-screen w-screen bg-sky-300;
  @include d-flex;

  .login-box {
    @apply w-1000px h-500px bg-white rounded-md;
    @include d-flex;

    &-left {
      width: 60%;
      border-radius: 0.375rem 0 0 0.375rem;
      @apply h-full bg-sky-50;
      @include d-flex;
    }

    &-right {
      width: 40%;
      border-radius: 0 0.375rem 0.375rem 0;
      @apply h-full bg-sky-100 flex-col;
      @include d-flex;

      &-title {
        @apply font-bold text-3xl text-gray-800;
      }

      &-box {
        @apply space-x-2 flex justify-center items-center my-5 text-gray-300;
        &-text {
          @apply h-1px w-16 bg-gray-200;
        }
      }
    }
  }

  .login-footer {
    @apply absolute h-30px w-full bottom-0 font-sans text-xs font-medium text-white;
    @include d-flex;
  }
}

:deep(.el-button) {
  @apply w-250px;
}
</style>
