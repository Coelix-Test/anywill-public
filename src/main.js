import Vue from 'vue';
import Vuesax from 'vuesax';

import App from './App.vue';

import '@/config/env';
import '@/config/preferences';
import '@/styles/app.scss'

import 'vuesax/dist/vuesax.css' //Vuesax styles

import store from './store';
import router from './router';

Vue.use(Vuesax);

Vue.config.productionTip = false;

window.app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
