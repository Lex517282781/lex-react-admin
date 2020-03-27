import asyncComponent from '@/components/asyncComponent';

const router = [
  {
    key: 'user',
    children: [
      {
        key: 'login',
        component: asyncComponent(() => import('@/pages/user/Login'))
      },
      {
        key: 'register',
        component: asyncComponent(() => import('@/pages/user/Register'))
      },
      {
        key: 'register-result',
        component: asyncComponent(() =>
          import('@/pages/user/Register/subs/RegisterResult')
        )
      }
    ]
  }
];

export default router;
