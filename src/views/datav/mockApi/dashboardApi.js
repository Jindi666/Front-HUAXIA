import { parseTime } from '@/utils'

const summary = {
  taskCount: 50,
  workHours: 100,
  saveCost: 980,
  successRate: 78,
  region: 12,
  department: 13
}

const today = {
  taskSuccess: 0,
  taskExecute: 0,
  taskWait: 0,
  workHours: 0,
  tasks: [
    { id: 1, startTime: '09:24', flowName: '民政局', result: 'success', workerName: '老年人福利补贴' },
    { id: 2, startTime: '09:37', flowName: '卫生健康局', result: 'success', workerName: '医师执业注册' },
    { id: 3, startTime: '10:05', flowName: '司法局', result: 'success', workerName: '律师执业许可初审' },
    { id: 4, startTime: '10:16', flowName: '交通运输局', result: 'success', workerName: '巡游网约车道路运输证核发' },
    { id: 5, startTime: '10:35', flowName: '卫生健康局', result: 'success', workerName: '公共场所卫生许可' },
    { id: 5, startTime: '11:20', flowName: '人社局', result: 'success', workerName: '失业登记' }
    // { id: 6, startTime: '', flowName: '', result: '', scheduleName: '' },
    // { id: 7, startTime: '', flowName: '', result: '', scheduleName: '' },
    // { id: 8, startTime: '', flowName: '', result: '', scheduleName: '' },
    // { id: 9, startTime: '', flowName: '', result: '', scheduleName: '' },
    // { id: 10, startTime: '', flowName: '', result: '', scheduleName: '' }
  ]
}

const user = {
  taskSuccess: 0,
  taskExecute: 0,
  taskWait: 0,
  workHours: 0,
  tasks: [
    { id: 1, startTime: '09:24', flowName: '民政局', result: 'success', workerName: '老年人福利补贴' },
    { id: 2, startTime: '09:37', flowName: '卫生健康局', result: 'success', workerName: '医师执业注册' },
    { id: 3, startTime: '10:05', flowName: '司法局', result: 'success', workerName: '律师执业许可初审' },
    { id: 4, startTime: '10:16', flowName: '交通运输局', result: 'success', workerName: '巡游网约车道路运输证核发' },
    { id: 5, startTime: '10:35', flowName: '卫生健康局', result: 'success', workerName: '公共场所卫生许可' },
    { id: 6, startTime: '11:20', flowName: '人社局', result: 'success', workerName: '失业登记' },
    { id: 7, startTime: '09:24', flowName: '民政局', result: 'success', workerName: '老年人福利补贴' },
    { id: 8, startTime: '09:37', flowName: '卫生健康局', result: 'success', workerName: '医师执业注册' },
    { id: 9, startTime: '10:05', flowName: '司法局', result: 'success', workerName: '律师执业许可初审' },
    { id: 10, startTime: '10:16', flowName: '交通运输局', result: 'success', workerName: '巡游网约车道路运输证核发' },
    { id: 11, startTime: '10:35', flowName: '卫生健康局', result: 'success', workerName: '公共场所卫生许可' },
    { id: 12, startTime: '11:20', flowName: '人社局', result: 'success', workerName: '失业登记' },
    { id: 13, startTime: '09:24', flowName: '民政局', result: 'success', workerName: '老年人福利补贴' },
    { id: 14, startTime: '09:37', flowName: '卫生健康局', result: 'success', workerName: '医师执业注册' },
    { id: 15, startTime: '10:05', flowName: '司法局', result: 'success', workerName: '律师执业许可初审' },
    { id: 16, startTime: '10:16', flowName: '交通运输局', result: 'success', workerName: '巡游网约车道路运输证核发' },
    { id: 17, startTime: '10:35', flowName: '卫生健康局', result: 'success', workerName: '公共场所卫生许可' },
    { id: 18, startTime: '11:20', flowName: '人社局', result: 'success', workerName: '失业登记' },
    { id: 19, startTime: '09:24', flowName: '民政局', result: 'success', workerName: '老年人福利补贴' },
    { id: 20, startTime: '09:37', flowName: '卫生健康局', result: 'success', workerName: '医师执业注册' },
    { id: 21, startTime: '10:05', flowName: '司法局', result: 'success', workerName: '律师执业许可初审' },
    { id: 22, startTime: '10:16', flowName: '交通运输局', result: 'success', workerName: '巡游网约车道路运输证核发' },
    { id: 23, startTime: '10:35', flowName: '卫生健康局', result: 'success', workerName: '公共场所卫生许可' },
    { id: 24, startTime: '11:20', flowName: '人社局', result: 'success', workerName: '失业登记' }
  ]
}
//  { value: 335, name: '生产' },-->
// <!--              { value: 310, name: '综合' },-->
// <!--              { value: 234, name: '财务' },-->
// <!--              { value: 135, name: '人资' },-->
// <!--              { value: 1548, name: '市场' }-->
const failed = [
  { name: '脚本错误', value: 1 },
  { name: 'Worker无法联机', value: 3 },
  { name: '无法找到元素', value: 6 },
  { name: '未知错误', value: 8 }
]

const demoSuccessRate = []
const demoWorkerUsage = []

const dateToString = function(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
function dateToDate(date) {
  var sDate = new Date()
  if (typeof date == 'object' && typeof new Date().getMonth == 'function') {
    sDate = date
  } else if (typeof date == 'string') {
    var arr = date.split('-')
    if (arr.length == 3) {
      sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2])
    }
  }
  return sDate
}

const dateAddDate = function(date, dayCount) {
  var tempDate = dateToDate(date)
  var count = parseInt(dayCount)
  var oldYear = tempDate.getFullYear()
  var oldMonth = tempDate.getMonth()
  var oldDate = tempDate.getDate()
  var newDate = oldDate + count
  return new Date(oldYear, oldMonth, newDate)
}

// import { axios } from '@/utils/request'
export default {
  querySummary: function() {
    return new Promise(res => {
      summary.taskCount = 11254 // 运行成功次数
      summary.successRate = 98.95 // 运行成功率
      summary.workHours = 102.0 // 累计节省工时
      summary.saveCost = 102000 // 累计节省成本
      summary.region = 22888 // 未知
      summary.department = 22 // 累计服务部门
      res({ code: 0, data: summary })
    })
  },
  queryToDay: function() {
    return new Promise(resolve => {
      today.taskSuccess = 283
      today.taskExecute = 6
      today.taskWait = 2
      if (today.taskWait < 0) {
        today.taskWait = 0
      }
      today.workHours = 2
      resolve({ code: 0, data: today })
    })
  },
  queryUserTotal: function() {
    return new Promise(resolve => {
      resolve({ code: 0, data: user })
    })
  },
  queryFailReason: function(type) {
    return new Promise(resolve => {
      const data = [
        { name: '脚本错误', value: 1 },
        { name: 'Worker无法联机', value: 3 },
        { name: '无法找到元素', value: 6 },
        { name: '未知错误', value: 8 }
      ]
      resolve({ code: 0, data: data })
    })
  },
  querySuccessRate: function(type) {
    //  { "date": "01.18","taskSucceed": 0,"succeedRate": 0,"taskFailed": 1,"failedRate": 33.33}
    //
    //
    if (demoSuccessRate.length === 0) {
      const curDate = new Date()
      const startDate = dateAddDate(curDate, -7)
      for (var i = 0; i < 7; i++) {
        const date_str = parseTime(dateAddDate(startDate, i), '{m}.{d}')
        // console.log(date_str)
        const successCount = Math.round(Math.random() * 20) + 80
        const failedCount = Math.round(Math.random() * 20) + 5
        const successRate = Math.round((100 * successCount) / (successCount + failedCount), 2)
        const failedRate = Math.round((100 * failedCount) / (successCount + failedCount), 2)
        demoSuccessRate.push({
          date: date_str,
          taskSucceed: successCount,
          succeedRate: successRate,
          taskFailed: failedCount,
          failedRate: failedRate
        })
      }
    }
    return new Promise(resolve => {
      resolve({ code: 0, data: demoSuccessRate })
    })
  },
  queryMostUsedFlow: function(type) {
    // option.xAxis[0].data.push(item['flowName'])
    // option.series[0].data.push(item['executeCount'])
    // option.series[1].data.push(item['workHours'])
    return new Promise(resolve => {
      const data = [
        { flowName: '老年优待证办理', executeCount: 287, workHours: 861 },
        { flowName: '公共场所卫生许可', executeCount: 246, workHours: 738 },
        { flowName: '巡游网约车道路运输证核发', executeCount: 118, workHours: 354 }
        // { flowName: '机动车登记', executeCount: 92, workHours: 276 },
        // { flowName: '护士执照登记', executeCount: 66, workHours: 198 },
        // { flowName: '建设银行流水下载', executeCount: 21, workHours: Math.round(Math.random() * 100) },
        // { flowName: '工单指派', executeCount: 11, workHours: Math.round(Math.random() * 100) },
        // { flowName: '服务器自动巡检', executeCount: 8, workHours: Math.round(Math.random() * 100) },
        // { flowName: '自动转换文档', executeCount: 5, workHours: Math.round(Math.random() * 100) }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryWorkerUsage: function(type) {
    // for (let item of items) {
    //   option.xAxis[0].data.push(item['date'])
    //   option.series[0].data.push(item['attendedWorker'])
    //   option.series[1].data.push(item['unattendedWorker'])
    // }
    if (demoWorkerUsage.length === 0) {
      const curDate = new Date()
      const startDate = dateAddDate(curDate, -7)
      let data = []
      for (let i = 0; i < 7; i++) {
        const date_str = parseTime(dateAddDate(startDate, i), '{m}.{d}')
        demoWorkerUsage.push({
          date: date_str,
          attendedRate: Math.round(Math.random() * 100),
          unattendedRate: Math.round(Math.random() * 100)
        })
      }
    }
    return new Promise(resolve => {
      // console.log(data)
      resolve({ code: 0, data: demoWorkerUsage })
    })
  },
  queryWorkerByDep: function() {
    return new Promise(resolve => {
      const data = [
        { name: '市场监督局', value: 89 },
        { name: '民政局', value: 86 },
        { name: '公安局', value: 72 }
        // { name: '卫生健康局', value: 65 },
        // { name: '住房公积金', value: 50 },
        // { name: '交通运输局', value: 36 },
        // { name: '税务局', value: 32 },
        // { name: '人社局', value: 28 },
        // { name: '司法局', value: 16 },
        // { name: '林业局', value: 14 }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryAllWorkerByDep: function() {
    return new Promise(resolve => {
      const data = [
        { departmentName: '市场监督局', workerCount: 89 },
        { departmentName: '民政局', workerCount: 86 },
        { departmentName: '公安局', workerCount: 72 },
        { departmentName: '卫生健康局', workerCount: 65 },
        { departmentName: '住房公积金', workerCount: 50 },
        { departmentName: '交通运输局', workerCount: 36 },
        { departmentName: '税务局', workerCount: 32 },
        { departmentName: '人社局', workerCount: 28 },
        { departmentName: '司法局', workerCount: 16 },
        { departmentName: '林业局', workerCount: 14 }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryWorkerByType: function() {
    return new Promise(resolve => {
      const data = [
        { name: '人机交互浮动授权', value: Math.round(Math.random() * 10) },
        { name: '无人值守绑定机器', value: Math.round(Math.random() * 10) },
        { name: '无人值守浮动授权', value: Math.round(Math.random() * 10) }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryBusinessType: function(type) {
    return new Promise(resolve => {
      const data = [
        { name: '市场监督局', value: 34 },
        { name: '民政局', value: 25 },
        { name: '公安局', value: 20 },
        { name: '卫生健康局', value: 18 },
        { name: '人社局', value: 8 }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryTaskRegions: function(type) {
    return new Promise(resolve => {
      const data = [
        { region: '大庆', taskCount: Math.round(Math.random() * 10000) },
        { region: '北京市', taskCount: Math.round(Math.random() * 10000) },
        { region: '西安', taskCount: Math.round(Math.random() * 10000) },
        { region: '成都', taskCount: Math.round(Math.random() * 10000) }
        // { region: '湛江市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '肇庆市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '惠州市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '汕尾市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '汕头市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '梅州市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '河源市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '韶关市', taskCount: Math.round(Math.random() * 10000) },
        // { region: '清远市', taskCount: Math.round(Math.random() * 10000) }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryPro: function(type) {
    return new Promise(resolve => {
      const data = [
        { region: '大庆', log: '125.03', lat: '46.58' },
        { region: '北京', log: '116.46', lat: '39.92' },
        { region: '西安', log: '108.95', lat: '34.27' },
        { region: '成都', log: '104.06', lat: '30.67' }
      ]
      resolve({ code: 0, data: data })
    })
  },
  queryTaskRegions2: function(type) {
    return new Promise(resolve => {
      const data = [
        { region: '大庆', log: 125.03, lat: 46.58, taskCount: Math.round(Math.random() * 10000) },
        { region: '北京', log: 117.348611, lat: 40.581141, taskCount: Math.round(Math.random() * 10000) },
        { region: '西安', log: 108.95, lat: 34.27, taskCount: Math.round(Math.random() * 10000) },
        { region: '成都', log: 104.06, lat: 30.67, taskCount: Math.round(Math.random() * 10000) }
      ]
      resolve({ code: 0, data: data })
    })
  }
}
