import * as types from './types';
import setting from '@/config/defaultSettings';
import { user, notices } from '@/mock/common';
// todo  这里暂时开启全部权限
import appRouter from '@/config/appRouter';
import getDetailRouter from '@/utils/getDetailRouter';
import getRouterMap from '@/utils/getRouterMap';

const menuData = getDetailRouter(appRouter);
const breadcrumbNameMap = getRouterMap(appRouter);

const initState = {
  setting,
  user: {
    list: [],
    currentUser: user
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
