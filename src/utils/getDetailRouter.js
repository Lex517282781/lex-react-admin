import React from 'react';
import { FormattedMessage } from 'react-intl';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 暂时只支持二级路由
// 通过config/router中的路由 生成详细的list 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getDetailRouter = routers => {
  const formatRouter = (data, parent) => {
    data.forEach(router => {
      let path = '';

      if (parent) {
        path = `${parent.path}/${router.key}`;
      } else {
        path = `/${router.key}`;
      }

      let presetKey = path.replace(/\//g, '.');

      router.path = path;
      if (router.query) router.path = router.path + router.query;

      router.locale = `menu${presetKey}`;
      router.name = <FormattedMessage id={router.locale} />;
      if (router.children) {
        // 配置默认跳转链接
        const firstRouterKey = router.children[0].key;
        router.redirect = `${router.path}/${firstRouterKey}`;
        formatRouter(router.children, router);
      }
    });
  };

  formatRouter(routers);

  return routers;
};

export default memoizeOne(getDetailRouter, isEqual);
