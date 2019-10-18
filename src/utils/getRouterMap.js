import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 暂时只支持二级路由
// 通过config/router中的路由 生成关键数据map 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getRouterMap = (routers, preset) => {
  const routerMap = {};
  const flattenRoutersData = (data, parent) => {
    data.forEach(router => {
      let path = '';

      if (parent) {
        path = `/${parent.key}/${router.key}`;
      } else {
        path = `/${router.key}`;
      }

      let presetKey = path.replace(/\//g, '.');
      router.path = path;
      router.locale = `menu${presetKey}`;

      routerMap[path] = router;

      if (router.children) {
        // 配置默认跳转链接
        const firstRouterKey = router.children[0].key;
        routerMap[path] = {
          ...routerMap[path],
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
