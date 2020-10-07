import multiguard from 'vue-router-multiguard';
import middleware from './middleware';

import AuthView from '@/views/admin/auth/AuthView.vue';
import AuthLogin from '@/views/admin/auth/AuthLogin.vue';

export default {
  path: '/auth',
  component: AuthView,
  name: 'auth',
  children: [
    {
      path: 'login',
      component: AuthLogin,
      name: 'auth-login',
    },
  ]
}