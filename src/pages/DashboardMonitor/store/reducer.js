// import * as types from './types';
import { tags } from '@/mock/custom/DashboardMonitor';

const initState = {
  tags,
  loading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
