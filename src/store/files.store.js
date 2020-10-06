const getDefaultState = () => {
  return {
    data: []
  }
}

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    addFile(state, file){
      state.data.push(file);
    },
    deleteFile(state, id){
      state.data = state.data.filter(file => file.id !== id);
    },
    reset(state){
      Object.assign(state, getDefaultState());
    },
  },
  actions: {},
  getters: {
    getData(state){
      return state.data;
    }
  }
}