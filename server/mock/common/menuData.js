const menuData = [
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
        key: 'step',
        children: [
          {
            key: 'info'
          },
          {
            key: 'confirm'
          },
          {
            key: 'result'
          }
        ]
      },
      {
        key: 'advanced'
      }
    ]
  }
];

module.exports = menuData;
