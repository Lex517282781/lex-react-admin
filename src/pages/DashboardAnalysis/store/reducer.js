// import * as types from './types';
import {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline
} from '@/mock/custom/DashboardAnalysis';

const initState = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  loading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
