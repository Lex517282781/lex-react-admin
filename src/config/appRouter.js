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
