export default {
  namespaced: true,
  state: {
    data: {
      addressComponents: {},
      formattedAddress: ''
    }
  },
  mutations: {
    // updateData(state, payload){
    //   state.addressComponents = { ...payload.addressComponents };
    //   state.formattedAddress = payload.formattedAddress;
    // },
    updateAddrComp(state, components){
      state.data.addressComponents = { ...components };
    },
    updateFormattedAddr(state, address){
      state.data.formattedAddress = address;
    }
  },
  actions: {},
  getters: {
    getData(state){
      return state.data;
    }
  }
}