import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import userRouter from '@/config/userRouter';
import getRouterMap from '@/utils/getRouterMap';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import logo from '@/assets/imgs/logo.svg';
import getPageTitle from '@/utils/getPageTitle';
import styles from './style.less';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class UserLayout extends PureComponent {
  render() {
    const {
      location: { pathname },
      intl: { formatMessage }
    } = this.props;

    const routerMap = getRouterMap(userRouter);

    const title = getPageTitle(pathname, routerMap);
    const localTitle = formatMessage({ id: title });

    const links = [
      {
        key: 'help',
        title: formatMessage({ id: 'layout.user.link.help' }),
        href: ''
      },
      {
        key: 'privacy',
        title: formatMessage({ id: 'layout.user.link.privacy' }),
        href: ''
      },
      {
        key: 'terms',
        title: formatMessage({ id: 'layout.user.link.terms' }),
        href: ''
      }
    ];

    const routers = (
      <Switch>
        {Object.values(routerMap).map(value => {
          if (value.redirect) {
            return (
              <Route
                key={value.path}
                exact
                path={value.path}
                render={() => <Redirect to={`${value.redirect}`} push />}
              />
            );
          } else if (value.component) {
            return (
              <Route
                key={value.path}
                exact
                path={value.path}
                component={value.component}
              />
            );
          } else {
            return null;
          }
        })}
        <Route render={() => <Redirect to={`/${userRouter[0].key}`} push />} />
      </Switch>
    );

    return (
      <DocumentTitle title={localTitle}>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
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
      </DocumentTitle>
    );
  }
}

export default injectIntl(UserLayout);
