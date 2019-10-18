import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// 暂时只支持二级路由
// 通过config/router中的路由 生成关键数据map 如：{ '/dashboard': {}, '/dashboard/analysis' }
const getDetailRouter = routers => {
  const formatRouter = (data, parent) => {
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
      if (router.children) {
        // 配置默认跳转链接
        const firstRouterKey = router.children[0].key;
        router.redirect = `/${router.key}/${firstRouterKey}`;
        formatRouter(router.children, router);
      }
    });
  };

  formatRouter(routers);

  return routers;
};

export default memoizeOne(getDetailRouter, isEqual);
