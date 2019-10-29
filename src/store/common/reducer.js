import * as types from './types';
import setting from '@/config/defaultSettings';
import { notices, menuData as mockMenuData } from '@/mock/common';
import appRouter from '@/config/appRouter';
import getRouterMenu from '@/utils/getRouterMenu';
import getRouterMap from '@/utils/getRouterMap';
import { AUTHORITYOPEN } from '@/config/env';
import { LOGIN_SIGN_OK } from '@/config/env';

const originalRouterMenu = getRouterMenu(appRouter);
const originalBreadcrumbNameMap = getRouterMap(originalRouterMenu);

const menuData = AUTHORITYOPEN
  ? getRouterMenu(mockMenuData, originalBreadcrumbNameMap)
  : originalRouterMenu;
const breadcrumbNameMap = AUTHORITYOPEN
  ? getRouterMap(menuData)
  : originalBreadcrumbNameMap;

const initState = {
  setting,
  global: {
    collapsed: false,
    notices,
    loadedAllNotices: false
  },
  user: {
    list: [],
    currentUser: null,
    loading: false,
    loginStatus: '',
    registerStatus: ''
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

const user_login_request = state => {
  return {
    ...state,
    user: {
      ...state.user,
      loading: true
    }
  };
};

const user_login_success = (state, currentUser) => {
  return {
    ...state,
    user: {
      ...state.user,
      loading: false,
      currentUser,
      loginStatus: LOGIN_SIGN_OK
    }
  };
};

const user_login_failure = state => {
  return {
    ...state,
    user: {
      ...state.user,
      loading: false
    }
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SETTING_UPDATE:
      return setting_update(state, action.data);
    case types.GLOBAL_UPDATE:
      return global_update(state, action.data);

    case types.USER_LOGIN_REQUEST:
      return user_login_request(state);
    case types.USER_LOGIN_SUCCESS:
      return user_login_success(state, action.data);
    case types.USER_LOGIN_FAILURE:
      return user_login_failure(state);

    default:
      return state;
  }
};
