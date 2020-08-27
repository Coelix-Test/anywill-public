import Vue from 'vue';

import App from './App.vue';

import '@/config/env';
import '@/config/preferences';
import '@/styles/app.scss'

import store from './store';
import router from './router';



Vue.config.productionTip = false;

window.app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
