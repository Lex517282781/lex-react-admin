import setting from '@/config/defaultSettings';
import { notices, menuData as mockMenuData } from '@/mock/common';
import appRouter from '@/config/appRouter';
import getRouterMenu from '@/utils/getRouterMenu';
import getRouterMap from '@/utils/getRouterMap';
import { AUTHORITYOPEN } from '@/config/env';

const originalRouterMenu = getRouterMenu(appRouter);
const originalBreadcrumbNameMap = getRouterMap(originalRouterMenu);

const menuData = AUTHORITYOPEN
  ? getRouterMenu(mockMenuData, originalBreadcrumbNameMap)
  : originalRouterMenu;
const breadcrumbNameMap = AUTHORITYOPEN
  ? getRouterMap(menuData)
  : originalBreadcrumbNameMap;

const initData = {
  setting,
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

export default initData;
