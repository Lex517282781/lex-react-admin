import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 暂时只支持二级路由
// 通过config/router中的路由 生成关键数据map 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getRouterMap = (routers, preset) => {
  const routerMap = {};
  const flattenRoutersData = (data, parent) => {
    data.forEach(router => {
      let mapKey = '';

      if (parent) {
        mapKey = `/${parent.key}/${router.key}`;
      } else {
        mapKey = `/${router.key}`;
      }

      let presetKey = mapKey.replace(/\//g, '.');

      routerMap[mapKey] = preset[`menu${presetKey}`];

      if (router.children) {
        // 配置默认跳转链接
        const firstRouterKey = router.children[0].key;
        routerMap[mapKey] = {
          ...routerMap[mapKey],
          redirect: `/${router.key}/${firstRouterKey}`
        };
        flattenRoutersData(router.children, router);
      }
    });
  };

  flattenRoutersData(routers);

  return routerMap;
};

export default memoizeOne(getRouterMap, isEqual);
