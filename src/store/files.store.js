export default {
  namespaced: true,
  state: {
    data: [
    ]
  },
  mutations: {
    addFile(state, file){
      state.data.push(file);
    },
    deleteFile(state, id){
      state.data = state.data.filter(file => file.id !== id);
    },
  },
  actions: {},
  getters: {
    getData(state){
      return state.data;
    }
  }
}