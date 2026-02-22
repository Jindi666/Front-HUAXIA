export default {
  state: {
    msgToatl: 0,
    isForbidden: true
  },
  getters: {
    getMsgTotal(state) {
      return state.msgToatl
    },
    isForbiddenPop(state) {
      return state.isForbidden
    }
  },
  mutations: {
    reduceMsgCount(state) {
      if (state.msgToatl > 0) {
        state.msgToatl = state.msgToatl - 1
      } else {
        state.msgToatl = 0
      }
    },
    setMsgCount(state, totalCount) {
      state.msgToatl = totalCount
    },
    forbiddenOpenMsgCenter(state, isForbidden) {
      state.isForbidden = isForbidden
    }
  },
  actions: {
    reduceMsgCount({ commit }) {
      commit('reduceMsgCount')
    },
    setMsgCount({ commit }, totalCount) {
      commit('setMsgCount', totalCount)
    },
    // 是否关闭消息中心
    forbiddenOpenMsgCenter({ commit }, isForbidden) {
      commit('forbiddenOpenMsgCenter', isForbidden)
    }
  }
}
