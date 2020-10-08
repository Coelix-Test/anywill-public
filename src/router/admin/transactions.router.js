import Transactions from '@/views/admin/transactions/Transactions';
import SingleCreate from '@/views/admin/transactions/SingleCreate';
import SingleEdit from '@/views/admin/transactions/SingleEdit';
import ListAll from '@/views/admin/transactions/ListAll';

export default {
  path: 'transactions',
  component: Transactions,
  children: [
    {
      path: 'all',
      component: ListAll,
      name: 'transactions-all',
    },
    {
      path: 'create',
      component: SingleCreate,
      name: 'transactions-create',
    },
    {
      path: ':id',
      component: SingleEdit,
      name: 'transactions-edit',
    },
  ]
}