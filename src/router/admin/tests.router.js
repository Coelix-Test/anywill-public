import Cemeteries from '@/views/admin/cemeteries/Cemeteries';
import ChoosePlot from '@/views/admin/tests/ChoosePlot';

export default {
  path: 'tests',
  component: Cemeteries,
  children: [
    {
      path: 'choose-plot',
      component: ChoosePlot,
      name: 'choose-plot',
    },
  ]
}