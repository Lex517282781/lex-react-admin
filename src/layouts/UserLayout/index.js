import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from '@/store/common';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import userRouter from '@/config/userRouter';
import getRouterMenu from '@/utils/getRouterMenu';
import getRouterMap from '@/utils/getRouterMap';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import getPageTitle from '@/utils/getPageTitle';
import customSetting from '@/config/customSetting';
import { AppWrap } from '@/components/WrapAuth';
import { STOREKEY, LOGIN_SIGN_OK, LOGIN_SIGN_ERROR } from '@/config/env';
import store from 'store';
import styles from './style.less';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> {customSetting.copyright}
  </Fragment>
);

class UserLayout extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { user: nextUser } = nextProps;
    const { user: preUser } = this.props;
    if (
      nextUser.loginStatus === LOGIN_SIGN_OK &&
      (preUser.loginStatus === LOGIN_SIGN_ERROR || preUser.loginStatus === '')
    ) {
      store.set(STOREKEY, nextUser.currentUser);
      nextProps.history.replace('/');
    }
  }

  render() {
    const {
      location: { pathname },
      intl: { formatMessage }
    } = this.props;

    const routerMenu = getRouterMenu(userRouter);
    const routerMap = getRouterMap(routerMenu);

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
          <AppWrap auth="International" className={styles.lang}>
            <SelectLang />
          </AppWrap>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <img
                  alt="logo"
                  className={styles.logo}
                  src={customSetting.loginLogo}
                />
                <span className={styles.title}>{customSetting.loginTitle}</span>
              </div>
              <div className={styles.desc}>{customSetting.loginDesc}</div>
            </div>
            {routers}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.user
});

const mapDispatchToProps = {
  user_login_success: commonActionCreators.user_login_success
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UserLayout));
