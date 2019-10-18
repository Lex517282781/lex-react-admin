import asyncComponent from '@/components/asyncComponent';
// 不同级别路由的key值 可以相同 同级别路由的key值不可以相同
// 最后路由权限判断也是组合来做判断的 所以不同级别路由的key值可以相同 如权限['auth:dashboard', 'auth:dashboard.analysis', auth:dashboard.monitor]
const router = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        key: 'analysis',
        component: asyncComponent(() => import('@/pages/DashboardAnalysis'))
      },
      {
        key: 'monitor',
        component: asyncComponent(() => import('@/pages/DashboardMonitor'))
      },
      {
        key: 'workplace',
        component: asyncComponent(() => import('@/pages/DashboardWorkplace'))
      }
    ]
  },
  {
    key: 'form',
    icon: 'form',
    children: [
      {
        key: 'basic',
        component: asyncComponent(() => import('@/pages/FormBasic'))
      },
      {
        key: 'step',
        component: asyncComponent(() => import('@/pages/FormStep'))
      },
      {
        key: 'advanced',
        component: asyncComponent(() => import('@/pages/FormAdvanced'))
      }
    ]
  },
  {
    key: 'list',
    icon: 'table',
    children: [
      {
        key: 'search',
        component: asyncComponent(() => import('@/pages/ListSearch'))
      },
      {
        key: 'basic',
        component: asyncComponent(() => import('@/pages/ListBasic'))
      },
      {
        key: 'card',
        component: asyncComponent(() => import('@/pages/ListCard'))
      }
    ]
  },
  {
    key: 'profile',
    icon: 'profile',
    children: [
      {
        key: 'basic',
        component: asyncComponent(() => import('@/pages/ProfileBasic'))
      },
      {
        key: 'advanced',
        component: asyncComponent(() => import('@/pages/ProfileAdvanced'))
      }
    ]
  },
  {
    key: 'result',
    icon: 'check-circle-o',
    children: [
      {
        key: 'success',
        component: asyncComponent(() => import('@/pages/ResultSuccess'))
      },
      {
        key: 'fail',
        component: asyncComponent(() => import('@/pages/ResultFail'))
      }
    ]
  },
  {
    key: 'exception',
    icon: 'warning',
    children: [
      {
        key: 'notpermission',
        component: asyncComponent(() =>
          import('@/pages/ExceptionNotpermission')
        )
      },
      {
        key: 'notfind',
        component: asyncComponent(() => import('@/pages/ExceptionNotfind'))
      },
      {
        key: 'servererror',
        component: asyncComponent(() => import('@/pages/ExceptionServererror'))
      },
      {
        key: 'trigger',
        component: asyncComponent(() => import('@/pages/ExceptionTrigger'))
      }
    ]
  },
  {
    key: 'account',
    icon: 'user',
    children: [
      {
        key: 'center',
        component: asyncComponent(() => import('@/pages/AccountCenter'))
      },
      {
        key: 'settings',
        component: asyncComponent(() => import('@/pages/AccountSettings'))
      }
    ]
  }
];

export default router;
