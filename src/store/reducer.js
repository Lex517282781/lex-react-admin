import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';

import { reducer as dashboardanalysisReducer } from '@/pages/DashboardAnalysis/store';

const reducer = combineReducers({
  common: commonReducer,
  dashboardanalysis: dashboardanalysisReducer
});

export default reducer;
