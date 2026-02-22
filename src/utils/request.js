import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import i18n from '@/locales/index'
import Cookies from 'js-cookie'
import { getAccessToken } from '@/api/login'
// import router from '../router'

// 浏览器默认语言，要这样去读，不要无脑默认 zh-cn 导致接口读取的全是中文
const defaultLang = (navigator.browserLanguage || navigator.language).toLowerCase()

// 创建 axios 实例
const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 60000, // 请求超时时间
  headers: { 'Accept-Language': localStorage.getItem('lang') || defaultLang },
  withCredentials: true // 允许携带cookie
})
let flag = true
const err = error => {
  if (error.response) {
    console.log(error.response)
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    } else if (error.response.status === 401) {
      // if (flag) {
      //test-wep.laiye.com/cockpitscreen/#/dataV
      window.location = '/#/noPermission'
      //   flag = false
      // }
      // store.dispatch('Logout').then(() => {
      //   // console.log('是否退出了')
      //   setTimeout(() => {
      //     // console.log('延迟退出了')
      //     // window.location.reload()
      //     // eslint-disable-next-line no-undef
      //     if (process.env.NODE_ENV === 'production') {
      //       var culture = localStorage.getItem('lang')
      //       // 这里还跳 logout 就会导致浏览器 401，然后浏览器不跳转，也不报错！
      //       window.location = '/api/commander/oidc/login?ui_locales=' + culture
      //     } else {
      //       window.location.reload()
      //     }
      //     // window.location.href = '/api/commander/oidc/logout'
      //     // console.log('已经退出登录')
      //   }, 1500)
      // })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  // console.log(config)
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  if (response.headers && response.headers['content-disposition'] && response.headers['content-disposition'].match(/filename=(.*)/)[1]) {
    return response
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

const post = req => {
  let params = req.data
  return new Promise((resolve, reject) => {
    service
      .post(req.url, params)
      .then(response => {
        // if (response.code == 200) {
        return resolve(response)
        // }
      })
      .catch(error => {
        console.log('err   or:' + error)
        reject(error)
      })
  }).catch(error => {
    return Promise.reject(error, {})
  })
}

const get = (req, params) => {
  // let access_token = localStorage.getItem('ACCESS_TOKEN')
  // // console.log('index:' + req.url.indexOf('?'))
  // if (req.url.indexOf('?') != -1) {
  //   req.url = req.url + '&accessToken=' + access_token
  // } else {
  //   req.url = req.url + '?accessToken=' + access_token
  // }
  // console.log(req.url)
  return new Promise((resolve, reject) => {
    service
      .get(req.url, params)
      .then(response => {
        if (response.code == 0) {
          return resolve(response)
        } else if (response.code == 10004) {
          window.location.href = '/'
          // Vue.$router.push('/user/login')
          // getAccessToken()
          //   .then(res => {
          //     console.log('10004:' + JSON.stringify(res.data))
          //     if (res.code === 0) {
          //       localStorage.setItem('ACCESS_TOKEN', res.data.accessToken)
          //       console.log(response)
          //       return resolve(response)
          //     } else {
          //       return reject(response)
          //     }
          //   })
          //   .catch(err => {
          //     console.log('10004err:' + JSON.stringify(err))
          //     return reject(err.data, {})
          //   })
        }
      })
      .catch(error => {
        console.log('err   or:' + error)
        reject(error)
      })
  }).catch(error => {
    // console.log('error:' + error)
    return Promise.reject(error, {})
  })
  // return service({
  //   method: 'get',
  //   url: req
  // })
}

export { installer as VueAxios, service as axios, get, post }
