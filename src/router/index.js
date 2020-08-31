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

export default router;

