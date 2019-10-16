import setting from '@/config/defaultSettings';

const initState = {
  setting,
  user: {
    list: [],
    currentUser: {
      name: 'Serati Ma',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        { key: '0', label: '很有想法的' },
        { key: '1', label: '专注设计' },
        { key: '2', label: '辣~' },
        { key: '3', label: '大长腿' },
        { key: '4', label: '川妹子' },
        { key: '5', label: '海纳百川' }
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: { label: '浙江省', key: '330000' },
        city: { label: '杭州市', key: '330100' }
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888'
    }
  },
  global: {
    collapsed: false,
    notices: [
      {
        id: '000000001',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: 'notification'
      },
      {
        id: '000000002',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: 'notification'
      },
      {
        id: '000000003',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: 'notification'
      },
      {
        id: '000000004',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: 'notification'
      },
      {
        id: '000000005',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: 'notification'
      },
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true
      },
      {
        id: '000000009',
        title: '任务名称',
        description: '任务需要在 2017-01-12 20:00 前启动',
        extra: '未开始',
        status: 'todo',
        type: 'event'
      },
      {
        id: '000000010',
        title: '第三方紧急代码变更',
        description:
          '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '马上到期',
        status: 'urgent',
        type: 'event'
      },
      {
        id: '000000011',
        title: '信息安全考试',
        description: '指派竹尔于 2017-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        status: 'doing',
        type: 'event'
      },
      {
        id: '000000012',
        title: 'ABCD 版本发布',
        description:
          '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '进行中',
        status: 'processing',
        type: 'event'
      }
    ],
    loadedAllNotices: false
  },
  menu: {
    menuData: [
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
                path: '/form/step-form/info',
                name: '分步表单（填写转账信息）',
                exact: true,
                locale: 'menu.form.stepform.info'
              },
              {
                path: '/form/step-form/confirm',
                name: '分步表单（确认转账信息）',
                exact: true,
                locale: 'menu.form.stepform.confirm'
              },
              {
                path: '/form/step-form/result',
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
            path: '/list/search',
            name: '搜索列表',
            locale: 'menu.list.searchlist',
            children: [
              {
                path: '/list/search/articles',
                name: '搜索列表（文章）',
                exact: true,
                locale: 'menu.list.searchlist.articles'
              },
              {
                path: '/list/search/projects',
                name: '搜索列表（项目）',
                exact: true,
                locale: 'menu.list.searchlist.projects'
              },
              {
                path: '/list/search/applications',
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
            path: '/exception/403',
            name: '403',
            exact: true,
            locale: 'menu.exception.not-permission'
          },
          {
            path: '/exception/404',
            name: '404',
            exact: true,
            locale: 'menu.exception.not-find'
          },
          {
            path: '/exception/500',
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
    ],
    breadcrumbNameMap: {
      '/dashboard/analysis': {
        path: '/dashboard/analysis',
        name: '分析页',
        exact: true,
        locale: 'menu.dashboard.analysis'
      },
      '/dashboard/monitor': {
        path: '/dashboard/monitor',
        name: '监控页',
        exact: true,
        locale: 'menu.dashboard.monitor'
      },
      '/dashboard/workplace': {
        path: '/dashboard/workplace',
        name: '工作台',
        exact: true,
        locale: 'menu.dashboard.workplace'
      },
      '/dashboard': {
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
      '/form/basic-form': {
        path: '/form/basic-form',
        name: '基础表单',
        exact: true,
        locale: 'menu.form.basicform'
      },
      '/form/step-form/info': {
        path: '/form/step-form/info',
        name: '分步表单（填写转账信息）',
        exact: true,
        locale: 'menu.form.stepform.info'
      },
      '/form/step-form/confirm': {
        path: '/form/step-form/confirm',
        name: '分步表单（确认转账信息）',
        exact: true,
        locale: 'menu.form.stepform.confirm'
      },
      '/form/step-form/result': {
        path: '/form/step-form/result',
        name: '分步表单（完成）',
        exact: true,
        locale: 'menu.form.stepform.result'
      },
      '/form/step-form': {
        path: '/form/step-form',
        name: '分步表单',
        hideChildrenInMenu: true,
        locale: 'menu.form.stepform',
        children: [
          {
            path: '/form/step-form/info',
            name: '分步表单（填写转账信息）',
            exact: true,
            locale: 'menu.form.stepform.info'
          },
          {
            path: '/form/step-form/confirm',
            name: '分步表单（确认转账信息）',
            exact: true,
            locale: 'menu.form.stepform.confirm'
          },
          {
            path: '/form/step-form/result',
            name: '分步表单（完成）',
            exact: true,
            locale: 'menu.form.stepform.result'
          }
        ]
      },
      '/form/advanced-form': {
        path: '/form/advanced-form',
        name: '高级表单',
        authority: ['admin'],
        exact: true,
        locale: 'menu.form.advancedform'
      },
      '/form': {
        path: '/form',
        icon: 'form',
        name: '表单页',
        locale: 'menu.form',
        authority: ['admin', 'user'],
        children: [
          {
            path: '/form/basic-form',
            name: '基础表单',
            exact: true,
            locale: 'menu.form.basicform'
          },
          {
            path: '/form/step-form',
            name: '分步表单',
            hideChildrenInMenu: true,
            locale: 'menu.form.stepform',
            children: [
              {
                path: '/form/step-form/info',
                name: '分步表单（填写转账信息）',
                exact: true,
                locale: 'menu.form.stepform.info'
              },
              {
                path: '/form/step-form/confirm',
                name: '分步表单（确认转账信息）',
                exact: true,
                locale: 'menu.form.stepform.confirm'
              },
              {
                path: '/form/step-form/result',
                name: '分步表单（完成）',
                exact: true,
                locale: 'menu.form.stepform.result'
              }
            ]
          },
          {
            path: '/form/advanced-form',
            name: '高级表单',
            authority: ['admin'],
            exact: true,
            locale: 'menu.form.advancedform'
          }
        ]
      },
      '/list/table-list': {
        path: '/list/table-list',
        name: '查询表格',
        exact: true,
        locale: 'menu.list.searchtable'
      },
      '/list/basic-list': {
        path: '/list/basic-list',
        name: '标准列表',
        exact: true,
        locale: 'menu.list.basiclist'
      },
      '/list/card-list': {
        path: '/list/card-list',
        name: '卡片列表',
        exact: true,
        locale: 'menu.list.cardlist'
      },
      '/list/search/articles': {
        path: '/list/search/articles',
        name: '搜索列表（文章）',
        exact: true,
        locale: 'menu.list.searchlist.articles'
      },
      '/list/search/projects': {
        path: '/list/search/projects',
        name: '搜索列表（项目）',
        exact: true,
        locale: 'menu.list.searchlist.projects'
      },
      '/list/search/applications': {
        path: '/list/search/applications',
        name: '搜索列表（应用）',
        exact: true,
        locale: 'menu.list.searchlist.applications'
      },
      '/list/search': {
        path: '/list/search',
        name: '搜索列表',
        locale: 'menu.list.searchlist',
        children: [
          {
            path: '/list/search/articles',
            name: '搜索列表（文章）',
            exact: true,
            locale: 'menu.list.searchlist.articles'
          },
          {
            path: '/list/search/projects',
            name: '搜索列表（项目）',
            exact: true,
            locale: 'menu.list.searchlist.projects'
          },
          {
            path: '/list/search/applications',
            name: '搜索列表（应用）',
            exact: true,
            locale: 'menu.list.searchlist.applications'
          }
        ]
      },
      '/list': {
        path: '/list',
        icon: 'table',
        name: '列表页',
        locale: 'menu.list',
        authority: ['admin', 'user'],
        children: [
          {
            path: '/list/table-list',
            name: '查询表格',
            exact: true,
            locale: 'menu.list.searchtable'
          },
          {
            path: '/list/basic-list',
            name: '标准列表',
            exact: true,
            locale: 'menu.list.basiclist'
          },
          {
            path: '/list/card-list',
            name: '卡片列表',
            exact: true,
            locale: 'menu.list.cardlist'
          },
          {
            path: '/list/search',
            name: '搜索列表',
            locale: 'menu.list.searchlist',
            children: [
              {
                path: '/list/search/articles',
                name: '搜索列表（文章）',
                exact: true,
                locale: 'menu.list.searchlist.articles'
              },
              {
                path: '/list/search/projects',
                name: '搜索列表（项目）',
                exact: true,
                locale: 'menu.list.searchlist.projects'
              },
              {
                path: '/list/search/applications',
                name: '搜索列表（应用）',
                exact: true,
                locale: 'menu.list.searchlist.applications'
              }
            ]
          }
        ]
      },
      '/profile/basic': {
        path: '/profile/basic',
        name: '基础详情页',
        exact: true,
        locale: 'menu.profile.basic'
      },
      '/profile/advanced': {
        path: '/profile/advanced',
        name: '高级详情页',
        authority: ['admin'],
        exact: true,
        locale: 'menu.profile.advanced'
      },
      '/profile': {
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
      '/result/success': {
        path: '/result/success',
        name: '成功页',
        exact: true,
        locale: 'menu.result.success'
      },
      '/result/fail': {
        path: '/result/fail',
        name: '失败页',
        exact: true,
        locale: 'menu.result.fail'
      },
      '/result': {
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
      '/exception/403': {
        path: '/exception/403',
        name: '403',
        exact: true,
        locale: 'menu.exception.not-permission'
      },
      '/exception/404': {
        path: '/exception/404',
        name: '404',
        exact: true,
        locale: 'menu.exception.not-find'
      },
      '/exception/500': {
        path: '/exception/500',
        name: '500',
        exact: true,
        locale: 'menu.exception.server-error'
      },
      '/exception': {
        name: '异常页',
        icon: 'warning',
        path: '/exception',
        locale: 'menu.exception',
        authority: ['admin', 'user'],
        children: [
          {
            path: '/exception/403',
            name: '403',
            exact: true,
            locale: 'menu.exception.not-permission'
          },
          {
            path: '/exception/404',
            name: '404',
            exact: true,
            locale: 'menu.exception.not-find'
          },
          {
            path: '/exception/500',
            name: '500',
            exact: true,
            locale: 'menu.exception.server-error'
          }
        ]
      },
      '/account/center': {
        path: '/account/center',
        name: '个人中心',
        locale: 'menu.account.center',
        children: []
      },
      '/account/settings': {
        path: '/account/settings',
        name: '个人设置',
        locale: 'menu.account.settings',
        children: []
      },
      '/account': {
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
    }
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
