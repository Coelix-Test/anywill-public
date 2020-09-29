import Managers from '@/views/admin/managers/Managers';
import SingleCreate from '@/views/admin/managers/SingleCreate';
import SingleEdit from '@/views/admin/managers/SingleEdit';
import ListAll from '@/views/admin/managers/ListAll';

export default {
  path: 'managers',
  component: Managers,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'managers-all',
    },
    {
      path: 'create',
      component: SingleCreate,
      name: 'managers-create',
    },
    {
      path: ':id',
      component: SingleEdit,
      name: 'managers-edit',
    },
  ]
}