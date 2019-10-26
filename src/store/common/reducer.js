import * as types from './types';
import setting from '@/config/defaultSettings';
import { user, notices, menuData as mockMenuData } from '@/mock/common';
import appRouter from '@/config/appRouter';
import getDetailRouter from '@/utils/getDetailRouter';
import getRouterMap from '@/utils/getRouterMap';
import { authorityOpen } from '@/config/env';

// const originalBreadcrumbNameMap = getRouterMap(appRouter);

// 可以根据开发环境选择是否开启权限
let routers = authorityOpen ? mockMenuData : appRouter;

const breadcrumbNameMap = getRouterMap(appRouter);

const menuData = getDetailRouter(routers);

const initState = {
  setting,
  user: {
    list: [],
    currentUser: user,
    loading: false,
    loginStatus: '',
    registerStatus: ''
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

const setting_update = (state, setting) => {
  return {
    ...state,
    setting: {
      ...state.setting,
      ...setting
    }
  };
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
    case types.SETTING_UPDATE:
      return setting_update(state, action.data);

    case types.GLOBAL_UPDATE:
      return global_update(state, action.data);

    default:
      return state;
  }
};
