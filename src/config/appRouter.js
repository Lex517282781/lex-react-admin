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
        hideChildrenInMenu: true,
        component: asyncComponent(() => import('@/pages/FormStep')),
        children: [
          {
            key: 'info',
            component: asyncComponent(() =>
              import('@/pages/FormStep/FormStepInfo')
            )
          },
          {
            key: 'confirm',
            component: asyncComponent(() =>
              import('@/pages/FormStep/FormStepConfirm')
            )
          },
          {
            key: 'result',
            component: asyncComponent(() =>
              import('@/pages/FormStep/FormStepResult')
            )
          }
        ]
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
      },
      {
        key: 'searchinfo',
        component: asyncComponent(() => import('@/pages/ListSearchinfo')),
        children: [
          {
            key: 'articles',
            component: asyncComponent(() => import('@/pages/ListArticles'))
          },
          {
            key: 'projects',
            component: asyncComponent(() => import('@/pages/ListProjects'))
          },
          {
            key: 'applications',
            component: asyncComponent(() => import('@/pages/ListApplications'))
          }
        ]
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
        key: 'basic',
        query: '/:id',
        hideInMenu: true,
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
        hideInMenu: true,
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
        component: asyncComponent(() => import('@/pages/AccountCenter')),
        hideChildrenInMenu: true,
        children: [
          {
            key: 'articles',
            component: asyncComponent(() =>
              import('@/pages/AccountCenter/subs/Articles')
            )
          },
          {
            key: 'projects',
            component: asyncComponent(() =>
              import('@/pages/AccountCenter/subs/Projects')
            )
          },
          {
            key: 'applications',
            component: asyncComponent(() =>
              import('@/pages/AccountCenter/subs/Applications')
            )
          }
        ]
      },
      {
        key: 'settings',
        component: asyncComponent(() => import('@/pages/AccountSettings')),
        hideChildrenInMenu: true,
        children: [
          {
            key: 'base',
            component: asyncComponent(() =>
              import('@/pages/AccountSettings/subs/SettingBase')
            )
          },
          {
            key: 'security',
            component: asyncComponent(() =>
              import('@/pages/AccountSettings/subs/SettingSecurity')
            )
          },
          {
            key: 'binding',
            component: asyncComponent(() =>
              import('@/pages/AccountSettings/subs/SettingBinding')
            )
          },
          {
            key: 'notification',
            component: asyncComponent(() =>
              import('@/pages/AccountSettings/subs/NotificationView')
            )
          }
        ]
      }
    ]
  }
];

export default router;
