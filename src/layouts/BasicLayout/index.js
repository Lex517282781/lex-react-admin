import React, { Suspense, PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { stateSuccess, stateUpdate } from '@/store/actionCreators';
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
import getPageTitle from '@/utils/getPageTitle';
import { appWrapAuth } from '@/components/WrapAuth';
import { STOREKEY } from '@/config/env';
import store from 'store';
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
  UNSAFE_componentWillMount() {
    const { user, stateSuccess } = this.props;
    if (user && user.data) return;
    const storeUser = store.get(STOREKEY);
    if (storeUser)
      stateSuccess({
        namespace: 'common/user',
        data: storeUser
      });
  }

  componentDidMount() {
    // console.log('----- todo: BasicLayout s -----');
    // console.log('1: 获取当前用户信息');
    // console.log('2: 获取当前后台设置');
    // console.log('3: 获取菜单权限');
    // console.log('----- BasicLayout e -----');
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
    const { stateUpdate } = this.props;
    stateUpdate({
      namespace: `common/global`,
      data: collapsed
    });
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
      user,
      navTheme,
      layout: PropsLayout,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      intl: { formatMessage }
    } = this.props;

    const storeUser = store.get(STOREKEY);

    if (!storeUser && (!user || !user.data)) return <Redirect to="/user" />;

    if (!menuData.length) return <ExceptionUnauthorized />;

    const isTop = PropsLayout === 'topmenu';

    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const SuspenseWrap = appWrapAuth(Suspense);

    let redirect, isMatch;
    //  递归获取子路由是否匹配位置 直到取到位置
    const matchRouter = routers => {
      isMatch = routers.some(item => {
        if (
          breadcrumbNameMap[item.path] &&
          breadcrumbNameMap[item.path].component
        ) {
          redirect = item.path;
          return true;
        }

        if (item.children && item.children.length) {
          matchRouter(item.children);
          return isMatch;
        }
        return false;
      });
    };

    matchRouter(menuData);

    if (!isMatch) {
      redirect = '/user';
    }

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
              {Object.values(breadcrumbNameMap).map(value => {
                if (
                  // 子菜单的父级菜单也有组件的时候 不需要在这里做页面判断跳转 因为是在页面中显示子路由 所以是需要在那个页面中做路由判断 不需要进入这里判断
                  breadcrumbNameMap[value.parentPath] &&
                  breadcrumbNameMap[value.parentPath].component
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
              <Route render={() => <Redirect to={redirect} push />} />
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
        <SuspenseWrap auth="SettingDrawer" fallback={null}>
          {this.renderSettingDrawer()}
        </SuspenseWrap>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.root.common.user,
  collapsed: state.root.common.global.collapsed,
  layout: state.root.common.setting.layout,
  menuData: state.root.common.menu.menuData,
  breadcrumbNameMap: state.root.common.menu.breadcrumbNameMap,
  ...state.root.common.setting
});

const mapDispatchToProps = {
  stateSuccess,
  stateUpdate
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
