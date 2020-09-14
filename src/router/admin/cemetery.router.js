import Cemeteries from '@/views/admin/cemeteries/Cemeteries';
// import CemeteriesCreate from '@/views/admin/cemeteries/Create';
// import CemeteryEdit from '@/views/admin/cemeteries/CemeteryEdit';
import CemeteriesAll from '@/views/admin/cemeteries/CemeteriesAll';

export default {
  path: 'cemeteries',
  component: Cemeteries,
  children: [
    {
      path: 'all',
      component: CemeteriesAll,
      name: 'cemeteries-all',
    },
    // {
    //   path: ':id',
    //   component: CemeteryEdit,
    //   name: 'cemetery-edit',
    // },
    // {
    //   path: 'create',
    //   component: CemeteriesCreate,
    //   name: 'cemeteries-create',
    // },
  ]
}