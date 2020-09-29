export default {
  namespaced: true,
  state: {
    loaded: false,
    all: [],
    editing: []
  },
  mutations: {
    
  },
  actions: {},
  getters: {
    all(state) {
      return state.data;
    },
    editing(state){
      return state.editing;
    }
  }
}