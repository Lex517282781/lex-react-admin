import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Dropdown, Menu, Badge, Divider } from 'antd';
import { appWrapAuth } from '@/components/WrapAuth';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CreateForm from './subs/CreateForm';
import UpdateForm from './subs/UpdateForm';
import QueryForm from './subs/QueryForm';
import { getFormatAuth } from '@/utils/tools';
import * as listsearchActions from './effects';
import styles from './style.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

class ListSearch extends PureComponent {
  constructor(props) {
    super(props);
    const { initializeData } = props;
    initializeData();
  }

  columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      render: text => (
        <Link to={`/profile/basic/${text.replace(/\s+/gi, '-')}`}>{text}</Link>
      )
    },
    {
      title: '描述',
      dataIndex: 'desc'
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0
        },
        {
          text: status[1],
          value: 1
        },
        {
          text: status[2],
          value: 2
        },
        {
          text: status[3],
          value: 3
        }
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      )
    }
  ];

  componentDidMount() {
    const { tableDataUpdate } = this.props;
    tableDataUpdate();
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { query } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
      ...filters
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    console.log(`dispatch({
      type: 'rule/fetch',
      payload: ${params}
    });`);
  };

  handleMenuClick = e => {
    const {
      listsearch: { selectedRows },
      tableDataDelete
    } = this.props;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        tableDataDelete({
          keys: selectedRows.map(row => row.key)
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = data => {
    const { selectedRowsUpdate } = this.props;
    selectedRowsUpdate(data);
  };

  handleAdd = () => {
    const { createFormUpdate } = this.props;
    createFormUpdate({ visible: true });
  };

  handleUpdateModalVisible = () => {
    const { updateFormUpdate } = this.props;
    updateFormUpdate({ visible: true });
  };

  render() {
    const { listsearch, location, breadcrumbNameMap } = this.props;

    if (!listsearch) return null;

    const currentPageAuths = breadcrumbNameMap[location.pathname].auths || [];
    const currentPageGetAuth = getFormatAuth(location.pathname, 'get');
    const hasGetAuth = currentPageAuths.includes(currentPageGetAuth);

    const {
      tableData: { loading: tableDataLoading, data: tableResource },
      selectedRows
    } = listsearch;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const ButtonWrap = appWrapAuth(Button);

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <QueryForm />
            </div>
            <div className={styles.tableListOperator}>
              <ButtonWrap
                auth={hasGetAuth}
                icon="plus"
                type="primary"
                onClick={this.handleAdd}
              >
                新建
              </ButtonWrap>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={tableDataLoading}
              data={tableResource}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm />
        <UpdateForm />
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = rootState => ({
  listsearch: rootState.listsearch,
  breadcrumbNameMap: rootState.common.menu.breadcrumbNameMap
});

const mapDispatchToProps = {
  initializeData: listsearchActions.initializeData,
  createFormUpdate: listsearchActions.createFormUpdate,
  updateFormUpdate: listsearchActions.updateFormUpdate,
  selectedRowsUpdate: listsearchActions.selectedRowsUpdate,
  tableDataUpdate: listsearchActions.tableDataUpdate,
  tableDataDelete: listsearchActions.tableDataDelete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSearch);
