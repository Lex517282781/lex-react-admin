// 不同级别路由的key值 可以相同 同级别路由的key值不可以相同
// 最后路由权限判断也是组合来做判断的 所以不同级别路由的key值可以相同 如权限['auth:dashboard', 'auth:dashboard.analysis', auth:dashboard.monitor]
const router = [
  {
    key: 'dashboard',
    children: [
      {
        key: 'analysis'
      },
      {
        key: 'monitor'
      },
      {
        key: 'workplace'
      }
    ]
  },
  {
    key: 'form',
    children: [
      {
        key: 'basic'
      },
      {
        key: 'step'
      },
      {
        key: 'advanced'
      }
    ]
  },
  {
    key: 'list',
    children: [
      {
        key: 'search'
      },
      {
        key: 'basic'
      },
      {
        key: 'card'
      }
    ]
  },
  {
    key: 'profile',
    children: [
      {
        key: 'basic'
      },
      {
        key: 'advanced'
      },
      {
        key: 'card'
      }
    ]
  },
  {
    key: 'result',
    children: [
      {
        key: 'success'
      },
      {
        key: 'fail'
      }
    ]
  },
  {
    key: 'exception',
    children: [
      {
        key: 'notpermission'
      },
      {
        key: 'notfind'
      },
      {
        key: 'servererror'
      },
      {
        key: 'trigger'
      }
    ]
  },
  {
    key: 'account',
    children: [
      {
        key: 'center'
      },
      {
        key: 'settings'
      }
    ]
  }
];

export default router;
