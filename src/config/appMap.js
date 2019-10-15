import asyncComponent from '@/components/asyncComponent';

const routerMap = {
  'menu.dashboard': {
    icon: 'dashboard'
  },
  'menu.dashboard.analysis': {
    component: asyncComponent(() => import('@/pages/DashboardAnalysis'))
  },
  'menu.dashboard.monitor': {
    component: asyncComponent(() => import('@/pages/DashboardMonitor'))
  },
  'menu.dashboard.workplace': {
    component: asyncComponent(() => import('@/pages/DashboardWorkplace'))
  },

  'menu.form': {
    icon: 'form'
  },
  'menu.form.basic': {
    component: asyncComponent(() => import('@/pages/FormBasic'))
  },
  'menu.form.step': {
    component: asyncComponent(() => import('@/pages/FormStep'))
  },
  'menu.form.advanced': {
    component: asyncComponent(() => import('@/pages/FormAdvanced'))
  },

  'menu.list': {
    icon: 'table'
  },
  'menu.list.search': {
    component: asyncComponent(() => import('@/pages/ListSearch'))
  },
  'menu.list.basic': {
    component: asyncComponent(() => import('@/pages/ListBasic'))
  },
  'menu.list.card': {
    component: asyncComponent(() => import('@/pages/ListCard'))
  },

  'menu.profile': {
    icon: 'profile'
  },
  'menu.profile.basic': {
    component: asyncComponent(() => import('@/pages/ProfileBasic'))
  },
  'menu.profile.advanced': {
    component: asyncComponent(() => import('@/pages/ProfileAdvanced'))
  },
  'menu.profile.card': {
    component: asyncComponent(() => import('@/pages/ProfileCard'))
  },

  'menu.result': {
    icon: 'check-circle-o'
  },
  'menu.result.success': {
    component: asyncComponent(() => import('@/pages/ResultSuccess'))
  },
  'menu.result.fail': {
    component: asyncComponent(() => import('@/pages/ResultFail'))
  },

  'menu.exception': {
    icon: 'warning'
  },
  'menu.exception.notpermission': {
    component: asyncComponent(() => import('@/pages/ExceptionNotpermission'))
  },
  'menu.exception.notfind': {
    component: asyncComponent(() => import('@/pages/ExceptionNotfind'))
  },
  'menu.exception.servererror': {
    component: asyncComponent(() => import('@/pages/ExceptionServererror'))
  },
  'menu.exception.trigger': {
    component: asyncComponent(() => import('@/pages/ExceptionTrigger'))
  },

  'menu.account': {
    icon: 'user'
  },
  'menu.account.center': {
    component: asyncComponent(() => import('@/pages/AccountCenter'))
  },
  'menu.account.settings': {
    component: asyncComponent(() => import('@/pages/AccountSettings'))
  }
};

export default routerMap;
