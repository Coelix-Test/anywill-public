import Admin from '@/views/admin/Admin';

import services from './services.router';
import funeralHomes from './funeral-homes.router';
import cemeteries from './cemetery.router';

const routes = {
  path: '/admin',
  component: Admin,
  name: 'admin',
  children: [
    services,
    funeralHomes,
    cemeteries
  ]
};

export default routes;