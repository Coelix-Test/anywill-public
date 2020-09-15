import FuneralHomes from '@/views/admin/funeral-homes/FuneralHomes';
// import SingleCreate from '@/views/admin/funeral-homes/SingleCreate';
// import SingleEdit from '@/views/admin/funeral-homes/SingleEdit';
import ListAll from '@/views/admin/funeral-homes/ListAll';

export default {
  path: 'funeral-homes',
  component: FuneralHomes,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'funeral-homes-all',
    },
    // {
    //   path: ':id',
    //   component: SingleEdit,
    //   name: 'funeral-homes-edit',
    // },
    // {
    //   path: 'create',
    //   component: SingleCreate,
    //   name: 'funeral-homes-create',
    // },
  ]
}