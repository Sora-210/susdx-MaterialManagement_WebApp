import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    jwt: '',
    accountName: 'DEMO-USER',
  },
  getters: {
    checkJwt(state) {
      return state.jwt !== ''
    },
    jwt(state) {
      return state.jwt
    },
    accountName(state) {
      return state.accountName
    },
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt
    },
    logout(state) {
      state.jwt = ''
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
