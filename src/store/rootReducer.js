import { combineReducers } from 'redux';
import { REQUEST, SUCCESS, FAILURE, UPDATE } from './types';

const handleData = (state = { loading: false, data: null }, action) => {
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, loading: false, data: action.data };
    case FAILURE:
      return { ...state, loading: false, msg: action.msg };
    case UPDATE:
      return { ...state, data: action.data };
    default:
      return { ...state };
  }
};

const root = (state = {}, action) => {
  const type = action.type.match('[^/]+(?!.*/)')[0];
  if (!action.state) return state;
  let [pagekey, modulekey] = (action.state || '').split('/');

  let pageVal = state[pagekey];

  let moduleVal;

  if (pageVal) moduleVal = pageVal[modulekey];

  switch (type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
      return {
        ...state,
        [pagekey]: {
          ...pageVal,
          [modulekey]: handleData(moduleVal, { ...action, type })
        }
      };
    case UPDATE:
      return {
        ...state,
        [pagekey]: {
          ...pageVal,
          [modulekey]: action.extend
            ? {
                ...moduleVal,
                ...action.data
              }
            : action.data
        }
      };
    default:
      return { ...state };
  }
};

export default combineReducers({
  root
});
