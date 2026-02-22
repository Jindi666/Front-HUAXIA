import { axios } from '@/utils/request'

export default {
  // 获取消息中心列表数据
  getMessageCenterList: function(param) {
    return axios({
      url: '/commander/messageCenter/list',
      method: 'post',
      data: param
    })
  },
  // 删除系统消息
  deleteMessageInSystem: function(messageId) {
    return axios({
      url: '/commander/messageCenter/delete',
      method: 'get',
      params: { id: messageId }
    })
  },
  // 阅读系统消息
  lookSystemMessage: function(messageId) {
    return axios({
      url: '/commander/messageCenter/read',
      method: 'get',
      params: { id: messageId }
    })
  },
  // 获取未读消息数量
  getUnlookMessageCount: function() {
    return axios({
      url: '/commander/messageCenter/getUnReadCount',
      method: 'get'
    })
  },
  // 返回单条系统消息
  getOneSystemMessage: function(messageId) {
    return axios({
      url: '/commander/messageCenter/get',
      method: 'get',
      params: { id: messageId }
    })
  },
  // 阅读所有消息
  readAllMessage: function() {
    return axios({
      url: '/commander/messageCenter/all/read',
      method: 'get'
    })
  }
}
