import api from './index'
import { EncryptSecret } from '@/utils/encrypt'

import { axios } from '@/utils/request'
// import createHash from 'create-hash/browser'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

export function doLogin({ loginName, password, verifyCode, companyCode }) {
  const data = { loginName, password: EncryptSecret(password), verifyCode, companyCode }
  // const hash = createHash('sha256')
  // hash.update(userinfo.password)
  // const passwordMd5 = hash.digest('hex')
  // data['password'] = passwordMd5
  return axios({
    url: '/commander/account/weblogin',
    method: 'post',
    data: data
  })
}

export function loginBefore() {
  return axios({
    url: '/commander/account/getCurrentInfo',
    method: 'get'
  })
}

export function getAccessToken() {
  return axios({
    url: '/open/commander/dashboard/getAccessToken',
    method: 'get'
  })
}

export function getUserInfoBykey() {
  return axios({
    url: 'dataservice/bi/api/session',
    method: 'get'
  })
}

export function getQueryId() {
  return axios({
    url: 'dataservice/bi/api/queries?order&page=1&page_size=60&v_tool',
    method: 'get'
  })
}

export function queries(id) {
  return axios({
    url: `dataservice/bi/api/queries/${id}`,
    method: 'get'
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/commander/account/getCurrentInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav(token) {
  return axios({
    url: '/user/nav',
    method: 'get'
  })
}

// export function logout() {
//   return axios({
//     url: '/auth/logout',
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function logout() {
  return axios({
    url: '/commander/account/webLogout',
    method: 'get'
  })
}

export function getMenuInfo() {
  return axios({
    url: '/commander/menu/tree',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function modifyPwd({ userName, oldPassword, newPassword }) {
  const data = { userName, oldPassword: EncryptSecret(oldPassword), newPassword: EncryptSecret(newPassword) }
  // const hash = createHash('sha256')
  // hash.update(userinfo.password)
  // const passwordMd5 = hash.digest('hex')
  // data['password'] = passwordMd5
  return axios({
    url: '/commander/account/updatePasswordByUserName',
    method: 'post',
    data: data
  })
}
