export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    addItem(state){
      state.data.push({
        id: Math.UUID(),
        name: '',
        platform: '',
      });
    },
    deleteItem(state, id){
      state.data = state.data.filter(item => item.id !== id);
    },
    updateItem(state, item){
      state.data = state.data.map(curItem => {
        let resItem;
        if(curItem.id === item.id){
          resItem = item;
        }
        else{
          resItem = curItem;
        }
        return resItem;
      })
    }
  },
  actions: {},
  getters: {
    data(state) {
      return state.data;
    },
  }
}