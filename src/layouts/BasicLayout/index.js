import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import FooterView from '../FooterView';
import Header from '../HeaderView';
import Media from 'react-media';
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
    const { isMobile } = this.props;

    const routerMap = getRouterMap(appRouter, appMap);

    const layout = (
      <Layout>
        <Layout>
          <Header
            // menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content}>
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

export default connect()(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
