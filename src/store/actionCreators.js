import { REQUEST, SUCCESS, FAILURE, UPDATE } from './types';
import Service from '@/services';

const generateState = (stateData, action) => {
  let [page, state] = stateData.splite('/');
  if (state) {
    type = `${page.toUpperCase()}/${state.toUpperCase()}/${action}`;
  } else {
    type = `${page.toUpperCase()}/${REQUEST}`;
    state = page;
  }
  return {
    type, // redux 中的 type
    state // redux 中的 分支数据 数据结构如 页面数据/模块数据/详细数据 page/module/details
  };
};

const stateRequest = stateData => {
  return generateState(stateData, REQUEST);
};

export const stateSuccess = (stateData, data) => {
  return {
    ...generateState(stateData, SUCCESS),
    data
  };
};

const stateFailure = (stateData, msg) => {
  return {
    ...generateState(stateData, FAILURE),
    msg
  };
};

export const stateUpdate = (stateData, data) => {
  return {
    ...generateState(stateData, UPDATE),
    data
  };
};

export const stateFetch = ({
  stateData,
  api,
  data,
  params,
  intercept,
  failure,
  success
}) => {
  return async (dispatch, getState) => {
    // 请求拦截
    intercept && intercept.call(null, { dispatch, getState, data, params });

    dispatch(stateRequest(stateData));
    let res = await Service[api]({
      data, // post 参数
      params, // get delete 参数
      waitting: () => {},
      error: err => {
        failure &&
          failure.call(null, { dispatch, getState, data, params, err });
        dispatch(stateFailure(stateData, err.msg));
      }
    });
    if (!res) return;
    success && success.call(null, { dispatch, getState, data, params, res });
    dispatch(stateSuccess(stateData, res));
  };
};
