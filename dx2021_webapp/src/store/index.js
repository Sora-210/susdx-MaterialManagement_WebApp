import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    jwt: '',
  },
  getters: {
    checkJwt(state) {
      return state.jwt !== ''
    },
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  modules: {},
})
