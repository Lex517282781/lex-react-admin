// import React from 'react';
// import { FormattedMessage } from 'react-intl';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 通过config/router中的路由 生成关键数据map 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getRouterMap = routers => {
  const routerMap = {};
  const flattenRoutersData = data => {
    data.forEach(router => {
      routerMap[router.path] = router;
      if (router.children) {
        flattenRoutersData(router.children);
      }
    });
  };

  flattenRoutersData(routers);

  return routerMap;
};

export default memoizeOne(getRouterMap, isEqual);
