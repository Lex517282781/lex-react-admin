const router = [
  {
    key: 'dashboard',
    children: [
      {
        path: 'analysis'
      },
      {
        path: 'monitor'
      },
      {
        path: 'workplace'
      }
    ]
  },
  {
    key: 'form',
    children: [
      {
        path: 'basic'
      },
      {
        path: 'step'
      },
      {
        path: 'advanced'
      }
    ]
  },
  {
    key: 'list',
    children: [
      {
        path: 'search'
      },
      {
        path: 'basic'
      },
      {
        path: 'card'
      }
    ]
  },
  {
    key: 'profile',
    children: [
      {
        path: 'basic'
      },
      {
        path: 'advanced'
      },
      {
        path: 'card'
      }
    ]
  },
  {
    key: 'result',
    children: [
      {
        path: 'success'
      },
      {
        path: 'fail'
      }
    ]
  },
  {
    key: 'exception',
    children: [
      {
        path: 'notpermission'
      },
      {
        path: 'notfind'
      },
      {
        path: 'servererror'
      },
      {
        path: 'trigger'
      }
    ]
  },
  {
    key: 'account',
    children: [
      {
        path: 'center'
      },
      {
        path: 'settings'
      }
    ]
  }
];

export default router;
