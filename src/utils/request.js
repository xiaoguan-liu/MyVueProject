import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
// 增加对finally的支持
require('promise.prototype.finally').shim()

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL + '/api/services/app',
  timeout: 10000 // 请求超时时间10S
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    // console.log(error.response)
    if (error.response.status === 500) {
      let message = '错误'
      let description = '请求出现错误，请稍后再试'
      if (data.error && data.error.message) {
        message = data.error.message
      }
      if (data.error && data.error.details) {
        description = data.error.details
      }
      notification.error({
        message: message,
        description: description
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: '禁止访问',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: '验证失败',
        description: '该操作权限验证失败，无法操作'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  } else {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      notification.error({
        message: '错误',
        description: '请求超时，请检查网络是否连接正常'
      })
    } else {
      notification.error({
        message: '错误',
        description: '请求失败，请检查网络是否已连接'
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data.result) {
    return response.data.result
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
