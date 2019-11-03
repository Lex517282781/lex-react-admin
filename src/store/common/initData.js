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

const global = {
  collapsed: false,
  notices,
  loadedAllNotices: false
};
const menu = {
  menuData,
  breadcrumbNameMap
};
const province = [];
const city = [];

export default [
  {
    name: 'setting',
    init: setting,
    action: 'stateUpdate'
  },
  {
    name: 'global',
    init: global,
    action: 'stateUpdate'
  },
  {
    name: 'menu',
    init: menu,
    action: 'stateUpdate'
  },
  {
    name: 'province',
    init: province,
    action: 'stateSuccess'
  },
  {
    name: 'city',
    init: city,
    action: 'stateSuccess'
  }
];
