import Vue from 'vue';
import VueRouter from 'vue-router';

import { AuthAPI } from '@/api';
import store from '@/store';

Vue.use(VueRouter);

import admin from './admin/admin.router';
import auth from './auth.router';
import Index from '@/views/Index';


const routes = [
	{
		path: '/',
		component: Index,
		name: 'index',
    redirect: {name: 'cemeteries-all'},
	},
	admin,
  auth,
];

const router = new VueRouter({
	// mode: 'history',
	routes,
});


router.beforeEach(async (to, from, next) => {

  window.scrollTo(0, 0);

  // if(!store.getters['user/isLoaded']) {
  //   if(store.getters['user/token']) {
  //     await API.user.getData(store.getters['user/token']).then(res => {
  //       store.commit('user/auth', store.getters['user/token']);
  //       store.commit('user/saveData', res.data);
        
  //     }).catch(err => {
  //       console.error('Wrong auth token!');
  //     });
  //   }
  //   store.commit('user/load');
  // }

  next();
});


export default router;

