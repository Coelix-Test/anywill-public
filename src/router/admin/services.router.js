import Services from '@/views/admin/services/Services';
// import SingleCreate from '@/views/admin/services/SingleCreate';
// import SingleEdit from '@/views/admin/services/SingleEdit';
import ListAll from '@/views/admin/services/ListAll';

export default {
  path: 'services',
  component: Services,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'services-all',
    },
    // {
    //   path: ':id',
    //   component: SingleEdit,
    //   name: 'services-edit',
    // },
    // {
    //   path: 'create',
    //   component: SingleCreate,
    //   name: 'services-create',
    // },
  ]
}