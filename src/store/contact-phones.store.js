const getDefaultState = () => {
  return {
    data: []
  }
}

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  getters: {
    data(state) {
      return state.data;
    },
  },
  mutations: {
    addItem(state, item = null){
      if(item){
        state.data.push(item);
      }
      else{
        state.data.push({
          id: Math.UUID(),
          name: '',
          platform: '',
        });
      }
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
    },
    reset(state){
      Object.assign(state, getDefaultState());
    }
  },
  actions: {},
}