import * as types from './types';
import setting from '@/config/defaultSettings';
import { user, notices, menuData, breadcrumbNameMap } from '@/mock/common';

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
