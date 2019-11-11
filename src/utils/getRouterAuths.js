import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 通过准入路由获取全部最小准入单元权限
const getRouterAuths = routers => {
  let routerAuths = [];
  const flattenRoutersData = data => {
    data.forEach(router => {
      if (router.auths && router.auths.length) {
        routerAuths = [...routerAuths, ...router.auths];
      }
      if (router.children) {
        flattenRoutersData(router.children);
      }
    });
  };

  flattenRoutersData(routers);

  return routerAuths;
};

export default memoizeOne(getRouterAuths, isEqual);
