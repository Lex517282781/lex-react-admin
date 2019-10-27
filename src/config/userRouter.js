import asyncComponent from '@/components/asyncComponent';

const router = [
  {
    key: 'user',
    children: [
      {
        key: 'login',
        component: asyncComponent(() => import('@/pages/User/Login'))
      },
      {
        key: 'register',
        component: asyncComponent(() => import('@/pages/User/Register'))
      },
      {
        key: 'register-result',
        component: asyncComponent(() =>
          import('@/pages/User/Register/subs/RegisterResult')
        )
      }
    ]
  }
];

export default router;
