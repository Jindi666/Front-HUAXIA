import Vue from 'vue'

const environment = {
  state: {
    envId: 0
  },
  mutations: {
    SET_ENV_ID: (state, envId) => {
      state.envId = envId
    }
  },
  actions: {
    setEnvId({ commit }, envId) {
      commit('SET_ENV_ID', envId)
    }
  }
}

export default environment
