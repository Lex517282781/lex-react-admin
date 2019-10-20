// import * as types from './types';
import { tableData } from '@/mock/custom/ListSearch';

const initState = {
  tableData: {
    loading: false,
    list: tableData.list,
    pagination: tableData.pagination
  },
  createForm: {
    isible: false
  },
  updateForm: {
    isible: false,
    values: {}
  },
  selectedRows: [],
  expandForm: false,
  query: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
