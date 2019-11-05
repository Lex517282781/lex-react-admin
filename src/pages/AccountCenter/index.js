import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import * as accountcenterActions from './effects';
import { stateSuccess } from '@/store/actionCreators';

import styles from './style.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  }
];

class AccountCenter extends PureComponent {
  constructor(props) {
    super(props);
    const { initializeData } = props;
    this.state = {
      newTags: [],
      inputVisible: false,
      inputValue: ''
    };
    initializeData();
  }

  componentDidMount() {
    const { noticesUpdate } = this.props;
    noticesUpdate();
  }

  onTabChange = key => {
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

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (
      inputValue &&
      newTags.filter(tag => tag.label === inputValue).length === 0
    ) {
      newTags = [
        ...newTags,
        { key: `new-${newTags.length}`, label: inputValue }
      ];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: ''
    });
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
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      user: { loading: currentUserLoading, data: currentUser },
      accountcenter,
      match,
      location,
      breadcrumbNameMap
    } = this.props;
    if (!accountcenter) return null;

    const {
      notices: { loading: noticeLoading, data: noticeList }
    } = accountcenter;

    const currentRouter = breadcrumbNameMap[location.pathname];

    if (!currentRouter) {
      const parentRouter = breadcrumbNameMap[match.path];
      return <Redirect to={parentRouter.children[0].path} push />;
    }

    const { routerMap, defaultRedirect } = this.getRouterData();

    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={currentUserLoading}
            >
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {currentUser.group}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {currentUser.geographic.province.label}
                      {currentUser.geographic.city.label}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tags.concat(newTags).map(item => (
                      <Tag key={item.key}>{item.label}</Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Spin spinning={noticeLoading}>
                      <Row gutter={36}>
                        {noticeList.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Spin>
                  </div>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
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
                  <Route
                    render={() => <Redirect to={defaultRedirect} push />}
                  />
                )}
              </Switch>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

const mapStateToProps = rootState => ({
  user: rootState.common.user,
  accountcenter: rootState.accountcenter,
  breadcrumbNameMap: rootState.common.menu.breadcrumbNameMap,
  menuData: rootState.common.menu.menuData
});

const mapDispatchToProps = {
  stateSuccess,
  initializeData: accountcenterActions.initializeData,
  noticesUpdate: accountcenterActions.noticesUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCenter);
