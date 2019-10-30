import { combineReducers } from 'redux';
import { REQUEST, SUCCESS, FAILURE, UPDATE } from './types';

const handleData = (state = { loading: true, data: null }, action) => {
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
  switch (type) {
    case REQUEST:
    case SUCCESS:
    case FAILURE:
    case UPDATE:
      return {
        ...state,
        [action.state]: handleData(state[action.state], action)
      };
    default:
      return { ...state };
  }
};

export default combineReducers({
  root
});
