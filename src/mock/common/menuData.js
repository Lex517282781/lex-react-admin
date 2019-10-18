const menuData = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    locale: 'menu.dashboard',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/dashboard/analysis',
        name: '分析页',
        exact: true,
        locale: 'menu.dashboard.analysis'
      },
      {
        path: '/dashboard/monitor',
        name: '监控页',
        exact: true,
        locale: 'menu.dashboard.monitor'
      },
      {
        path: '/dashboard/workplace',
        name: '工作台',
        exact: true,
        locale: 'menu.dashboard.workplace'
      }
    ]
  },
  {
    path: '/form',
    icon: 'form',
    name: '表单页',
    locale: 'menu.form',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/form/basic',
        name: '基础表单',
        exact: true,
        locale: 'menu.form.basic'
      },
      {
        path: '/form/step',
        name: '分步表单',
        hideChildrenInMenu: true,
        locale: 'menu.form.step',
        children: [
          {
            path: '/form/step/info',
            name: '分步表单（填写转账信息）',
            exact: true,
            locale: 'menu.form.stepform.info'
          },
          {
            path: '/form/step/confirm',
            name: '分步表单（确认转账信息）',
            exact: true,
            locale: 'menu.form.stepform.confirm'
          },
          {
            path: '/form/step/result',
            name: '分步表单（完成）',
            exact: true,
            locale: 'menu.form.stepform.result'
          }
        ]
      },
      {
        path: '/form/advanced',
        name: '高级表单',
        authority: ['admin'],
        exact: true,
        locale: 'menu.form.advanced'
      }
    ]
  },
  {
    path: '/list',
    icon: 'table',
    name: '列表页',
    locale: 'menu.list',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/list/search',
        name: '查询表格',
        exact: true,
        locale: 'menu.list.search'
      },
      {
        path: '/list/basic',
        name: '标准列表',
        exact: true,
        locale: 'menu.list.basic'
      },
      {
        path: '/list/card',
        name: '卡片列表',
        exact: true,
        locale: 'menu.list.card'
      },
      {
        path: '/list/searchinfo',
        name: '搜索列表',
        locale: 'menu.list.searchlist',
        children: [
          {
            path: '/list/searchinfo/articles',
            name: '搜索列表（文章）',
            exact: true,
            locale: 'menu.list.searchlist.articles'
          },
          {
            path: '/list/searchinfo/projects',
            name: '搜索列表（项目）',
            exact: true,
            locale: 'menu.list.searchlist.projects'
          },
          {
            path: '/list/searchinfo/applications',
            name: '搜索列表（应用）',
            exact: true,
            locale: 'menu.list.searchlist.applications'
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    name: '详情页',
    icon: 'profile',
    locale: 'menu.profile',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/profile/basic',
        name: '基础详情页',
        exact: true,
        locale: 'menu.profile.basic'
      },
      {
        path: '/profile/advanced',
        name: '高级详情页',
        authority: ['admin'],
        exact: true,
        locale: 'menu.profile.advanced'
      }
    ]
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: '/result',
    locale: 'menu.result',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/result/success',
        name: '成功页',
        exact: true,
        locale: 'menu.result.success'
      },
      {
        path: '/result/fail',
        name: '失败页',
        exact: true,
        locale: 'menu.result.fail'
      }
    ]
  },
  {
    name: '异常页',
    icon: 'warning',
    path: '/exception',
    locale: 'menu.exception',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/exception/notpermission',
        name: '403',
        exact: true,
        locale: 'menu.exception.not-permission'
      },
      {
        path: '/exception/notfind',
        name: '404',
        exact: true,
        locale: 'menu.exception.not-find'
      },
      {
        path: '/exception/servererror',
        name: '500',
        exact: true,
        locale: 'menu.exception.server-error'
      }
    ]
  },
  {
    name: '个人页',
    icon: 'user',
    path: '/account',
    locale: 'menu.account',
    authority: ['admin', 'user'],
    children: [
      {
        path: '/account/center',
        name: '个人中心',
        locale: 'menu.account.center',
        children: []
      },
      {
        path: '/account/settings',
        name: '个人设置',
        locale: 'menu.account.settings',
        children: []
      }
    ]
  }
];

export default menuData;
