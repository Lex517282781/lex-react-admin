// import * as types from './types';
import { province, city } from '@/mock/custom/AccountSettings';

const initState = {
  notice: {
    loading: false,
    province,
    city
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
