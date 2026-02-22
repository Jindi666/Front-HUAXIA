import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */

// 判断按钮权限是否在权限列表中
function actionInclude(roles, action) {
  let menu = action.split('-')[0]
  let permission = action.split('-')[1]
  if (!roles.length) {
    //无权限列表
    return false
  } else {
    //有权限列表
    let permissionItem = roles.filter(item => item.moduleCode === menu)
    if (!permissionItem.length) {
      return false
    } else {
      return permissionItem[0].auth.includes(permission)
    }
  }
}
// 按钮权限列表为一维数组时的算法
function actionIncludeNew(roles, action) {
  // action: "department-list"
  // roles: ["management.scheme.department.list"]
  roles = roles.map(element => {
    let elementArr = element.split('.')
    let rs = elementArr.filter((item, index) => index > 1).join('-')
    return rs
  })
  if (!roles.length) {
    return false
  } else {
    return roles.includes(action)
  }
}
const action = Vue.directive('action', {
  inserted: function(el, binding, vnode) {
    let actionName = binding.arg
    let roles = store.state.user.buttonPermissions
    if (!roles.length) {
      //如果vuex没有存上，则从localStorage中取
      try {
        roles = JSON.parse(localStorage.getItem('buttonPermissions'))
      } catch (e) {
        // 转换失败，清缓存跳转到登录页面
        var date = new Date()
        date.setSeconds(date.getSeconds() - 1)
        document.cookie = 'UiBot=;expires=' + date.toGMTString()
        this.$router.push('/user/login')
        window.location.reload()
        // 返回首页并清除localstorage
        localStorage.clear()
      }
    }
    // const elVal = vnode.context.$route.meta.permission
    // const permissionId = (elVal instanceof String && [elVal]) || elVal
    let flag = actionIncludeNew(roles, actionName)
    if (flag) {
      return
    } else {
      ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    }
    // return
    // roles.permissions.forEach(p => {
    //   if (!permissionId.includes(p.permissionId)) {
    //     return
    //   }
    //   if (p.actionList && !p.actionList.includes(actionName)) {
    //     ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    //   }
    // })
  }
})

export default action
