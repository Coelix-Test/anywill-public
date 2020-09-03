import Cemeteries from '@/views/admin/cemeteries/Cemeteries';
import CemeteriesCreate from '@/views/admin/cemeteries/Create';

export default {
  path: 'cemeteries',
    component: Cemeteries,
    children: [
      {
        path: 'create',
        component: CemeteriesCreate,
        name: 'cemeteries-create',
      },
    ]
}