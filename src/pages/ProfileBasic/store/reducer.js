// import * as types from './types';
import { basicData } from '@/mock/custom/ProfileBasic';

const initState = {
  basicData: {
    loading: false,
    ...basicData
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
