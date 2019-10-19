import * as types from './types';
import setting from '@/config/defaultSettings';
import { user, notices, menuData as mockMenuData } from '@/mock/common';
import appRouter from '@/config/appRouter';
import getDetailRouter from '@/utils/getDetailRouter';
import getRouterMap from '@/utils/getRouterMap';
import { authorityOpen } from '@/config/env';

// 可以根据开发环境选择是否开启权限
let routers = authorityOpen ? mockMenuData : appRouter;

const menuData = getDetailRouter(routers);
const breadcrumbNameMap = getRouterMap(routers);

const initState = {
  setting,
  user: {
    list: [],
    currentUser: user,
    loading: false
  },
  global: {
    collapsed: false,
    notices,
    loadedAllNotices: false
  },
  menu: {
    menuData,
    breadcrumbNameMap
  }
};

const global_update = (state, global) => {
  return {
    ...state,
    global: {
      ...state.global,
      ...global
    }
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.GLOBAL_UPDATE:
      return global_update(state, action.data);

    default:
      return state;
  }
};
