import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import AvatarList from '@/components/AvatarList';
import * as accountcenterActions from '../../effects';
import styles from '@/pages/ListProjects/style.less';

class Projects extends PureComponent {
  componentDidMount() {
    const { projectsDataUpdate } = this.props;
    projectsDataUpdate();
  }

  render() {
    const { accountcenter } = this.props;

    if (!accountcenter) return null;

    const {
      projects: {
        data: { list }
      }
    } = accountcenter;

    return (
      <List
        className={styles.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={<a>{item.title}</a>}
                description={item.subDescription}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map(member => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${member.id}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = rootState => ({
  accountcenter: rootState.accountcenter
});

const mapDispatchToProps = {
  projectsDataUpdate: accountcenterActions.projectsDataUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
