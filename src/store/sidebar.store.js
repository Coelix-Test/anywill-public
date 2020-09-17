export default {
  namespaced: true,
  state: {
    active: null,
  },
  mutations: {
    toggle(state){
      state.active = !state.active;
    },
    show(state){
      state.active = true;
    },
    hide(state){
      state.active = false;
    }
  },
  actions: {},
  getters: {
    isActive(state){
      return state.active;
    }
  }
}