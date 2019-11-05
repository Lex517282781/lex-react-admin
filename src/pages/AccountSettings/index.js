import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Menu } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './style.less';

const { Item } = Menu;

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      base: (
        <FormattedMessage
          id="app.settings.menuMap.basic"
          defaultMessage="Basic Settings"
        />
      ),
      security: (
        <FormattedMessage
          id="app.settings.menuMap.security"
          defaultMessage="Security Settings"
        />
      ),
      binding: (
        <FormattedMessage
          id="app.settings.menuMap.binding"
          defaultMessage="Account Binding"
        />
      ),
      notification: (
        <FormattedMessage
          id="app.settings.menuMap.notification"
          defaultMessage="New Message Notification"
        />
      )
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base'
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    const { history } = this.props;
    history.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    const { mode: currentMode } = this.state;

    let mode = 'inline';
    const { offsetWidth } = this.main;

    if (offsetWidth > 400 && offsetWidth < 641) {
      mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  getRouterData = () => {
    const { location, breadcrumbNameMap } = this.props;

    const currentRouter = breadcrumbNameMap[location.pathname];
    let children = [];
    let pathList = [];

    if (currentRouter.children) {
      children = currentRouter.children;
      pathList = currentRouter.children.map(router => router.path);
    } else {
      children = breadcrumbNameMap[currentRouter.parentPath].children;
      pathList = children.map(router => router.path);
    }

    const filterRouterMap = pathList.reduce(
      (pre, next) => ({
        ...pre,
        [next]: breadcrumbNameMap[next]
      }),
      {}
    );

    return {
      routerMap: filterRouterMap,
      defaultRedirect: children[0] ? children[0].path : ''
    };
  };

  render() {
    const {
      user: { data: currentUser },
      match,
      location,
      breadcrumbNameMap
    } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;

    const currentRouter = breadcrumbNameMap[location.pathname];

    if (!currentRouter) {
      const parentRouter = breadcrumbNameMap[match.path];
      return <Redirect to={parentRouter.children[0].path} push />;
    }

    const { routerMap, defaultRedirect } = this.getRouterData();

    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}
            >
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            <Switch>
              {Object.values(routerMap).map(value => {
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
                      exact
                      path={value.path}
                      component={value.component}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {defaultRedirect && (
                <Route render={() => <Redirect to={defaultRedirect} push />} />
              )}
            </Switch>
          </div>
        </div>
      </GridContent>
    );
  }
}

const mapStateToProps = rootState => ({
  user: rootState.common.user,
  breadcrumbNameMap: rootState.common.menu.breadcrumbNameMap,
  menuData: rootState.common.menu.menuData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings);
