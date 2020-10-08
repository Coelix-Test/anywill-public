import Organizations from '@/views/admin/organizations/Organizations';
import SingleCreate from '@/views/admin/organizations/SingleCreate';
import SingleEdit from '@/views/admin/organizations/SingleEdit';
import ListAll from '@/views/admin/organizations/ListAll';

export default {
  path: 'organizations',
  component: Organizations,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'organizations-all',
    },
    {
      path: 'create',
      component: SingleCreate,
      name: 'organizations-create',
    },
    {
      path: ':id',
      component: SingleEdit,
      name: 'organizations-edit',
    },
  ]
}