const getDefaultState = () => {
  return {
    // loaded: false,
    data: {
      name: '',
      username: '',
      email: '',
      role: 3,
      password: '',
      passwordConfirmation: '',
    }
  }
}
const state = getDefaultState();

export default {
  namespaced: true,
  state,
  getters: {
    data(state){
      return state.data;
    }
  },
  mutations: {
    saveData(state, data){
      state.data = data;
    },
    reset(state){
      Object.assign(state, getDefaultState());
    }
  },
  actions: {

  }
}