import { axios, post } from '@/utils/request'

export default {
  //运行成功次数、流程总数、计划任务数、节省工时
  getTaskStatistics: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/taskStatistics',
      data: param
    })
  },
  //今日任务
  getTopinfoTodayRuninfo: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/topinfoTodayRuninfo',
      data: param
    })
  },
  //任务完成排行榜
  getTaskFinishDepartment: function(param) {
    // console.log(param)
    return post({
      url: 'huaxia/screen/dashboard/taskFinishDepartment',
      data: param
    })
  },
  //部门执行数量、执行成功率
  getTaskSuccRateDepartment: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/taskSuccRateDepartment',
      data: param
    })
  },
  //运行次数
  getTaskSuccRate: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/taskSuccRate',
      data: param
    })
  },
  //woker
  getWorkerOnline: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/workerOnline',
      data: param
    })
  },
  //节省工时Top10
  getSavingWorkHourDep: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/savingWorkHourDep',
      data: param
    })
  },
  //任务数量 top6
  getTasktop6: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/tasktop6',
      data: param
    })
  },
  //流程数量 top6
  getFlowtop6: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/flowtop6',
      data: param
    })
  },
  //四边形报表
  getTaskFlow7dayInfo: function(param) {
    return post({
      url: 'huaxia/screen/dashboard/taskFlow7dayInfo',
      data: param
    })
  }
}
