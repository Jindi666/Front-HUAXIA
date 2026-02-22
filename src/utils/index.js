import i18n from '@/locales/index'
import { LangEnum } from '@/locales/index'

export function isChinese() {
  var lang = localStorage.getItem('lang')
  if (lang == LangEnum['zh-CN']) {
    return true
  }
  return false
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (time === 0 || time === null) {
    return '-'
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return [
        i18n.t('utilsIndexJs.sunday.text'),
        i18n.t('utilsIndexJs.monday.text'),
        i18n.t('utilsIndexJs.tuesday.text'),
        i18n.t('utilsIndexJs.wednesday.text'),
        i18n.t('utilsIndexJs.thursday.text'),
        i18n.t('utilsIndexJs.friday.text'),
        i18n.t('utilsIndexJs.saturday.text')
      ][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return i18n.t('utilsIndexJs.just.text')
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + i18n.t('utilsIndexJs.minutesAgo.text')
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + i18n.t('utilsIndexJs.hoursAgo.text')
  } else if (diff < 3600 * 24 * 2) {
    return i18n.t('utilsIndexJs.oneDayAgo.text')
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      i18n.t('utilsIndexJs.month.text') +
      d.getDate() +
      i18n.t('utilsIndexJs.day.text') +
      d.getHours() +
      i18n.t('utilsIndexJs.hour.text') +
      d.getMinutes() +
      i18n.t('utilsIndexJs.minute.text')
    )
  }
}

/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime2(time, fmt) {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return fmt
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    // eslint-disable-next-line no-control-regex
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: i18n.t('utilsIndexJs.today.text'),
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: i18n.t('utilsIndexJs.lastWeek.text'),
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: i18n.t('utilsIndexJs.lastMonth.text'),
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: i18n.t('utilsIndexJs.lastThreeMonths.text'),
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function showTime(val) {
  // const tsnow = Math.round(new Date().getTime() / 1000)
  if (val) {
    const todayBegin = new Date()
    todayBegin.setHours(0, 0, 0)
    const tsDayBegin = Math.round(todayBegin.getTime() / 1000)
    let format = '{y}-{m}-{d} {h}:{i}'
    const yearBegin = new Date()
    yearBegin.setMonth(0, 1)
    yearBegin.setHours(0, 0, 0)
    const tsYearBegin = Math.round(yearBegin.getTime() / 1000)
    if (val - tsDayBegin > 0) {
      format = '{h}:{i}'
    } else if (val - tsYearBegin > 0) {
      format = '{m}-{d} {h}:{i}'
    }
    return parseTime(val, format)
  }
  return '-'
}

export function showTimeAll(val) {
  // const tsnow = Math.round(new Date().getTime() / 1000)
  const todayBegin = new Date()
  todayBegin.setHours(0, 0, 0)
  const tsDayBegin = Math.round(todayBegin.getTime() / 1000)
  const format = '{y}-{m}-{d} {h}:{i}:{s}'
  const yearBegin = new Date()
  yearBegin.setMonth(0, 1)
  yearBegin.setHours(0, 0, 0)
  const tsYearBegin = Math.round(yearBegin.getTime() / 1000)
  if (val - tsDayBegin > 0) {
    // format = '{h}:{i}'
  } else if (val - tsYearBegin > 0) {
    // format = '{m}-{d} {h}:{i}'
  }
  return parseTime(val, format)
}

const taskStateDict = {
  // 'deploying': i18n.t('utilsIndexJs.deploying'),
  // 'received': i18n.t('utilsIndexJs.received'),
  // 'finished': i18n.t('utilsIndexJs.finished'),
  // 'started': i18n.t('utilsIndexJs.started'),
  // 'aborted': i18n.t('utilsIndexJs.aborted'),
  // 'stopping': i18n.t('utilsIndexJs.stopping'),
  // 'rejected': i18n.t('utilsIndexJs.rejected'),
  // 'retrying': i18n.t('utilsIndexJs.retrying'),
  deploying: i18n.t('utilsIndexJs.deploying.text'),
  accepted: i18n.t('utilsIndexJs.deployedAlready.text'),
  starting: i18n.t('utilsIndexJs.starting.text'),
  started: i18n.t('utilsIndexJs.runned.text'),
  stopping: i18n.t('utilsIndexJs.stopping.text'),
  finished: i18n.t('utilsIndexJs.stoped.text'),
  running: i18n.t('utilsIndexJs.running.text'),
  canceling: i18n.t('utilsIndexJs.canceling.text')
}

// const resultDict = {
//   SUCCESS: '成功',
//   FAILED: '失败',
//   ABORTEDBYUSER: '中止',
//   ABORTEDBYCOMMANDER: '中止'
// }

export function allTaskStates() {
  return [
    // { value: 'deploying', text: i18n.t('utilsIndexJs.deploying') },
    // { value: 'received', text: i18n.t('utilsIndexJs.received') },
    // { value: 'started', text: i18n.t('utilsIndexJs.started') },
    // { value: 'finished', text: i18n.t('utilsIndexJs.finished') },
    // { value: 'aborted', text: i18n.t('utilsIndexJs.aborted') },
    // { value: 'stopping', text: i18n.t('utilsIndexJs.stopping') },
    // { value: 'rejected', text: i18n.t('utilsIndexJs.rejected') },
    // { value: 'retrying', text: i18n.t('utilsIndexJs.retrying') },
    // { value: 'running', text: i18n.t('utilsIndexJs.retrying') }
    { value: 'deploying', text: i18n.t('utilsIndexJs.pendingDeployment.text') },
    { value: 'running', text: i18n.t('utilsIndexJs.running.text') },
    { value: 'finished', text: i18n.t('utilsIndexJs.stoped.text') }
  ]
}

export function showTaskState(value) {
  if (value) {
    const key = value.toLowerCase()
    if (taskStateDict[key]) {
      return taskStateDict[key]
    }
  }

  return i18n.t('utilsIndexJs.unknown.text')
}

export function showTaskResult(value) {
  if (!value) return ''
  if (value.toLowerCase() === 'success') {
    return i18n.t('utilsIndexJs.success.text')
  } else if (value.toLowerCase() === 'failed') {
    return i18n.t('utilsIndexJs.fail.text')
  } else if (value.toLowerCase() === 'abortedbyuser') {
    return i18n.t('utilsIndexJs.abortedByUser.text')
  } else if (value.toLowerCase() === 'abortedbycommander') {
    return i18n.t('utilsIndexJs.abortedByCommander.text')
  } else if (value.toLowerCase() === 'canceled') {
    return i18n.t('utilsIndexJs.canceled.text')
  } else if (value.toLowerCase() === 'workercrashed') {
    return i18n.t('utilsIndexJs.workerCrashed.text')
  }

  return '-'
}

export function roleDisplay(value) {
  if (!value) return ''
  if (value === 'admin') return i18n.t('utilsIndexJs.admin.text')
  if (value === 'developer') return i18n.t('utilsIndexJs.developer.text')
  if (value === 'user') return i18n.t('utilsIndexJs.user.text')
  return 'Error'
}

export function enableDisplay(value) {
  if (value) {
    return i18n.t('utilsIndexJs.enabling.text')
  } else {
    return i18n.t('utilsIndexJs.prohibiting.text')
  }
}

export function logLevel(value) {
  if (!value) return ''
  let grade = ''
  switch (value) {
    case 100:
      grade = i18n.t('utilsIndexJs.trackText.text')
      break
    case 200:
      grade = i18n.t('utilsIndexJs.messageText.text')
      break
    case 300:
      grade = i18n.t('utilsIndexJs.warningText.text')
      break
    case 400:
      grade = i18n.t('utilsIndexJs.errorText.text')
      break
  }
  return grade
}

export function paramType(value) {
  if (!value) return ''
  if (value === 10) return i18n.t('utilsIndexJs.textText.text')
  if (value === 20) return i18n.t('utilsIndexJs.numberText.text')
  if (value === 30) return i18n.t('utilsIndexJs.boolText.text')
  return 'Error'
}

export function workerType(value) {
  if (!value) return ''
  if (value === 1) return i18n.t('utilsIndexJs.humanComputerInteraction.text')
  if (value === 2) return i18n.t('utilsIndexJs.unattended.text')
  return 'Error'
}

export function addBrackets(value) {
  return `(${value})`
}

// 默认图片的路径
export function imgPathDefault() {
  return '/img/flow_upload_default.png'
}

//插入字符串
export function insertStr(soure, start, newStr) {
  return soure.slice(0, start) + newStr + soure.slice(start)
}
// 任务状态转化
export function convertStateText(args, result) {
  // 防止传空进来
  if (!args) {
    return ''
  }
  if (args === 'deploying') {
    return i18n.t('utilsIndexJs.deployingText.text')
  } else if (args === 'running') {
    return i18n.t('utilsIndexJs.runningText.text')
  } else if (args === 'finished' && result === 'success') {
    return i18n.t('utilsIndexJs.runSucText.text')
  } else if (args === 'finished' && (result === 'abortedByUser' || result === 'abortedByCommander')) {
    return i18n.t('utilsIndexJs.taskCancelText.text')
  } else if (args === 'invalid') {
    return i18n.t('utilsIndexJs.taskInvalidText.text')
  } else if (args === 'finished' && result === 'timeout') {
    return i18n.t('utilsIndexJs.overTime.text')
  } else {
    return i18n.t('utilsIndexJs.runFailText.text')
  }
}
// 任务运行状态与结果的判断处理
export function convertResultText(args, result, user) {
  if (args === 'deploying') {
    return i18n.t('taskManager.deploying.text')
  } else if (args === 'running') {
    return i18n.t('taskManager.running.text')
  } else if (args === 'finished' && result === 'success') {
    return i18n.t('taskManager.success.text')
  } else if (args === 'finished' && result === 'abortedByUser') {
    return i18n.t('taskManager.workerClientCancel.text')
  } else if (args === 'finished' && result === 'abortedByCommander') {
    return i18n.t('taskManager.userCancelTask.text', { msg: user })
  } else if (args === 'finished' && result === 'failed') {
    return i18n.t('taskManager.flowRunFail.text')
  } else if (args === 'finished' && result === 'workerCrashed') {
    return i18n.t('taskManager.workerCrashed.text')
  } else if (args === 'finished' && result === 'downloadFailed') {
    return i18n.t('taskManager.flowDownloadFail.text')
  } else if (args === 'finished' && result === 'botFileError') {
    return i18n.t('taskManager.flowFileFormatException.text')
  } else if (args === 'finished' && result === 'timeout') {
    return i18n.t('taskManager.overTime.text')
  }
}
// 任务详情视图Worker类型转换
export function workerAuthTypeConvert(args) {
  let value = ''
  switch (args) {
    case 100:
      value = i18n.t('taskManager.workerUnattendFixed.text')
      break
    case 200:
      value = i18n.t('taskManager.workerUnattendFloat.text')
      break
    case 300:
      value = i18n.t('taskManager.workerAttendFixed.text')
      break
    case 400:
      value = i18n.t('taskManager.workerAttendFloat.text')
      break
    default:
      value = '-'
      break
  }
  return value
}
// 任务详情视图任务运行失败的文字提示
export function convertFailedReasonText(args) {
  if (args === 'failed') {
    return i18n.t('taskManager.flowRunFail.text')
  } else if (args === 'workerCrashed') {
    return i18n.t('taskManager.workerCrashed.text')
  } else if (args === 'downloadFailed') {
    return i18n.t('taskManager.flowDownloadFail.text')
  } else if (args === 'borFileError') {
    return i18n.t('taskManager.flowFileFormatException.text')
  } else {
    return '-'
  }
}
// 任务详情视图任务运行状态文字转换
export function convertTaskStateText(args, result) {
  if (args === 'deploying') {
    return i18n.t('taskManager.deploying.text')
  } else if (args === 'running') {
    return i18n.t('taskManager.running.text')
  } else if (args === 'finished' && result === 'success') {
    return i18n.t('taskManager.success.text')
  } else if (args === 'finished' && (result === 'abortedByUser' || result === 'abortedByCommander')) {
    return i18n.t('taskManager.canceled.text')
  } else {
    return i18n.t('taskManager.failed.text')
  }
}
// 任务详情视图时间处理
export function addTimeDefaultValue(args) {
  if (!args || args.indexOf('0001-01-01') !== -1) {
    return '-'
  } else {
    return args
  }
}

// 队列查看队列数据抽屉状态转换
export function convertQueueStatus(key) {
  let value = key
  switch (key) {
    case 100:
      value = i18n.t('dataManager.consumed.text')
      break
    case 200:
      value = i18n.t('dataManager.expired.text')
      break
    case 300:
      value = i18n.t('dataManager.notConsume.text')
      break
    case 400:
      value = i18n.t('dataManager.notActive.text')
      break
  }
  return value
}
