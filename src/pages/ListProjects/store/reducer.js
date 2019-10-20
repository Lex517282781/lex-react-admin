// import * as types from './types';
import { tableData } from '@/mock/custom/ListProjects';

const initState = {
  tableData: {
    loading: false,
    list: tableData.list
  },
  updateForm: {
    visible: false,
    done: false
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
