import Admin from '@/views/admin/Admin';

import services from './services.router';

const routes = {
  path: '/admin',
  component: Admin,
  name: 'admin',
  children: [
    services
  ]
};

export default routes;