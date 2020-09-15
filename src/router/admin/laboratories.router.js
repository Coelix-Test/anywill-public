import Laboratories from '@/views/admin/laboratories/Laboratories';
// import SingleCreate from '@/views/admin/laboratories/SingleCreate';
// import SingleEdit from '@/views/admin/laboratories/SingleEdit';
import ListAll from '@/views/admin/laboratories/ListAll';

export default {
  path: 'laboratories',
  component: Laboratories,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'laboratories-all',
    },
    // {
    //   path: ':id',
    //   component: SingleEdit,
    //   name: 'laboratories-edit',
    // },
    // {
    //   path: 'create',
    //   component: SingleCreate,
    //   name: 'laboratories-create',
    // },
  ]
}