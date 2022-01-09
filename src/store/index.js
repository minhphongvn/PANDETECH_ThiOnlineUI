import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      isAuthenticated: null,
    },
    alertOn: false,
    alertMsg: "",
    alertType: "error",
    loading: false
  },
  mutations: {
    setAlert(state, payload) {
      state.alertOn = true,
        state.alertMsg = payload.msg,
        state.alertType = payload.type
    },
    setToken(state, payload) {
      state.user.isAuthenticated = payload
    },
    setUser(state, payload) {
      state.user = {
        ...state.user,
        ...payload
      }
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
