import setting from '@/config/defaultSettings';
import { menuData as mockMenuData } from '@/mock/common';
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

const commonData = {
  user: {
    loading: false,
    data: {}
  },
  setting,
  global: {
    collapsed: false
  },
  menu: {
    menuData,
    breadcrumbNameMap
  },
  province: [],
  city: []
};

export default commonData;
