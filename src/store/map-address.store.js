const getDefaultState = () => {
  return {
    data: {
      addressComponents: {}
    }
  }
}

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    updateAddrComp(state, components){
      state.data.addressComponents = { ...components };
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