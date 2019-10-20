import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';

import { reducer as dashboardanalysisReducer } from '@/pages/DashboardAnalysis/store';
import { reducer as dashboardmonitorReducer } from '@/pages/DashboardMonitor/store';
import { reducer as dashboardworkplaceReducer } from '@/pages/DashboardWorkplace/store';

import { reducer as formbasicReducer } from '@/pages/FormBasic/store';
import { reducer as formstepReducer } from '@/pages/FormStep/store';
import { reducer as formadvancedReducer } from '@/pages/FormAdvanced/store';

import { reducer as listsearchReducer } from '@/pages/ListSearch/store';
import { reducer as listbasicReducer } from '@/pages/ListBasic/store';
import { reducer as listcardReducer } from '@/pages/ListCard/store';

import { reducer as profilebasicReducer } from '@/pages/ProfileBasic/store';
import { reducer as profileadvancedReducer } from '@/pages/ProfileAdvanced/store';

const reducer = combineReducers({
  common: commonReducer,
  dashboardanalysis: dashboardanalysisReducer,
  dashboardmonitor: dashboardmonitorReducer,
  dashboardworkplace: dashboardworkplaceReducer,

  formbasic: formbasicReducer,
  formstep: formstepReducer,
  formadvanced: formadvancedReducer,

  listsearch: listsearchReducer,
  listbasic: listbasicReducer,
  listcard: listcardReducer,

  profilebasic: profilebasicReducer,
  profileadvanced: profileadvancedReducer
});

export default reducer;
