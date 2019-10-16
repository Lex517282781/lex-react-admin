import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';

const reducer = combineReducers({ common: commonReducer });

export default reducer;
