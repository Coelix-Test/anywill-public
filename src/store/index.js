import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import FuneralHome from '@/store/funeral-home.store';
import WindowWidth from '@/store/window-width.store';
import Sidebar from '@/store/sidebar.store';
import ContactPhones from '@/store/contact-phones.store';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // FuneralHome,
    WindowWidth,
    Sidebar,
    ContactPhones,
  }
})
