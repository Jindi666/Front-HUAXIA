import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import i18n from '@/locales/index'
// import wsConnection from '@/api/socket'
import { asyncRouterMap2 } from '@/config/router.config.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['failedTaskDetail', 'realTimeTaskDetail', 'taskRunStatisticsDetail', 'taskFailureReasonStatisticsDetail', 'taskFailureCountDetail'] // no redirect whitelist

var getRouter
var count = 0
router.beforeEach((to, from, next) => {
  console.log(to)
  // 更早的去触发登录跳转
  // console.log('---------', process.env.NODE_ENV)
  // 发布环境下，使用 oidc 登录
  // 这里要调整一下，用后台配置来做登录检查。
  // eslint-disable-next-line no-undef
  // if (process.env.NODE_ENV === 'production') {
  //   if (to.path === '/user/login') {
  //     var culture = localStorage.getItem('lang')
  //     console.log(culture)
  //     window.location.href = '/api/commander/oidc/login?ui_locales=' + culture
  //     return
  //   }
  // }

  NProgress.start() // start progress bar
  setDocumentTitle(i18n.t('permission.uiBotCommanderTitle.text'))
  // if (!getRouter && !whiteList.includes(to.name)) {
  //   getRouter = asyncRouterMap2
  //   console.log(getRouter)
  //   router.addRoutes(getRouter)
  // }
  if (whiteList.includes(to.name)) {
    // 在免登录白名单，直接进入
    next()
  }
  if (to.path === '/') {
    // store
    //   .dispatch('GetAccessToken')
    //   .then(res => {
    //     console.log('qqq')
    //     next()
    //     NProgress.done()
    //     return
    //   })
    //   .catch(err => {
    //     console.log('err')
    //     // next({ path: '/404' })
    //     NProgress.done()
    //     next()
    //     return
    //   })
    next()
  }
  // if (to.path === '/user/login') {
  //   next()
  // }
  if (to.path === '/404') {
    next()
  }
  if (to.path === '/noPermission') {
    next()
  }
  if (to.path === '/dataV') {
    next()
  }
  if (to.path === '/monitor') {
    next()
  }
  if (to.path === '/Login') {
    next()
  }

  // if (document.cookie.indexOf('UiBot') > -1) {
  //   // wsConnection.initWebSocket('ws://localhost:8181')
  //   if (!getRouter && !whiteList.includes(to.name)) {
  //     store
  //       .dispatch('GetMenus')
  //       .then(res => {
  //         // 没有任何菜单权限
  //         // console.log(to)
  //         // console.log(res)

  //         if (res[0].children.length == 0) {
  //           next({ path: '/noPermission' })
  //           return
  //         }

  //         getRouter = res
  //         let asyncRoutes = getTree(getRouter)
  //         router.addRoutes(asyncRoutes)

  //         if (to.path === '/') {
  //           if (asyncRoutes[0].children.length) {
  //             next({ path: asyncRoutes[0].children[0].children[0].path, replace: true })
  //           } else {
  //             next({ path: asyncRoutes[2].path, replace: true })
  //           }
  //         } else {
  //           next({ ...to, replace: true })
  //         }
  //       })
  //       .catch(err => {
  //         // 清空cookie
  //         // console.log('*****', err)
  //         // var date = new Date()
  //         // date.setSeconds(date.getSeconds() - 1)
  //         // document.cookie = 'UiBot=;expires=' + date.toGMTString()
  //         // localStorage.clear()
  //         // // 提醒下线
  //         // notification.error({
  //         //   message: i18n.t('utilsIndexJs.promptText.text'),
  //         //   description: i18n.t('utilsIndexJs.sessionExpired.text')
  //         //   // message: '下线提醒',
  //         //   // description: '您的帐号已在其他设备登录,您已被迫下线'
  //         // })
  //         // 这里改成读取菜单出错，跳转至没有权限得页面，避免循环跳转
  //         // console.log('** Error', err)
  //         next({ path: '/noPermission' })
  //         return
  //       })
  //   }
  //   // 游离路由权限控制
  //   let roles = store.state.user.buttonPermissions
  //   if (!roles.length) {
  //     //如果vuex没有存上，则从localStorage中取
  //     roles = JSON.parse(localStorage.getItem('buttonPermissions'))
  //   }
  //   if (['/datav'].includes(to.path)) {
  //     if (roles.indexOf('business.dashboard.dashboard.datav') < 0) {
  //       return
  //     }
  //   }
  //   if (['/task/taskManagementDetail'].includes(to.path)) {
  //     if (roles.indexOf('business.dashboard.dashboard.view') < 0) {
  //       return
  //     }
  //   }
  //   if (['/worker/WorkerMonitorDetail'].includes(to.path)) {
  //     if (roles.indexOf('business.worker.workerMonitor.view') < 0) {
  //       return
  //     }
  //   }

  //   /* has token */
  //   if (to.path === '/user/login') {
  //     if (to.redirectedFrom) {
  //       if (!count) {
  //         count++
  //         const key = `open${Date.now()}`
  //         notification.warning({
  //           message: i18n.t('permission.message1.text'),
  //           description: i18n.t('permission.tip1.text'),
  //           btn: h => {
  //             return h(
  //               'a-button',
  //               {
  //                 props: {
  //                   type: 'primary',
  //                   size: 'small'
  //                 },
  //                 on: {
  //                   click: () => {
  //                     count = 0
  //                     notification.close(key)
  //                     if (!getRouter[0].children.length) {
  //                       // 如果该用户无任何权限则返回到/noPermission页面
  //                       next({ path: router.options.routes[2].path, replace: true })
  //                     } else {
  //                       next({ path: '/' })
  //                     }
  //                     NProgress.done()
  //                   }
  //                 }
  //               },
  //               i18n.t('public.ok.text')
  //             )
  //           },
  //           key,
  //           onClose: () => {}
  //         })
  //       }
  //     } else {
  //       next({ path: '/' })
  //       NProgress.done()
  //     }
  //   } else {
  //     const redirect = decodeURIComponent(from.query.redirect || to.path)
  //     next()
  //   }
  // } else {
  //   if (whiteList.includes(to.name)) {
  //     // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     // 读取配置信息后，确定使用哪里的登录页面
  //     store.dispatch('GetLoginInfo').then(config => {
  //       if (config.isIdentityLogin) {
  //         var culture = localStorage.getItem('lang')
  //         window.location.href = '/api/commander/oidc/login?ui_locales=' + culture
  //       } else {
  //         next({ path: '/user/login', query: { redirect: to.fullPath } })
  //       }
  //     })

  //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  //   }
  // }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
