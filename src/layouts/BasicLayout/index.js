import React, { Suspense, PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { actionCreators as commonActionCreators } from '@/store/common';
import { Layout } from 'antd';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import Footer from '../FooterView';
import Header from '../HeaderView';
import Media from 'react-media';
import SiderMenu from '@/components/SiderMenu';
import Context from '../context/MenuContext';
import logo from '@/assets/imgs/logo.svg';
import appRouter from '@/config/appRouter';
import getRouterMap from '@/utils/getRouterMap';
import getPageTitle from '@/utils/getPageTitle';
import styles from './index.js';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};

class BasicLayout extends PureComponent {
  componentDidMount() {
    console.log('----- todo: BasicLayout s -----');
    console.log('1: 获取当前用户信息');
    console.log('2: 获取当前后台设置');
    console.log('3: 获取菜单权限');
    console.log('----- BasicLayout e -----');
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px'
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { global_update } = this.props;
    global_update(collapsed);
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      intl: { formatMessage }
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const routerMap = getRouterMap(appRouter);

    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            isMobile={isMobile}
            {...this.props}
            menuData={menuData}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh'
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
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
                    <Route
                      key={key}
                      exact
                      path={key}
                      component={value.component}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <Route
                render={() => <Redirect to={`/${appRouter[0].key}`} push />}
              />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    const title = getPageTitle(pathname, breadcrumbNameMap);
    const localTitle = formatMessage({ id: title });

    return (
      <React.Fragment>
        <DocumentTitle title={localTitle}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.common.global.collapsed,
  layout: state.common.setting.layout,
  menuData: state.common.menu.menuData,
  breadcrumbNameMap: state.common.menu.breadcrumbNameMap,
  ...state.common.setting
});

const mapDispatchToProps = {
  global_update: commonActionCreators.global_update
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(props => (
    <Media query="(max-width: 599px)">
      {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
  ))
);
