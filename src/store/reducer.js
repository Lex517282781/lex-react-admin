import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';

import { reducer as dashboardanalysisReducer } from '@/pages/DashboardAnalysis/store';
import { reducer as dashboardmonitorReducer } from '@/pages/DashboardMonitor/store';
import { reducer as dashboardworkplaceReducer } from '@/pages/DashboardWorkplace/store';

import { reducer as formbasicReducer } from '@/pages/FormBasic/store';

const reducer = combineReducers({
  common: commonReducer,
  dashboardanalysis: dashboardanalysisReducer,
  dashboardmonitor: dashboardmonitorReducer,
  dashboardworkplace: dashboardworkplaceReducer,

  formbasic: formbasicReducer
});

export default reducer;
