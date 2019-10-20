// import * as types from './types';
import { advancedData } from '@/mock/custom/ProfileAdvanced';

const initState = {
  advancedData: {
    loading: false,
    ...advancedData
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
