export default {
  namespaced: true,
  state: {
    active: false,
  },
  mutations: {
    toggle(state){
      state.active = !state.active;
    }
  },
  actions: {},
  getters: {
    isActive(state){
      return state.active;
    }
  }
}