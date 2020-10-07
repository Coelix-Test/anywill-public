import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import FuneralHome from '@/store/funeral-home.store';
import WindowWidth from '@/store/window-width.store';
import Sidebar from '@/store/sidebar.store';
import ContactPhones from '@/store/contact-phones.store';
import Permissions from '@/store/permissions.store';
import UserGeneral from '@/store/user-general.store';
import Files from '@/store/files.store';
import MapAddress from '@/store/map-address.store';
import CurrentUser from '@/store/current-user.store';

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
    Permissions,
    UserGeneral,
    Files,
    MapAddress,
    CurrentUser,
  }
})
