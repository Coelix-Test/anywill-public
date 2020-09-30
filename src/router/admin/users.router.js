import Users from '@/views/admin/users/Users';
import SingleCreate from '@/views/admin/users/SingleCreate';
import SingleEdit from '@/views/admin/users/SingleEdit';
import ListAll from '@/views/admin/users/ListAll';

export default {
  path: 'users',
  component: Users,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'users-all',
    },
    {
      path: 'create',
      component: SingleCreate,
      name: 'users-create',
    },
    {
      path: ':id',
      component: SingleEdit,
      name: 'users-edit',
    },
  ]
}