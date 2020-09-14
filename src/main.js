import Vue from 'vue';
import Vuesax from 'vuesax';
import Lodash from 'lodash';window._ = Lodash;

import App from './App.vue';

import '@/config/env';
import '@/config/preferences';
import '@/styles/app.scss'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'; //material icons used by vuesax
import 'boxicons/css/boxicons.min.css' //Boxicons styles

import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(Vuesax);

Vue.config.productionTip = false;

window.app = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
