import multiguard from 'vue-router-multiguard';
import middleware from '../middleware';

import Admin from '@/views/admin/Admin';

import cemeteries from './cemetery.router';
import funeralHomes from './funeral-homes.router';
import laboratories from './laboratories.router';
import services from './services.router';
import users from './users.router';
import transactions from './transactions.router';
import tests from './tests.router';

const routes = {
  path: '/admin',
  component: Admin,
  name: 'admin',
  // beforeEnter: multiguard([ middleware.isLogged ]),
  children: [
    cemeteries,
    funeralHomes,
    laboratories,
    services,
    users,
    transactions,
    tests,
  ]
};

export default routes;