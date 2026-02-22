import { axios, post } from '@/utils/request'

export default {
  //日常监控顶部
  getEverydayTop: function(param) {
    return post({
      url: 'huaxia/screen/control/everydayTop',
      data: param
    })
  },
  //今日失败任务数
  getFailureRate: function(param) {
    // console.log(param)
    return post({
      url: 'huaxia/screen/control/failureRate',
      data: param
    })
  },
  //今日失败任务数-分页
  failureRatePage: function(param) {
    // console.log(param)
    return post({
      url: 'huaxia/screen/control/failureRatePage',
      data: param
    })
  },
  // 近期运行情况（近3个月）
  getOperationCondition: function(param) {
    return post({
      url: 'huaxia/screen/control/operationCondition',
      data: param
    })
  },
  //登录
  Login: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/verifyLogin',
      data: param
    })
  },
  //修改用户密码
  updatePassword: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/updatePassword',
      data: param
    })
  },
  //机器人分布及在线监控
  getRobotOnlineMonitoring: function(param) {
    return post({
      url: 'huaxia/screen/control/robotOnlineMonitoring',
      data: param
    })
  },
  //实时任务监控
  getRealTimeTaskMonitoring: function(param) {
    return post({
      url: 'huaxia/screen/control/realTimeTaskMonitoring',
      data: param
    })
  },
  //实时任务监控分页
  getRealTimeTaskMonitoringPage: function(param) {
    return post({
      url: 'huaxia/screen/control/realTimeTaskMonitoringPage',
      data: param
    })
  },
  //任务运行统计
  getTaskRunStatistics: function(param) {
    return post({
      url: 'huaxia/screen/control/taskRunStatistics',
      data: param
    })
  },
  //任务运行统计分页
  getTaskRunStatisticsPage: function(param) {
    return post({
      url: 'huaxia/screen/control/taskRunStatisticsPage',
      data: param
    })
  },
  //任务失败次数Top5统计
  getTaskFailureTop5: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureTop5',
      data: param
    })
  },
  //任务失败次数Top5统计分页
  getTaskFailureTop5Page: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureTop5Page',
      data: param
    })
  },
  //任务失败原因统计
  getTaskFailureReason: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureReason',
      data: param
    })
  },
  //任务失败原因统计分页
  getTaskFailureReasonPage: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureReasonPage',
      data: param
    })
  },
  //任务运行失败率按部门
  getTaskFailureDeptRate: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureDeptRate',
      data: param
    })
  },
  // 任务运行失败率按机器人
  getTaskFailureWorkerRate: function(param) {
    return post({
      url: 'huaxia/screen/control/taskFailureWorkerRate',
      data: param
    })
  }
}
