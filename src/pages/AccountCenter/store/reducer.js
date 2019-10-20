// import * as types from './types';
import { notice } from '@/mock/custom/AccountCenter';

const initState = {
  notice: {
    loading: false,
    list: notice
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
