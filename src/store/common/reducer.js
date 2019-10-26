import * as types from './types';
import setting from '@/config/defaultSettings';
import { user, notices, menuData as mockMenuData } from '@/mock/common';
import appRouter from '@/config/appRouter';
import getRouterMenu from '@/utils/getRouterMenu';
import getRouterMap from '@/utils/getRouterMap';
import { authorityOpen } from '@/config/env';

const originalRouterMenu = getRouterMenu(appRouter);
const originalBreadcrumbNameMap = getRouterMap(originalRouterMenu);

const currentRouterMenu = getRouterMenu(
  mockMenuData,
  originalBreadcrumbNameMap
);
const currentBreadcrumbNameMap = getRouterMap(currentRouterMenu);

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
    menuData: authorityOpen ? currentRouterMenu : originalRouterMenu,
    breadcrumbNameMap: authorityOpen
      ? currentBreadcrumbNameMap
      : originalBreadcrumbNameMap
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
