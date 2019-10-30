import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const tabList = [
  {
    key: 'articles',
    name: '文章'
  },
  {
    key: 'projects',
    name: '项目'
  },
  {
    key: 'applications',
    name: '应用'
  }
];

class ListSearchinfo extends Component {
  handleTabChange = key => {
    const { match, history } = this.props;
    switch (key) {
      case 'articles':
        history.push(`${match.url}/articles`);
        break;
      case 'applications':
        history.push(`${match.url}/applications`);
        break;
      case 'projects':
        history.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
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
    const { match, location, breadcrumbNameMap } = this.props;

    const currentRouter = breadcrumbNameMap[location.pathname];

    if (!currentRouter) {
      const parentRouter = breadcrumbNameMap[match.path];
      return <Redirect to={parentRouter.children[0].path} push />;
    }

    const { routerMap, defaultRedirect } = this.getRouterData();

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
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
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbNameMap: state.root.common.menu.breadcrumbNameMap,
  menuData: state.common.menu.menuData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSearchinfo);
