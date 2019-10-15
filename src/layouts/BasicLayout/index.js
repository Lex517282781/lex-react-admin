import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
// import FooterView from '../FooterView';
// import HeaderView from '../HeaderView';
import appRouter from '@/config/appRouter';
import appMap from '@/config/appMap';
import getRouterMap from '@/utils/getRouterMap';
import styles from './index.js';

const { Content } = Layout;

class BasicLayout extends PureComponent {
  render() {
    const routerMap = getRouterMap(appRouter, appMap);

    const layout = (
      <Layout>
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
    );

    return layout;
  }
}

export default BasicLayout;
