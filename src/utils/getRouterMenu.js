import React from 'react';
import { FormattedMessage } from 'react-intl';
import { message } from 'antd';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';

// 暂时只支持二级路由
/* 通过config/router中的路由 生成详细的list 如：
[
  {
    key: 'dashboard',
    icon: 'dashboard',
    name: '统计页',
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    locale: "menu.dashboard",
    children: []
  }
]
*/
// 不传routerMap 生成原始的 系统完整提供的路由
// 传routerMap 供外部权限的时候使用 减少耦合 传入外部路由和系统完成理由map 生成当前权限的路由
const getRouterMenu = (routers, routerMap) => {
  const formatRouter = (data, parent) => {
    let index = data.length;
    // 在迭代的数组中删除指定的元素 迭代和变换数组的常用解决方案 反向操作数组
    while (index--) {
      const router = data[index];

      let path = '';

      if (parent) {
        path = `${parent.path}/${router.key}`;
      } else {
        path = `/${router.key}`;
      }

      let presetKey = path.replace(/\//g, '.');
      router.path = path;
      router.parentPath = parent ? parent.path : '/';
      if (routerMap) {
        if (routerMap[router.path]) {
          const { children, ...rest } = routerMap[router.path];
          Object.assign(router, {
            ...router,
            ...rest
          });
        } else {
          data.splice(index, 1); // 这里删除不符合要求的路由
          message.warn(`没有key为 ${router.key} 的系统功能 , 请确认后再加入~`);
        }
      } else {
        if (router.query) router.path = router.path + router.query;
        router.locale = `menu${presetKey}`;
        router.name = <FormattedMessage id={router.locale} />;
      }

      if (router.children) {
        // 配置默认跳转链接
        if (routerMap) {
          // 需要对配置错误的路由作兼容处理 直到取到有效的路由
          const isMatch = router.children.some(item => {
            const childPath = `${router.path}/${item.key}`;
            if (routerMap && routerMap[childPath]) {
              router.redirect = childPath;
              return true;
            }
            return false;
          });
          if (!isMatch) {
            // 都不匹配的时候 只能跳转用户登录页面
            router.redirect = '/user';
            message.warn(`没有任何路由匹配~`);
          }
        } else {
          // 在生成原始的完整的路由时候 且 当前路由没有路由组件的时候 需要配置重定向
          if (!router.component) {
            const firstRouterKey = router.children[0].key;
            router.redirect = `${router.path}/${firstRouterKey}`;
          }
        }
        formatRouter(router.children, router);
      }
    }
  };

  formatRouter(routers);
  return routers;
};

export default memoizeOne(getRouterMenu, isEqual);
