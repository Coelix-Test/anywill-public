import FuneralHomes from '@/views/admin/funeral-homes/FuneralHomes';
import FuneralHomesCreate from '@/views/admin/funeral-homes/Create';

export default {
  path: 'funeral-homes',
    component: FuneralHomes,
    children: [
      {
        path: 'create',
        component: FuneralHomesCreate,
        name: 'funeral-homes-create',
      },
    ]
}