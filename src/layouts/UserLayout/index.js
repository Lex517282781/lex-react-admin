import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import userRouter from '@/config/userRouter';
import userMap from '@/config/userMap';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import logo from '@/assets/imgs/logo.svg';
import styles from './style.less';

// 暂时只支持二级路由
const getRouterMap = (routers, userPreset) => {
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

      routerMap[mapKey] = userPreset[`menu${presetKey}`];

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

const links = [
  {
    key: 'help',
    title: '帮助',
    href: ''
  },
  {
    key: 'privacy',
    title: '隐私',
    href: ''
  },
  {
    key: 'terms',
    title: '条款',
    href: ''
  }
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class UserLayout extends PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const routerMap = memoizeOneGetRouterMap(userRouter, userMap);

    const routers = (
      <Switch>
        {Object.entries(routerMap).map(([key, value]) => {
          if (value.redirect) {
            return (
              <Route
                key={key}
                exact
                path={key}
                render={() => <Redirect to={`${value.redirect}`} push />}
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
        <Route render={() => <Redirect to={`/${userRouter[0].key}`} push />} />
      </Switch>
    );

    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.lang}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </div>
            <div className={styles.desc}>
              Ant Design 是西湖区最具影响力的 Web 设计规范
            </div>
          </div>
          {routers}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
