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

export const global = {
  collapsed: false
};
export const menu = {
  menuData,
  breadcrumbNameMap
};
export const province = [];
export const city = [];

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
