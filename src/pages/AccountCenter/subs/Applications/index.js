import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { formatWan } from '@/utils/tools';
import { stateSuccess } from '@/store/actionCreators';
import { tableData } from '@/mock/custom/ListApplications';
import styles from '@/pages/ListApplications/style.less';

class Applications extends PureComponent {
  UNSAFE_componentWillMount() {
    const { stateSuccess } = this.props;
    stateSuccess({
      namespace: 'listapplications/tableData',
      data: {
        list: tableData.list
      }
    });
  }

  render() {
    const { listapplications } = this.props;

    if (!listapplications) return null;
    
    const {
      tableData: {
        data: { list }
      }
    } = listapplications;

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tmall.com/"
          >
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );
    return (
      <List
        rowKey="id"
        className={styles.filterCardList}
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip title="下载">
                  <Icon type="download" />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Icon type="edit" />
                </Tooltip>,
                <Tooltip title="分享">
                  <Icon type="share-alt" />
                </Tooltip>,
                <Dropdown overlay={itemMenu}>
                  <Icon type="ellipsis" />
                </Dropdown>
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  listapplications: state.root.listapplications
});

const mapDispatchToProps = {
  stateSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Applications);
