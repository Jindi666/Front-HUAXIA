import Vue from 'vue'
import { doLogin, getInfo, logout, getMenuInfo, loginBefore, getAccessToken } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { asyncRouterMap2 } from '@/config/router.config.js'
import { welcome } from '@/utils/util'
import i18n from '@/locales/index'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    menus: [],
    buttonPermissions: [],
    websocketMsg: {},
    agency: '',
    ignoreValidationCode: false,
    siteTitle: '',
    menuLogo: '',
    oemMode: 'false'
  },
  getters: {
    getAgencyCode(state) {
      return '@' + state.agency
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // SET_NAME: (state, { name, welcome }) => {
    //   state.name = name
    //   state.welcome = welcome
    // },
    SET_USER_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_BUTTONPERMISSIONS: (state, buttonPermissions) => {
      state.buttonPermissions = buttonPermissions
    },
    SET_WEBSOCKETMSG: (state, websocketMsg) => {
      state.websocketMsg = websocketMsg
    },
    SET_IGNOREVALIDATIONCODE: (state, ignoreValidationCode) => {
      state.ignoreValidationCode = ignoreValidationCode
    },
    SET_ISSHOWUSERCONTRACT: (state, isShowUserContract) => {
      state.isShowUserContract = isShowUserContract
    },
    SET_SITETITLE: (state, siteTitle) => {
      state.siteTitle = siteTitle
    },
    SET_MENULOGO: (state, menuLogo) => {
      state.menuLogo = menuLogo
    },
    // 得到机构
    getAgency(state, agency) {
      state.agency = agency
    },
    SET_OEMMODE(state, oemMode) {
      state.oemMode = oemMode
    }
  },

  actions: {
    getAgency({ commit }, agency) {
      commit('getAgency', agency)
    },
    getUsername({ commit }, username) {
      commit('SET_USER_NAME', username)
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        doLogin(userInfo)
          .then(response => {
            console.log(response)
            const result = response.data
            // Vue.ls.set(ACCESS_TOKEN, result.token, Math.floor(new Date().getTime() / 1000) + 1800)
            // commit('SET_TOKEN', result.token)
            resolve(response)
          })
          .catch(error => {
            console.log(error, 'error~~·~~·')
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            // const result = response.result

            // if (result.role && result.role.permissions.length > 0) {
            //   const role = result.role
            //   role.permissions = result.role.permissions
            //   role.permissions.map(per => {
            //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //       const action = per.actionEntitySet.map(action => {
            //         return action.action
            //       })
            //       per.actionList = action
            //     }
            //   })
            //   role.permissionList = role.permissions.map(permission => {
            //     return permission.permissionId
            //   })
            //   commit('SET_ROLES', result.role)
            //   commit('SET_INFO', result)
            // } else {
            //   reject(new Error('getInfo: roles must be a non-null array !'))
            // }
            // 存储按钮权限
            // let mockButtonPermissions = [
            //   {
            //     moduleName: "部门管理",
            //     auth: [
            //       "view",
            //       "manager"
            //     ]
            //   },
            //   {
            //     moduleName: "用户管理",
            //     auth: [
            //       "view",
            //       "manager"
            //     ]
            //   },
            //   {
            //     moduleName: "角色管理",
            //     auth: [
            //       "view",
            //       "manager"
            //     ]
            //   }
            // ]
            let buttonPermissions = response.data.authFunctions
            let siteTitle = response.data.config.companySiteConfig?.siteTitle || ''
            let menuLogo = response.data.config.companySiteConfig?.logo || ''
            let oemMode = response.data.config.companySiteConfig?.oemMode || 'false'
            commit('SET_BUTTONPERMISSIONS', buttonPermissions)
            commit('SET_SITETITLE', siteTitle)
            commit('SET_MENULOGO', menuLogo)
            commit('SET_OEMMODE', oemMode)
            localStorage.setItem('buttonPermissions', JSON.stringify(buttonPermissions))
            localStorage.setItem('isAgree', response.data.isAgree)
            // commit('SET_NAME', { name: result.name, welcome: welcome() })
            // commit('SET_AVATAR', result.avatar)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_ROLES', [])
        resolve()
        // logout()
        //   .then(() => {
        //     // 清除localstorage
        // localStorage.clear()
        //     // let arr = document.cookie.split(';')
        //     // console.log(arr)
        //     // arr.filter((el, ind) => {
        //     //   if (el.indexOf('UiBot') > -1) {
        //     //     arr.splice(ind, 1)
        //     //   }
        //     // })
        //     // console.log(arr.join(';'))
        //     // document.cookie = arr.join(';')
        //     // console.log(document.cookie)

        //     // 前端清除cookie
        //     // var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        //     // console.log(keys)
        //     // keys.map(el => {
        //     //   if (el === 'UiBot') {
        //     //     document.cookie = el + '=0;expires=' + new Date(0).toUTCString()
        //     //   }
        //     // })
        //     resolve()
        //   })
        //   .catch(() => {
        //     resolve()
        //   })
        //   .finally(() => {
        //     // commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     // Vue.ls.remove(ACCESS_TOKEN)
        //   })
      })
    },
    GetAccessToken({ commit, state }) {
      commit('SET_MENUS', JSON.stringify(asyncRouterMap2))
      return new Promise((resolve, reject) => {
        localStorage.clear()
        getAccessToken()
          .then(response => {
            console.log(response)
            if (response.code === 0) {
              localStorage.setItem('ACCESS_TOKEN', response.data.accessToken)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(err => {
            console.log('err' + err)
            reject(err)
          })
      })
    },
    //获取菜单 -- 这个是登陆前？
    GetMenus({ commit, state }) {
      console.log(i18n.locale)
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            if (res.code === 0) {
              const siteTitle = res.data.config.companySiteConfig?.siteTitle || ''
              const menuLogo = res.data.config.companySiteConfig?.logo || ''
              let oemMode = res.data.config.companySiteConfig?.oemMode || 'false'
              commit('SET_SITETITLE', siteTitle)
              commit('SET_MENULOGO', menuLogo)
              commit('SET_OEMMODE', oemMode)
              commit('getAgency', res.data.company ? res.data.company.companyCode : '')
              commit('SET_IGNOREVALIDATIONCODE', res.data.systemConfig.loginConfig.ignoreValidationCode)
              commit('SET_ISSHOWUSERCONTRACT', res.data.systemConfig.loginConfig.isShowUserContract)
              commit('SET_USER_NAME', res.data.user ? res.data.user.name : '')
              const buttonPermissions = res.data.authFunctions
              commit('SET_BUTTONPERMISSIONS', buttonPermissions)
              localStorage.setItem('isAgree', res.data.isAgree)
              localStorage.setItem('buttonPermissions', JSON.stringify(buttonPermissions))
              const data = [] //res.data.menu
              console.log(data)
              const taskDetail = {
                path: '/task/taskManagementDetail',
                name: 'TaskManagerDetail',
                component: 'TaskTaskManagerDetail'
              }
              const monitorDetail = {
                path: '/worker/workerMonitorDetail',
                name: 'WorkerMonitorDetail',
                component: 'WorkerMonitorDetail'
              }
              const scheduleCalendarSet = {
                path: '/scheduleCalendar/scheduleCalendarSet',
                name: 'ScheduleCalendarSet',
                component: 'ScheduleCalendarSet',
                meta: { title: i18n.t('scheduleManagement.workCalendarSet.text'), isNotShowMenu: true }
              }
              const businessType = {
                path: '/flow/businessType',
                name: 'FlowBusinessType',
                component: 'FlowBusinessType',
                meta: { title: i18n.t('flowManagement.businessTypeSetTitle.text'), isNotShowMenu: true }
              }
              const datav = {
                path: '/datav/DatavLanzhou',
                name: 'datav',
                component: 'datav',
                meta: { title: i18n.t('flowManagement.businessTypeSetTitle.text'), isNotShowMenu: true }
              }
              if (data.length) {
                data[0].children.push(taskDetail)
                data.forEach(ele => {
                  if (ele.menuCode == '50000') ele.children.push(monitorDetail)
                  if (ele.menuCode == '70000') ele.children.push(scheduleCalendarSet)
                  if (ele.menuCode == '30000') ele.children.push(businessType)
                })
                // 这里可能会出现一个权限都没有，应该要跳 noPermission
                // if (data[0].children && data[0].children[0] && data[0].children[0].json) {
                asyncRouterMap2[0].redirect = data[0].children[0].json.path
                // }
              }
              // asyncRouterMap2[0].children = data
              commit('SET_MENUS', JSON.stringify(asyncRouterMap2))
              resolve(asyncRouterMap2)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetLoginInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginBefore()
          .then(response => {
            if (response.code === 0) {
              const loginConfig = response.data.systemConfig.loginConfig
              resolve(loginConfig)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default user
