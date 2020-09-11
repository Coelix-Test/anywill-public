export default {
  namespaced: true,
  state: {
    windowWidth: window.innerWidth,
  },
  mutations: {
    setWindowWidth(state){
      state.windowWidth = window.innerWidth;
    }
  },
  actions: {},
  getters: {
    getWidth(state){
      return state.windowWidth;
    }
  }
}