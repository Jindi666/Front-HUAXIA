import { axios } from '@/utils/request'

export default {
  checkLoginTimes: function(param) {
    return axios({
      url: '/commander/account/updateUserIsAgree',
      method: 'post',
      data: param
    })
  }
}
