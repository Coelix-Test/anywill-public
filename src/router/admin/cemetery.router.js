import Cemeteries from '@/views/admin/cemeteries/Cemeteries';
import SingleCreate from '@/views/admin/cemeteries/SingleCreate';
import SingleEdit from '@/views/admin/cemeteries/SingleEdit';
import ListAll from '@/views/admin/cemeteries/ListAll';

export default {
  path: 'cemeteries',
  component: Cemeteries,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'cemeteries-all',
    },
    {
      path: ':id',
      component: SingleEdit,
      name: 'cemeteries-edit',
    },
    {
      path: 'create',
      component: SingleCreate,
      name: 'cemeteries-create',
    },
  ]
}