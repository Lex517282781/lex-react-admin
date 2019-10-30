import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import { stateSuccess } from '@/store/actionCreators';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { getTimeDistance } from '@/utils/tools';
import styles from './style.less';
import * as mockDashboardAnalysis from '@/mock/custom/DashboardAnalysis';

const IntroduceRow = React.lazy(() => import('./subs/IntroduceRow'));
const SalesCard = React.lazy(() => import('./subs/SalesCard'));
const TopSearch = React.lazy(() => import('./subs/TopSearch'));
const ProportionSales = React.lazy(() => import('./subs/ProportionSales'));
const OfflineData = React.lazy(() => import('./subs/OfflineData'));

class DashboardAnalysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year')
  };

  componentDidMount() {
    this.reqRef = requestAnimationFrame(() => {
      const { stateSuccess } = this.props;
      [
        'visitData',
        'visitData2',
        'salesData',
        'searchData',
        'offlineData',
        'offlineChartData',
        'salesTypeData',
        'salesTypeDataOnline',
        'salesTypeDataOffline'
      ].forEach(state => {
        stateSuccess({
          namespace: `dashboardanalysis/${state}`,
          data: mockDashboardAnalysis[state]
        });
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue
    });

    console.log(`dispatch({
      type: 'chart/fetchSalesData'
    });`);
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type)
    });

    console.log(`dispatch({
      type: 'chart/fetchSalesData'
    });`);
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;

    const { dashboardanalysis } = this.props;

    if (!dashboardanalysis) return null;

    const initData = { loading: false, data: [] };

    const {
      visitData = initData,
      visitData2 = initData,
      salesData = initData,
      searchData = initData,
      offlineData = initData,
      offlineChartData = initData,
      salesTypeData = initData,
      salesTypeDataOnline = initData,
      salesTypeDataOffline = initData
    } = dashboardanalysis;

    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData =
        salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey =
      currentTabKey || (offlineData.data[0] && offlineData.data[0].name);

    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow
            loading={visitData.loading}
            visitData={visitData.data}
          />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData.data}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={salesData.loading}
            selectDate={this.selectDate}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24} type="flex">
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={visitData2.loading}
                  visitData2={visitData2.data}
                  selectDate={this.selectDate}
                  searchData={searchData.data}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={salesPieData.loading}
                  salesPieData={salesPieData.data}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
        </div>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={offlineData.loading}
            offlineData={offlineData.data}
            offlineChartData={offlineChartData.data}
            handleTabChange={this.handleTabChange}
          />
        </Suspense>
      </GridContent>
    );
  }
}

const mapStateToProps = state => ({
  dashboardanalysis: state.root.dashboardanalysis
});

const mapDispatchToProps = {
  stateSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAnalysis);
