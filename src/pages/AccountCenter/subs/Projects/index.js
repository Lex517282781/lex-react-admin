import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import AvatarList from '@/components/AvatarList';
import { stateSuccess } from '@/store/actionCreators';
import { tableData } from '@/mock/custom/ListProjects';
import styles from '@/pages/ListProjects/style.less';

class Projects extends PureComponent {
  UNSAFE_componentWillMount() {
    const { stateSuccess } = this.props;
    stateSuccess({
      namespace: 'listprojects/tableData',
      data: {
        list: tableData.list
      }
    });
  }

  render() {
    const { listprojects } = this.props;

    if (!listprojects) return null;

    const {
      tableData: {
        data: { list }
      }
    } = listprojects;

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

const mapStateToProps = state => ({
  listprojects: state.root.listprojects
});

const mapDispatchToProps = {
  stateSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
