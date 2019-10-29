import * as types from './types';
import Service from '@/services';

export const setting_update = data => ({
  type: types.SETTING_UPDATE,
  data
});

export const global_update = data => ({
  type: types.GLOBAL_UPDATE,
  data
});

export const user_login_request = () => ({
  type: types.USER_LOGIN_REQUEST
});

export const user_login_success = data => ({
  type: types.USER_LOGIN_SUCCESS,
  data
});

export const user_login_failure = () => ({
  type: types.USER_LOGIN_FAILURE
});

export const user_login = data => {
  return async dispatch => {
    dispatch(user_login_request());
    let res = await Service.login({
      data,
      waitting: () => {},
      error: err => {
        dispatch(user_login_failure(err));
      }
    });

    if (!res) return;
    dispatch(user_login_success(res));
  };
};
