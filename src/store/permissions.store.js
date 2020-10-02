import { PermissionsApi } from '@/api';

export default {
  namespaced: true,
  state: {
    loaded: false,
    all: [],
    editing: []
  },
  mutations: {
    saveAll(state, data){
      state.all = data;
    },
    load(state){
      state.loaded = true;
    },
    turnOffAll(state){
      state.all = state.all.map(e => {
        e.active = false
        return e;
      });
    },
    turnOnAll(state){
      state.all = state.all.map(e => {
        e.active = true;
        return e;
      });
    },
    updateItem(state, payload){
      let item = state.all.find(e => e.id === payload.id);
      item.active = payload.value;
    }
  },
  actions: {
    loadAll({ commit }){
      return PermissionsApi.get().then(response => {
        let all = response.data.map(e => {
          e.active = false;
          return e;
        });
        commit('saveAll', all);
        commit('load');
      })
    }
  },
  getters: {
    all(state) {
      return state.all;
    },
    allActive(state){
      let active = state.all.filter(e => e.active);
      return active.map(e => e.id);
    },
    editing(state){
      return state.editing;
    },
    isLoaded(state){
      return state.loaded;
    },

  }
}