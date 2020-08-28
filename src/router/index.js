import Vue from 'vue';
import VueRouter from 'vue-router';

import API from '@/api';
import store from '@/store';

Vue.use(VueRouter);

import admin from './admin';

import Index from '@/views/Index';


const routes = [
    {
        path: '/',
        component: Index,
        name: 'index',
    }
];

routes.push(...admin);

const router = new VueRouter({
    routes,
});

export default router;

