import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { Step } = Steps;

class FormStep extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

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

    return (
      <PageHeaderWrapper
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
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
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbNameMap: state.common.menu.breadcrumbNameMap,
  menuData: state.common.menu.menuData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormStep);
