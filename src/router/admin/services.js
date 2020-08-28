import Services from '@/views/admin/services/Services.vue';
import ServicesCreate from '@/views/admin/services/Create';

export default {
    path: '/services',
    component: Services,
    children: [
        {
          path: 'create',
          component: ServicesCreate,
          name: 'services-create',
        },
    ]
};