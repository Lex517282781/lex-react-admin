// import * as types from './types';
import { tableData } from '@/mock/custom/ListCard';

const initState = {
  tableData: {
    loading: false,
    list: tableData.list
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
