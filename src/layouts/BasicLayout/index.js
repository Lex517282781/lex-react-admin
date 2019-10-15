import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
// import asyncComponent from '@/components/asyncComponent';
import appRouter from '@/config/appRouter';
import appMap from '@/config/appMap';

// 暂时只支持二级路由
const getRouterMap = (routers, appPreset) => {
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

      routerMap[mapKey] = appPreset[`menu${presetKey}`];

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

const memoizeOneGetRouterMap = memoizeOne(getRouterMap, isEqual);

class BasicLayout extends PureComponent {
  render() {
    const routerMap = memoizeOneGetRouterMap(appRouter, appMap);

    return (
      <Switch>
        {Object.entries(routerMap).map(([key, value]) => {
          if (value.redirect) {
            return (
              <Route
                key={key}
                exact
                path={key}
                render={() => <Redirect to={value.redirect} push />}
              />
            );
          } else if (value.component) {
            return (
              <Route key={key} exact path={key} component={value.component} />
            );
          } else {
            return null;
          }
        })}
        <Route render={() => <Redirect to={`/${appRouter[0].key}`} push />} />
      </Switch>
    );
  }
}

export default BasicLayout;
