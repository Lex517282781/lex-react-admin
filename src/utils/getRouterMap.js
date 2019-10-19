import React from 'react';
import { FormattedMessage } from 'react-intl';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 暂时只支持二级路由
// 通过config/router中的路由 生成关键数据map 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getRouterMap = routers => {
  const routerMap = {};
  const flattenRoutersData = (data, parent) => {
    data.forEach(router => {
      let path = '';

      if (parent) {
        path = `${parent.path}/${router.key}`;
      } else {
        path = `/${router.key}`;
      }

      let presetKey = path.replace(/\//g, '.');
      router.path = path;
      router.parentPath = parent ? parent.path : '/';
      router.locale = `menu${presetKey}`;
      router.name = <FormattedMessage id={router.locale} />;

      if (router.query) router.path = router.path + router.query;
      routerMap[router.path] = router;

      if (router.children) {
        // 配置默认跳转链接
        const firstRouterKey = router.children[0].key;
        // 菜单隐藏子路由 说明是在当前页面中展示子路由 在当前页面中
        if (!router.hideChildrenInMenu)
          routerMap[router.path].redirect = `${router.path}/${firstRouterKey}`;
        flattenRoutersData(router.children, router);
      }
    });
  };

  flattenRoutersData(routers);

  return routerMap;
};

export default memoizeOne(getRouterMap, isEqual);
