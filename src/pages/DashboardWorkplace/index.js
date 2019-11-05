import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List, Avatar } from 'antd';
import { stateSuccess, stateFetch } from '@/store/actionCreators';
import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import * as initData from './initData';
import styles from './style.less';

const links = [
  {
    title: '操作一',
    href: ''
  },
  {
    title: '操作二',
    href: ''
  },
  {
    title: '操作三',
    href: ''
  },
  {
    title: '操作四',
    href: ''
  },
  {
    title: '操作五',
    href: ''
  },
  {
    title: '操作六',
    href: ''
  }
];

class DashboardWorkplace extends PureComponent {
  constructor(props) {
    super(props);
    Object.keys(initData).forEach(state => {
      props.stateSuccess({
        namespace: `dashboardworkplace/${state}`,
        data: initData[state]
      });
    });
  }

  componentDidMount() {
    const { stateFetch } = this.props;
    Object.keys(initData).forEach(state => {
      stateFetch({
        namespace: `dashboardworkplace/${state}`,
        api: `getDashboardworkplace${state}`
      });
    });
  }

  renderActivities(list) {
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a href="##" className={styles.username}>
                  {item.user.name}
                </a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      user: { loading: userLoading, data: currentUser },
      dashboardworkplace
    } = this.props;

    if (!dashboardworkplace) return null;

    const {
      project: { loading: projectLoading, data: notice },
      activities: { loading: activitiesLoading, data: activitiesData },
      radarData = initData
    } = dashboardworkplace;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.title} |{currentUser.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={userLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span
                          className={styles.datetime}
                          title={item.updatedAt}
                        >
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                  {this.renderActivities(activitiesData)}
                </div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.data.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData.data} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {notice.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = rootState => ({
  user: rootState.common.user,
  dashboardworkplace: rootState.dashboardworkplace,
  dashboardanalysis: rootState.dashboardanalysis
});

const mapDispatchToProps = {
  stateSuccess,
  stateFetch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardWorkplace);
