import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import FooterView from '../FooterView';
import Header from '../HeaderView';
import Media from 'react-media';
import SiderMenu from '@/components/SiderMenu';
import logo from '@/assets/imgs/logo.svg';
import appRouter from '@/config/appRouter';
import appMap from '@/config/appMap';
import getRouterMap from '@/utils/getRouterMap';
import styles from './index.js';

const { Content } = Layout;

class BasicLayout extends PureComponent {
  handleMenuCollapse = collapsed => {
    console.log(`dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed
    });`);
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      // location: { pathname },
      isMobile,
      menuData,
      // breadcrumbNameMap,
      fixedHeader
    } = this.props;

    const isTop = PropsLayout === 'topmenu';
    const routerMap = getRouterMap(appRouter, appMap);

    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout>
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
        </Layout>
      </Layout>
    );

    return layout;
  }
}

const mapStateToProps = state => ({
  collapsed: state.common.global.collapsed,
  layout: state.common.setting.layout,
  menuData: state.common.menu.menuData,
  breadcrumbNameMap: state.common.menu.breadcrumbNameMap,
  ...state.common.setting
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
