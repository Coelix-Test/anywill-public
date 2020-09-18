import Vue from 'vue';
import VueRouter from 'vue-router';

import { AuthAPI } from '@/api';
import store from '@/store';

Vue.use(VueRouter);

import admin from './admin/admin.router';

import Index from '@/views/Index';


const routes = [
	{
		path: '/',
		component: Index,
		name: 'index',
	},
	admin,
];

const router = new VueRouter({
	mode: 'history',
	routes,
});


router.beforeEach(async (to, from, next) => {

  window.scrollTo(0, 0);

  // if(!store.getters['user/isLoaded']) {
  //   if(store.getters['user/token']) {
  //     await API.user.getData(store.getters['user/token']).then(res => {
  //       store.commit('user/auth', store.getters['user/token']);
  //       store.commit('user/saveData', res.data);

  //       store.dispatch('websocket/connect', store.getters['user/auth'])
  //         .catch(err => console.error(err));
        
  //     }).catch(err => {
  //       console.error('Wrong auth token!');
  //     });
  //   }
  //   store.commit('user/load');
  // }

  // if(!store.getters['services/isLoaded']) {
  //   store.dispatch('services/updateData');
  // }

  // if(!store.getters['app-vars/isLoaded']) {
  //   await store.dispatch('app-vars/updateData');
  // }

  next();
});


export default router;

