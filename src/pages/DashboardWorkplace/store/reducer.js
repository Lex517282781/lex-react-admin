// import * as types from './types';
import { project, activities } from '@/mock/custom/DashboardWorkplace';

const initState = {
  project: {
    loading: false,
    data: project
  },
  activities: {
    loading: false,
    data: activities
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
