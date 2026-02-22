import Vue from 'vue'

const dataVUser = {
  state: {
    isEnable: false,
    employee_id: '',
    company_id: '',
    department_id: '',
    tenant: '',
    select_department_id: '',
    setIsEnable: false
  },
  mutations: {
    SET_DATAV_USER: (state, user) => {
      state.isEnable = user.isEnable
      state.setIsEnable = user.setIsEnable
      state.employee_id = user.employee_id
      state.company_id = user.company_id
      state.department_id = user.department_id
      state.tenant = user.tenant
    },
    SET_DEPARTMENT_ID: (state, select_department_id) => {
      state.select_department_id = select_department_id
    }
  },
  actions: {
    setDataVUser({ commit }, user) {
      commit('SET_DATAV_USER', user)
    },
    setDepartmentId({ commit }, select_department_id) {
      commit('SET_DEPARTMENT_ID', select_department_id)
    }
  }
}

export default dataVUser
