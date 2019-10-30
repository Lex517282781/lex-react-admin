import { REQUEST, SUCCESS, FAILURE, UPDATE } from './types';
import Service from '@/services';

const generateState = (namespace, action) => {
  let [page, state] = namespace.split('/');
  let type = '';
  if (state) {
    type = `${page.toUpperCase()}/${state.toUpperCase()}/${action}`;
  } else {
    type = `${page.toUpperCase()}/${REQUEST}`;
    state = page;
  }
  return {
    type, // redux 中的 type
    state: namespace // redux 中的 分支数据 数据结构如 页面数据/模块数据/详细数据 page/module/details
  };
};

const stateRequest = namespace => {
  return generateState(namespace, REQUEST);
};

export const stateSuccess = ({ namespace, data }) => {
  return {
    ...generateState(namespace, SUCCESS),
    data
  };
};

const stateFailure = ({ namespace, msg }) => {
  return {
    ...generateState(namespace, FAILURE),
    msg
  };
};

export const stateUpdate = ({ namespace, data, extend = false }) => {
  return {
    ...generateState(namespace, UPDATE),
    data,
    extend
  };
};

export const stateFetch = ({
  namespace,
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

    dispatch(stateRequest(namespace));
    let res = await Service[api]({
      data, // post 参数
      params, // get delete 参数
      waitting: () => {},
      error: err => {
        failure &&
          failure.call(null, { dispatch, getState, data, params, err });
        dispatch(stateFailure({ namespace, msg: err.msg }));
      }
    });
    if (!res) return;
    success && success.call(null, { dispatch, getState, data, params, res });
    dispatch(stateSuccess({ namespace, data: res }));
  };
};
