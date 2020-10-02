export default {
  namespaced: true,
  state: {
    // loaded: false,
    data: {
      name: '',
      username: '',
      email: '',
      role: 3,
      password: '',
      passwordConfirmation: '',
    }
  },
  getters: {
    data(state){
      return state.data;
    }
  },
  mutations: {
    saveData(state, data){
      state.data = data;
    }
  },
  actions: {

  }
}