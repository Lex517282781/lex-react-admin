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
import ExceptionUnauthorized from '@/pages/ExceptionUnauthorized';
import SiderMenu from '@/components/SiderMenu';
import Context from '../context/MenuContext';
import customSetting from '@/config/customSetting';
import defaultSettings from '@/config/defaultSettings';
import getRouterMap from '@/utils/getRouterMap';
import getPageTitle from '@/utils/getPageTitle';
import styles from './style.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const { siderWidth } = defaultSettings;

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
        paddingLeft: collapsed ? '80px' : siderWidth + 'px'
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

    if (!menuData.length) return <ExceptionUnauthorized />;

    const isTop = PropsLayout === 'topmenu';
    const routerMap = getRouterMap(menuData);

    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={customSetting.contentLogo}
            title={customSetting.contentTitle}
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
            logo={customSetting.contentLogo}
            title={customSetting.contentTitle}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            <Switch>
              {Object.values(routerMap).map(value => {
                if (
                  // 子菜单的父级菜单也有组件的时候 不需要在这里做页面判断跳转 因为是在页面中显示子路由 所以是需要在那个页面中做路由判断 不需要进入这里判断
                  routerMap[value.parentPath] &&
                  routerMap[value.parentPath].component
                ) {
                  return null;
                }
                if (value.redirect) {
                  return (
                    <Route
                      key={value.path}
                      exact
                      path={value.path}
                      render={() => <Redirect to={value.redirect} push />}
                    />
                  );
                } else if (value.component) {
                  return (
                    <Route
                      key={value.path}
                      // 对于有子菜单 且 自己也有路由跳转的 不需要精准匹配
                      exact={!(value.children && value.component)}
                      path={value.path}
                      component={value.component}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <Route render={() => <Redirect to={menuData[0].path} push />} />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    const title = getPageTitle(pathname, breadcrumbNameMap);
    let localTitle = '标准后台';
    if (title) {
      localTitle = formatMessage({ id: title });
    }

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
