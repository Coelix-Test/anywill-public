import Admin from '@/views/admin/Admin';

import cemeteries from './cemetery.router';
import funeralHomes from './funeral-homes.router';
import laboratories from './laboratories.router';
import services from './services.router';
import managers from './managers.router';
import tests from './tests.router';

const routes = {
  path: '/admin',
  component: Admin,
  name: 'admin',
  children: [
    cemeteries,
    funeralHomes,
    laboratories,
    services,
    managers,
    tests,
  ]
};

export default routes;