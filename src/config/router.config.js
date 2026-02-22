// eslint-disable-next-line
/**
 * 基础路由
 * @type { *[] }
 */
import i18n from '@/locales'
export const constantRouterMap = [
  // {
  //   path: '*',
  //   name: 'datav',
  //   // 直接这里更新引用不同的 datav，避免破环之前的 电网版 datav
  //   component: () => import('@/views/datav/Datav')
  // },
  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // },
  // {
  //   path: '/noPermission',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/Nopermission.vue')
  // },
  // {
  //   path: '/datav',
  //   name: 'datav',
  //   // 直接这里更新引用不同的 datav，避免破环之前的 电网版 datav
  //   component: () => import('@/views/datav/Datav')
  // }
]

export const asyncRouterMap2 = [
  // {
  //   path: '/dashboard',
  //   name: 'index',
  //   component: 'BasicLayout',
  //   meta: { title: i18n.t('other.home.text') },
  //   redirect: '/dashboard'
  // },
  {
    path: '/',
    name: '',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/IndexHuaxia')
  },
  {
    path: '/monitor/taskFailureReasonStatisticsDetail',
    name: 'taskFailureReasonStatisticsDetail',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/monitor/taskFailureReasonStatisticsDetail')
  },
  {
    path: '/monitor/taskFailureCountDetail',
    name: 'taskFailureCountDetail',
    component: () => import('@/views/monitor/taskFailureCountDetail')
  },
  {
    path: '/monitor/taskRunStatisticsDetail',
    name: 'taskRunStatisticsDetail',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/monitor/taskRunStatisticsDetail')
  },
  {
    path: '/monitor/realTimeTaskDetail',
    name: 'realTimeTaskDetail',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/monitor/realTimeTaskDetail')
  },
  {
    path: '/monitor/failedTaskDetail',
    name: 'failedTaskDetail',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/monitor/failedTaskDetail')
  },
  {
    path: '/monitor',
    name: 'monitor',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/Monitor')
  },
  {
    path: '/dataV',
    name: 'dataV',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/IndexHuaxia.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    // 直接这里更新引用不同的 datav，
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/noPermission',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/Nopermission.vue')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
