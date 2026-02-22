import Vue from 'vue'

const agreement = {
  state: {
    isFirstLogin: 0
  },
  mutations: {
    SET_Is_First_Login: (state, isFirstLogin) => {
      state.isFirstLogin = isFirstLogin
    }
  },
  actions: {
    setIsFirstLogin({ commit }, isFirstLogin) {
      commit('SET_Is_First_Login', isFirstLogin)
    }
  }
}

export default agreement
