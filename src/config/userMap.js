import asyncComponent from '@/components/asyncComponent';

const userMap = {
  'menu.user': {},
  'menu.user.login': {
    component: asyncComponent(() => import('@/pages/user/Login'))
  },
  'menu.user.register': {
    component: asyncComponent(() => import('@/pages/user/Register'))
  }
};

export default userMap;
